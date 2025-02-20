import React from 'react';
import {Person} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from '@mui/icons-material/Message';


function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    window.location.reload()
}

function Contact () {
    return (<>
            <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Get in Touch!</h3>
                <div className="underline"></div>
                <PersonIcon className="contact-icon" />
                <input type="text" placeholder="Name" name="name"/>
                <EmailIcon className="contact-icon" />
                <input type="email" placeholder="Enter Your Email" name="email"/>
                <MessageIcon className="contact-icon" />
                <textarea placeholder="Enter Your Message" name="message"/>
                <button type="submit" className="contact-submit submit-button">Send</button>
            </form>
        </>
    )
}

export default Contact;