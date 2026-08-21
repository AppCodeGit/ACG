// app/admin/SubscriptionPlanManagement.tsx
"use client";

import { useState, useEffect } from "react";
import "./style/SubscriptionPlanManagement.css";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  interval: string;
  programName: string;
  isActive: boolean;
  stripeProductId: string;
  stripePriceId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    subscriptions: number;
  };
}

const SubscriptionPlanManagement = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  // ✅ Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const programOptions = [
    "Software Engineering",
    "Cloud Engineering",
    "Cyber Security",
    "Data Analytics",
    "Digital Marketing",
    "Forex Trading",
  ];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    interval: "month",
    programName: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/subscription/plans?showAll=true`,
      );
      const data = await response.json();

      if (data.success) {
        setPlans(data.data);
      } else {
        setError(data.message || "Failed to fetch plans");
      }
    } catch (err) {
      console.error("Fetch plans error:", err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      interval: "month",
      programName: "",
    });
    setEditingPlan(null);
    setError(null);
    setSuccess(null);
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description || "",
      price: plan.price.toString(),
      interval: plan.interval,
      programName: plan.programName,
    });
    setShowCreateForm(true);
    setError(null);
    setSuccess(null);
  };

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.programName) {
      setError("Please select a program");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/subscription/plans/${editingPlan?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            interval: formData.interval,
            programName: formData.programName,
            isActive: editingPlan?.isActive,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("✅ Subscription plan updated successfully!");
        resetForm();
        setShowCreateForm(false);
        fetchPlans();
      } else {
        setError(data.message || "Failed to update plan");
      }
    } catch (err) {
      console.error("Update plan error:", err);
      setError("Failed to update plan");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlan) {
      await handleUpdatePlan(e);
    } else {
      await handleCreatePlan(e);
    }
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.programName) {
      setError("Please select a program");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/subscription/create-plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          interval: formData.interval,
          programName: formData.programName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("✅ Subscription plan created successfully!");
        resetForm();
        setShowCreateForm(false);
        fetchPlans();
      } else {
        setError(data.message || "Failed to create plan");
      }
    } catch (err) {
      console.error("Create plan error:", err);
      setError("Failed to create plan");
    }
  };

  const handleToggleActive = async (plan: Plan) => {
    try {
      const response = await fetch(
        `${API_URL}/api/subscription/plans/${plan.id}/toggle`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !plan.isActive,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(
          `✅ Plan ${plan.isActive ? "deactivated" : "activated"} successfully!`,
        );
        fetchPlans();
      } else {
        setError(data.message || "Failed to update plan status");
      }
    } catch (err) {
      console.error("Toggle plan error:", err);
      setError("Failed to update plan");
    }
  };

  // ✅ Open Delete Modal
  const openDeleteModal = (plan: Plan) => {
    setPlanToDelete(plan);
    setShowDeleteModal(true);
    setError(null);
    setSuccess(null);
  };

  // ✅ Close Delete Modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPlanToDelete(null);
    setIsDeleting(false);
  };

  // ✅ Confirm Delete
  const confirmDelete = async () => {
    if (!planToDelete) return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/api/subscription/plans/${planToDelete.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setSuccess(`✅ Plan "${planToDelete.name}" deleted successfully!`);
        closeDeleteModal();
        fetchPlans();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete plan");
        setIsDeleting(false);
      }
    } catch (err) {
      console.error("Delete plan error:", err);
      setError("Failed to delete plan");
      setIsDeleting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `GHC ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="subscription-loading">
        <div className="spinner"></div>
        <p>Loading subscription plans...</p>
      </div>
    );
  }

  return (
    <div className="subscription-management">
      <div className="management-header">
        <h2>📋 Subscription Plans</h2>
        <button
          className="btn-create"
          onClick={() => {
            resetForm();
            setShowCreateForm(!showCreateForm);
          }}
        >
          {showCreateForm ? "❌ Cancel" : "➕ Create New Plan"}
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>❌</span>
          <p>{error}</p>
          <button className="alert-close" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span>✅</span>
          <p>{success}</p>
          <button className="alert-close" onClick={() => setSuccess(null)}>
            ×
          </button>
        </div>
      )}

      {showCreateForm && (
        <div className="plan-form-container">
          <h3>{editingPlan ? "✏️ Edit Plan" : "➕ Create New Plan"}</h3>
          <form onSubmit={handleSubmit} className="plan-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Plan Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Monthly Premium"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="programName">Program Name *</label>
                <select
                  id="programName"
                  name="programName"
                  value={formData.programName}
                  onChange={handleInputChange}
                  required
                  className="program-select"
                >
                  <option value="">Select a program...</option>
                  {programOptions.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (GHC) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="interval">Billing Interval *</label>
                <select
                  id="interval"
                  name="interval"
                  value={formData.interval}
                  onChange={handleInputChange}
                  required
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe what this plan includes..."
                  rows={3}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingPlan ? "✏️ Update Plan" : "➕ Create Plan"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  resetForm();
                  setShowCreateForm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Plans Grid */}
      <div className="plans-grid">
        {plans.length === 0 ? (
          <div className="no-plans">
            <p>No subscription plans created yet.</p>
            <p>Click "Create New Plan" to get started.</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${!plan.isActive ? "plan-card-inactive" : ""}`}
            >
              <div className="plan-status">
                <span
                  className={`status-badge ${plan.isActive ? "status-badge-active" : "status-badge-inactive"}`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </span>
                {plan._count && plan._count.subscriptions > 0 && (
                  <span className="subscriber-count">
                    👥 {plan._count.subscriptions} subscribers
                  </span>
                )}
              </div>

              <div className="plan-name">
                <h3>{plan.name}</h3>
                <p className="plan-program">📚 {plan.programName}</p>
              </div>

              <div className="plan-pricing">
                <span className="price">{formatCurrency(plan.price)}</span>
                <span className="interval">/{plan.interval}</span>
              </div>

              {/* Plan Description - Restructured */}
              {plan.description && (
                <div className="plan-description-wrapper">
                  <span className="plan-description-icon">📝</span>
                  <p className="plan-description">{plan.description}</p>
                </div>
              )}

              {/* Plan Meta - Restructured */}
              <div className="plan-meta">
                <div className="plan-meta-item">
                  <span className="plan-meta-icon">🔑</span>
                  <span className="plan-meta-label">ID</span>
                  <span className="plan-meta-value plan-meta-id">
                    {plan.stripeProductId}
                  </span>
                  <button
                    className="plan-meta-copy"
                    onClick={() =>
                      navigator.clipboard.writeText(plan.stripeProductId)
                    }
                    title="Copy Product ID"
                  >
                    📋
                  </button>
                </div>
                <div className="plan-meta-divider"></div>
                <div className="plan-meta-item">
                  <span className="plan-meta-icon">📅</span>
                  <span className="plan-meta-label">Created</span>
                  <span className="plan-meta-value plan-meta-date">
                    {formatDate(plan.createdAt)}
                  </span>
                </div>
                {plan._count && plan._count.subscriptions > 0 && (
                  <>
                    <div className="plan-meta-divider"></div>
                    <div className="plan-meta-item">
                      <span className="plan-meta-icon">👥</span>
                      <span className="plan-meta-label">Subscribers</span>
                      <span className="plan-meta-value plan-meta-count">
                        {plan._count.subscriptions}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="plan-actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEditPlan(plan)}
                >
                  ✏️ Edit
                </button>
                <button
                  className={`btn-toggle ${plan.isActive ? "btn-toggle-deactivate" : "btn-toggle-activate"}`}
                  onClick={() => handleToggleActive(plan)}
                >
                  {plan.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => openDeleteModal(plan)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ============================================
          DELETE CONFIRMATION MODAL
          ============================================ */}
      {showDeleteModal && planToDelete && (
        <div className="delete-modal-overlay" onClick={closeDeleteModal}>
          <div
            className="delete-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-modal-icon">🗑️</div>
            <h3 className="delete-modal-title">Delete Subscription Plan</h3>
            <p className="delete-modal-text">
              Are you sure you want to delete the plan{" "}
              <strong>"{planToDelete.name}"</strong>?
            </p>
            <div className="delete-modal-warning">
              <span className="delete-modal-warning-icon">⚠️</span>
              <p>
                This action <strong>cannot be undone</strong>.
              </p>
              {planToDelete._count && planToDelete._count.subscriptions > 0 && (
                <p className="delete-modal-subscriber-warning">
                  This plan has{" "}
                  <strong>{planToDelete._count.subscriptions}</strong>{" "}
                  subscribers. Please deactivate it first before deleting.
                </p>
              )}
            </div>

            <div className="delete-modal-actions">
              <button
                className="delete-modal-btn-cancel"
                onClick={closeDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className={`delete-modal-btn-delete ${isDeleting ? "delete-modal-btn-deleting" : ""}`}
                onClick={confirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="delete-modal-spinner"></span>
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete Plan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlanManagement;
