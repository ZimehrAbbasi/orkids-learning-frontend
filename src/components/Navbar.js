import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaUserCircle } from "react-icons/fa";
import logo from '../static/logo-orkids.png';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Controls dropdown visibility
    const [authDisplay, setAuthDisplay] = useState(<></>);

    useEffect(() => {
        if (user) {
            setAuthDisplay(
                <>
                    <button className="profile-button">
                        <FaUserCircle size={24} />
                    </button>
                    <button className="logout-button" onClick={onLogout}>
                        Log Out
                    </button>
                </>
            );
        } else {
            setAuthDisplay(
                <>
                    <Link to="/signup" className="signup-link">Sign Up</Link>
                    <Link to="/login" className="login-link">Log In</Link>
                </>
            );
        }
    }, [user]);

    const onLogout = () => {
        logout();
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Left: Logo */}
                <div className="navbar-section navbar-logo">
                    <Link to="/" className="logo-link">
                        <img src={logo} alt="Logo" className="logo-image" />
                    </Link>
                </div>


                {/* Middle: Collapsible Navigation Tabs */}
                <div className="navbar-section navbar-tabs">
                    <button className="hamburger" onClick={toggleMenu}>
                        <FaBars size={24} />
                    </button>
                    <div className={`tabs-dropdown ${isMenuOpen ? "open" : ""}`}>
                        <Link to="/" className="tab-link">Home</Link>
                        <Link to="/courses" className="tab-link">Courses</Link>
                        <Link to="/about" className="tab-link">About</Link>
                        <Link to="/contact" className="tab-link">Contact</Link>
                    </div>
                </div>

                {/* Right: Auth/Profile */}
                <div className="navbar-section navbar-auth">
                    {authDisplay}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
