import { render, screen } from "@testing-library/react";
import { WaitingForPlayer } from "./waiting-player";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

test("Renders game result elements", () => {
  render(<WaitingForPlayer />);

  const joinUrl = screen.getByTestId("join_url");
  expect(joinUrl).toBeInTheDocument();

  const copyBtn = screen.getByTestId("copy_btn");
  expect(copyBtn).toBeInTheDocument();

  const backBtn = screen.getByText(/Back to Main/i);
  expect(backBtn).toBeInTheDocument();
});
