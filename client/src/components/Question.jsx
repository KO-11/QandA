import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'
import Answers from './Answers.jsx'

function Question(props) {
  return(
    <div>
      {props.data.map((quest) => {
        return(
          <div className="QuestionBlock">
            <div>
              <p className="User">{quest.user}</p> <p className="Date" >{props.computeDate(quest.date)}</p>
              <p className="NumAns">{quest.answers.length} </p>
            </div>
            <div>
              <p className="QuestionString" onClick={props.showModal} name={quest._id}>{quest.question}</p>
              <p className="AnsLength">answers</p>
            </div>
            <div>
              <button className="AnsButton" onClick={props.showModal} name={quest._id}>Answer the question</button>
            </div>
            <div>
              <Answers
              answers={quest.answers}
              questid={quest._id}
              show={props.show}
              showModal={props.showModal}
              computeDate={props.computeDate}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Question