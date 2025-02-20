import React from 'react';
import Navbar from "../../components/navbar";
import {Link} from "react-router-dom";
import { Navigate } from "react-router-dom";

let isAuthenticated = true;
function DashApp () {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return (
        <>
            <h1>Dashboard</h1>
        </>
    )
}

export default DashApp;