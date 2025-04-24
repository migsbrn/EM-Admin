import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import TeacherApproval from "./TeacherApproval";
import ManageTeacher from "./ManageTeacher";
import ViewStudents from "./ViewStudents";
import ReportLogs from "./ReportLogs";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Split App into router wrapper and route controller
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        if (window.location.pathname === "/") {
          navigate("/dashboard");
        }
      } else {
        setIsLoggedIn(false);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />

      {isLoggedIn && (
        <>
          <Route
            path="/dashboard"
            element={
              <div className="dashboard-root">
                <Sidebar />
                <Dashboard />
              </div>
            }
          />
          <Route
            path="/teacher-approval"
            element={
              <div className="teacher-approval-root">
                <Sidebar />
                <TeacherApproval />
              </div>
            }
          />
          <Route
            path="/manage-teacher"
            element={
              <div className="manage-teacher-root">
                <Sidebar />
                <ManageTeacher />
              </div>
            }
          />
          <Route
            path="/students"
            element={
              <div className="view-students-root">
                <Sidebar />
                <ViewStudents />
              </div>
            }
          />
          <Route
            path="/reports"
            element={
              <div className="report-logs-root">
                <Sidebar />
                <ReportLogs />
              </div>
            }
          />
        </>
      )}
    </Routes>
  );
}

export default App;
