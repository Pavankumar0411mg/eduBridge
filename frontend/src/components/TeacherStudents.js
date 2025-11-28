import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeacherStudents.css';

const TeacherStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/teacher/students', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading students...</div>;

    return (
        <div className="teacher-students">
            <h2>My Students</h2>
            <div className="students-grid">
                {students.map(student => (
                    <div key={student.id} className="student-card">
                        <h3>{student.full_name}</h3>
                        <p>Grade: {student.grade}</p>
                        <p>Stream: {student.stream}</p>
                        <p>Email: {student.email}</p>
                        <p>Enrolled: {new Date(student.enrolled_date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherStudents;