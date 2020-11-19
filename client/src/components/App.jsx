import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from './Question.jsx';
import Header from './Header.jsx';
import Modal from './Modal.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      show: false,
      question: {}
    }

    this.getData = this.getData.bind(this);
    this.showModal = this.showModal.bind(this);

  }

  componentDidMount() {
    this.getData();
  }

  showModal(e) {
    axios.get(`/api/qanda/quest/${e.target.className}`)
      .then((results) => {
        this.setState({
          show: !this.state.show,
          question: results.data
        })
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

  render() {
    return(
      <div>
      <Header />
      <Question data={this.state.questions} show={this.state.show} showModal={this.showModal}/>
      <Modal show={this.state.show}
      showModal={this.showModal}
      data={this.state.questions}
      question={this.state.question}/>
      </div>
    )

  }

}
