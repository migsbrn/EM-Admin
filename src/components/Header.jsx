import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import profileImage from "../assets/haha.jpg";

const Header = ({ setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear local storage / cookies or auth state here if needed
    // Redirect to login page
    setIsLoggedIn(false); // Update logged-in state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="header-container">
      <div className="header-admin">Admin</div>
      <div className="header-actions">
        <Link
          to="/dashboard"
          className={activeLink === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/teacher-approval"
          className={activeLink === "/teacher-approval" ? "active" : ""}
        >
          Teacher Account Approval
        </Link>
        <Link
          to="/manage-teacher"
          className={activeLink === "/manage-teacher" ? "active" : ""}
        >
          Manage Teacher
        </Link>
        <Link
          to="/view-students"
          className={activeLink === "/view-students" ? "active" : ""}
        >
          View Students
        </Link>
        <Link
          to="/reports-logs"
          className={activeLink === "/reports-logs" ? "active" : ""}
        >
          Reports/Logs
        </Link>
        <Link
          to="/settings"
          className={activeLink === "/settings" ? "active" : ""}
        >
          Settings
        </Link>

        <div className="profile-wrapper" ref={dropdownRef}>
          <div
            className="profile-link"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={profileImage}
              alt="Admin Profile"
              className="profile-image"
            />
          </div>
          {showDropdown && (
            <div className="profile-dropdown">
              <Link to="/profile" className="dropdown-item">
                Account Profile
              </Link>
              <button
                className="dropdown-item logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
