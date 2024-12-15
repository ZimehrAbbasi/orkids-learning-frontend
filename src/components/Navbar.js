import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [authDisplay, setAuthDisplay] = useState(<></>); // State for rendering auth links

    useEffect(() => {
        if (user) {
            console.log(user);
            setAuthDisplay(
                <button onClick={onLogout}>Log Out</button>
            );
        } else {
            setAuthDisplay(
                <>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Log In</Link>
                </>
            );
        }
    }, [user]); // Dependency array ensures this runs when `user` changes

    const onLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Home</Link>
            </div>
            <div className="navbar-links">
                {authDisplay}
            </div>
        </nav>
    );
};

export default Navbar;
