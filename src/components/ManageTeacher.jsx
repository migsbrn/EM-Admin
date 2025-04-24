import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/ManageTeacher.css";

const ManageTeacher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Simulate fetching teachers from a backend
    setTimeout(() => {
      setTeachers([
        {
          id: 1,
          name: "Bea Rosas",
          email: "bearosas@gmail.com",
          school: "NU-Dasma",
          signupDate: "2025-04-15",
          status: "Pending",
        },
        {
          id: 2,
          name: "Kyla Bongcayao",
          email: "kylabongcayao@gmail.com",
          school: "NU-Dasma",
          signupDate: "2025-04-18",
          status: "Pending",
        },
        {
          id: 3,
          name: "Shannen Malapitan",
          email: "shannenmalapitan@gmail.com",
          school: "NU-Dasma",
          signupDate: "2025-04-18",
          status: "Pending",
        },
        {
          id: 4,
          name: "Mary Joy Brin",
          email: "maryjoybrin@gmail.com",
          school: "NU-Dasma",
          signupDate: "2025-04-18",
          status: "Pending",
        },
      ]);
    }, 1000);
  }, []);

  const handleStatusChange = (id, status) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const filteredTeachers = teachers.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === "All" || t.status === filter;
    return matchSearch && matchFilter;
  });

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
          <h1 className="teacher-management-title">Manage Teachers</h1>

          <div className="teacher-controls-manage">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="teacher-table-container">
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>School</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.length === 0 ? (
                  <tr>
                    <td colSpan="5">No teachers found.</td>
                  </tr>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td>{teacher.name}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.school}</td>
                      <td>{teacher.status}</td>
                      <td>
                        <select
                          value={teacher.status}
                          onChange={(e) =>
                            handleStatusChange(teacher.id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTeacher;
