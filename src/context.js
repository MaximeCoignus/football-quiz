import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import careers from "./careers2.json";
import players from "./players2.json";

const AppContext = React.createContext();

const QUESTIONS = 20;

const initialState = {
  score: 0,
  alert: "",
  alertMessage: "",
  players: players,
  list: careers,
  questions: careers
    .sort(() => Math.random() - 0.5)
    .splice(
      Math.floor(Math.random() * (careers.length - QUESTIONS)),
      QUESTIONS
    ),
  numberOfQuestions: QUESTIONS,
  next: 1,
  career: [],
  answer: "",
  multipleAnswers: [],
  gameOver: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClick = (choice, solution) => {
    dispatch({ type: "CLICK", payload: { choice, solution } });
    setTimeout(() => {
      dispatch({ type: "NEXT" });
    }, 3000);
  };

  const replay = () => {
    dispatch({ type: "REPLAY", payload: initialState });
  };

  useEffect(() => {
    const data = state.questions.splice(
      Math.floor(Math.random() * state.questions.length),
      1
    );
    dispatch({ type: "CAREERS", payload: data });
    // eslint-disable-next-line
  }, [state.next]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleClick,
        replay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
