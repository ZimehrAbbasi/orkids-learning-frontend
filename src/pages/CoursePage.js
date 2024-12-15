import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import UnenrolledCourse from "../components/UnenrolledCourse";
import EnrolledCourse from "../components/EnrolledCourse";
import "../pages/CoursePage.css";
const CoursePage = () => {
    const { id } = useParams(); // Course ID from URL
    const { user, token } = useAuth(); // User token from AuthContext
    const [course, setCourse] = useState(null);
    const [enrolled, setEnrolled] = useState(false);

    // Fetch course details
    useEffect(() => {
        if (!token || !user) {
            console.log("Token is not yet available");
            return;
        }

        axios
            .post(
                `http://localhost:8080/protected/api/courses/${id}`,
                { username: user.Username },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                setEnrolled(response.data.enrolled);
                setCourse(response.data.course);
            })
            .catch((error) => console.error("Error fetching course:", error));
    }, [id, token]);

    // Handle enroll action
    const handleEnroll = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/protected/api/courses/enroll/${id}`,
                { username: user.Username },
                {
                    headers: { Authorization: `Bearer ${token}` },
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
        try {
            const response = await axios.post(
                `http://localhost:8080/protected/api/courses/unenroll/${id}`,
                { username: user.Username },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("Unenrollment successful:", response.data);
            setEnrolled(false);
        } catch (error) {
            console.error("Error unenrolling from course:", error);
        }
    };

    if (!course) {
        return <p>Please log in to view this course</p>;
    }

    return (
        <>
            {enrolled ? (
                <EnrolledCourse course={course} onUnenroll={handleUnenroll} user={user}/>
            ) : (
                <UnenrolledCourse course={course} onEnroll={handleEnroll} user={user}/>
            )}
        </>
    );
};

export default CoursePage;
