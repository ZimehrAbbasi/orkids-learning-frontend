import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Access AuthContext for session handling
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

const SignupPage = () => {
    const { login } = useAuth(); // Use login to set session after signup
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); // New state for username
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null); // For error handling

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/signup", {
                username,
                email,
                password,
            });
            const { token, user } = response.data;

            // Set the session using AuthContext
            login(token, user);
            console.log("Signup successful", { token, user });
            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message || "An error occurred during signup"
            );
            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="auth-container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup} className="auth-form">
                {error && <p className="auth-error">{error}</p>} {/* Display error */}
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" className="auth-button">Signup</button>
            </form>
        </div>
    );
};

export default SignupPage;
