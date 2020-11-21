import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Answers from './Answers.jsx';

export default class Helpful extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickHelped: false,
      reported: false
    }
    this.clickYes = this.clickYes.bind(this);
    this.clickNo = this.clickNo.bind(this);
    this.clickReport = this.clickReport.bind(this);
  }

  clickYes(e) {
    let newYes = parseInt(e.target.name) + 1;
    axios.put(`/api/qanda/ans/${e.target.id}`, {yes: newYes})
      .then((results) => {
        this.props.getAnswers();
        this.setState({
          clickHelped: !this.state.clickHelped
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  clickNo(e) {
    let newNo = parseInt(e.target.name) + 1;
    axios.put(`/api/qanda/ans/${e.target.id}`, {no: newNo})
      .then((results) => {
        this.props.getAnswers();
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
        this.props.getAnswers();
        this.setState({
          reported: !this.state.reported
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    if(!this.props.show) {
      return(
        <div>
          <div className="Helpful" >Helpful?</div>
          <button className="AnsButton" id={this.props.answer._id} name={this.props.answer.yes} disabled={this.state.clickHelped} onClick={this.clickYes}>Yes - {this.props.answer.yes}</button>
          <button className="AnsButton" id={this.props.answer._id} name={this.props.answer.no} disabled={this.state.clickHelped} onClick={this.clickNo}>No - {this.props.answer.no}</button>
          <button className="AnsButton" id={this.props.answer._id} disabled={this.state.reported} onClick={this.clickReport}>Report as inappropriate</button>
        </div>
      )
    } else {
      return(
        <div>
          <div className="Helpful" >Helpful?</div>
          <button className="AnsButton" id={this.props.answer._id} name={this.props.answer.yes} disabled={this.state.clickHelped} onClick={this.clickYes}>Yes - {this.props.answer.yes}</button>
          <button className="AnsButton" id={this.props.answer._id} name={this.props.answer.no} disabled={this.state.clickHelped} onClick={this.clickNo}>No - {this.props.answer.no}</button>
          <button className="AnsButton" id={this.props.answer._id} disabled={this.state.reported} onClick={this.clickReport}>Report as inappropriate</button>
        </div>
      )
    }

  }

}