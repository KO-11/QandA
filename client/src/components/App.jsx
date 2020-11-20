import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from './Question.jsx';
import Header from './Header.jsx';
import Modal from './Modal.jsx';
import QModal from './QModal.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      show: false,
      question: {},
      showQ: false
    }

    this.getData = this.getData.bind(this);
    this.showModal = this.showModal.bind(this);
    this.computeDate = this.computeDate.bind(this);
    this.showQModal = this.showQModal.bind(this);

  }

  componentDidMount() {
    this.getData();
  }

  showModal(e) {
    let isQuest = false;
    for(let i = 0; i < this.state.questions.length; i++) {
      if(e.target.name === this.state.questions[i]._id) {
        isQuest = true;
      }
    }
    if(isQuest) {
      axios.get(`/api/qanda/quest/${e.target.name}`)
        .then((results) => {
          this.setState({
            show: !this.state.show,
            question: results.data
          })
        })
    } else {
      this.setState({
        show: !this.state.show
      })
    }
  }

  showQModal(e) {
    this.setState({
      showQ: !this.state.showQ
    })
  }

  getData() {
    axios.get('/api/qanda')
      .then((results) => {
        this.setState({
          questions: results.data
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  computeDate(date) {

    var seconds = Math.floor((new Date() - new Date(date)) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  render() {
    if(this.state.show || this.state.showQ) {
      return(
        <div>

        <div className="ModalBackground"></div>
        <Header showQModal={this.showQModal}/>

        <QModal showQ={this.state.showQ}
        showQModal={this.showQModal}/>

        <Question data={this.state.questions}
        show={this.state.show}
        showModal={this.showModal}
        computeDate={this.computeDate}/>

        <Modal show={this.state.show}
        showModal={this.showModal}
        data={this.state.questions}
        question={this.state.question}
        computeDate={this.computeDate}/>
        </div>
      )
    }
    return(
      <div>

      <Header showQModal={this.showQModal}/>

      <QModal showQ={this.state.showQ}
      showQModal={this.showQModal}/>

      <Question data={this.state.questions}
      show={this.state.show}
      showModal={this.showModal}
      computeDate={this.computeDate}/>

      <Modal show={this.state.show}
      showModal={this.showModal}
      data={this.state.questions}
      question={this.state.question}
      computeDate={this.computeDate}/>
      </div>
    )

  }

}
