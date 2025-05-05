import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import logo from "../images/Icon-Only-Black.png"
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

function Navbar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <nav className="Navbar">
            <div className="logo">
                <img src={logo} alt="logo"/>
                <Link className="nav-text" to="/">Event Connect</Link>
            </div>
            <div className="searchbar">
                <input type="search" placeholder="Search Events"/>
                <button><SearchIcon fontSize="small"/></button>
            </div>
            <div className="dropdown show dropbar">
                <a className="btn btn-secondary dropdown-toggle drop " href="#" role="button" id="dropdownMenuLink"
                   data-toggle="dropdown"  data-bs-display="static" aria-haspopup="true" aria-expanded="false">
                    Quick Links
                </a>

                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                    <Link to="/" className="navlink dropdown-item">Home</Link>
                    {!token && <Link to="/login" className="navlink dropdown-item">Login</Link>}
                    {token && <Link to="/events" className="navlink dropdown-item">Events</Link>}
                    {token && <Link to="/dashboard" className="navlink dropdown-item">Dashboard</Link>}
                    {token && <a className="navlink dropdown-item" onClick={handleLogout} >Logout</a>}
                </div>
            </div>
        </nav>
    )
}

// <div className="links">
//<Link to="/" className="navlink">Home</Link>
//<Link to="/login" className="navlink">Login</Link>
//<Link to="/events" className="navlink">Events</Link>
//<a href="#" className="navlink">Logout</a>
//<Link to="/dashboard" className="navlink">Dashboard</Link>
// </div>
export default Navbar;