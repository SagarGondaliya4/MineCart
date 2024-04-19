import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ isLoggedIn, userName, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          MineCart
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-flex justify-content-end"
          id="navbarSupportedContent"
        >
          {isLoggedIn ? (
            <div>
              <span className="navbar-text me-3">Welcome, {userName}</span>
              <button
                type="button"
                className="btn btn-outline-danger m-1"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/">
                <button type="button" className="btn btn-outline-info m-1">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className="btn btn-outline-warning m-1">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
