import React from "react";
import Button from "./Button";
import Table from "./Table";
import { useGlobalContext } from "./context";

function App() {
  const {
    alert,
    alertMessage,
    score,
    multipleAnswers,
    gameOver,
    replay,
    numberOfQuestions,
    next,
  } = useGlobalContext();
  return (
    <div className="container">
      {!gameOver ? (
        <>
          <div className="scoreboard">
            <span className="score">
              Question {next} of {numberOfQuestions}
            </span>
          </div>
          <Table />
          <div className="choice-container">
            {multipleAnswers.map((choice, index) => {
              return <Button key={index} choice={choice} />;
            })}
          </div>
          <div className="result">
            {alert && <p className={`alert alert-${alert}`}>{alertMessage}</p>}
          </div>
        </>
      ) : (
        <div className="scoreboard">
          <span className="score">
            Score: {score}/{numberOfQuestions} (
            {Math.floor((score / numberOfQuestions) * 100)}%)
          </span>
          <button className="replay" onClick={replay}>
            Replay
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
