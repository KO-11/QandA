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
    console.log(this.props, 'props');
      if(!this.props.show){
          return null;
      }
    return <div className="Modal">
            <h1>Post answer</h1>
            <div>{this.props.question.user} - {this.props.question.date} {this.props.question.answers.length}</div>
            <div>{this.props.question.question}</div>
            <Answers answers={this.props.question.answers} questid={this.props.question._id} show={this.props.show}/>
           </div>;
  }
}