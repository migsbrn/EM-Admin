import React, { useState, useEffect } from "react";
import { auth } from "/src/firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";
import Illustration from "../assets/EM-logo.jpg"; // adjust path if needed

const AdminLogin = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .getIdTokenResult()
          .then((idTokenResult) => {
            if (idTokenResult.claims.admin) {
              setIsLoggedIn(true); // Set login state
              navigate("/dashboard"); // Redirect to dashboard if logged in as admin
            } else {
              auth.signOut().then(() => {
                setError("Access denied: You are not an admin.");
              });
            }
          })
          .catch((error) => {
            setError(error.message);
          });
      } else {
        setIsLoggedIn(false); // If user is not logged in, set it to false
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [setIsLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idTokenResult = await user.getIdTokenResult();

      if (idTokenResult.claims.admin) {
        console.log("Logged in successfully as admin!");
        setIsLoggedIn(true);
        navigate("/dashboard"); // Navigate to the admin dashboard after successful login
      } else {
        await auth.signOut();
        throw new Error("Access denied: You are not an admin.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="illustration">
        <img
          src={Illustration}
          alt="Illustration"
          className="illustration-image"
        />
      </div>
      <div className="login-form">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <span className="icon">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <span className="icon">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={isLoading}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Signing In..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
