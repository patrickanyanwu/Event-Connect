import React from "react";
import axios from "axios";

function toTitleCase(str) {
    return str.toLowerCase().split(" ").map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
}

const Event = ({ event, onLearn }) => {
    const {
        title,
        description,
        date,
        time,
        location,
        capacity,
        rsvp_count,
        image_url,
        created_by,
    } = event;
    const date1 = date.split("T")[0]
    const title1 = toTitleCase(title)
    const location1 = toTitleCase(location)

    return (
        <div className="event-card">
            {/* Event Image */}
            {image_url && (
                <img
                    src={image_url}
                    alt={title}
                    className="event-image"
                />
            )}
            <div className="event-card-details">

            {/* Event Title */}
            <h2 className="event-title">{title1}</h2>

            {/* Event Details */}
            <p className="event-description">{description}</p>
            <div className="event-details">
                <p>
                    <strong>Date:</strong> {date1 ?? date}
                </p>
                <p>
                    <strong>Time:</strong> {time}
                </p>
                <p>
                    <strong>Location:</strong> {location1}
                </p>
                <p>
                    <strong>Capacity:</strong> {rsvp_count} / {capacity}
                </p>
                <p>
                    <strong>Created By:</strong> {created_by}
                </p>
            </div>
            <div className="learn-button">
                    <button
                        onClick={onLearn}
                    >
                        Learn More
                    </button>
            </div>
            </div>
        </div>
    );
};

export default Event;