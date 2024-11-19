import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Appraisal System
        </a>
        <div className="d-flex">
          {isLoggedIn ? (
            <button
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn btn-outline-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
