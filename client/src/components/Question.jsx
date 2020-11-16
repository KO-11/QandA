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
          <h2>{quest.user} - {quest.date}</h2>
          <span>{quest.answers.length} answers</span>
          <h1>{quest.question}</h1>
          <button>Answer the question</button>
          <Answers answers={quest.answers} questid={quest._id}/>
          </div>
        )
      })}
    </div>
  )
}

export default Question