import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

function Header(props) {
  return(
    <div>
      <h1>Questions &amp; Answers</h1>
      <button>Ask a question</button>
      <div>1-10 of 17 Questions</div>
      <div>Sort by: Most helpful Answers</div>
    </div>
  )
}

export default Header