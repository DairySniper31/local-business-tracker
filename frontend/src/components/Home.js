import React, {Component} from "react";
import socket from "../socketConfig";
import "./Home.css";

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

        //This should only be sent if the string is non mpty and alphanumeric
        const message = {
            event: 'search',
            query: this.state.query
        };
        //Sends the JSON to server
        socket.send(JSON.stringify(message));
    }

    render() {
        //TODO Create Home Page
        return (
            <div>
                <form action="."
                      onSubmit={event => {
                          event.preventDefault();
                          this.searchTracker();
                      }}>
                    <input
                        type={"text"}
                        id={"search"}
                        placeholder={"Search your favorite business..."}
                        value={this.state.query}
                        onChange={evt => this.setState({query: evt.target.value})}
                    />
                    <input type={"submit"}/>
                </form><br/>
                <label>
                    {this.state.error}
                </label>
            </div>
        )
    }
}

export default Home;