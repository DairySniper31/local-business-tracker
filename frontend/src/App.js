import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import socket from "./socketConfig";

class App extends Component {

  componentDidMount() {
    socket.onopen = () => {
      console.log('Client connected')
    }
  }

  render() {
    return (
        <main className="App">
          <h1>Hello World</h1>
        </main>
    )
  }
}

export default App;
