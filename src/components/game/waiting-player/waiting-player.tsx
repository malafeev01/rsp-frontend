import "./waiting-player.css";
import "../../../styles/common.css";
import copyIcon from "../../../assets/copy-icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";

export function WaitingForPlayer() {
  const gameId: string = useParams()["gameId"] as string;
  const joinUrl = window.location.origin + "/join/" + gameId;
  const navigate = useNavigate();

  function unsecuredCopyToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  }

  return (
    <div className="common-container">
      <div className="waiting-for-player-label">
        <div>Waiting for another player to join.</div>
        <div>
          Please sent link for connection or QR code to another player. The game
          will start automatically when your opponent connects.
        </div>
      </div>
      <div className="waiting-for-player-url">
        <input
          data-testid="join_url"
          style={{ width: "100%" }}
          className="common-input"
          value={joinUrl}
          readOnly
        ></input>

        <div
          onClick={() => {
            unsecuredCopyToClipboard(joinUrl);
          }}
          data-testid="copy_btn"
          className="copy-btn"
        >
          <img alt="copy join url button" src={copyIcon}></img>
        </div>
      </div>
      <div>
        <QRCode size={180} value={joinUrl} />
      </div>
      <div className="common-btn" onClick={() => navigate("/")}>
        Back to Main
      </div>
    </div>
  );
}
