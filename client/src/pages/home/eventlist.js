import React, { useState } from "react";
import Event from "../../components/event"; // Import the Event component

const talk1 =
    "Froogle hosted its largest and most prestigious tech talk to date at this venue, bringing together an impressive lineup of VIPs and top-level technology administrators from around the world. The event featured influential industry leaders, cutting-edge discussions, and groundbreaking innovations, making it a landmark gathering for experts and visionaries in the tech community.";
const talk2 =
    "Slime1’s music festival became a hugely popular event, drawing thousands of fans with its star-studded lineup, high-energy performances, and immersive stage design. With top-tier sound production and an electrifying atmosphere, the festival cemented Slime1’s reputation as a major player in the music scene.";
const EventList = () => {
    // Sample event data (could come from an API)
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "NY Music Festival",
            description: "A weekend filled with live music, food, and fun!",
            date: "April 15, 2023",
            time: "12:00 PM",
            location: "City Park",
            capacity: 500,
            rsvp_count: 500,
            image_url: "https://www.udiscovermusic.com/wp-content/uploads/2017/06/Coachella-GettyImages-673625850-1000x600.jpg",
            created_by: "Slime1",
        },
        {
            id: 2,
            title: "Froogle Tech Talk",
            description: "An exciting evening of networking and tech talks!",
            date: "March 10, 2024",
            time: "6:00 PM",
            location: "Downtown Tech Hub",
            capacity: 200,
            rsvp_count: 200,
            image_url: "https://cdn.prod.website-files.com/6593c9a7f9ab9dc8b1763db2/65b0566852bdf30e0a96201c_tech-events-meetups-hero-image.jpg", // Sample image
            created_by: "Froogle",
        },

    ]);

    // Function to handle RSVP (mock)
    const handleLearn = (eventId) => {
        alert(`Person Learns More About Event ${eventId}`);
    };

    return (
        <div>
            <div>
                {events.map((event) => (
                    event.id === 1 ? <div className="popular-events">
                        <div>
                        <p className="pop-num">#1</p>
                        <h3>{event.title}</h3>
                            <p className="popular-description">{talk2}</p>
                        </div>
                        <Event key={event.id} event={event} onLearn={() => handleLearn(event.id)} />
                        </div>
            : <div className="popular-events">
                            <Event key={event.id} event={event} onLearn={() => handleLearn(event.id)} />
                            <div>
                                <p className="pop-num">#2</p>
                                <h3>{event.title}</h3>
                                <p className="popular-description">{talk1}</p>
                            </div>
                            </div>
                            ))}
                        </div>
                    </div>
    );
};

export default EventList;
