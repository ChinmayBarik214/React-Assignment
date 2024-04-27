import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

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
      <h2 className='list-title'>Enrolled subjects</h2>
      {loading ? (
        <p className='loading-msg'>Loading Subjects...</p>
      ) : (
        <ul className='data-list'>
          {subjects.data.map((subject) => (
            <li key={subject.id} className='data-list__item'>{subject.attributes.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
