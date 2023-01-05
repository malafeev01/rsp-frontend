import "./game-results.css";

import { useNavigate } from "react-router-dom";

import { GameType, RoundType, ActionType } from "../game.type";
import { TIE } from "../../../constants/constants";

export function GameResults(props: { game: GameType }) {
  const navigate = useNavigate();

  const game = props.game;
  const p1Name = game.players[0].nickname;
  const p2Name = game.players[1].nickname;

  const getPlayerAction = (actions: Array<ActionType>, nickname: string) => {
    return actions.find((action: ActionType) => action.nickname === nickname)
      ?.action;
  };

  const getRoundClass = (round: RoundType, nickname: string) => {
    if (round.winner === TIE) {
      return "game-results-round-tie";
    }
    if (round.winner === nickname) {
      return "game-results-round-win";
    } else {
      return "game-results-round-lost";
    }
  };

  const goToMain = () => {
    navigate("/");
  };

  let tableRows = [];
  let gameWinner = "";
  let winCounts = { [p1Name]: 0, [p2Name]: 0 };

  for (let i = 0; i < game.rounds.length; i++) {
    let round = game.rounds[i];
    tableRows.push(
      <tr key={i}>
        <td>{i + 1}</td>
        <td className={getRoundClass(round, p1Name)}>
          {getPlayerAction(round.actions, p1Name)}
        </td>
        <td className={getRoundClass(round, p2Name)}>
          {getPlayerAction(round.actions, p2Name)}
        </td>
      </tr>
    );
    winCounts[round.winner] = winCounts[round.winner] + 1;
  }

  gameWinner = winCounts[p1Name] > winCounts[p2Name] ? p1Name : p2Name;
  if (winCounts[p1Name] === winCounts[p2Name]) {
    gameWinner = "";
  }

  return (
    <div className="common-container">
      <div>This game is finished.</div>
      <div data-testid="game_result_label" className="game-results-label">
        {gameWinner ? (
          <>
            The winner is <b>{gameWinner}</b>
          </>
        ) : (
          <>There is no winner in this game.</>
        )}
      </div>
      <table data-testid="game_result_table" className="results-table">
        <thead>
          <tr>
            <th>Round</th>
            <th>{p1Name} </th>
            <th>{p2Name} </th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>

      <div
        className="common-btn"
        onClick={() => {
          goToMain();
        }}
      >
        Go to Main Menu
      </div>
    </div>
  );
}
