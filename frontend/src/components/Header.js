import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import "./Header.css";
//TODO Put in actual logo, image file should be kept in public
import logo from "../static/placeholder.jpg";

//Header Component that is displayed on all pages
class Header extends Component{
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
                            <NavLink to="/profile">Welcome</NavLink>
                        </li>
                    </u1>
                </nav>
            </header>
        )
    }
}

export default Header;