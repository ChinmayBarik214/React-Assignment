import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import DepartmentList from './Departments.jsx';
import Courses from './Courses.jsx';
import Students from './Students.jsx';
import LoginComponent from './LoginComponent.jsx';
import Header from './Header.jsx';

function Layout() {
  return (
    <>
    <Header />
    <Outlet />
    </>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<DepartmentList />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/students" element={<Students />} />
        <Route path="/login" element={<LoginComponent />} />
      </Route>      
      </Routes>
    </Router>
  );
};

export default App;