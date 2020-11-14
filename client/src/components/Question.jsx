import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import Answers from './Answers.jsx'

function Question(props) {
  console.log(props);
  return(
    <div>
      {props.data.map((quest) => {
        return(
          <div>
          <h2>user.question - date posted</h2>
          <h1>{quest.question}</h1>
          <button>Answer the question</button>
          <Answers answer={quest.answer}/>
          <div>Helpuful?</div>
          <button>Yes - {quest.yes}</button>
          <button>No - {quest.no}</button>
          <button>Report as inappropriate</button>
          </div>
        )
      })}
    </div>
  )
}

export default Question