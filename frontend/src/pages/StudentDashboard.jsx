import { useEffect, useState } from "react";
import { fetchInternships, fetchRecommendations } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import InternshipCard from "../components/InternshipCard";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Profile Completion Check
  const isProfileComplete = user?.education && user?.description;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (isProfileComplete) {
      loadInternships();
    } else {
      setLoading(false);
    }
  }, [user, isProfileComplete, navigate]);

  const loadInternships = async () => {
    try {
      // Use recommendation API instead of generic list
      const data = await fetchRecommendations(user._id);
      setInternships(
        data.map((item, index) => ({
          id: item._id || item.id || index + 1,
          title: item.title,
          company: item.company,
          location: item.location,
          description: item.description,
          // passing raw item too if needed
          ...item,
        }))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load internships. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isProfileComplete) {
    return (
      <div className="student-dashboard">
        <div className="dashboard-container">
          <header className="dashboard-header hui">
            <h1 className="dashboard-title">Complete Your Profile</h1>
            <p className="dashboard-subtitle">
              We need a bit more info to recommend the best internships for you.
            </p>
          </header>
          <div className="empty-state">
            <p>
              Please add your <strong>Education</strong> and a short{" "}
              <strong>Description</strong> to unlock recommendations.
            </p>
            <button
              className="complete-profile-btn"
              onClick={() => navigate("/profile")}
            >
              Go to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Recommended Internships</h1>
          <p className="dashboard-subtitle">
            Based on your profile and preferences
          </p>
        </header>

        {loading && (
          <div className="empty-state">
            <p>Loading internships...</p>
          </div>
        )}

        {!loading && error && (
          <div className="empty-state">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && internships.length === 0 ? (
          <div className="empty-state">
            <p>No internships available at the moment.</p>
          </div>
        ) : (
          <div className="internships-grid">
            {internships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
