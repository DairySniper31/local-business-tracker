import React, {Component} from "react";


import "../static/w3.css";
import "./Profile.css";

import User123 from "../static/images/user123.png";
import SundaesImg from "../static/images/sundaeslogo.png";
import FiveRate from "../static/images/rating5.png";
import TwoRate from "../static/images/rating2.png";
import ThreeRate from "../static/images/rating3.png";
import GalesImg from "../static/images/galeslogo.png";
import SmilingImg from "../static/images/smillinglogo.png"

import {NavLink} from "react-router-dom";

class Profile extends Component{
    render() {
        return (
            <div className="w3-row">
                <div className="w3-third">
                    <h1 className="w3-container w3-text">
                        User123
                    </h1>
                    <img src={User123} className="w3-image w3-container"/>
                    <div className="w3-panel w3-text w3-light-gray">
                        <h4>User Info:</h4>
                        <p>Total Reviews: 4</p>
                        <p>User Bio: Eat Pray Love!</p>
                        <p>Testing out all of the ice cream stores in Rochester</p>
                    </div>

                </div>
                <div className="w3-half">
                    <h2 className="w3-container w3-text">
                        Reviews:
                    </h2>
                    <Review  name={'sundaes'}
                            imgsrc={SundaesImg}
                            ratesrc={FiveRate}
                            ratetext={'User123 Rating:' +
                            'This local has the best homemade ice cream and very nice workers.' +
                            '10/10 would recommend checking it out'}
                    />
                    <Review name={'gales'}
                            imgsrc={GalesImg}
                            ratesrc={TwoRate}
                            ratetext={"User123 Rating: " +
                            "Of all the local shops, I wouldn't make this one my first choice. " +
                            "It used to be a lot better!"}
                    />
                    <Review name={'smiling'}
                            imgsrc={SmilingImg}
                            ratesrc={ThreeRate}
                            ratetext={"User123 Rating: " +
                            "This local shop has okay homemade ice cream, but the workers are kind!"}
                    />
                </div>
            </div>
        )
    }
}

function Review(props) {
    return (
        <div className="w3-row-padding">
            <div className="w3-quarter">
                <NavLink to={'/business/' + props.name + ''}>
                    <img src={props.imgsrc} className="w3-image"/>
                </NavLink>
            </div>
            <div className="w3-quarter">
                <img src={props.ratesrc} className="w3-image"/>
            </div>
            <div className="w3-half">
                <p className="w3-text">
                    {props.ratetext}
                </p>
            </div>
        </div>
    )
}

export default Profile;