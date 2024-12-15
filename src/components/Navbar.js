import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Home</Link>
            </div>
            <div className="navbar-links">
                <Link to="/login">Log In</Link>
            </div>
        </nav>
    );
};

export default Navbar;
