import { render, screen } from "@testing-library/react";
import { App } from "./app";

test("Renders app elements", () => {
  render(<App />);
  const headerElement = screen.getByText(/Rock, Scissors, Paper/i);
  expect(headerElement).toBeInTheDocument();
});
