import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import socket from '../socketConfig';

import "./Header.css";
import "../static/w3.css";

//TODO Put in actual logo, image file should be kept in public
import logo from "../static/placeholder.jpg";

//Header Component that is displayed on all pages
class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: {
                name: ''
            }
        }
    }

    componentDidMount() {
        console.log('Header Bar Loaded')
        socket.onmessage = evt => {
            console.log('Received a message in Header')
            const response = JSON.parse(evt.data);
            if (response.event === 'login' && response.success){
                console.log("Login event made")
                this.setState({loggedIn: true, user: response.user})
            }

        }
    }

    render() {
        return (
            //TODO Make this header look like Detailed design
            //TODO Figure out how this is going to change from login to welcome
            <div class="w3-container w3-white">
                <div  class="w3-bar">
                    <div class="w3-bar-item w3-button w3-mobile">
                        <NavLink exact to="/local-business-tracker">Home</NavLink>
                    </div>
                    <div className="w3-bar-item w3-button w3-mobile">
                        <NavLink to="/covid">COVID-19 Information</NavLink>
                    </div>
                    <div className="w3-bar-item w3-button w3-mobile">
                        <NavLink to="/search">Search</NavLink>
                    </div>
                    <div className="w3-bar-item w3-button w3-mobile">
                        <NavLink to="/categories">Categories</NavLink>
                    </div>
                    <div className="w3-bar-item w3-button w3-mobile">
                        <Welcome login={this.state.loggedIn} name={this.state.user.name}/>
                    </div>
                </div>
            </div>
        )
    }
}
function Welcome(props) {
    if (props.loggedIn)
        return (<NavLink to="/profile">Welcome, {props.name}</NavLink>)
    else
        return (<NavLink to="/login">Login/Sign Up</NavLink>)
}
export default Header;