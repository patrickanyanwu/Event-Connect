import React, { useState, useEffect } from 'react';
import Event from "../../components/event";
import axios from "axios";
import {useTypewriter} from "react-simple-typewriter";
import "../../styles/general.css"
import { useNavigate } from 'react-router-dom';

export function toTitleCase(str) {
    return str.toLowerCase().split(" ").map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
}

const Events = () => {
    const [text] = useTypewriter({
            words: ['...', '...'],
            loop: true,
            typeSpeed: 150,
            delaySpeed: 1000,
            deleteSpeed: 150,
        })
    const [events, setEvents] = useState([]); // State to store events
    const [loading, setLoading] = useState(true); // State to manage loading
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const result = await axios.get("/api/events", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });

                const rawEvents = Array.isArray(result.data) ? result.data : [];
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
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="events">
            <h1>Events</h1>
            <div className="events-container">
                {loading ? (
                    <p className="eventloading">
                    Loading{text}
                </p>
                ) : (
                    events.length > 0 ? (
                        events.map((evente) => {
                            try {
                                return (<Event key={evente.id} event={evente} onLearn={function() {
                                    navigate(`/events/${evente.id}`);
                                }}/>)
                            } catch (err) {
                                console.error("Error fetching event:", err);
                                return null;
                            }
                        })
                    ) : (
                        <p>No events available</p>
                    )
                )}
            </div>
        </div>
    );
};

export default Events;