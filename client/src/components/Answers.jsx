import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from './Question.jsx';

export default class Answers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: this.props.answers,
      topans: {},
      clickHelped: false,
      reported: false,

    }
    this.getAnswers = this.getAnswers.bind(this);
    this.topRated = this.topRated.bind(this);
    this.clickYes = this.clickYes.bind(this);
    this.clickNo = this.clickNo.bind(this);
    this.clickReport = this.clickReport.bind(this);
  }

  componentDidMount() {
    this.topRated();
  }

  getAnswers() {
    axios.get(`/api/qanda/quest/${this.props.questid}`)
      .then((results) => {
        this.setState({
          answers: results.data.answers
        })
      })
  }

  topRated() {
    this.getAnswers()
    for (let i = 0; i < this.state.answers.length; i++) {
      if(this.state.topans.yes === undefined) {
        this.setState({
          topans: this.state.answers[i]
        })
      }
      if(this.state.answers[i].yes > this.state.topans.yes) {
        this.setState({
          topans: this.state.answers[i]
        })
      }
    }
  }

  clickYes(e) {
    let newYes = this.state.topans.yes + 1;
    axios.put(`/api/qanda/ans/${e.target.className}`, {yes: newYes})
      .then((results) => {
        this.topRated();
        this.setState({
          clickHelped: !this.state.clickHelped
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  clickNo(e) {
    let newNo = this.state.topans.no + 1;
    axios.put(`/api/qanda/ans/${e.target.className}`, {no: newNo})
      .then((results) => {
        this.topRated();
        this.setState({
          clickHelped: !this.state.clickHelped
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  clickReport(e) {
    axios.put(`/api/qanda/ans/${e.target.className}`, {flag: true})
      .then((results) => {
        this.topRated();
        this.setState({
          reported: !this.state.reported
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    if(!this.state.clickHelped && !this.state.reported) {
      return (
        <div>
          <div>{this.state.topans.user} - {this.state.topans.date}</div>
          <div>{this.state.topans.answer}</div>
          <div>Helpful?</div>
          <button className={this.state.topans._id} onClick={this.clickYes}>Yes - {this.state.topans.yes}</button>
          <button className={this.state.topans._id} onClick={this.clickNo}>No - {this.state.topans.no}</button>
          <button className={this.state.topans._id} onClick={this.clickReport}>Report as inappropriate</button>
        </div>
      )
    } else if(this.state.clickedHelped && !this.state.reported) {
      return (
        <div>
          <div>{this.state.topans.user} - {this.state.topans.date}</div>
          <div>{this.state.topans.answer}</div>
          <div>Helpful?</div>
          <span>Yes - {this.state.topans.yes}</span>
          <span>No - {this.state.topans.no}</span>
          <button className={this.state.topans._id} onClick={this.clickReport}>Report as inappropriate</button>
        </div>
      )
    } else if(!this.state.clickedHelped && this.state.reported) {
      return (
        <div>
          <div>{this.state.topans.user} - {this.state.topans.date}</div>
          <div>{this.state.topans.answer}</div>
          <div>Helpful?</div>
          <button className={this.state.topans._id} onClick={this.clickYes}>Yes - {this.state.topans.yes}</button>
          <button className={this.state.topans._id} onClick={this.clickNo}>No - {this.state.topans.no}</button>
          <span>Reported</span>
        </div>
      )
    } else {
      return (
        <div>
          <div>{this.state.topans.user} - {this.state.topans.date}</div>
          <div>{this.state.topans.answer}</div>
          <div>Helpful?</div>
          <span>Yes - {this.state.topans.yes}</span>
          <span>No - {this.state.topans.no}</span>
          <span>Reported</span>
        </div>
      )
    }
  }
}
