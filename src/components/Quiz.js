import React, { useEffect, useState, useCallback } from "react"; //useCallback is part of ghetto restart..
import { useHistory } from "react-router-dom"; //part of ghetto restart..
import { connect, useDispatch } from "react-redux";

import { fetchQuestions } from "../actions";
import { combineAndShuffleAnswers } from "../actions";
import { emptyQuestions } from "../actions";

const Quiz = (props) => {
  //component level state..
  const [index, setIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [points, setPoints] = useState(0); //Keeps track of the users current score
  const [startedPlaying, setStartedPlaying] = useState(false);

  const dispatch = useDispatch(); //Let's us dispatch actions

  //Ghetto restart - THIS REALLY NEEDS TO BE FIXED.....
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push("/login"), [history]);
  //Ghetto restart - THIS REALLY NEEDS TO BE FIXED.....

  //Fetches the questions at startup (componentDidMount)
  useEffect(() => {
    dispatch(fetchQuestions());

    //runs at unmount (componentDidUnmount)
    return () => {
      dispatch(emptyQuestions());
      setStartedPlaying(false);
    };
  }, []);

  //Updates only if index or the questions update.
  useEffect(() => {
    dispatch(combineAndShuffleAnswers(props.questions, index));
  }, [props.questions, index]);

  //This function gets called when the user presses on a answer
  const onAnswerClick = (clickedAnswer) => {
    setStartedPlaying(true);

    if (clickedAnswer === props.questions[index].correct_answer) {
      setCorrectAnswer(true);

      setPoints((points) => points + 1);

      //This timeout needs to be cleared at some point.
      setTimeout(() => {
        setCorrectAnswer(false);
        setIndex((index) => index + 1);
      }, 500);
    } else {
      setCorrectAnswer(true); // highlights the right question if the user pressed the wrong answer
      setWrongAnswer(true); // highlights the wrong question if the user pressed the wrong answer
      setTimeout(() => {
        setCorrectAnswer(false);
        setWrongAnswer(false);
        setIndex((index) => index + 1);
      }, 500);
    }
  };

  //render all the answers and attaches the 'onAnswerClick' function to them
  function renderAnswers() {
    return props.allAnswers.map((answer) => {
      return (
        <div>
          <button
            className={`fluid ui button huge blue  ${
              answer === props.questions[index].correct_answer && correctAnswer
                ? "positive"
                : ""
            } ${
              answer !== props.questions[index].correct_answer && wrongAnswer
                ? "negative"
                : ""
            } `}
            onClick={() => {
              onAnswerClick(answer);
            }}
            key={answer}
          >
            <p
              dangerouslySetInnerHTML={{
                __html: answer,
              }}
            ></p>
          </button>
          <div className="ui divider"></div>
        </div>
      );
    });
  }

  //render the quiz
  function renderQuiz() {
    if (typeof props.questions !== "undefined") {
      return (
        <div className="ui center aligned basic segment">
          <p>
            Question #{index + 1}/{props.questions.length}
          </p>
          <h4>Category - {props.questions[index].category}</h4>
          {/* Dangerously set HTML is used to format html. Not great in practice.. Install something like DOMPurify at some point*/}
          <h2
            dangerouslySetInnerHTML={{
              __html: props.questions[index].question,
            }}
          ></h2>
          <div className="ui divider" />

          <div>{renderAnswers()}</div>
        </div>
      );
    }
  }

  if (
    typeof props.questions !== "undefined" &&
    index + 1 <= props.questions.length
  ) {
    return <div>{renderQuiz()}</div>;
  } else if (startedPlaying) {
    return (
      <div className="ui center aligned basic segment">
        You got {points} points!
        <div>
          <button
            type="button"
            className="ui button blue "
            onClick={handleOnClick}
          >
            Go back!
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ui segment center aligned basic segment ">
        <div className="ui active inline loader"></div>
      </div>
    );
  }
};

//To make it easier just set whatever variable you're using to just be "state" first to see how the object looks EXAMPPLE:
//questions: state     instead of  questions: state.fetchQuestions.questions,
const mapStateToProps = (state) => ({
  questions: state.fetchQuestions.questions,
  selectedAnswer: state.selectedAnswer, //not used atm
  allAnswers: state.allAnswers,
});

export default connect(mapStateToProps)(Quiz);
