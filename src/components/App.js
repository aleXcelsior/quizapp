import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./Login";
import Quiz from "./Quiz";
import "./app.css";

const App = () => {
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    console.log("Something happened");
  });

  return (
    <div className="bg-cont">
      <div className="ui container fillpage">
        <Router>
          <div>
            <Switch>
              <Route path="/quiz">
                <div className="quiz-container">
                  <Quiz />
                </div>
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
