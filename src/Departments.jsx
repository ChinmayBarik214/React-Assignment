import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://university.demoapi.xyz/api/departments');
        setDepartments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className='main'>
      <h2 className='list-title'>Departments</h2>
      {loading ? (
        <p className='text-center'>Loading departments...</p>
      ) : (
        <ul className='data-list'>
          {departments.data.map(department => (
            <li key={department.id} className='data-list__item'>{department.attributes.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DepartmentList;