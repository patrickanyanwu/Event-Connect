import React from 'react';
import Copyright from "./copyright";
import {Link} from "react-router-dom";
import logo from "../images/Icon-Only-Black.png"

function Footer() {
    return (
        <div className="footer">
            <div className="footer-links"><div className="footer-logo-stuff"><img src={logo} alt="logo" className="footer-logo"/><Link className="nav-text" to="/">Event Connect</Link></div><Link to="/contact" className="contact">Contact Us</Link></div>
    <Copyright />
        </div>
    )
}

export default Footer;