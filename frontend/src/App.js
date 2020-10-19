import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import socket from "./socketConfig";

import Categories from "./components/Categories";
import Covid from "./components/Covid";
import Header from "./components/Header";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Search from "./components/Search";


class App extends Component {

  componentDidMount() {
    socket.onopen = () => {
      console.log('Client connected')
    }
  }

  render() {
    return (
        <main className="App">
          <Header/>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/covid" component={Covid}/>
              <Route path="/categories" component={Categories}/>
              <Route path="/search" component={Search}/>
              <Route path="/profile" component={Profile}/>
          </Switch>
        </main>
    )
  }
}

export default App;
