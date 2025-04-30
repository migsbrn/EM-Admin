import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import Header from "./Header";
import TeacherApproval from "./TeacherApproval";
import ManageTeacher from "./ManageTeacher";
import ViewStudents from "./ViewStudents";
import ReportLogs from "./ReportLogs";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // Redirect to dashboard if user is logged in and on login page
        if (location.pathname === "/login") {
          navigate("/dashboard");
        }
      } else {
        setIsLoggedIn(false);
        // Redirect to login if user is not logged in and not on login page
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  return (
    <div>
      {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} />}{" "}
      {/* Pass setIsLoggedIn to Header */}
      <div className="app-container">
        <Routes>
          <Route
            path="/login"
            element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher-approval" element={<TeacherApproval />} />
          <Route path="/manage-teacher" element={<ManageTeacher />} />
          <Route path="/view-students" element={<ViewStudents />} />
          <Route path="/reports-logs" element={<ReportLogs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
