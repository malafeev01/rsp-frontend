import { render, screen } from "@testing-library/react";
import { Home } from "./home";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

test("Renders home elements", () => {
  render(<Home />);
  const startBtn = screen.getByText(/Start a new game/i);
  expect(startBtn).toBeInTheDocument();

  const joinBtn = screen.getByText(/Join a game/i);
  expect(joinBtn).toBeInTheDocument();

  const hallBtn = screen.getByText(/Hall of Fame/i);
  expect(hallBtn).toBeInTheDocument();
});
