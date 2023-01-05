import { render, screen } from "@testing-library/react";
import {
  GAME_FINISHED,
  PAPER,
  ROCK,
  SCISSORS,
} from "../../../constants/constants";
import { GameType } from "../game.type";
import { GameResults } from "./game-results";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

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
  render(<GameResults game={game} />);

  const gameResLabel = screen.getByTestId("game_result_label");
  expect(gameResLabel).toBeInTheDocument();
  expect(gameResLabel.textContent).toBe("The winner is user1");

  const gameResTable = screen.getByTestId("game_result_table");
  expect(gameResTable).toBeInTheDocument();

  expect(gameResTable.getElementsByTagName("tr").length).toBe(4);

  const backBtn = screen.getByText(/Go to Main Menu/i);
  expect(backBtn).toBeInTheDocument();
});

test("Renders game result elements", () => {
  const game: GameType = {
    max_rounds: 2,
    players: [{ nickname: "user1" }, { nickname: "user2" }],
    current_round: 2,
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
          { nickname: "user2", action: SCISSORS },
        ],
        winner: "user2",
      },
    ],
  };
  render(<GameResults game={game} />);

  const gameResLabel = screen.getByTestId("game_result_label");
  expect(gameResLabel).toBeInTheDocument();
  expect(gameResLabel.textContent).toBe("There is no winner in this game.");
});
