import React, { useEffect, useState } from "react";
import "../styles/ManageTeacher.css";

const ManageTeacher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Simulate fetching approved teachers
    setTimeout(() => {
      setTeachers([
        {
          id: 1,
          name: "Bea Rosas",
          email: "bearosas@gmail.com",
          school: "NU-Dasma",
          signupDate: "2025-04-15",
          status: "Active",
        },
        {
          id: 2,
          name: "Kyla Bongcayao",
          email: "kylabongcayao@gmail.com",
          school: "NU-Dasma",
          signupDate: "2025-04-18",
          status: "Active",
        },
        {
          id: 3,
          name: "Shannen Malapitan",
          email: "shannenmalapitan@gmail.com",
          school: "NU-Dasma",
          signupDate: "2025-04-18",
          status: "Inactive",
        },
        {
          id: 4,
          name: "Mary Joy Brin",
          email: "maryjoybrin@gmail.com",
          school: "NU-Dasma",
          signupDate: "2025-04-18",
          status: "Deleted",
        },
      ]);
    }, 1000);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const filteredTeachers = teachers.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filter === "All" || t.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="main-teacher-management">
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Deleted">Deleted</option>
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
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Deleted">Deleted</option>
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
  );
};

export default ManageTeacher;
