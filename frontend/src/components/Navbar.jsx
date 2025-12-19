/**
 * Navbar Component
 *
 * Global navigation bar with links to all major pages.
 * Responsive design: hamburger menu on mobile, horizontal on desktop.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { user, logout } = useAuth(); // Consume AuthContext
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const confirmLogout = () => {
    logout();
    setLogoutModalOpen(false);
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          MargdarshakAI
        </Link>

        {/* Hamburger menu button for mobile */}
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation links */}
        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className="navbar-link" onClick={closeMenu}>
              Home
            </Link>
          </li>

          {user && user.role === "student" && (
            <li>
              <Link
                to="/student/dashboard"
                className="navbar-link"
                onClick={closeMenu}
              >
                Student Dashboard
              </Link>
            </li>
          )}

          {user && user.role === "admin" && (
            <li>
              <Link
                to="/admin/dashboard"
                className="navbar-link"
                onClick={closeMenu}
              >
                Admin Dashboard
              </Link>
            </li>
          )}

          {!user ? (
            <>
              <li>
                <Link to="/login" className="navbar-link" onClick={closeMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="navbar-link"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile" className="navbar-link" onClick={closeMenu}>
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="navbar-link logout-btn"
                  onClick={() => setLogoutModalOpen(true)}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      <Modal
        isOpen={logoutModalOpen}
        title="Confirm Logout"
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        confirmText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </nav>
  );
};

export default Navbar;
