/**
 * InternshipCard Component
 *
 * Displays a single internship opportunity in a card format.
 * Shows title, company, location, and an Apply button.
 */

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { applyForInternship } from "../utils/api";
import Modal from "./Modal";
import "./InternshipCard.css";

const InternshipCard = ({ internship }) => {
  const { user, updateUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [applying, setApplying] = useState(false);

  // Check if user has already applied
  // internship.id from props might be _id or id depending on source, align with backend _id
  const isApplied = user?.applied?.some(
    (app) =>
      app.internshipId === internship.id || app.internshipId === internship._id
  );

  const handleApply = async () => {
    if (!user) {
      alert("Please login to apply");
      return;
    }
    if (isApplied) return;

    setApplying(true);
    try {
      const response = await applyForInternship(
        internship.id || internship._id,
        user._id
      );
      // Update local user context with new applied array
      updateUser({ applied: response.applied });
      setShowModal(true);
    } catch (error) {
      alert(error.message || "Application failed");
    } finally {
      setApplying(false);
    }
  };

  return (
    <>
      <div className="internship-card">
        <div className="card-header">
          <div className="card-header-top">
            <h3 className="card-title">{internship.title}</h3>
            {internship.score !== undefined && (
              <span
                className="match-score"
                style={{
                  backgroundColor:
                    internship.score > 0.5 ? "#d4edda" : "#fff3cd",
                  color: internship.score > 0.5 ? "#155724" : "#856404",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "0.85em",
                  fontWeight: "bold",
                  marginLeft: "auto", // Push to right
                }}
              >
                {Math.round(internship.score * 100)}% Match
              </span>
            )}
          </div>
          <p className="card-company">{internship.company}</p>
        </div>
        <div className="card-body">
          <p className="card-location">
            <span className="location-icon">📍</span> {internship.location}
          </p>
          {internship.description && (
            <p className="card-description">{internship.description}</p>
          )}
        </div>
        <div className="card-footer">
          <button
            className={`apply-button ${isApplied ? "applied" : ""}`}
            onClick={handleApply}
            disabled={isApplied || applying}
          >
            {isApplied ? "Applied" : applying ? "Applying..." : "Apply Now"}
          </button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        title="Application Submitted"
        onClose={() => setShowModal(false)}
        onConfirm={() => setShowModal(false)}
        confirmText="OK"
        cancelText="Close"
      >
        <p>
          Your application for <strong>{internship.title}</strong> at{" "}
          <strong>{internship.company}</strong> has been received!
        </p>
      </Modal>
    </>
  );
};

export default InternshipCard;
