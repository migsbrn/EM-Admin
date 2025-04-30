import React, { useEffect, useState } from "react";
import "../styles/ViewStudents.css";

const ViewStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [progressFilter, setProgressFilter] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setStudents([
        {
          id: 1,
          nickname: "Liam",
          assignedTeacher: "Mr. Cruz",
          progress: "90%",
          details: "Excellent performance",
        },
        {
          id: 2,
          nickname: "Sofia",
          assignedTeacher: "Ms. Reyes",
          progress: "80%",
          details: "Excellent performance",
        },
        {
          id: 3,
          nickname: "Jacob",
          assignedTeacher: "Ms. Santos",
          progress: "40%",
          details: "Needs help with reading",
        },
      ]);
    }, 1000);
  }, []);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.nickname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProgress = progressFilter
      ? student.progress === progressFilter
      : true;
    return matchesSearch && matchesProgress;
  });

  return (
    <div className="vs-container">
      <h1 className="vs-title">Student List</h1>

      <div className="vs-controls">
        <input
          className="vs-search"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="vs-select"
          value={progressFilter}
          onChange={(e) => setProgressFilter(e.target.value)}
        >
          <option value="">All</option>
          {[...Array(10)].map((_, index) => {
            const val = (index + 1) * 10;
            return (
              <option key={val} value={`${val}%`}>
                {val}%
              </option>
            );
          })}
        </select>
      </div>

      <div className="vs-table-container">
        <table className="vs-table">
          <thead>
            <tr>
              <th>Nickname</th>
              <th>Assigned Teacher</th>
              <th>Progress</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.nickname}</td>
                <td>{student.assignedTeacher}</td>
                <td>{student.progress}</td>
                <td>{student.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && <p>No students found.</p>}
      </div>
    </div>
  );
};

export default ViewStudents;
