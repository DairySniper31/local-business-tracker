import React, {Component} from "react";
import {Redirect} from "react-router-dom"

import "./Login.css";
import "../static/w3.css"

import socket from "../socketConfig";
import {NavLink} from "react-router-dom";

// //Alphanumeric Letters
// const letters = /^[0-9a-zA-Z]+$/;

class Login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            error: '',
            user: {}
        }
    }

    componentDidMount() {
        console.log("Login Page Loaded")
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
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
            console.log('Login Page received a message')
            const response = JSON.parse(event.data);
            if (response.event === 'login'){
                if (response.success){
                    console.log('Login was a success');
                    this.setState({loggedIn: true, email: '', password: '', error: ''})
                }
                else{
                    console.log('Login was unsuccessful');
                    this.setState({email: '', password: '', error: response.error, user: response.user})
                }
            }
        }
    }

    loginUser = () => {
        console.log('Login was requested');
        //TODO Check if email and password are alphanumeric and fulfill our email/password guidelines
        if (this.state.email === '' || this.state.password === ''){
            const error = 'Error occurred: Username and/or password was not given';
            console.log(error);
            this.setState({
                password: '',
                error: error
            })
        }
        else{
            console.log('Login was requested');
            const message = {
                event: 'login',
                email: this.state.email,
                password: this.state.password
            }
            socket.send(JSON.stringify(message));
        }
    }

    render() {
        if (this.state.loggedIn){
            return (<Redirect to={"/profile"}/>)
        }
        return (
            <div className="w3-container">
                <div className="w3-container">
                    <h1 className="w3-container w3-text">Sign In</h1>
                </div>
                <div className="w3-display-middle">
                    <div className="w3-container">
                        <label id="googleLogin"
                               className="w3-button"
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