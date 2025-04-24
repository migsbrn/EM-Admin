import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../styles/Dashboard.css";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [dailyActiveUsers, setDailyActiveUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setTeacherCount(20);
      setStudentCount(80);
      setDailyActiveUsers([
        { name: "Mon", activeUsers: 10 },
        { name: "Tue", activeUsers: 20 },
        { name: "Wed", activeUsers: 5 },
        { name: "Thu", activeUsers: 15 },
        { name: "Fri", activeUsers: 25 },
        { name: "Sat", activeUsers: 7 },
        { name: "Sun", activeUsers: 30 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const pieData = [
    { name: "Teachers", value: teacherCount, color: "#4CAF50" },
    { name: "Students", value: studentCount, color: "#FF9800" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-dashboard">
        <div className="dashboard-header">
          <div className="header-admin">Admin</div>
          <div className="header-actions">
            <span className="notification-bell">&#128276;</span>
            <span className="header-avatar">👤</span>
          </div>
        </div>

        <div className="main-content">
          <h1 className="dashboard-title">DASHBOARD</h1>

          {loading ? (
            <p>Loading data...</p>
          ) : (
            <>
              <div className="charts-container">
                <div className="chart-container pie-chart">
                  <h3>Total Teachers vs. Students</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        innerRadius={60}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={-270}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container bar-chart">
                  <h3>Daily Logins</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={dailyActiveUsers}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="activeUsers" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="highlight-row">
                      <td>2025-25-20</td>
                      <td>Approved account</td>
                      <td>Admin</td>
                    </tr>
                    <tr>
                      <td>2025-02-24</td>
                      <td>Deleted account</td>
                      <td>Admin</td>
                    </tr>
                    <tr>
                      <td>2025-03-23</td>
                      <td>Deleted account</td>
                      <td>Admin</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
