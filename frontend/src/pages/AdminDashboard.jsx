import { useEffect, useState } from "react";
import {
  createInternship,
  fetchInternships,
  deleteInternship,
  updateInternship,
  fetchApplications,
} from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("internships");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
  const [currentInternship, setCurrentInternship] = useState(null);

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedInternshipId, setSelectedInternshipId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    duration: "",
    stipend: "",
    requiredSkills: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    if (user.role !== "admin") {
      navigate("/student/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === "admin") {
      loadInternships();
      loadApplications();
    }
  }, [user]);

  const loadInternships = async () => {
    try {
      setLoading(true);
      const data = await fetchInternships();
      setInternships(
        data.map((item, index) => ({
          id: item._id || item.id || `mock-${index}`,
          title: item.title,
          company: item.company,
          location: item.location,
          description: item.description,
          duration: item.duration,
          stipend: item.stipend,
          skills: item.requiredSkills,
        }))
      );
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load internships.");
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async () => {
    try {
      const data = await fetchApplications();
      setApplications(data);
    } catch (error) {
      console.error("Failed to load applications", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({
      title: "",
      company: "",
      location: "",
      description: "",
      requiredSkills: "",
      duration: "",
      stipend: "",
    });
    setShowModal(true);
  };

  const openEditModal = (internship) => {
    setModalMode("edit");
    setCurrentInternship(internship);
    setFormData({
      title: internship.title,
      company: internship.company,
      location: internship.location,
      description: internship.description || "",
      duration: internship.duration || "",
      stipend: internship.stipend || "",
      requiredSkills: internship.skills ? internship.skills.join(", ") : "",
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    // Manual Validation
    const requiredFields = [
      "title",
      "company",
      "location",
      "duration",
      "stipend",
      "description",
      "requiredSkills",
    ];
    const missing = requiredFields.filter((field) => !formData[field].trim());

    if (missing.length > 0) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        requiredSkills: Array.isArray(formData.requiredSkills)
          ? formData.requiredSkills
          : formData.requiredSkills
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s),
        userRole: user?.role,
      };

      if (modalMode === "create") {
        await createInternship(payload);
        alert("Internship Created!");
      } else {
        await updateInternship(currentInternship.id, payload);
        alert("Internship Updated!");
      }

      setShowModal(false);
      await loadInternships();
    } catch (err) {
      console.error(err);
      setError(
        `Failed to ${modalMode === "create" ? "create" : "update"} internship.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedInternshipId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedInternshipId) {
      try {
        await deleteInternship(selectedInternshipId);
        await loadInternships();
      } catch (err) {
        console.error(err);
        alert("Failed to delete internship");
      }
    }
    setDeleteModalOpen(false);
    setSelectedInternshipId(null);
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <div className="admin-tabs">
            <button
              className={`tab-btn ${
                activeTab === "internships" ? "active" : ""
              }`}
              onClick={() => setActiveTab("internships")}
            >
              Internships
            </button>
            <button
              className={`tab-btn ${
                activeTab === "applications" ? "active" : ""
              }`}
              onClick={() => setActiveTab("applications")}
            >
              Applications
            </button>
          </div>
        </header>

        {activeTab === "internships" && (
          <div className="admin-actions">
            <button className="add-button" onClick={openCreateModal}>
              + Add New Internship
            </button>
          </div>
        )}

        {loading && (
          <div className="empty-state">
            <p>Loading...</p>
          </div>
        )}

        {!loading && error && (
          <div className="empty-state">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && activeTab === "internships" && (
          <>
            {internships.length === 0 ? (
              <div className="empty-state">
                <p>No internships available. Add your first internship!</p>
              </div>
            ) : (
              <div className="internships-table-container">
                <table className="internships-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Company</th>
                      <th>Location</th>
                      <th>Duration</th>
                      <th>Stipend</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internships.map((internship) => (
                      <tr key={internship.id}>
                        <td>{internship.title}</td>
                        <td>{internship.company}</td>
                        <td>{internship.location}</td>
                        <td>{internship.duration || "-"}</td>
                        <td>{internship.stipend || "-"}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="edit-button"
                              onClick={() => openEditModal(internship)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteClick(internship.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {!loading && !error && activeTab === "applications" && (
          <div className="applications-list">
            {applications.length === 0 ? (
              <div className="empty-state">
                <p>No applications found.</p>
              </div>
            ) : (
              <table className="applications-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Role Applied</th>
                    <th>Company</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={index}>
                      <td>{app.studentName}</td>
                      <td>{app.studentEmail}</td>
                      <td>{app.role}</td>
                      <td>{app.company}</td>
                      <td>{new Date(app.date).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${app.status}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        title={modalMode === "create" ? "Create Internship" : "Edit Internship"}
        onClose={() => setShowModal(false)}
        onConfirm={handleSubmit}
        confirmText={modalMode === "create" ? "Create" : "Update"}
        cancelText="Cancel"
      >
        <div className="form-row">
          <div className="form-group half-width">
            <label>
              Job Title <span className="required">*</span>
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="modal-input"
              required
            />
          </div>
          <div className="form-group half-width">
            <label>
              Company <span className="required">*</span>
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="modal-input"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>
              Location <span className="required">*</span>
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="modal-input"
              required
            />
          </div>
          <div className="form-group half-width">
            <label>
              Duration <span className="required">*</span>
            </label>
            <input
              name="duration"
              placeholder="e.g. 3 months"
              value={formData.duration}
              onChange={handleInputChange}
              className="modal-input"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label>
              Stipend <span className="required">*</span>
            </label>
            <input
              name="stipend"
              placeholder="e.g. $1000/mo"
              value={formData.stipend}
              onChange={handleInputChange}
              className="modal-input"
              required
            />
          </div>
          <div className="form-group half-width">
            <label>
              Required Skills <span className="required">*</span>
            </label>
            <input
              name="requiredSkills"
              placeholder="comma separated"
              value={formData.requiredSkills}
              onChange={handleInputChange}
              className="modal-input"
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>
            Description <span className="required">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="modal-input"
            rows="4"
            required
          />
        </div>
      </Modal>

      <Modal
        isOpen={deleteModalOpen}
        title="Confirm Deletion"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        confirmText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete this internship? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
