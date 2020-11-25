import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Dashboard from "./Dashboard";
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
                <div className="border-container">
                  <Quiz />
                </div>
              </Route>
              <Route path="/">
                <div className="border-container">
                  <Dashboard />
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
