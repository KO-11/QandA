import React from 'react';
import ReactDOM from 'react-dom';
import Question from './Question.jsx';

function Answers(props) {

  return(
    <div>
      <h3>user.answer - date posted</h3>
      <div>{props.answer}</div>
    </div>
  )
}

export default Answers