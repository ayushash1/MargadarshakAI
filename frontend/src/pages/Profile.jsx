/**
 * Profile Page
 *
 * Displays current user information.
 */

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { updateUserProfile, fetchUserProfile } from "../utils/api";
import "./Profile.css";

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  // Fetch fresh data on mount to ensure applied internships are populated
  useEffect(() => {
    const loadProfile = async () => {
      if (user?._id) {
        try {
          const freshUser = await fetchUserProfile(user._id);
          updateUser(freshUser);
        } catch (err) {
          console.error("Failed to refresh profile:", err);
        }
      }
    };
    loadProfile();
  }, []); // Run once on mount

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    interests: "",
    education: "",
    description: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        skills: user.skills ? user.skills.join(", ") : "",
        interests: user.interests ? user.interests.join(", ") : "",
        education: user.education || "",
        description: user.description || "",
      });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toArray = (str) => {
    return str
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...formData,
        skills: toArray(formData.skills),
        interests: toArray(formData.interests),
      };

      const response = await updateUserProfile(user._id, updatedData);
      updateUser(response.user);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-page-professional">
      <div className="profile-header-professional">
        <div className="header-info">
          <div className="profile-avatar-large">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-titles">
            {isEditing ? (
              <input
                className="profile-name-input"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            ) : (
              <h1 className="profile-name-large">{user.name}</h1>
            )}
            <p className="profile-role-badge">{user.role}</p>
          </div>
        </div>
        <div className="header-actions">
          {isEditing ? (
            <>
              <button
                className="btn-cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button className="btn-save" onClick={handleSave}>
                Save Changes
              </button>
            </>
          ) : (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-section main-details">
          <h2>About</h2>

          <div className="detail-row">
            <label>Email</label>
            <p className="readonly-text">{user.email}</p>
          </div>

          <div className="detail-row">
            <label>Education</label>
            {isEditing ? (
              <input
                className="edit-input"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="e.g. B.Tech Computer Science"
              />
            ) : (
              <p className="detail-text">{user.education || "Not specified"}</p>
            )}
          </div>

          <div className="detail-row">
            <label>Description</label>
            {isEditing ? (
              <textarea
                className="edit-textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="detail-text description">
                {user.description || (
                  <span className="placeholder-text">
                    No description added yet.
                  </span>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="profile-section skills-interests">
          <div className="subsection">
            <h2>Skills</h2>
            {isEditing ? (
              <input
                className="edit-input"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="Comma separated (e.g. React, Node.js)"
              />
            ) : (
              <div className="tags-container">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span key={index} className="pro-tag">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="placeholder-text">No skills added.</span>
                )}
              </div>
            )}
          </div>

          <div className="subsection">
            <h2>Interests</h2>
            {isEditing ? (
              <input
                className="edit-input"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="Comma separated (e.g. AI, Web Dev)"
              />
            ) : (
              <div className="tags-container">
                {user.interests && user.interests.length > 0 ? (
                  user.interests.map((int, index) => (
                    <span key={index} className="pro-tag">
                      {int}
                    </span>
                  ))
                ) : (
                  <span className="placeholder-text">No interests added.</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="profile-section applied-section">
        <h2>Applied Internships</h2>
        {user.applied && user.applied.length > 0 ? (
          <table className="applied-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Company</th>
                <th>Applied Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {user.applied.map((app, index) => (
                <tr key={index}>
                  <td>{app.internshipId?.title || "Unknown Role"}</td>
                  <td>{app.internshipId?.company || "Unknown Company"}</td>
                  <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-pill ${app.status}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="placeholder-text">
            You haven't applied to any internships yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
