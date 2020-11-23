/* export const selectAnswer = (answer) => {
  return {
    type: "ANSWER_SELECTED",
    payload: answer,
  };
}; */

export const fetchQuestions = () => {
  return async function (dispatch) {
    var requestOptions = {
      method: "GET",
    };
    //Add the token to the request to make sure you don't get the same questions
    fetch("https://opentdb.com/api.php?amount=10", requestOptions)
      .then((response) => response.json())
      .then((result) =>
        dispatch({ type: "FETCH_QUESTIONS", payload: result.results })
      )
      .catch((error) => console.log("error", error));
  };
};

export const combineAndShuffleAnswers = (answers, index) => {
  let allAnswers = [];

  if (
    typeof answers !== "undefined" &&
    typeof index !== "undefined" &&
    index < answers.length //This action get's called every time index gets updated. Index will at some point be over 10 which causes this function to try to find answers outside the scope of the array.
  ) {
    allAnswers = answers[index].incorrect_answers;
    allAnswers.push(answers[index].correct_answer);
    //randomizes the answers
    allAnswers.sort(() => 0.5 - Math.random());
  }

  return {
    type: "ALL_ANSWERS",
    payload: allAnswers,
  };
};

export const emptyQuestions = () => {
  return {
    type: "EMPTY_QUESTIONS",
  };
};
