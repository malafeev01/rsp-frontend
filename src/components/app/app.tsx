import "./app.css";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="app-container">
      <div className="home-container">
        <div className="home-header">Rock, Scissors, Paper</div>
        <Outlet />
      </div>
      <div className="home-footer">
        Created by{" "}
        <a href="mailto:malafeev.alexey@gmail.com">Alexey Malafeev</a>
      </div>
    </div>
  );
}
