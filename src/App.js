import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar is now global
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import CourseListPage from "./pages/CourseListPage";

const App = () => {
    return (
        <Router>
            <div>
                <Navbar /> {/* Navbar is included at the top for all routes */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CourseListPage />} />
                    <Route path="/courses/:id" element={<CoursePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
