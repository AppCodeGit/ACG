"use client";

import { useState, useEffect } from "react";
import "./style/SubscriptionManagement.css";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  interval: string;
  programName: string;
  isActive: boolean;
}

interface Payment {
  id: number;
  amount: number;
  currency: string;
  status: string;
  paymentDate: string;
  invoiceUrl: string | null;
  stripeInvoiceId: string | null;
}

interface Subscription {
  id: number;
  status: string;
  amount: number;
  currency: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  plan: Plan;
  stripeSubscriptionId: string;
  payments?: Payment[];
}

const SubscriptionManagement = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [processing, setProcessing] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Get user email from localStorage
  const getStudentEmail = () => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsed = JSON.parse(userData);
        return parsed.email || "";
      }
      return "";
    } catch {
      return "";
    }
  };

  const studentEmail = getStudentEmail();

  // Fetch subscription data
  const fetchSubscriptionData = async () => {
    if (!studentEmail) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/subscription/student/${encodeURIComponent(studentEmail)}`
      );
      const data = await response.json();

      if (data.success) {
        setSubscription(data.data.activeSubscription || null);
        if (data.data.activeSubscription?.payments) {
          setPaymentHistory(data.data.activeSubscription.payments);
        }
      } else {
        setError("Failed to fetch subscription data");
      }
    } catch (err) {
      console.error("Error fetching subscription:", err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentEmail) {
      fetchSubscriptionData();
    }
  }, [studentEmail]);

  // Cancel Subscription
  const handleCancelSubscription = async () => {
    if (!subscription) return;

    if (!confirm("Are you sure you want to cancel your subscription? You will still have access until the end of your billing period.")) return;

    setProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_URL}/api/subscription/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscription.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("✅ Your subscription has been canceled successfully.");
        await fetchSubscriptionData();
      } else {
        setError(data.message || "Failed to cancel subscription");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      setError("Failed to connect to server");
    } finally {
      setProcessing(false);
    }
  };

  // Resume Subscription
  const handleResumeSubscription = async () => {
    if (!subscription) return;

    setProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_URL}/api/subscription/resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: subscription.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("✅ Your subscription has been resumed successfully.");
        await fetchSubscriptionData();
      } else {
        setError(data.message || "Failed to resume subscription");
      }
    } catch (err) {
      console.error("Resume error:", err);
      setError("Failed to connect to server");
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string; icon: string }> = {
      active: { color: "#10b981", label: "Active", icon: "✅" },
      trialing: { color: "#3b82f6", label: "Trial", icon: "🔄" },
      past_due: { color: "#f59e0b", label: "Past Due", icon: "⚠️" },
      unpaid: { color: "#ef4444", label: "Unpaid", icon: "❌" },
      canceled: { color: "#6b7280", label: "Canceled", icon: "⛔" },
      expired: { color: "#ef4444", label: "Expired", icon: "⌛" },
    };

    const info = statusMap[status] || statusMap.active;
    return (
      <span
        className="status-badge"
        style={{
          backgroundColor: info.color + "15",
          color: info.color,
          border: `1px solid ${info.color}30`,
        }}
      >
        <span className="status-icon">{info.icon}</span>
        {info.label}
      </span>
    );
  };

  // Get status color for payment
  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'succeeded':
      case 'paid':
        return '#10b981';
      case 'failed':
      case 'unpaid':
        return '#ef4444';
      case 'pending':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="subscription-management-loading">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        <p>Loading subscription details...</p>
      </div>
    );
  }

  if (!studentEmail) {
    return (
      <div className="subscription-management-empty">
        <div className="empty-icon-wrapper">
          <span className="empty-icon">🔒</span>
        </div>
        <h3>Login Required</h3>
        <p>Please log in to view your subscription details.</p>
        <button className="empty-action-btn" onClick={() => window.location.href = '/login'}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="subscription-management-container">
      {/* Header */}
      <div className="subscription-management-header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-icon-wrapper">
              <span className="header-icon">📋</span>
            </div>
            <div>
              <h2>Subscription Management</h2>
              <p>View your subscription details and manage your plan</p>
            </div>
          </div>
          {subscription && (
            <div className="header-right">
              <span className="subscription-status-indicator">
                <span className={`status-dot ${subscription.status}`}></span>
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="subscription-management-alert error">
          <span className="alert-icon">❌</span>
          <p>{error}</p>
          <button className="alert-close" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {success && (
        <div className="subscription-management-alert success">
          <span className="alert-icon">✅</span>
          <p>{success}</p>
          <button className="alert-close" onClick={() => setSuccess(null)}>✕</button>
        </div>
      )}

      {/* Main Content */}
      {!subscription ? (
        <div className="subscription-management-empty">
          <div className="empty-icon-wrapper">
            <span className="empty-icon">📭</span>
          </div>
          <h3>No Active Subscription</h3>
          <p>You don't have an active subscription. Visit the subscription plans page to subscribe.</p>
          <button className="empty-action-btn" onClick={() => window.location.href = '/pages/feeSelection/'}>
            View Plans
          </button>
        </div>
      ) : (
        <>
          {/* Subscription Card */}
          <div className="subscription-management-card">
            <div className="card-header">
              <div className="plan-info">
                <h3 className="plan-name">{subscription.plan.name}</h3>
                <span className="plan-badge">{subscription.plan.programName}</span>
              </div>
              <div className="plan-price">
                <span className="price-amount">{formatCurrency(subscription.amount)}</span>
                <span className="price-interval">/{subscription.plan.interval}</span>
              </div>
            </div>

            <div className="subscription-details-grid">
              <div className="detail-item">
                <span className="detail-label">💰 Amount</span>
                <span className="detail-value">{formatCurrency(subscription.amount)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🔄 Interval</span>
                <span className="detail-value">{subscription.plan.interval}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📊 Status</span>
                {getStatusBadge(subscription.status)}
              </div>
              <div className="detail-item">
                <span className="detail-label">📅 Next Billing</span>
                <span className="detail-value">{formatDate(subscription.currentPeriodEnd)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📆 Current Period</span>
                <span className="detail-value">
                  {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                </span>
              </div>
              {subscription.canceledAt && (
                <div className="detail-item full-width">
                  <span className="detail-label">⏳ Canceled On</span>
                  <span className="detail-value" style={{ color: "#ef4444" }}>
                    {formatDate(subscription.canceledAt)}
                  </span>
                </div>
              )}
              {subscription.cancelAtPeriodEnd && (
                <div className="detail-item full-width">
                  <span className="detail-label">⏳ Status</span>
                  <span className="detail-value" style={{ color: "#f59e0b" }}>
                    ⚠️ Canceling at period end
                  </span>
                </div>
              )}
            </div>

            <div className="subscription-actions">
              {subscription.cancelAtPeriodEnd ? (
                <>
                  <button
                    className="btn-subscription btn-resume"
                    onClick={handleResumeSubscription}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <span className="btn-spinner"></span>
                        Processing...
                      </>
                    ) : (
                      "🔄 Resume Subscription"
                    )}
                  </button>
                  <p className="cancel-note">
                    Your subscription will end on {formatDate(subscription.currentPeriodEnd)}
                  </p>
                </>
              ) : (
                <button
                  className="btn-subscription btn-cancel"
                  onClick={handleCancelSubscription}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <span className="btn-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    "🗑️ Cancel Subscription"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Payment History */}
          <div className="subscription-payment-history">
            <button
              className="payment-history-toggle"
              onClick={() => setShowPaymentHistory(!showPaymentHistory)}
            >
              <span className="toggle-icon">{showPaymentHistory ? "▼" : "▶"}</span>
              {showPaymentHistory ? "Hide" : "Show"} Payment History
              <span className="payment-count">{paymentHistory.length} payments</span>
            </button>

            {showPaymentHistory && (
              <div className="payment-history-content">
                {paymentHistory.length === 0 ? (
                  <div className="no-payments">
                    <span className="no-payments-icon">💳</span>
                    <p>No payment records found.</p>
                  </div>
                ) : (
                  <div className="payment-history-table-wrapper">
                    <table className="payment-history-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory.map((payment) => (
                          <tr key={payment.id}>
                            <td>
                              <span className="payment-date">
                                {formatDate(payment.paymentDate)}
                              </span>
                            </td>
                            <td>
                              <span className="payment-amount">
                                {formatCurrency(payment.amount)}
                              </span>
                            </td>
                            <td>
                              <span
                                className="payment-status"
                                style={{
                                  color: getPaymentStatusColor(payment.status),
                                  backgroundColor: getPaymentStatusColor(payment.status) + '15',
                                  border: `1px solid ${getPaymentStatusColor(payment.status)}30`,
                                }}
                              >
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </span>
                            </td>
                            <td>
                              {payment.invoiceUrl ? (
                                <a
                                  href={payment.invoiceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="invoice-link"
                                >
                                  View Invoice 📄
                                </a>
                              ) : (
                                <span className="no-invoice">N/A</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriptionManagement;