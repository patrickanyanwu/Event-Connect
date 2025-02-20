import React from 'react';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import SensorsIcon from '@mui/icons-material/Sensors';
import StreamIcon from '@mui/icons-material/Stream';

function Info({heading, children, context}) {
    return (
        <div className="info">
            {children}
            <h3>{heading}</h3>
            <p>{context}</p>
        </div>
    )
}

const information = [{
    heading: 'Seamless Event Discovery ',
    context: "Easily find events that match your interests! Use our smart search and filters to explore events by location, date, and category. Never miss out on exciting gatherings again."}, {heading: 'Hassle-Free Event Management', context: 'Create, manage, and promote events effortlessly. Track RSVPs, send updates, and stay organized with our easy-to-use tools—so you can focus on making your event a success.'}, {heading: 'Connect & Engage with Your Community', context: "Meet like-minded people and build connections. Join discussions, network with attendees, and turn every event into an opportunity to grow your community."}]

export default function InfoList () {
    return (
        <div className="info-list">
            <Info heading={information[0].heading} context={information[0].context}>
                <AdsClickIcon className="info-icon"
                    fontSize="large" />
            </Info>
            <Info heading={information[1].heading} context={information[1].context}>
                <StreamIcon className="info-icon"
                    fontSize="large" />
            </Info>
            <Info heading={information[2].heading} context={information[2].context}>
                <SensorsIcon className="info-icon"
                    fontSize="large"
                />
            </Info>
        </div>
    )
}