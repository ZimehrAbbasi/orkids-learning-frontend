import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CoursePage.css";

const CoursePage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        // Fetch course details from the backend
        axios
            .get(`http://localhost:8080/api/courses/${id}`) // Adjust your endpoint
            .then((response) => setCourse(response.data))
            .catch((error) => console.error("Error fetching course:", error));
    }, [id]);

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <div className="course-page-container">
            <div className="course-header">
                <img src={course.image} alt={course.title} className="course-image" />
                <div className="course-info">
                    <h1 className="course-title">{course.title}</h1>
                    <p className="course-instructor">Instructor: {course.instructor}</p>
                    <p className="course-duration">Duration: {course.duration || "N/A"}</p>
                </div>
            </div>
            <div className="course-description">
                <h2>Description</h2>
                <p>{course.description}</p>
            </div>
            {course.relatedCourses?.length > 0 && (
                <div className="related-courses">
                    <h2>Related Courses</h2>
                    <ul>
                        {course.relatedCourses.map((relatedCourse) => (
                            <li key={relatedCourse.id}>
                                {relatedCourse.title} by {relatedCourse.instructor}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CoursePage;
