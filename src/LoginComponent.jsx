import React, { useState, useEffect } from "react";
import Subjects from "./Subjects";
import axios from "axios";
import './App.css'

const LoginComponent = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    <Subjects />
    if (jwtToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://university.demoapi.xyz/api/auth/local", {
        identifier,
        password,
      });
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);
      localStorage.setItem("jwtToken", response.data.jwt);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("An error occurred:", error.response);
    }

    setLoading(false);
  };

  return (
    <div className="main">
      <div>
        {isLoggedIn ? (
          <>
            <p>Logged in!</p>
            <button onClick={() => {
              localStorage.removeItem('jwtToken')
              window.location.reload()
            }}>Log out</button>
            <Subjects token={localStorage.getItem('jwtToken')}></Subjects>
          </>
        ) : (
          <>
          <h2 className='list-title'>Login to know your enrolled subjects</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;