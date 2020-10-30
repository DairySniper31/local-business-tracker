import React, {Component} from "react";
import "./Search.css";
import "../static/w3.css"

import GoogleMapReact from 'google-map-react';

import SundaesImg from "../static/images/sundaeslogo.png";
import GalesImg from "../static/images/galeslogo.png";
import SmilingImg from "../static/images/smillinglogo.png";

import FourStars from "../static/images/star4.png";
import TwoStars from "../static/images/star2.png";
import ThreeStars from "../static/images/star3.png";
import {NavLink} from "react-router-dom";

class Search extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            //TODO Create Search Page
            <div className='w3-row'>
                <div className='w3-half w3-panel w3-border'>
                    <h1>Search Results: Ice Cream</h1>
                    <div className='w3-bar-block'>
                        <Business name={'Sundaes On Sundays'}
                                  imgsrc={SundaesImg}
                                  ratesrc={FourStars}
                                  hours={'Hours: 8am-8pm'}
                                  address={'123 Sunday Street, Rochester NY 14623'}
                                  url={'/business/sundaes'}
                        />
                        <Business name={'The Smiling Scoop'}
                                  imgsrc={SmilingImg}
                                  ratesrc={ThreeStars}
                                  hours={'Hours: 11am-8pm'}
                                  address={'321 Business Road, Rochester NY 14623'}
                                  url={'/business/smiling'}
                        />
                        <Business name={"Gale's Ice Cream"}
                                  imgsrc={GalesImg}
                                  ratesrc={TwoStars}
                                  hours={'Hours: 8am-5pm'}
                                  address={'12 Lonely Drive, Rochester NY 14623'}
                                  url={'/business/gales'}
                        />
                    </div>
                </div>
                <div className='w3-half w3-panel w3-img'>
                    <SimpleMap/>
                </div>
            </div>
        )
    }
}

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 43.08,
            lng: -77.67
        },
        zoom: 13
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyATxDEY-PbeclUr3zQbSYNByl3gEkv6IEQ'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

function Business(props) {
    return(
        <div className='w3-bar-item'>
            <div className='w3-threequarter'>
                <h3 className='w3-text'>
                    {props.name}
                </h3>
                <img src={props.ratesrc} className='w3-image'/>
                <p className='w3-text'>
                    {props.hours}
                </p>
                <p className='w3-text'>
                    {props.address}
                </p>
            </div>
            <div className='w3-quarter'>
                <NavLink to={props.url} >
                    <img src={props.imgsrc} className='w3-image'/>
                </NavLink>
            </div>
        </div>
    )
}

export default Search;