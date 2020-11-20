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
      questValue: '',
      nameValue: '',
      locValue: '',
      mailValue: ''
    }

    this.typingQ = this.typingQ.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }

  submitQuestion() {
    e.preventDefault();
    axios.post(`/api/qanda/quest`, {user: this.state.nameValue, date: Date(), question: this.state.questValue})
      .then((results) => {
        this.props.getData();
        this.props.showQModal();
      })
      .catch((err) => {
        console.error(err);
      })
  }

  typingQ(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
      if(!this.props.showQ){
          return null;
      }
    return (<div className="QModal">
              <form name={this.props.questid}>
                <label>Question*
                  <input type="textarea" id="questValue" placeholder="Ask a question..." onClick={this.askQuest} onChange={this.typingQ}/>
                </label>
                <label>Nickname*
                  <input type="text" id="nameValue" placeholder="Example: jackie27" onChange={this.typingQ}/>
                </label>
                <label>Location
                  <input type="text" id="locValue" placeholder="Example: Seattle, WA" onChange={this.typingQ} />
                </label>
                <label>
                  <input type="text" id="mailValue" placeholder="Example: youremail@example.com" onChange={this.typingQ} />
                </label>
                <input type="checkbox" checked={this.state.agrees} />
                <span>Disclaimer fineprint...</span>
                <button onClick={this.submitQuestion}>Post question</button>
              </form>
            </div>
    )
  }
}