import "./game.css";

import useWebSocket from "react-use-websocket";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";

import Api from "../../api/api";
import { WaitingForPlayer } from "./waiting-player/waiting-player";
import { GameScore } from "./game-score/game-score";
import { GameType, RoundType } from "./game.type";
import { GameResults } from "./game-results/game-results";
import { config } from "../../constants/config";
import {
  PAPER,
  ROCK,
  SCISSORS,
  TIE,
  GAME_FINISHED,
} from "../../constants/constants";

export function Game() {
  // Initializing initial state of the game
  const api = useMemo(() => new Api(), []);
  const gameId: string = useParams()["gameId"] as string;
  const nickname = sessionStorage.getItem("nickname") || "";
  const navigate = useNavigate();

  const [game, setGame] = useState<GameType>({
    current_round: 0,
    players: [],
    max_rounds: 0,
    rounds: [],
    state: "",
  });

  const [error, setError] = useState("");
  const [showRoundResults, setShowRoundResults] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  // Initializing WebSocket connection
  const { sendJsonMessage } = useWebSocket(config.WS_URL, {
    onMessage: (event: MessageEvent) => {
      // When we receive WS message from the server, it's need to get game data from the server and
      // re-render current view.
      api
        .game(gameId)
        .then((data) => {
          setGame(data);
          const currentRound = parseInt(
            sessionStorage.getItem("currentRound") || "0"
          );

          // This case means that the round is finished and we should display round result message.
          if (
            data.rounds[currentRound] &&
            (data.rounds[currentRound] as RoundType)?.winner &&
            data.state !== GAME_FINISHED
          ) {
            setShowRoundResults(true);
          }
        })
        .catch(() => setError("Unknown server error"));
    },
    onClose: () => {
      setError("Connection with server has been lost");
    },
    onOpen: () => {
      setError("");
      // Sending a message to WS server to register the connection
      sendJsonMessage({ action: "add", nickname: nickname });
    },
    onError: () => {
      setError("Unknown WS server error");
    },
    shouldReconnect: (closeEvent) => {
      return true;
    },
    onReconnectStop: () => {
      setError(
        "Max attempts to reconnect are reached. Please refresh the window."
      );
    },
    retryOnError: true,
    reconnectAttempts: 50,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    api
      .game(gameId)
      .then((data) => {
        setGame(data);

        // In the case when 'nickname' is not stored in sessionStorage, it means you need to re-join the game.
        if (!nickname && game.state !== GAME_FINISHED) {
          navigate(`/join/${gameId}`);
        }

        // It's needed to save current round in the session storage, because it can be switched to the
        // next round on the server side unexpectedly and we need to have a chance to show round result.
        sessionStorage.setItem(
          "currentRound",
          JSON.stringify(data.current_round)
        );
      })
      .catch(() => setError("Unknown server error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const makeAction = (action: string) => {
    api
      .action(gameId, nickname, action)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSelectedAction(action);
          setError("");
        }
      })
      .catch(() => setError("Unknown server error"));
  };

  // Handler to close a message of round result.
  const nextRound = () => {
    const currentRound = parseInt(
      sessionStorage.getItem("currentRound") || "0"
    );
    sessionStorage.setItem("currentRound", JSON.stringify(currentRound + 1));
    setShowRoundResults(false);
    setSelectedAction("");
    setError("");
  };

  const getActionClass = (action: string) => {
    if (!selectedAction) {
      return `game-action game-action-${action}`;
    } else {
      if (selectedAction === action) {
        return `game-action game-action-${action} game-action-selected`;
      } else {
        return `game-action game-action-${action} game-action-disabled`;
      }
    }
  };

  const getRoundWinnerLabel = (roundWinner: string) => {
    if (roundWinner === TIE) {
      return "It's a tie. ";
    }

    if (roundWinner === nickname) {
      return "You won the round. ";
    } else {
      return "You lost the round. ";
    }
  };

  // Getting previous round winner and opponent action in case of showing round result.
  let roundWinner = (game.rounds[game.current_round - 1] as RoundType)?.winner;
  let previousOpponentAction = (
    game.rounds[game.current_round - 1] as RoundType
  )?.actions.find((action) => action.nickname !== nickname)?.action;

  let gameRender;
  const currentRound = parseInt(sessionStorage.getItem("currentRound") || "0");

  if (game.players.length < 2) {
    gameRender = <WaitingForPlayer></WaitingForPlayer>;
  } else if (game.state === GAME_FINISHED) {
    gameRender = <GameResults game={game}></GameResults>;
  } else {
    gameRender = (
      <>
        <div className="game-flex-center">
          <div className="common-btn" onClick={() => navigate("/")}>
            Stop the game
          </div>
          <div className="game-exit-helper">
            You will be able to continue this game any time, just save this game
            id {gameId}
          </div>

          <div className="score-container">
            <GameScore game={game} nickname={nickname}></GameScore>
            <div data-testid="current_round" className="game-current-round">
              Current round: {currentRound + 1}
            </div>
          </div>
        </div>

        {/* Showing round result in the end of the round */}
        {showRoundResults && (
          <div className="round-results">
            <div data-testid="round_res_label">
              {getRoundWinnerLabel(roundWinner)}
              Your opponent has shown '{previousOpponentAction}'.
            </div>
            <div>Press "Next" to continue.</div>

            <div
              data-testid="next_btn"
              onClick={() => nextRound()}
              className="common-btn"
            >
              Next
            </div>
          </div>
        )}

        <div className="game-flex-center">
          <div
            data-testid="game_actions_helper"
            className={classNames({
              "game-actions-helper": !showRoundResults,
              "game-actions-helper-hide": showRoundResults,
            })}
          >
            {!selectedAction
              ? "Please choose the action"
              : "Waiting for the opponent turn..."}
          </div>

          <div
            className={classNames({
              "game-actions-container": true,
              "disabled-container": showRoundResults,
            })}
          >
            <div
              data-testid="rock_action"
              onClick={() => makeAction(ROCK)}
              className={getActionClass(ROCK)}
            ></div>
            <div
              data-testid="scissors_action"
              onClick={() => makeAction(SCISSORS)}
              className={getActionClass(SCISSORS)}
            ></div>
            <div
              data-testid="paper_action"
              onClick={() => makeAction(PAPER)}
              className={getActionClass(PAPER)}
            ></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="game-container">
      {gameRender}

      {error && <div className="error"> {error} </div>}
    </div>
  );
}
