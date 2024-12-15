import React, { createContext, useState, useContext, useEffect } from "react";

// Create the Auth Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    // Restore token and user from localStorage on app initialization
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser)); // Parse user from JSON string
        }
    }, []);

    // Function to log in the user
    const login = (token, user) => {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token); // Persist token
        localStorage.setItem("user", JSON.stringify(user)); // Persist user data
    };

    // Function to log out the user
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for Easy Access
export const useAuth = () => useContext(AuthContext);
