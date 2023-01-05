import { render, screen } from "@testing-library/react";
import { Hall } from "./hall";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

test("Renders Hall elements", () => {
  render(<Hall />);
  const hallTable = screen.getByTestId("hall_table");
  expect(hallTable).toBeInTheDocument();

  const backBtn = screen.getByText(/Back/i);
  expect(backBtn).toBeInTheDocument();
});
