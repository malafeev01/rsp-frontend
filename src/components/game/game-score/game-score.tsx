import "./game-score.css";
import { GameType } from "../game.type";

export function GameScore(props: { game: GameType; nickname: string }) {
  const game = props.game;
  const maxRounds = game.max_rounds;

  const p1Name = game.players[0].nickname;
  const p2Name = game.players[1].nickname;

  let p1Results = [];
  let p2Results = [];

  for (let i = 0; i <= maxRounds - 1; i++) {
    if (i < game.rounds.length) {
      const round = game.rounds[i];
      if (round.winner) {
        if (round.winner === p1Name) {
          p1Results.push(<td key={i} className="game-round-score win"></td>);
          p2Results.push(<td key={i} className="game-round-score lost"></td>);
        } else if (round.winner === p2Name) {
          p1Results.push(<td key={i} className="game-round-score lost"></td>);
          p2Results.push(<td key={i} className="game-round-score win"></td>);
        } else {
          p1Results.push(<td key={i} className="game-round-score tie"></td>);
          p2Results.push(<td key={i} className="game-round-score tie"></td>);
        }
      } else {
        p1Results.push(<td key={i} className="game-round-score no-res"></td>);
        p2Results.push(<td key={i} className="game-round-score no-res"></td>);
      }
    } else {
      p1Results.push(<td key={i} className="game-round-score no-res"></td>);
      p2Results.push(<td key={i} className="game-round-score no-res"></td>);
    }
  }

  return (
    <div>
      <table data-testid="game_score_table" className="game-score-table">
        <tbody>
          <tr>
            <td className="game-round-player">
              {p1Name} {p1Name === props.nickname ? "(you)" : ""}
            </td>
            {p1Results}
          </tr>
          <tr>
            <td className="game-round-player">
              {p2Name} {p2Name === props.nickname ? "(you)" : ""}
            </td>
            {p2Results}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
