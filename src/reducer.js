const reducer = (state, action) => {
  if (action.type === "NEXT") {
    // remove result, message and move on to the next question
    document
      .querySelectorAll(".btn")
      .forEach((button) =>
        button.classList.remove("btn-success", "btn-danger", "disabled")
      );
    return { ...state, alert: "", next: state.next + 1 };
  }

  if (action.type === "CLICK") {
    document
      .querySelectorAll(".btn")
      .forEach((button) => button.classList.add("disabled"));

    // bad answer
    if (action.payload.choice !== action.payload.solution) {
      document
        .getElementById(action.payload.solution)
        .classList.add("btn-success");
      document
        .getElementById(action.payload.choice)
        .classList.add("btn-danger");
      const alert = "danger";
      const message = "try again";
      return { ...state, alert: alert, alertMessage: message };
    }

    // good answer
    if (action.payload.choice === action.payload.solution) {
      document
        .getElementById(action.payload.choice)
        .classList.add("btn-success");
      const score = state.score + 1;
      const alert = "success";
      const message = "well done";
      return { ...state, alert: alert, alertMessage: message, score: score };
    }
  }

  if (action.type === "CAREERS") {
    if (action.payload.length > 0) {
      // prepare career data for random display
      const data = action.payload[0];
      const answer = data.name;
      const multipleChoiceAnswer = [answer];
      const copyOfPlayers = state.players;
      const indexOfRightAnswer = copyOfPlayers.indexOf(answer);

      copyOfPlayers.splice(indexOfRightAnswer, 1);

      // randomly generate a choice of answers
      const randomPlayers = Array.from({ length: 2 }, (_) => {
        const randomIndex = Math.floor(Math.random() * copyOfPlayers.length);
        const newRandomPlayer = copyOfPlayers[randomIndex];
        copyOfPlayers.splice(randomIndex, 1);
        return newRandomPlayer;
      });

      // append the random choice to the right answer and shuffle
      multipleChoiceAnswer.push(...randomPlayers);
      return {
        ...state,
        career: data.career,
        answer,
        multipleAnswers: multipleChoiceAnswer.sort(() => Math.random() - 0.5),
      };
    } else {
      return { ...state, gameOver: true };
    }
  }

  if (action.type === "REPLAY") {
    const newList = state.list
      .sort(() => Math.random() - 0.5)
      .splice(
        Math.floor(
          Math.random() * (state.list.length - state.numberOfQuestions)
        ),
        state.numberOfQuestions
      );
    return {
      ...action.payload,
      questions: newList,
    };
  }
  throw new Error("no matching action type");
};

export default reducer;
