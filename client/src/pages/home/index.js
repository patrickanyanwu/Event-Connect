import React from 'react';
import Image from "./Logo2.png"
import Copyright from "../../components/copyright";
import Eventlist from "./eventlist";
import Event from "../../components/event"
import {useTypewriter, Cursor} from "react-simple-typewriter";
import InfoList from "./info";
import {Link} from "react-router-dom";

function Home () {
    const [text] = useTypewriter({
        words: ['"Discover, Create, and Connect Through Events"', '"Explore, Innovate, and Engage with Events"', '"Experience, Collaborate, and Grow Together"'],
        loop: false,
        typeSpeed: 50,
        delaySpeed: 3000,
        deleteSpeed: 70,
    })
    return (
        <div className="home">
        <div className="header">
            <div className=".home-head-container">
                <h1 className="home-head"><span>{text}</span><span style={{color: "#444"}}><Cursor /></span></h1>
            </div>
            <div className="home-header">
                <div className="slide-in">

                    <h3>"Join, Share & Celebrate – Together!"</h3>
                    <p>
                        Welcome to Event Connect, the ultimate platform for finding and managing events that bring
                        people together.
                        Whether it's hosting a gathering, searching for exciting events or just connecting with people
                        like you, Event Connect has got you covered.

                    </p>
                    <Link to="/login" className="get-started">Get Started</Link>
                </div>
                <img className="slide-in" src={Image} alt="logo"/>
            </div>
            <br/>
            <hr/>
        </div>
            <h1>Why Event Connect?</h1>
            <InfoList />
    <h1>Popular Past Events</h1>
            <Eventlist />
        </div>
    )
}

export default Home;