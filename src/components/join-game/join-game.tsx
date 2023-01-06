import "../../styles/common.css";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Api from "../../api/api";

export function JoinGame() {
  const [nickname, setNickname] = useState(
    localStorage.getItem("cachedNickname") || ""
  );
  const [error, setError] = useState("");

  const urlGameId: string = useParams()["gameId"] as string;
  const [gameId, setGameId] = useState(urlGameId || "");
  const api = new Api();
  const navigate = useNavigate();

  const joinGame = () => {
    if (!gameId || !nickname) {
      return setError("Please enter valid Game ID and nickname");
    }
    api
      .joinGame(gameId, nickname)
      .then((res) => {
        if (!res.error) {
          sessionStorage.setItem("nickname", nickname);
          localStorage.setItem("cachedNickname", nickname);
          navigate("/game/" + gameId);
        } else {
          setError(res.error);
        }
      })
      .catch(() => setError("Unknown server error"));
  };
  return (
    <div className="common-container">
      <div className="common-header-2">Join a game</div>
      <div>
        <table>
          <tbody>
            <tr>
              <td>Game id:</td>
              <td>
                <input
                  data-testid="game_id_input"
                  className="common-input"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value.trim())}
                ></input>
              </td>
            </tr>
            <tr>
              <td>Nickname:</td>
              <td>
                <input
                  data-testid="nickname_input"
                  className="common-input"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value.trim())}
                  maxLength={16}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="common-btn" onClick={() => joinGame()}>
        Join game
      </div>

      <div className="common-btn" onClick={() => navigate("/")}>
        Back
      </div>

      {error && <div className="error"> {error} </div>}
    </div>
  );
}
