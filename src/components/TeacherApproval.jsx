import React, { useEffect, useState } from "react";
import "../styles/TeacherApproval.css";

const TeacherApproval = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
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
    <div className="teacher-approval-container">
      <div className="teacher-approval-main">
        <div className="teacher-approval-content">
          <h1 className="teacher-approval-header">Teacher Account Approval</h1>

          <div className="teacher-approval-controls">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="teacher-approval-search-bar"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="teacher-approval-filter-select"
            >
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="teacher-approval-table-container">
            <table className="teacher-approval-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>School</th>
                  <th>Date Sign Up</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.school}</td>
                    <td>{teacher.signupDate}</td>
                    <td>
                      <select
                        value={teacher.status}
                        onChange={(e) =>
                          handleStatusChange(teacher.id, e.target.value)
                        }
                        className="teacher-approval-status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredTeachers.length === 0 && <p>No teachers found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherApproval;
