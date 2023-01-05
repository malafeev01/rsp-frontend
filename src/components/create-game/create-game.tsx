import "./create-game.css";
import "../../styles/common.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Api from "../../api/api";

export function CreateGame() {
  const [nickname, setNickname] = useState(
    localStorage.getItem("cachedNickname") || ""
  );
  const [maxRounds, setMaxRounds] = useState(1);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const api = new Api();

  const createGame = () => {
    api
      .createGame(nickname, maxRounds)
      .then((data) => {
        if (!data.error) {
          sessionStorage.setItem("nickname", nickname);
          localStorage.setItem("cachedNickname", nickname);
          navigate("/game/" + data.game_id);
        } else {
          setError(data.error);
        }
      })
      .catch(() => setError("Unknown server error"));
  };

  return (
    <div className="common-container">
      <div className="common-header-2">New game</div>
      <div>
        <table className="create-game-table">
          <tbody>
            <tr>
              <td>Nickname:</td>
              <td>
                <input
                  data-testid="nickname_input"
                  className="common-input"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value.trim())}
                ></input>
              </td>
            </tr>
            <tr>
              <td>Max rounds:</td>
              <td>
                <input
                  data-testid="max_rounds_input"
                  className="common-input"
                  value={maxRounds}
                  type="number"
                  max="10"
                  onChange={(e) => {
                    let value = parseInt(e.target.value);
                    if (value > 10) {
                      value = 10;
                    }
                    setMaxRounds(value);
                  }}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="common-btn" onClick={() => createGame()}>
        Create
      </div>
      <div className="common-btn" onClick={() => navigate("/")}>
        Back
      </div>
      {error && <div className="error"> {error} </div>}
    </div>
  );
}
