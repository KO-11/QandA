import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Answers from './Answers.jsx';
import Question from './Question.jsx';
import '../../../public/style.css';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
      if(!this.props.show){
          return null;
      }
    return <div className="Modal" style={{display: "flex", flexDirection: "column"}}>
            <div>
              <p className="PostAnswer">Post Answer</p>
              <button className="CloseButton" name={undefined} onClick={this.props.showModal}>X</button>
            </div>
            <div>
              <p className="User">{this.props.question.user}</p>
              <p className="Date">{this.props.computeDate(this.props.question.date)} </p>
              <p className="NumAns">{this.props.question.answers.length}</p>
            </div>
            <div>
              <p className="QuestionString">{this.props.question.question}</p>
              <p className="AnsLength">Answers</p>
            </div>
            <Answers answers={this.props.question.answers}
            questid={this.props.question._id}
            show={this.props.show}
            showModal={this.props.showModal}
            computeDate={this.props.computeDate}/>
           </div>;
  }
}