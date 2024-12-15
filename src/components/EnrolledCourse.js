import React, { useState } from "react";
import "../components/EnrolledCourse.css";
const exampleCourse = {
    title: "React Development",
    modules: [
        { title: "Introduction to React", content: "Learn the basics of React." },
        { title: "React State Management", content: "Dive deep into state and props." },
        { title: "React Router", content: "Understand routing in React applications." },
    ],
};

const EnrolledCourse = ({ course, onUnenroll, user}) => {
    if (!course) return null;
    if (!user) return null;

    const [selectedModule, setSelectedModule] = useState(null);

    // Handle module selection
    const handleModuleClick = (module) => {
        setSelectedModule(module);
    };

    return (
        <div className="enrolled-course-container">
            {/* Sidebar for Modules */}
            <div className="sidebar">
                <h3>Modules</h3>
                <ul>
                    {exampleCourse.modules?.map((module, index) => (
                        <li
                            key={index}
                            className={selectedModule === module ? "active" : ""}
                            onClick={() => handleModuleClick(module)}
                        >
                            {module.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="main-content">
                {selectedModule ? (
                    <div>
                        <h2>{selectedModule.title}</h2>
                        <p>{selectedModule.content}</p>
                    </div>
                ) : (
                    <p>Select a module to view its content.</p>
                )}
                <button className="unenroll-button" onClick={onUnenroll}>
                    Unenroll
                </button>
            </div>
        </div>
    );
};

export default EnrolledCourse;