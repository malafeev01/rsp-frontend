import { render, screen } from "@testing-library/react";
import { CreateGame } from "./create-game";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

test("Renders create game page elements", () => {
  render(<CreateGame />);
  const nicknameInput = screen.getByTestId("nickname_input");
  expect(nicknameInput).toBeInTheDocument();

  const maxRoundsInput = screen.getByTestId("max_rounds_input");
  expect(maxRoundsInput).toBeInTheDocument();

  const createBtn = screen.getByText(/Create/i);
  expect(createBtn).toBeInTheDocument();

  const backBtn = screen.getByText(/Back/i);
  expect(backBtn).toBeInTheDocument();
});
