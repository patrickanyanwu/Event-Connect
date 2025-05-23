<body>
  <h1>EventConnect</h1>
    <img src="eventconnect.png" alt="EventConnect" />
  <p>EventConnect is a full-stack web application designed to streamline event management and discovery. Users can register, create events, RSVP, and interact with event-related content. This project leverages modern web development technologies and is currently under active development.</p>

  <hr>

<h2>Table of Contents</h2>
  <ul>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#installation-and-setup">Installation and Setup</a></li>
    <li><a href="#running-the-application">Running the Application</a></li>
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#database-schema">Database Schema</a></li>
    <li><a href="#testing">Testing</a></li>
    <li><a href="#version-control">Version Control</a></li>
    <li><a href="#future-development">Future Development</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ul>

  <hr>

<h2 id="introduction">Introduction</h2>
  <p>EventConnect is designed to provide users with a comprehensive platform for discovering and managing events. Whether you're hosting an event or looking to join one, EventConnect offers an intuitive user interface, secure authentication, and a robust backend to handle event data and user interactions.</p>
  <p><strong>Note:</strong> This project is still in development. New features and improvements are being added regularly, so expect changes as the project evolves.</p>

  <hr>

<h2 id="technologies-used">Technologies Used</h2>
  <ul>
    <li><strong>Frontend:</strong>
      <ul>
        <li>JavaScript (ES6+)</li>
        <li>React.js for building interactive user interfaces</li>
        <li>HTML/CSS for structure and styling</li>
      </ul>
    </li>
    <li><strong>Backend:</strong>
      <ul>
        <li>Node.js with Express.js for creating a RESTful API</li>
        <li>PostgreSQL for the relational database</li>
        <li>JWT (JSON Web Tokens) for authentication</li>
      </ul>
    </li>
    <li><strong>Tools &amp; Libraries:</strong>
      <ul>
        <li>Axios for making HTTP requests</li>
        <li>bcryptjs for password hashing</li>
        <li>dotenv for managing environment variables</li>
      </ul>
    </li>
  </ul>

  <hr>

<h2 id="features">Features</h2>
  <ul>
    <li><strong>User Authentication:</strong> Secure user registration and login using JWT.</li>
    <li><strong>Event Management:</strong> Create, update, and delete events. RSVP to events with real-time RSVP tracking.</li>
    <li><strong>Responsive UI:</strong> A modern and mobile-responsive design for a seamless user experience.</li>
    <li><strong>Error Handling:</strong> Proper error messages for a robust user experience.</li>
  </ul>

  <hr>

<h2 id="installation-and-setup">Installation and Setup</h2>
  <ol>
    <li>
      <strong>Clone the Repository:</strong>
      <pre><code>git clone https://github.com/patrickanyanwu/Event-Connect.git
cd eventconnect</code></pre>
    </li>
    <li>
      <strong>Install Dependencies:</strong>
      <p>For the backend:</p>
      <pre><code>cd server
npm install</code></pre>
      <p>For the frontend:</p>
      <pre><code>cd ../client
npm install</code></pre>
    </li>
    <li>
      <strong>Configure Environment Variables:</strong>
      <p>Create a <code>.env</code> file in your backend directory and add:</p>
      <pre><code>PORT=5000
PASS2WORD=your_postgres_password
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgresql://postgres:your_postgres_password@localhost:5432/eventconnect</code></pre>
      <p>Adjust values as needed for your environment.</p>
    </li>
    <li>
      <strong>Set Up PostgreSQL:</strong>
      <p>Ensure PostgreSQL is installed and running. Create a database named <code>eventconnect</code> and run the provided schema SQL to set up tables.</p>
    </li>
  </ol>

  <hr>

<h2 id="running-the-application">Running the Application</h2>
  <p><strong>Backend:</strong></p>
  <pre><code>cd server
npm start</code></pre>
  <p>The Express server should run on the port specified in your <code>.env</code> file (default: 5000).</p>
  <p><strong>Frontend:</strong></p>
  <pre><code>cd client
npm start</code></pre>
  <p>The React app will run on a development server (default: localhost:3000).</p>

  <hr>

