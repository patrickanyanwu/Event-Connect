import React, {useState} from 'react';
import Navbar from "../../components/navbar";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";


const loginUser = async (email, password) => {
    try {
        const response = await axios.post("/api/users/login", {
            email: email,
            password: password
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/dashboard";
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
    }
};

const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post("/api/users/register", {
            name: name,
            email: email,
            password: password
        });
        await loginUser(email, password);
    } catch (error) {
        const errorMessage = error.response?.data || error.message;
        alert(`Registration failed: ${errorMessage}`); // Show an alert with the error message
        console.error("Registration failed:", errorMessage);
    }
}

async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');
    if (name) {
        await registerUser(name, email, password);
    } else {
        await loginUser(email, password);
    }
}

function Login () {
    const [action, setAction] = useState("Sign Up")
    return (<div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-header-text">
                        {action}
                    </div>
                    <div className="underline"></div>
                </div>
                <form className="login-inputs" onSubmit={handleSubmit}>
                    {action === "Sign Up" && <div className="login-input">
                        <PersonIcon className="login-icon"/>
                        <input type="text" name="name" placeholder="Name" required/>
                    </div>}
                    <div className="login-input">
                        <EmailIcon className="login-icon"/>
                        <input type="email" name="email" placeholder="Email" required/>
                    </div>
                    <div className="login-input">
                        <LockIcon className="login-icon"/>
                        <input type="password" name= "password" placeholder="Password" required/>
                    </div>
                    <div className="submit-container">
                        <div className={action === "Login" ? "submit-button gray" : "submit-button"} onClick={() => {
                            setAction("Sign Up")
                        }}>Sign Up
                        </div>
                        <div className={action === "Sign Up" ? "submit-button gray" : "submit-button"} onClick={() => {
                            setAction("Login")
                        }}>Login
                        </div>
                    </div>
                    <div className="submit-container submit-but">
                        <button type="submit" className="submit-button">
                            {action === "Login" ? "Login" : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
    </div>
)
}

export default Login;