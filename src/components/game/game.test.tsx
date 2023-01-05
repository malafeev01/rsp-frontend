import { render, screen, waitFor } from "@testing-library/react";
import { Game } from "./game";
import { Client, Server } from "mock-socket";
import Api from "../../api/api";

const websocketServer = new Server("ws://localhost:5000");
let connection: Client;

websocketServer.on("connection", (socket) => {
  socket.on("message", (message) => {});
  connection = socket;
  socket.send("Sending a message to the client");
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("../../constants/config.tsx", () => ({
  config: {
    WS_URL: "ws://localhost:5000",
  },
}));

jest.mock("../../api/api.tsx", () => {
  return function Api() {
    return {
      game: (gameId: string) => {
        return new Promise((resolve) => {
          resolve({
            _id: gameId,
            players: [{ nickname: "user1" }, { nickname: "user2" }],
            rounds: [],
            current_round: 0,
          });
        });
      },
      action: (gameId: string, nickname: string, action: string) => {
        return new Promise((resolve) => resolve({}));
      },
    };
  };
});

test("Renders game elements", async () => {
  render(<Game />);

  await waitFor(() => {
    const rockBtn = screen.getByTestId("rock_action");
    expect(rockBtn).toBeInTheDocument();

    const scissorsBtn = screen.getByTestId("scissors_action");
    expect(scissorsBtn).toBeInTheDocument();

    const paperBtn = screen.getByTestId("paper_action");
    expect(paperBtn).toBeInTheDocument();

    const backBtn = screen.getByText(/Stop the game/i);
    expect(backBtn).toBeInTheDocument();

    const actionsHelper = screen.getByTestId("game_actions_helper");
    expect(actionsHelper.textContent).toBe("Please choose the action");

    const currentRound = screen.getByTestId("current_round");
    expect(currentRound.textContent).toBe("Current round: 1");
  });
});

test("Make an action", async () => {
  render(<Game />);

  await waitFor(() => {
    const rockBtn = screen.getByTestId("rock_action");
    expect(rockBtn).toBeInTheDocument();
  });

  const rockBtn = screen.getByTestId("rock_action");
  rockBtn.click();

  await waitFor(() => {
    const actionsHelper = screen.getByTestId("game_actions_helper");
    expect(actionsHelper.textContent).toBe("Waiting for the opponent turn...");
  });
});
