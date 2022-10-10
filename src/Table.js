import React from "react";
import { useGlobalContext } from "./context";

function Table() {
  const { career } = useGlobalContext();
  return (
    <table>
      <thead>
        <tr>
          <th>Years</th>
          <th>Teams</th>
          <th>Apps</th>
          <th>Goals</th>
        </tr>
      </thead>
      <tbody>
        {career.map((year, index) => {
          const { games, goals, team, years } = year;
          return (
            <tr key={index}>
              <td>{years}</td>
              <td>{team}</td>
              <td>{games}</td>
              <td>{goals}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
