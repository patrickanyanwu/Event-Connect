import React, {useEffect, useState} from 'react';
import Home from './pages/home/index';
import Events from './pages/events/index';
import DashApp from './pages/dashboard/index';
import Login from './pages/login/index';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Copyright from "./components/copyright";
import Footer from "./components/footer";
import Contact from "./pages/contact";

function App() {
    return (
        <>
        <Navbar />
            <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/dashboard" element={<DashApp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
            </div>
            <Footer />
        </>
    )
}
export default App;