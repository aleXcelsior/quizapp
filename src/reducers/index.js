import { combineReducers } from "redux";

const fetchQuestionsReducer = (state = [] /* initialState */, action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS":
      //console.log(action.payload);
      return { ...state, questions: action.payload };
    case "EMPTY_QUESTIONS":
      //resets the question state after a user has completed the quiz. This prevents flickering if the user starts a new quiz.
      return (state = []);
    default:
      return state;
  }
};

const allAnswersReducer = (allAnswers = [], action) => {
  if (action.type === "ALL_ANSWERS") {
    return action.payload;
  }
  return allAnswers;
};

/* const selectedAnswerReducer = (selectedAnswer = null, action) => {
  if (action.type === "ANSWER_SELECTED") {
    return action.payload;
  }
  return selectedAnswer;
}; */

export default combineReducers({
  /* selectedAnswer: selectedAnswerReducer, */
  fetchQuestions: fetchQuestionsReducer,
  allAnswers: allAnswersReducer,
});
