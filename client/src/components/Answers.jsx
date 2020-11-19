import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from './Question.jsx';

export default class Answers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: [],
      topans: {},
      answer: {},
      clickHelped: false,
      reported: false,
      ansValue: 'Answer the question...',
      nameValue: 'Example: jackie27',
      locValue: 'Example: Seattle, WA',
      mailValue: 'Example: youremail@example.com',
      ansQ: false

    }
    this.getAnswers = this.getAnswers.bind(this);
    this.clickYes = this.clickYes.bind(this);
    this.clickNo = this.clickNo.bind(this);
    this.clickReport = this.clickReport.bind(this);
    this.answerQuest = this.answerQuest.bind(this);
    this.typing = this.typing.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidMount() {
    this.getAnswers();
  }

  getAnswers() {
    axios.get(`/api/qanda/quest/${this.props.questid}`)
      .then((results) => {
        for (let i = 0; i < results.data.answers.length; i++) {
          if(this.state.topans.yes === undefined) {
            this.setState({
              topans: results.data.answers[i]
            })
          }
          if(results.data.answers[i].yes > this.state.topans.yes) {
            this.setState({
              topans: results.data.answers[i]
            })
          }
        }
        this.setState({
          answers: results.data.answers
        })
      })
      .catch((err) => {
        console.error(err);
      })

  }

  clickYes(e) {
    let newYes = parseInt(e.target.name) + 1;
    axios.put(`/api/qanda/ans/${e.target.id}`, {yes: newYes})
      .then((results) => {
        this.getAnswers();
        this.setState({
          clickHelped: !this.state.clickHelped
        })
        console.log(this.state.clickHelped);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  clickNo(e) {
    let newNo = parseInt(e.target.name) + 1;
    axios.put(`/api/qanda/ans/${e.target.id}`, {no: newNo})
      .then((results) => {
        this.getAnswers();
        this.setState({
          clickHelped: !this.state.clickHelped
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  clickReport(e) {
    axios.put(`/api/qanda/ans/${e.target.id}`, {flag: true})
      .then((results) => {
        this.getAnswers();
        this.setState({
          reported: !this.state.reported
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  answerQuest() {
    this.setState({
      value: '',
      ansQ: !this.ansQ
    })
  }

  typing(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
    console.log(this.state);
  }

  submitAnswer() {
    let ans = {user: this.state.nameValue, answer: this.state.ansValue, date: Date(), yes: 0, no: 0, flag: false}

  }

  render() {
      if(!this.props.show) {
        return (
          <div>
            <div>{this.state.topans.user} - {this.state.topans.date}</div>
            <div>{this.state.topans.answer}</div>
            <div>Helpful?</div>
            <button id={this.state.topans._id} name={this.state.topans.yes} disabled={this.state.clickHelped} onClick={this.clickYes}>Yes - {this.state.topans.yes}</button>
            <button id={this.state.topans._id} name={this.state.topans.no} disabled={this.state.clickHelped} onClick={this.clickNo}>No - {this.state.topans.no}</button>
            <button id={this.state.topans._id} disabled={this.state.reported} onClick={this.clickReport}>Report as inappropriate</button>
          </div>
        )
      } else if (this.props.show && !this.state.ansQ) {
        console.log(this.state.answers);
        return (
          <div>
          {this.state.answers.map((answer) => {
            return (
              <div>
                <div>{answer.user} - {answer.date}</div>
                <div>{answer.answer}</div>
                <div>Helpful?</div>
                <button id={answer._id} name={answer.yes} disabled={this.state.clickHelped} onClick={this.clickYes}>Yes - {answer.yes}</button>
                <button id={answer._id} name={answer.no} disabled={this.state.clickHelped} onClick={this.clickNo}>No - {answer.no}</button>
                <button id={answer._id} disabled={this.state.reported} onClick={this.clickReport}>Report as inappropriate</button>
              </div>
            )
          })}
          <form>
            <label>Answer*
              <input type="textarea" id="ansValue" placeholder="Answer the question..." onClick={this.answerQuest} onChange={this.typing}/>
            </label>
          </form>
          </div>
        )
      } else {
        return (
          <div>
          {this.state.answers.map((answer) => {
            return (
              <div>
                <div>{answer.user} - {answer.date}</div>
                <div>{answer.answer}</div>
                <div>Helpful?</div>
                <button id={answer._id} name={answer.yes} disabled={this.clickHelped} onClick={this.clickYes}>Yes - {answer.yes}</button>
                <button id={answer._id} name={answer.no} disabled={this.clickHelped} onClick={this.clickNo}>No - {answer.no}</button>
                <button id={answer._id} disabled={this.reported} onClick={this.clickReport}>Report as inappropriate</button>
              </div>
            )
          })}
          <form>
            <label>Answer*
              <input type="textarea" id="ansValue" placeholder="Answer the question..." onClick={this.answerQuest} onChange={this.typing}/>
            </label>
            <label>Nickname*
              <input type="text" id="nameValue" placeholder="Example: jackie27" onChange={this.typing}/>
            </label>
            <label>Location
              <input type="text" id="locValue" placeholder="Example: Seattle, WA" onChange={this.typing} />
            </label>
            <label>
              <input type="text" id="mailValue" placeholder="Example: youremail@example.com" onChange={this.typing} />
            </label>
            <input type="checkbox" checked={this.state.agrees} />
            <span>Disclaimer fineprint...</span>
            <button onClick={this.submitAnswer}>Post Answer</button>
          </form>
          </div>
        )
      }
  }
}
