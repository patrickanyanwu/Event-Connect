import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useTypewriter } from 'react-simple-typewriter';
import { toTitleCase } from '../events';
import { Rtt } from '@mui/icons-material';

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
                const name = await axios.get(`/api/events/get_user/${response.data.created_by}`)
                setEvent({...response.data, creator: name.data});
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

    async function handleClick(e) {
        try {
            const response = await axios.post(`/api/rsvps`, {event_id: id}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setEvent((prevEvent) => ({
                ...prevEvent,
                rsvp_count: prevEvent.rsvp_count + 1
            }));
            alert("RSVP successful!");
        } catch (error) {
            if (error.response.data.message === "rsvps_user_id_event_id_key") {
                alert("Failed to RSVP. You have already RSVP'd for this event.");
                return;
            }
            alert("Failed to RSVP. Please try again later.");
        }
    }

    return (
        <div className="eventpage">
            <img className="eventpage-img slide-in" src={event.image_url} alt={event.title} />
    
            <h1 className="eventpage-title slide-in">{toTitleCase(event.title)}</h1>
            <h2>Event Description</h2>
            <p className="eventpage-description">{event.description}</p>
    
            <div className="eventpage-details">
                <p className="eventpage-date"><strong>Date:</strong> {event.date.split("T")[0]}</p>
                <p className="eventpage-time"><strong>Time:</strong> {event.time}</p>
                <p className="eventpage-location"><strong>Location:</strong> {toTitleCase(event.location)}</p>
                <p className="eventpage-capacity"><strong>Capacity:</strong> {event.capacity}</p>
                <p className="eventpage-rsvp"><strong>RSVP Count:</strong> {event.rsvp_count}</p>
                <p className="eventpage-createdby"><strong>Created by:</strong> {toTitleCase(event.creator)}</p>
            </div>
            <a onClick={handleClick}>RSVP Now!</a>
        </div>
    );
    
};

export default EventPage;