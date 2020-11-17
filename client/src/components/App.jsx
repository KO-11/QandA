import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from './Question.jsx';
import Header from './Header.jsx';
import Example from './Example.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    }

    this.getData = this.getData.bind(this);

  }

  componentDidMount() {
    this.getData();
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
      <Question data={this.state.questions}/>
      {/* <Example /> */}
      </div>
    )

  }

}
