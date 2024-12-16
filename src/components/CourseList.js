import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CourseList.css";

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/public/courses")
            .then((response) => {
                setCourses(response.data.courses);
            })
            .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    return (
        <div className="course-list-container">
            <div className="course-list">
                {courses.map((course) => (
                    <div className="course-card" key={course._id}>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                        <Link to={`/courses/${course._id}`} className="course-link">
                            View Course
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
