// src/ReportLogs.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/ReportLogs.css"; // Reusing the same CSS

const ReportLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Simulate fetching report log data from a backend
    setTimeout(() => {
      setLogs([
        {
          id: 1,
          teacherName: "Mr. Cruz",
          activityDescription: "Grade assignment",
          dateTime: "2025-04-21 09:00 AM",
        },
        {
          id: 2,
          teacherName: "Ms. Reyes",
          activityDescription: "Reviewed homework",
          dateTime: "2025-04-21 10:30 AM",
        },
        {
          id: 3,
          teacherName: "Ms. Santos",
          activityDescription: "Conducted a quiz",
          dateTime: "2025-04-21 11:00 AM",
        },
      ]);
    }, 1000);
  }, []);

  const filteredLogs = logs.filter((log) =>
    log.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="teacher-management-layout">
      <Sidebar />
      <div className="main-teacher-management">
        <div className="dashboard-header">
          <div className="header-admin">Admin</div>
          <div className="header-actions">
            <span className="notification-bell">&#128276;</span>
            <span className="header-avatar">👤</span>
          </div>
        </div>

        <div className="main-content">
          <h1 className="teacher-management-title">Report/Logs</h1>

          <div className="teacher-controls-report">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="teacher-table-container">
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>Teacher Name</th>
                  <th>Activity Description</th>
                  <th>Date and Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.teacherName}</td>
                    <td>{log.activityDescription}</td>
                    <td>{log.dateTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredLogs.length === 0 && <p>No logs found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportLogs;
