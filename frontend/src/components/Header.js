import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import "./Header.css";

class Header extends Component{
    render() {
        return (
            <header className="tracker-header">
                <nav>
                    <u1 className="NavClass">
                        <li>
                            <NavLink exact to="/">Local Business Tracker</NavLink>
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
                            <NavLink to="/profile">Welcome</NavLink>
                        </li>
                    </u1>
                </nav>
            </header>
        )
    }
}

export default Header;