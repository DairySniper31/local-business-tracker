import React, {Component} from "react";
import socket from "../socketConfig";
import {Redirect} from "react-router-dom";

import "./Home.css";
import "../static/w3.css";

class Home extends Component{

    constructor(props) {
        super(props);

        this.state={
            query: '',
            searched: false,
            error: ''
        };
    }

    componentDidMount() {
        console.log("Home page Loaded");
        //Reads messages from server
        socket.onmessage = evt => {
            //JSON Object of the server message
            const response = JSON.parse(evt.data);
            //TODO Receive Inputs from Server
        }
    }

    searchTracker = () => {
        console.log("Search was given")
        //TODO Implement Basic search criteria uch as nonempty string and alphanumeric

        if (this.state.query === 'Ice Cream') {
            this.setState({searched: true, query: '', error: ''})
        }
        else {
            this.setState({query: '', error: 'You must search Ice Cream'})
        }

        //This should only be sent if the string is non empty and alphanumeric
        //These should be added in th nxt prototype
        // const message = {
        //     event: 'search',
        //     query: this.state.query
        // };
        // //Sends the JSON to server
        // socket.send(JSON.stringify(message));
    }

    render() {
        //TODO Create Home Page
        if (this.state.searched) {
            this.setState({searched: false})
            return (<Redirect to={"/search"}/>);
        }
        return (
            <div class="w3-display-container">
                <div class="w3-display-topmiddle">
                    <form class="w3-container"
                          action={"."}
                          onSubmit={event => {
                              event.preventDefault();
                              this.searchTracker();
                          }}
                    >
                        <input class={"w3-input w3-border w3-animate-input"}
                               type={"text"}
                               id={"search"}
                               value={this.state.query}
                               placeholder={"Search for your favorite business"}
                               onChange={event => this.setState({query: event.target.value})}
                        />
                        <input class="w3-button w3-blue"
                               type={"submit"}
                               value={"Search"}
                        />
                    </form>
                    <label class="w3-text-red">
                        {this.state.error}
                    </label>
                </div>
            </div>
        )
    }
}

export default Home;