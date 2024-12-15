import React from "react";

const UnenrolledCourse = ({ course, onEnroll, user }) => {
    if (!course) return null;
    if (!user) return null;

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
            <button className="enroll-button" onClick={onEnroll}>
                Enroll
            </button>
        </div>
    );
};

export default UnenrolledCourse;
