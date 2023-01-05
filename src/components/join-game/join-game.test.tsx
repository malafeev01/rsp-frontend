import { render, screen } from "@testing-library/react";
import { JoinGame } from "./join-game";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

test("Renders join game page elements", () => {
  render(<JoinGame />);
  const gameInput = screen.getByTestId("game_id_input");
  expect(gameInput).toBeInTheDocument();

  const nicknameInput = screen.getByTestId("nickname_input");
  expect(nicknameInput).toBeInTheDocument();

  const joinBtn = screen.getByText(/Join game/i);
  expect(joinBtn).toBeInTheDocument();

  const backBtn = screen.getByText(/Back/i);
  expect(backBtn).toBeInTheDocument();
});
