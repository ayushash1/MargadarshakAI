/**
 * Login Page
 *
 * Simple login form with email, password, and role selection.
 * On submit, redirects to appropriate dashboard based on selected role:
 * - Student → /student/dashboard
 * - Admin → /admin/dashboard
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const user = await login(email, password);

      if (user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      setErrorModalOpen(true);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Sign in to access your dashboard</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Login
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/register">Create new account</Link>
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={errorModalOpen}
        title="Invalid Credentials"
        onClose={() => setErrorModalOpen(false)}
        onConfirm={() => navigate("/register")}
        confirmText="Create Account"
        cancelText="Try Again"
      >
        <p>The email or password you entered is incorrect.</p>
        <p>Please try again or create a new account if you don't have one.</p>
      </Modal>
    </div>
  );
};

export default Login;
