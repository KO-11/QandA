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
    axios.post(`http://52.33.93.196:3002/api/qanda/quest`, {user: this.state.nameValue, date: Date(), question: this.state.questValue})
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
              <form name={this.props.questid} name={this.props.questid} style={{display: "flex", flexDirection: "column"}}>
                <div>
                <button className="CloseButton" name={undefined} onClick={this.props.showModal}>X</button>
                </div>
               <div>
                 <p style={{fontSize: "22px"}}>Ask a Question</p>
               </div>
               <div>
                 <p style={{fontSize: "12px"}}>Required fields are marked with *</p>
               </div>
               <div>
                <label>Question*  Maximum of 255 characters
                </label>
                </div>
                <div>
                  <input className="AnswerField" style={{margin: "10px"}}type="textarea" id="questValue" placeholder="Ask a question..." onClick={this.askQuest} onChange={this.typingQ}/>
               </div>
               <div>
                <label style={{margin: "10px 35px 10x 10px"}}>Nickname*
                </label>
                <label style={{margin: "10px 10px 10px 190px"}}>Location
                </label>
                </div>
                <div>
                  <input style={{width: "25%", margin: "10px"}} type="text" id="nameValue" placeholder="Example: jackie27" onChange={this.typingQ}/>
                  <input style={{width: "25%", margin: "10px"}} type="text" id="locValue" placeholder="Example: Seattle, WA" onChange={this.typingQ} />
               </div>
               <div>
                <label>Email
                </label>
                </div>
                <div>
                  <input style={{width: "25%", margin: "10px"}} type="text" id="mailValue" placeholder="Example: youremail@example.com" onChange={this.typingQ} />
               </div>
               <div>
                <input type="checkbox" checked={this.state.agrees} />
                <p>I agree to the terms &amp; conditions</p>
               </div>
               <div>
                <button className="PostAnswerButton" onClick={this.submitQuestion}>Post question</button>
               </div>
              </form>
            </div>
    )
  }
}