import React, {Component} from "react";

import "./Register.css";
import "../static/w3.css"

import socket from "../socketConfig";
import {NavLink} from "react-router-dom";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: {
                first: '',
                last: ''
            },
            email: '',
            password: '',
            confPassword: '',
            registered: false,
            error: ''
        }
    }

    componentDidMount() {
        console.log("Register Page Loaded")

        socket.onmessage = event => {
            console.log("message received back")
            const response = JSON.parse(event.data);
            if (response.event === 'register') {
                if (response.success) {
                    console.log('Register was a success');
                    this.setState({registered: true})
                }
            }
        }
    }

    registerUser = () => {
        console.log('Registration was requested');
        //TODO Check if email and password are alphanumeric and fulfill our email/password guidelines
        if (this.state.name.first !== '' &&
            this.state.name.last !== '' &&
            this.state.email !== '' &&
            this.state.password !== '' &&
            this.state.confPassword !== '' &&
            this.state.password === this.state.confPassword ) {
            const message = {
                event: 'register',
            }
            // socket.send(JSON.stringify(message));
            // console.log("Sending Registration to server")
            console.log('Register was a success');
            this.setState({registered: true})
        } else {
            this.setState({
                password: '',
                confPassword: '',
                error: 'You must fill out all fields and password and confirmation password must be the same'
            })
            console.log("Register Error Occurred")
        }
        // This is to send to the server, not used to beta
        // const message = {
        //     event: 'login',
        //     email: this.state.email,
        //     password: this.state.password
        // }
        // socket.send(JSON.stringify(message));

    }

    render() {
        if (this.state.registered) {
            return (<Confirmation/>)
        }
        return (
            <div className="w3-container">
                <div className="w3-container">
                    <h1 className="w3-container w3-text ">Sign Up</h1>
                </div>
                <div className="w3-display-middle">
                    <form className="w3-panel"
                          action={"."}
                          onSubmit={event => {
                              event.preventDefault();
                              this.registerUser()
                          }}>
                        <div className="w3-bar w3-padding-16">
                            <input className="w3-bar-item w3-input w3-border"
                                   type={"text"}
                                   id={"first"}
                                   placeholder={"First Name"}
                                   value={this.state.name.first}
                                   onChange={event => this.setState({name: {first: event.target.value}})}
                            />
                            <input className="w3-bar-item w3-input w3-border"
                                   type={"text"}
                                   id={"last"}
                                   placeholder={"Last Name"}
                                   value={this.state.name.last}
                                   onChange={event => this.setState({name: {last: event.target.value}})}
                            />
                        </div>
                        <input className="w3-input w3-border"
                               type={"email"}
                               id={"email"}
                               placeholder={"Email"}
                               value={this.state.email}
                               onChange={event => this.setState({email: event.target.value})}
                        />
                        <div className="w3-bar w3-padding-16">
                            <input className="w3-bar-item w3-input w3-border"
                                   type={"password"}
                                   id={"password"}
                                   placeholder={"Password"}
                                   value={this.state.password}
                                   onChange={event => this.setState({password: event.target.value})}
                            />
                            <input className="w3-bar-item w3-input w3-border"
                                   type={"password"}
                                   id={"confPassword"}
                                   placeholder={"Confirm Password"}
                                   value={this.state.confPassword}
                                   onChange={event => this.setState({confPassword: event.target.value})}
                            />
                        </div>
                        <input className="w3-button w3-border w3-blue"
                               type={"submit"}
                               value={"Register"}
                        />
                    </form>
                    <label className="w3-text-red">{this.state.error}</label>
                    <div className="w3-text-light-blue">
                        <NavLink to="/login">
                            Already have an account? Sign in here!
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

function Confirmation() {
    return(
        <div className="w3-container">
            <h1 className="w3-container w3-text">Thank You!</h1>
            <h2 className="w3-container w3-text">An email confirmation has been sent!</h2>
            <div className="w3-button w3-border w3-light-blue">
                <NavLink to="/login">
                    <label>Back to Login</label>
                </NavLink>
            </div>
        </div>
    )
}

export default Register;