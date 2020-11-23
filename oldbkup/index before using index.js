export const selectAnswer = (answer) => {
  return {
    type: "ANSWER_SELECTED",
    payload: answer,
  };
};

export const fetchQuestions = () => {
  return async function (dispatch) {
    var requestOptions = {
      method: "GET",
    };

    fetch("https://opentdb.com/api.php?amount=10", requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: "FETCH_QUESTIONS", payload: result.results })
      )
      .catch((error) => console.log("error", error));
  };
};

export const combineAndShuffleAnswers = (answers) => {
  //this action should also take in a index - do this later
  let allAnswers = [];

  if (typeof answers !== "undefined") {
    allAnswers = answers[0].incorrect_answers;
    allAnswers.push(answers[0].correct_answer);
    console.log(allAnswers, "Before shuffle");

    allAnswers.sort(() => 0.5 - Math.random());

    console.log(allAnswers, "After shuffle");
  }

  return {
    type: "ALL_ANSWERS",
    payload: allAnswers,
  };
};
