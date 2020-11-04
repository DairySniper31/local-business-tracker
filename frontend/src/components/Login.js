import React, {Component} from "react";
import {Redirect} from "react-router-dom"

import "./Login.css";
import "../static/w3.css"

import socket from "../socketConfig";
import {NavLink} from "react-router-dom";

class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            error: ''
        }
    }

    componentDidMount() {
        console.log("Login Page Loaded")
        window.gapi.load('auth2', () => {
            window.gapi.auth2. init({
                client_id: '799457781790-oduvl11ka4fgmghs87kse74kq64qh3u1.apps.googleusercontent.com'
            })
            console.log('API inited')

            window.gapi.load('signin2', () => {
                const params = {
                    onSuccess: () => {
                        console.log('User has finished signing in!')
                    }
                }
                window.gapi.signin2.render('googleLogin', params)
            })
        })
        socket.onmessage = event => {
            const response = JSON.parse(event.data);
            if (response.event === 'login'){
                if (response.success){
                    console.log('Login was a success');
                    this.setState({loggedIn: true, email: '', password: '', error: ''})
                }
            }
        }
    }

    loginUser = () => {
        console.log('Login was requested');
        //TODO Check if email and password are alphanumeric and fulfill our email/password guidelines
        if (this.state.email === 'User123@rit.edu' && this.state.password === 'admin'){
            // const message = {
            //     event: 'login',
            // }
            // socket.send(JSON.stringify(message));
            // console.log("Sending Login to server")
            console.log('Login was a success');
            this.setState({loggedIn: true, email: '', password: '', error: ''})
        }
        else{
            this.setState({password: '', error: 'Email must be User123@rit.edu and password must be admin'})
            console.log("Login Error Occurred")
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
        if (this.state.loggedIn){
            return (<Redirect to={"/profile"}/>)
        }
        return (
            <div className="w3-container">
                <div className="w3-container">
                    <h1 className="w3-container w3-text ">Sign In</h1>
                </div>
                <div className="w3-display-middle">
                    <div className="w3-container">
                        <label id="googleLogin"
                               class="w3-button"
                        >
                            Sign in with Google
                        </label>
                    </div>
                    <form className="w3-panel"
                          action={"."}
                          onSubmit={event => {
                              event.preventDefault();
                              this.loginUser()
                          }}>
                        <input className="w3-input w3-border"
                               type={"email"}
                               id={"email"}
                               placeholder={"Email"}
                               value={this.state.email}
                               onChange={event => this.setState({email: event.target.value})}
                        />
                        <input className="w3-input w3-border"
                               type={"password"}
                               id={"password"}
                               placeholder={"Password"}
                               value={this.state.password}
                               onChange={event => this.setState({password: event.target.value})}
                        /><br/>
                        <input className="w3-button w3-border w3-blue"
                               type={"submit"}
                               value={"Login"}
                        />
                    </form>
                    <label className="w3-text-red">{this.state.error}</label>
                    <div className="w3-text-light-blue">
                        <NavLink to ="/register">
                            New User? Sign up here!
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;