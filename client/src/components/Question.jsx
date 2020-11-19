import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import Answers from './Answers.jsx'

function Question(props) {
  return(
    <div>
      {props.data.map((quest) => {
        return(
          <div>
          <p>{quest.user} - {quest.date}</p>
          <span>{quest.answers.length} answers</span>
          <p onClick={props.showModal} className={quest._id}>{quest.question}</p>
          <button onClick={props.showModal} className={quest._id}>Answer the question</button>
          <Answers answers={quest.answers} questid={quest._id}/>
          </div>
        )
      })}
    </div>
  )
}

export default Question