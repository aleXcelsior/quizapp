import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  //const startQuizButton = useCallback(() => history.push("/quiz"), [history]);

  function startQuizBtn() {
    history.push("/quiz");
  }

  let getHighscore = localStorage.getItem("highscore");
  console.log(typeof getHighscore);
  if (getHighscore === null) {
    return (
      <div className="ui center aligned basic segment">
        <h1>Welcome to the quizgame!</h1>
        <button
          className="ui green button"
          type="button"
          onClick={startQuizBtn}
        >
          Start quiz!
        </button>
      </div>
    );
  } else {
    return (
      <div className="ui center aligned basic segment">
        <h1>Welcome back to the quizgame!</h1>
        <h2>Your previous highscore was: {getHighscore}</h2>
        <button
          className="ui green button"
          type="button"
          onClick={startQuizBtn}
        >
          Start quiz!
        </button>
      </div>
    );
  }
};

export default Login;
