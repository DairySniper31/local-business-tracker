import React, {Component} from "react";
import {NavLink} from "react-router-dom";

import socket from '../socketConfig';

import "./Header.css";
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
            //Links to all major pages in detailed description
            <header>
                <nav>
                    <u1>
                        <li>
                            <NavLink exact to="/">
                                <img src={logo} alt="Placeholder image for Local Business Tracker Logo"/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/covid">COVID-19 Information</NavLink>
                        </li>
                        <li>
                            <NavLink to="/search">Search</NavLink>
                        </li>
                        <li>
                            <NavLink to="/categories">Categories</NavLink>
                        </li>
                        <li>
                            <Welcome login={this.state.loggedIn} name={this.state.user.name}/>
                        </li>
                    </u1>
                </nav>
            </header>
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