<h2 id="api-endpoints">API Endpoints</h2>
  <ul>
    <li><strong>User Registration:</strong> <code>POST /api/users/register</code> - Registers a new user by storing their name, email, and hashed password.</li>
    <li><strong>User Login:</strong> <code>POST /api/users/login</code> - Authenticates a user and returns a JWT token.</li>
    <li><strong>Get Events:</strong> <code>GET /api/events</code> - Retrieves a list of events from the database (requires JWT authentication).</li>
    <li><strong>Create Event:</strong> <code>POST /api/events/create-evecd nt</code> - Allows an authenticated user to create a new event.</li>
    <li><strong>Edit Event:</strong> <code>PUT /api/events/editevent/:id</code> - Allows users to edit an event they made.</li>
    <li><strong>Delete Event:</strong> <code>DELETE /api/events/deleteevent/:id</code> - Allows users to delete an event they made.</li>
    <li><strong>Search Event:</strong> <code>POST /api/events/getevent/:name</code> - Allows users to search for events by name or location.</li>
    <li><strong>RSVP to Event:</strong> <code>POST /api/events/rsvp/:id</code> - Allows users to RSVP for an event.</li>
  </ul>
<hr />
<h2 id="database-schema">Database Schema and Relationships</h2>
  <p>This project uses PostgreSQL as its relational database. The schema is designed to capture users, events, RSVPs, and comments. The key tables and their relationships are outlined below:</p>
  <ul>
    <li>
      <strong>Users Table:</strong>
      <p>Stores user details including <code>id</code>, <code>name</code>, <code>email</code>, and hashed password (<code>password_hash</code>). This table serves as the primary source of user information.</p>
    </li>
    <li>
      <strong>Events Table:</strong>
      <p>Contains event details such as <code>title</code>, <code>description</code>, <code>date</code>, <code>time</code>, <code>location</code>, and <code>capacity</code>. Each event record includes a foreign key (<code>created_by</code>) referencing the <code>users</code> table, establishing which user created the event.</p>
    </li>
    <li>
      <strong>RSVPs Table:</strong>
      <p>Tracks which users have RSVPed to which events. It includes foreign keys referencing both the <code>users</code> table and the <code>events</code> table. A unique constraint ensures a user can RSVP to an event only once.</p>
    </li>
  </ul>
  <p>The relationships between these tables are maintained through foreign key constraints, with <code>ON DELETE CASCADE</code> used so that when a user or event is deleted, all associated RSVPs and comments are automatically removed.</p>
    <img src="db.png" alt="Database Schema" width="100%" height="500px"/>
  <hr>

<h2 id="testing">Testing</h2>
  <p>During development, I used <a href="https://www.postman.com/">Postman</a> extensively to test the API endpoints. This allowed me to:</p>
  <ul>
    <li>Verify the correctness of HTTP requests and responses.</li>
    <li>Ensure that error handling and status codes are working as expected.</li>
    <li>Test authentication by manually sending JWT tokens in the <code>Authorization</code> header.</li>
  </ul>
  <hr>

<h2 id="version-control">Version Control</h2>
  <p>I employed Git for version control throughout the development process. Using <a href="https://desktop.github.com/">GitHub Desktop</a>, I was able to:</p>
  <ul>
    <li>Track changes to the codebase.</li>
    <li>Commit small, incremental changes for better project management.</li>
    <li>Collaborate on features and maintain branch integrity.</li>
    <li>Push changes to GitHub, ensuring that the latest version is available remotely.</li>
  </ul>

  <hr>

<h2 id="future-development">Future Development</h2>
  <p>While the core features of EventConnect are in place, the project is still in development. Planned future enhancements include:</p>
  <ul>
    <li><strong>Improved UI/UX:</strong> Enhancing the visual design and mobile responsiveness.</li>
    <li><strong>Additional Features:</strong>
      <ul>
        <li>Enhanced search and filtering options.</li>
        <li>Commenting features</li>
      </ul>
    </li>
    <li><strong>Security Enhancements:</strong>
      <ul>
        <li>Transitioning to HTTP-only cookies for JWT storage.</li>
        <li>Implementing additional security best practices.</li>
      </ul>
    </li>
  </ul>

  <hr>

<h2 id="acknowledgements">Acknowledgements</h2>
  <ul>
    <li>Thanks to the developers of React, Express, and PostgreSQL for their excellent frameworks.</li>
    <li>Special thanks to the Postman team for providing an intuitive API testing tool.</li>
    <li>Appreciation to the Git and GitHub community for simplifying version control and collaboration.</li>
  </ul>

  <hr>

  <p><em>EventConnect is a work in progress. Contributions, feedback, and suggestions are welcome as the project evolves.</em></p>
</body>
