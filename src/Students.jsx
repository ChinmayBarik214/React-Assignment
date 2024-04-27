import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://university.demoapi.xyz/api/students"
        );
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="main">
      <h2>Students</h2>
      {loading ? (
        <p>Loading Students...</p>
      ) : (
        <ul>
          {students.data.map((student) => (
            <li key={student.id}>{student.attributes.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
