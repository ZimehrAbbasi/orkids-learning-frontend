import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // For session management
import { useNavigate } from "react-router-dom"; // For redirection
import "./Auth.css";
import axios from "axios";

const LoginPage = () => {
    const { login } = useAuth(); // Access login function from AuthContext
    const navigate = useNavigate(); // useNavigate hook for redirection

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // To handle login errors

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                email,
                password,
            });
            const { token, user } = response.data;

            // Set session data
            login(token, user);

            // Redirect to the desired page (e.g., dashboard or home)
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="auth-form">
                {error && <p className="auth-error">{error}</p>}
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
                <button type="submit" className="auth-button">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
