import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from "react-router-dom";
import socket from "./socketConfig";

import Categories from "./components/Categories";
import Covid from "./components/Covid";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Business from "./components/Business";
import Register from "./components/Register";


class App extends Component {

  componentDidMount() {
      console.log('Application Created')
      socket.onopen = () => {
          console.log('Client connected')
      }
      socket.onmessage = event => {
          console.log('App got a message')
          const response = JSON.parse(event.data);
          if (response.event === 'login'){
              if (response.success){
                  console.log('App Got Login was a success');
              }
          }
      }
  }

  render() {
    return (
        <main className="App">
          <Header/>
          <Switch>
              <Route exact path="/local-business-tracker" component={Home}/>
              <Route path="/covid" component={Covid}/>
              <Route path="/categories" component={Categories}/>
              <Route path="/search" component={Search}/>
              <Route path="/profile" component={Profile}/>
              <Route path="/login" component={Login}/>
              <Route path="/business" component={Business}/>
              <Route path="/register" component={Register}/>
          </Switch>
        </main>
    )
  }
}

export default App;
