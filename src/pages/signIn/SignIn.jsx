import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignIn = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const signUpData = JSON.parse(localStorage.getItem("signUpData"));

    if (signUpData) {
      const { username, password } = signUpData;

      if (formData.username === username && formData.password === password) {
        handleLogin(username);
        alert("Login successful!");
        navigate("/user");

        setFormData({
          username: "",
          password: "",
        });
        setError("");
      } else {
        setError("Invalid username or password");
      }
    } else {
      setError("No user found. Please sign up first.");
    }
  };
  return (
    <div className="container d-flex justify-content-center mt-4">
      <div className="col-md-6">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className={`form-control ${error ? "is-invalid" : ""}`}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${error ? "is-invalid" : ""}`}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
