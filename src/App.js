import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar is now global
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";

const App = () => {
    return (
        <Router>
            <div>
                <Navbar /> {/* Navbar is included at the top for all routes */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses/:id" element={<CoursePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
