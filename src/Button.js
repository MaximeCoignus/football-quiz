import React from "react";
import { useGlobalContext } from "./context";

function Button({ choice }) {
  const { answer, handleClick } = useGlobalContext();
  return (
    <button
      className="btn"
      id={choice}
      onClick={() => handleClick(choice, answer)}
    >
      {choice}
    </button>
  );
}

export default Button;
