import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const history = useHistory();
  const startQuizButton = useCallback(() => history.push("/quiz"), [history]);

  return (
    <div className="ui center aligned basic segment">
      <h1>Welcome to some kind of dashboard, this will be fixed later..</h1>
      <button
        className="ui green button"
        type="button"
        onClick={startQuizButton}
      >
        Start quiz!
      </button>
    </div>
  );
};

export default Login;
