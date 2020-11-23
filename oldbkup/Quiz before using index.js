import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchQuestions } from "../actions";
import { selectAnswer } from "../actions";
import { combineAndShuffleAnswers } from "../actions";

const Quiz = (props) => {
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  useEffect(() => {
    dispatch(selectAnswer("Poop"));
    dispatch(combineAndShuffleAnswers(props.questions));
  }, [props.questions]);

  const onAnswerClick = (clickedAnswer) => {
    if (clickedAnswer === props.questions[0].correct_answer) {
      alert("GOOD JOB, DUDE");
    }

    console.log(clickedAnswer);
  };

  function renderAnswers() {
    return props.allAnswers.map((answer) => {
      return (
        <button
          key={answer}
          className="ui button"
          onClick={() => onAnswerClick(answer)}
        >
          {answer}
        </button>
      );
    });
  }

  function renderQuiz() {
    if (typeof props.questions !== "undefined") {
      return (
        <div>
          <h3>Category - {props.questions[0].category}</h3>
          <h2
            dangerouslySetInnerHTML={{ __html: props.questions[0].question }}
          ></h2>
          <div>{renderAnswers()}</div>
        </div>
      );
    }
  }

  return <div>{renderQuiz()}</div>;
};

//To make it easier just set whatever variable you're using to just be "state" first to see how the object looks EXAMPPLE:
//questions: state     instead of  questions: state.fetchQuestions.questions,
const mapStateToProps = (state) => ({
  questions: state.fetchQuestions.questions,
  selectedAnswer: state.selectedAnswer,
  allAnswers: state.allAnswers,
});

export default connect(mapStateToProps)(Quiz);
