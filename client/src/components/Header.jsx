import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

function Header(props) {
  return(
    <div style={{display: "flex", flexDirection: "column", padding: "5px 25px", margin: "5px 25px"}}>
      <div>
        <p className="Title">Questions &amp; Answers</p>
      </div>
      <div>
        <button className="QuestionButton" onClick={props.showQModal}>Ask a question</button>
      </div>
      <div>
        <p className="NumQuest">1-10 of 17 Questions</p>
        <p className="SortBy">Sort by: Most helpful Answers</p>
      </div>
    </div>
  )
}

export default Header