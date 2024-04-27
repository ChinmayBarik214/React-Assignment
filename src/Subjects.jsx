import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(
          "https://university.demoapi.xyz/api/subjects", 
          { headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, } }
        );
        setSubjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div>
      <h2>Subjects</h2>
      {loading ? (
        <p>Loading Subjects...</p>
      ) : (
        <ul>
          {subjects.data.map((subject) => (
            <li key={subject.id}>{subject.attributes.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
