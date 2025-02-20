import React, { useState, useEffect } from 'react';
import Event from "../../components/event";
import axios from "axios";

const Events = () => {
    const [events, setEvents] = useState([]); // State to store events
 // Error state

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const result = await axios.get("/api/events", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                })
                setEvents(Array.isArray(result.data) ? result.data : []);
            } catch (err) {
                console.error("Error fetching events:", err);
            }
        };
        fetchEvents();
    }, []); // Empty dependency array ensures it runs only on mount

    return (
        <div className="events">
            <h1>Events</h1>
            <div className="events-container">
            {events.length > 0 ? (
                events.map((evente) => <Event key={evente.id} event={evente} onLearn={() => {alert("Learn More")}} />)
            ) : (
                <p>No events found.</p>
            )}
            </div>
        </div>
    );
};

export default Events;
