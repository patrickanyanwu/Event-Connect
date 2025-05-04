import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useTypewriter } from 'react-simple-typewriter';
import { toTitleCase } from '../events';

const EventPage = () => {
    const [text] = useTypewriter({
        words: ['...', '...'],
        loop: true,
        typeSpeed: 150,
        delaySpeed: 1000,
        deleteSpeed: 150,
    })
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const getEvent = async (id) => {
            try {
                const response = await axios.get(`/api/events/get_event/${id}`);
                setEvent(response.data);
            } catch (err) {
                console.error("Error fetching event:", err);
                setEvent(null);
            } finally {
                setLoading(false);
            }
        };

        getEvent(id); 
    }, [id]);

    if (loading) {
        return <p className="eventloading">Loading{text}</p>;
    }

    if (!event) {
        return <p>Event not found.</p>;
    }

    return (
        <div className="eventpage">
            <img className="eventpage-img" src={event.image_url} alt={event.title} />
    
            <h1 className="eventpage-title">{toTitleCase(event.title)}</h1>
            <h2>Event Description</h2>
            <p className="eventpage-description">{event.description}</p>
    
            <div className="eventpage-details">
                <p className="eventpage-date"><strong>Date:</strong> {event.date}</p>
                <p className="eventpage-time"><strong>Time:</strong> {event.time}</p>
                <p className="eventpage-location"><strong>Location:</strong> {toTitleCase(event.location)}</p>
                <p className="eventpage-capacity"><strong>Capacity:</strong> {event.capacity}</p>
                <p className="eventpage-rsvp"><strong>RSVP Count:</strong> {event.rsvp_count}</p>
                <p className="eventpage-createdby"><strong>Created by:</strong> {event.created_by}</p>
            </div>
            <a className='get-started'>RSVP Now!</a>
        </div>
    );
    
};

export default EventPage;