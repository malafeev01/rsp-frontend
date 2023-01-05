import "./app.css";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div>
      <div className="home-container">
        <div className="home-header">Rock, Scissors, Paper</div>
        <Outlet />
        <div className="home-footer">Created by Alexey Malafeev</div>
      </div>
    </div>
  );
}
