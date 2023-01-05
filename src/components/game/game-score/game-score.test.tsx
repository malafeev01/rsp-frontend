import { render, screen } from "@testing-library/react";
import { GAME_FINISHED, PAPER, ROCK } from "../../../constants/constants";
import { GameType } from "../game.type";
import { GameScore } from "./game-score";

test("Renders game result elements", () => {
  const game: GameType = {
    max_rounds: 3,
    players: [{ nickname: "user1" }, { nickname: "user2" }],
    current_round: 3,
    state: GAME_FINISHED,
    rounds: [
      {
        actions: [
          { nickname: "user1", action: PAPER },
          { nickname: "user2", action: ROCK },
        ],
        winner: "user1",
      },
      {
        actions: [
          { nickname: "user1", action: PAPER },
          { nickname: "user2", action: ROCK },
        ],
        winner: "user1",
      },
      {
        actions: [
          { nickname: "user1", action: PAPER },
          { nickname: "user2", action: ROCK },
        ],
        winner: "user1",
      },
    ],
  };
  render(<GameScore nickname={"user1"} game={game} />);

  const gameScoreTable = screen.getByTestId("game_score_table");
  const rows = gameScoreTable.getElementsByTagName("tr");
  expect(rows.length).toBe(2);

  let columns = rows[0].getElementsByTagName("td");
  expect(columns.length).toBe(4);
  expect(columns[0].textContent).toBe("user1 (you)");
  expect(columns[1].className).toContain("win");
  expect(columns[2].className).toContain("win");
  expect(columns[3].className).toContain("win");

  columns = rows[1].getElementsByTagName("td");
  expect(columns.length).toBe(4);
  expect(columns[0].textContent).toBe("user2 ");
  expect(columns[1].className).toContain("lost");
  expect(columns[2].className).toContain("lost");
  expect(columns[3].className).toContain("lost");
});
