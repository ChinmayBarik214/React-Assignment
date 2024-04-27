import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://university.demoapi.xyz/api/courses"
        );
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="main">
      <h2 className='list-title'>Courses</h2>
      {loading ? (
        <p className='text-center'>Loading Courses...</p>
      ) : (
        <ul className='data-list'>
          {courses.data.map((course) => (
            <li key={course.id} className='data-list__item'>{course.attributes.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
