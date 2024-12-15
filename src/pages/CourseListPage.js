import React, { useEffect, useRef } from "react";
import CourseList from "../components/CourseList";
import "./CourseListPage.css";

const CourseListPage = () => {
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
        <div className="courselistpage-container" ref={containerRef}>
            <h1 className="courselistpage-header">Courses</h1>
            <div className="courselistpage-content">
                <div className="course-list-wrapper">
                    <CourseList />
                </div>
            </div>
        </div>
    );
};

export default CourseListPage;
