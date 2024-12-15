import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CoursePage.css";
import { useAuth } from "../context/AuthContext";

const CoursePage = () => {
    const { id } = useParams(); // Course ID from URL
    const { user, token } = useAuth(); // User token from AuthContext
    const [course, setCourse] = useState(null);
    const [enrolled, setEnrolled] = useState(false); // Enrollment status

    // Fetch course details
    useEffect(() => {
        if (!token || !user) {
            console.log("Token is not yet available");
            return;
        }

        axios
            .post(`http://localhost:8080/protected/api/courses/${id}`,
                { username: user.Username }, 
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setEnrolled(response.data.enrolled)
                setCourse(response.data.course)
            })
            .catch((error) => console.error("Error fetching course:", error));
    }, [id, token]);

    // Handle enroll action
    const handleEnroll = async () => {
        if (!user) {
            console.log("User is not logged in");
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:8080/protected/api/courses/enroll/${id}`,
                { username: user.Username },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Enrollment successful:", response.data);
            setEnrolled(true);
        } catch (error) {
            console.error("Error enrolling in course:", error);
        }
    };

    // Handle unenroll action
    const handleUnenroll = async () => {
        if (!user) {
            console.log("User is not logged in");
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:8080/protected/api/courses/unenroll/${id}`,
                { username: user.Username },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Unenrollment successful:", response.data);
            setEnrolled(false);
        } catch (error) {
            console.error("Error unenrolling from course:", error);
        }
    }

    if (!course) {
        return <p>Please log in to view this course</p>;
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
            {enrolled ? (
                <button className="unenroll-button" onClick={handleUnenroll}>
                    Unenroll
                </button>
            ) : (
                <button className="enroll-button" onClick={handleEnroll}>
                    Enroll
                </button>
            )}
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
