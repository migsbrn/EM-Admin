import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Teacher Account Approval", path: "/teacher-approval" },
  { label: "Manage Teachers", path: "/manage-teacher" },
  { label: "View All Students", path: "/students" },
  { label: "Reports/Logs", path: "/reports" },
  { label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        {menuItems.map(({ label, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive ? "sidebar-btn active" : "sidebar-btn"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
