import React, { useState, useEffect } from 'react';
import Event from "../../components/event";
import axios from "axios";

function toTitleCase(str) {
    return str.toLowerCase().split(" ").map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
}

const Events = () => {
    const [events, setEvents] = useState([]); // State to store events
 // Error state

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const result = await axios.get("/api/events", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });

                const rawEvents = Array.isArray(result.data) ? result.data : [];

                // Enrich each event with its creator's data
                const enrichedEvents = await Promise.all(rawEvents.map(async (evente) => {
                    try {
                        const userRes = await axios.get(`/api/events/get_user/${evente.created_by}`);
                        return {
                            ...evente,
                            created_by: toTitleCase(userRes.data)
                        };
                    } catch (err) {
                        console.error("Error fetching user for event:", evente.id, err);
                        return evente;
                    }
                }));

                setEvents(enrichedEvents);
            } catch (err) {
                console.error("Error fetching events:", err);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="events">
            <h1>Events</h1>
            <div className="events-container">
            {events.length > 0 ? (
                events.map((evente) => {
                    try {
                        return (<Event key={evente.id} event={evente} onLearn={() => {
                            alert("Learn More")
                        }}/>)
                    } catch (err) {
                        console.error("Error fetching event:", err);
                    }
                })
            ) : (
                <p>Loading</p>
            )}
            </div>
        </div>
    );
};

export default Events;
