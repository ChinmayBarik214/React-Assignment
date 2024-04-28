import React, { useState, useEffect } from "react";
import Subjects from "./Subjects";
import axios from "axios";
import './App.css'
import './LoginComponent.css'

const LoginComponent = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("")

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
      setUsername(response.data.user.username)
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
            <div className="status-bar">
              <p className="status-bar__name">{username}</p>
              <button
                className="form__input form__input--logout"
                onClick={() => {
                  localStorage.removeItem('jwtToken')
                  window.location.reload()
                }}>Log out</button>
            </div>
            <Subjects token={localStorage.getItem('jwtToken')}></Subjects>
          </>
        ) : (
          <>
            <h2 className='list-title list-title--login'>Login to know your enrolled subjects</h2>
            <form className="form" onSubmit={handleSubmit}>
              <input
                className="form__input"
                type="text"
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              <input
                className="form__input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="form__input form__input--submit" type="submit" disabled={loading}>
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