import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
function Header() {
  return (
    <header>
      <nav className='nav'>
        <ul className='nav-list'>
          <li className='nav-list__item'>
            <Link to="/departments">Departments</Link>
          </li>
          <li className='nav-list__item'>
            <Link to="/courses">Courses</Link>
          </li>
          <li className='nav-list__item'>
            <Link to="/students">Students</Link>
          </li>
          <li className='nav-list__item'>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header