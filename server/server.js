const express = require('express');
const pg = require('pg');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "eventconnect",
    password: process.env.PASS2WORD,
    port: 5432,
});

db.connect();

app.use(express.json());

// Authentication middleware

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid token" });

        req.current_user_id = decoded.id;
        req.current_user_name = decoded.name;
        next();
    });
};

/* Events Endpoints */

app.post("/api/events/addevent", authenticateToken, async (req, res) => {
    const userId = req.current_user_id;
    const event = req.body;
    try {
        await db.query("INSERT INTO events (title, description, date, time, location, capacity, image_url, created_by, detailed_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [event.title.toLowerCase(), event.description, event.date, event.time, event.location.toLowerCase(), event.capacity, event.image, userId, event.detailed_description])
        res.status(201).send("Event created successfully");
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error creating event");
    }
})

app.get("/api/events/myevents", authenticateToken, async (req, res) => {
    const userId = req.current_user_id;
    try {
        const result = await db.query("SELECT * FROM events WHERE created_by = $1", [userId])
        res.status(200).send(result.rows)
    } catch (err) {
        console.log(err);
        res.status(500).send("Error getting events");
    }
})

app.put("/api/events/editevent/:id", authenticateToken, async (req, res) => {
    const userId = req.current_user_id;
    const event = req.body;
    try {
        await db.query("UPDATE events SET title = $1, description = $2, date = $3, time = $4, location = $5, capacity = $6, image_url = $7 WHERE id = $8", [event.title.toLowerCase(), event.description, event.date, event.time, event.location.toLowerCase(), event.capacity, event.image, event.id])
        res.status(200).send("Event updated successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating event");
    }
})

app.post("/api/rsvps", authenticateToken, async (req, res) => {
    const userId = req.current_user_id;
    const { event_id } = req.body;

    if (!event_id) {
        return res.status(400).json({ error: "Missing event_id" });
    }

    try {
        // Insert RSVP if it doesn't already exist
        const insertQuery = `
            INSERT INTO rsvps (user_id, event_id)
            VALUES ($1, $2)
            RETURNING *;
        `;
        const insertResult = await db.query(insertQuery, [userId, event_id]);

        // Recalculate total RSVPs for this event
        const countResult = await db.query(
            `SELECT COUNT(*) FROM rsvps WHERE event_id = $1`,
            [event_id]
        );
        const rsvpCount = parseInt(countResult.rows[0].count);

        // Update rsvp_count in events table
        await db.query(
            `UPDATE events SET rsvp_count = $1 WHERE id = $2`,
            [rsvpCount, event_id]
        );

        const message = insertResult.rows.length > 0
            ? "RSVP successful"
            : "Already RSVPed";

        res.status(200).json({ message, rsvp_count: rsvpCount });

    } catch (err) {
        console.log("Error handling RSVP:", err);
        if (err.constraint === "rsvps_user_id_event_id_key") {
            res.status(400).json({ message: err.constraint });
            return;
        }
        res.status(500).json({ error: err });
    }
});


app.delete("/api/events/deleteevent/:id", authenticateToken, async (req, res) => {
    const userId = req.current_user_id;
    try {
        await db.query("DELETE FROM events WHERE id = $1", [req.params.id])
        res.status(200).send("Event deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting event");
    }
})

app.get("/api/events", authenticateToken, async (req, res) => {
    const userId = req.current_user_id;
    const userName = req.current_user_name;
    try {
        const result = await db.query("SELECT * FROM events ORDER BY date ASC");
        res.json(result.rows);
    } catch (err) {
        console.log(err);
    }
});

app.get("/api/events/get_user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [userId])
        res.status(200).send(result.rows[0].name)
    } catch (e){
        res.status(500).send("Error getting user");
    }
})

app.get("/api/events/get_event/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("SELECT * FROM events WHERE id = $1", [id]);
        res.status(200).send(result.rows[0])
    } catch (e){
        res.status(404).send("Event not found");
    }
})

app.get("/api/events/getevent/:name", authenticateToken, async (req, res) => {
    const userId = req.current_user_id;
    try {
        const result = await db.query("SELECT * FROM events WHERE title LIKE '%' || $1 ||  '%'", [req.params.name.toLowerCase()])
        if (result.rows.length === 0) {
            res.status(404).send("Event not found");
        }
        res.status(200).send(result.rows[0])
    } catch (err) {
        console.log(err);
        res.status(500).send("Error getting event");
    }
})

/* Users Endpoints */

app.post("/api/users/register", async (req, res) => {
    const user = req.body;
    const password_hashed = await bcrypt.hash(req.body.password, 10);
    try {
        const result = await db.query("INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)  RETURNING id, name, email", [user.name, user.email.toLowerCase(), password_hashed])
        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
    } catch (err) {
        console.log(err);
        if (err.constraint === "users_email_key") {
            res.status(409).send("You are already registered, please login!");
            return;
        }
        res.status(500).send("Error creating user");
    }
});

app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) return res.status(400).json({ error: "Invalid email or password" });

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(400).json({ error: "Invalid email or password" });

        const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})