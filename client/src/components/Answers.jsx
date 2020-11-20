import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from './Question.jsx';
import Helpful from './Helpful.jsx'

export default class Answers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: [{user: 'user', answer: 'answer', date: Date(), yes: 0, no: 0, flag: false}],
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
        results.data.answers.sort((a,b) => {
          return b.yes - a.yes
        })
        if(results.data.answers.length > 0) {
          this.setState({
            answers: results.data.answers
          })
        }
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
  }

  submitAnswer(e) {
    e.preventDefault();
    let ans = {user: this.state.nameValue, answer: this.state.ansValue, date: Date(), yes: 0, no: 0, flag: false};
    let q = {_id: this.props.questid};
    let req = {a: ans, q: q}

    axios.post(`/api/qanda/ans`, req)
      .then((results) => {
        this.setState({
          user: '',
          answer: ''

        })
        this.props.showModal(e);
      })
      .catch((err) => {
        console.log(err)
      })

  }

  render() {
      if(!this.props.show) {
        return (
          <div style={{display: "flex", flexDirection: "column"}}>
            <div>
              <p className="AnsUser">{this.state.answers[0].user}</p>
              <p className="AnsDate">{this.props.computeDate(this.state.answers[0].date)}</p>
            </div>
            <div>
              <div className="AnswerString">{this.state.answers[0].answer}</div>
            </div>
            <Helpful answer={this.state.answers[0]}
            show={this.props.show}
            getAnswers={this.getAnswers}
            />
          </div>
        )
      } else if (this.props.show && !this.state.ansQ) {
        return (
          <div>
          {this.state.answers.map((answer, index) => {
            return (
              <div>
                <div>{answer.user} - {this.props.computeDate(answer.date)}</div>
                <div>{answer.answer}</div>
                <Helpful answer={answer}
                key={index}
                getAnswers={this.getAnswers}/>
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
          {this.state.answers.map((answer, index) => {
            return (
              <div>
                <div>{answer.user} - {this.props.computeDate(answer.date)}</div>
                <div>{answer.answer}</div>
                <Helpful answer={answer}
                key={index}
                getAnswers={this.getAnswers}/>
              </div>
            )
          })}
          <form name={this.props.questid}>
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
            <button className="PostAnswerButton" name={this.props.questid} onClick={this.submitAnswer}>Post Answer</button>
          </form>
          </div>
        )
      }
  }
}
