import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { App } from "./components/app/app";
import { Game } from "./components/game/game";
import { Home } from "./components/home/home";
import { JoinGame } from "./components/join-game/join-game";
import { CreateGame } from "./components/create-game/create-game";
import { Hall } from "./components/hall/hall";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "create",
        element: <CreateGame />,
      },
      {
        path: "join/:gameId?",
        element: <JoinGame />,
      },
      {
        path: "game/:gameId",
        element: <Game />,
      },
      {
        path: "hall",
        element: <Hall />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
