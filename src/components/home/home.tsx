import "../../styles/common.css";

import { useNavigate } from "react-router-dom";

import "./home.css";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="common-container">
      <div className="game-logo"></div>
      <div
        className="common-btn"
        onClick={() => {
          navigate("/create");
        }}
      >
        Start a new game
      </div>
      <div
        className="common-btn"
        onClick={() => {
          navigate("/join");
        }}
      >
        Join a game
      </div>

      <div
        className="common-btn"
        onClick={() => {
          navigate("/hall");
        }}
      >
        Hall of Fame
      </div>
    </div>
  );
}
