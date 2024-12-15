import React, { useEffect, useRef } from "react";
import CourseList from "../components/CourseList";
import "./HomePage.css";

const HomePage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        // Toggle scrollability based on content height
        if (container && container.scrollHeight > container.clientHeight) {
            container.style.overflowY = "auto"; // Enable scrolling
        } else if (container) {
            container.style.overflowY = "hidden"; // Disable scrolling
        }
    }, []);

    return (
        <div className="homepage-container" ref={containerRef}>
            <h1 className="homepage-header">Welcome to the Course Management System</h1>
            <div className="homepage-content">
                <div className="course-list-wrapper">
                    <CourseList />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
