import "../../styles/common.css";
import "./hall.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../../api/api";

type Stat = {
  nickname: string;
  win_rounds: number;
  win_games: number;
};

export function Hall() {
  const navigate = useNavigate();
  const api = new Api();

  let [stat, setStat] = useState<Array<Stat>>([]);

  useEffect(() => {
    api.stat().then((data) => {
      setStat(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableRows = [];

  for (let i = 0; i < stat.length; i++) {
    tableRows.push(
      <tr key={i}>
        <td> {i + 1} </td>
        <td> {stat[i].nickname} </td>
        <td> {stat[i].win_rounds}</td>
        <td> {stat[i].win_games}</td>
      </tr>
    );
  }

  return (
    <div className="common-container">
      <table data-testid="hall_table" className="hall-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Nickname</th>
            <th>Win rounds</th>
            <th>Win games</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>

      <div className="common-btn" onClick={() => navigate("/")}>
        Back
      </div>
    </div>
  );
}
