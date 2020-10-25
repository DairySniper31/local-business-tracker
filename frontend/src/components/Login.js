import React, {Component} from "react";
import "./Login.css";

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
                    this.setState({loggedIn: true});
                } else {
                    console.log('Error occurred');
                    this.setState({error: response.error})
                }
            }
        }
    }

    loginUser = () => {
        console.log('Login was requested');
        //TODO Check if email and password are alphanumeric and fulfill our email/password guidelines
        const message = {
            event: 'login',
            email: this.state.email,
            password: this.state.password
        }
        socket.send(JSON.stringify(message));

    }

    render() {
        return (
            //TODO Create Login Page
            <div>
                <h1>Hello Login</h1>
                <div>
                    <button id="googleLogin">Sign in with Google</button>
                </div>
                <div>
                    <form action="."
                          onSubmit={event => {
                              event.preventDefault()
                              this.loginUser()
                              this.setState({
                                  email: '',
                                  password: ''
                              })
                          }}>
                        <input
                            type={'email'}
                            id={'email'}
                            placeholder={'Email'}
                            value={this.state.email}
                            onChange={event => this.setState({email: event.target.value})}
                        /><br/>
                        <input
                            type={'password'}
                            id={'password'}
                            placeholder={'Password'}
                            value={this.state.password}
                            onChange={event => this.setState({password: event.target.value})}
                        /><br/>
                        <input
                            type={'submit'}
                            value={'Login'}
                        />
                    </form><br/>
                    <label>
                        {this.state.error}
                    </label><br/>
                    <NavLink to ="/register">
                        New User? Sign up here!
                    </NavLink>
                </div>
                {/*Google Login stuff, stubbed it out until I can get it working-->
                <!--<GoogleLogin
                    clientId="799457781790-kh1al9dbalr3s5i7hcusqgl80eat5g41.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseFailure}
                    isSignedIn={true}
                />-->*/}
            </div>
        )
    }
}
const responseGoogle = (response) => {
    console.log("Success")
    console.log(response)
}
const responseFailure = (response) => {
    console.log('Failure')
    console.log(response)
}
export default Login;