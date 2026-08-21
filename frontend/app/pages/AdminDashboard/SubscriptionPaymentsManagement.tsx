"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "./style/SubscriptionPaymentsManagement.css";

interface Payment {
  id: number;
  amount: number;
  currency: string;
  status: string;
  paymentDate: string;
  invoiceUrl: string | null;
  invoiceNumber: string | null;
  stripeInvoiceId: string | null;
  stripePaymentIntentId: string | null;
  subscription: {
    id: number;
    student: {
      id: number;
      fullName: string;
      email: string;
      phone: string;
      programName: string;
      profileImage: string;
      user: {
        id: number;
        name: string;
        email: string;
        role: string;
      } | null;
    };
    plan: {
      id: number;
      name: string;
      programName: string;
    };
  };
}

interface Subscription {
  id: number;
  student: {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    programName: string;
    profileImage: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    } | null;
  };
  plan: {
    id: number;
    name: string;
    programName: string;
    price: number;
    interval: string;
  };
  status: string;
  amount: number;
  currency: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
  payments: Payment[];
}

const SubscriptionPaymentsManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<number | "all">("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Fetch all subscription payments
  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all subscriptions with payments
      const response = await fetch(`${API_URL}/api/subscription/admin/all`);
      const data = await response.json();

      if (data.success) {
        setSubscriptions(data.data);
        
        // Extract all payments from subscriptions
        const allPayments: Payment[] = [];
        data.data.forEach((sub: Subscription) => {
          if (sub.payments && sub.payments.length > 0) {
            sub.payments.forEach((payment: Payment) => {
              allPayments.push({
                ...payment,
                subscription: {
                  id: sub.id,
                  student: sub.student,
                  plan: sub.plan
                }
              });
            });
          }
        });
        setPayments(allPayments);
      } else {
        setError(data.message || "Failed to fetch payments");
      }
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Filter payments
  const getFilteredPayments = () => {
    let filtered = payments;

    // Filter by subscription
    if (selectedSubscription !== "all") {
      filtered = filtered.filter(p => p.subscription.id === selectedSubscription);
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(p => p.status.toLowerCase() === filterStatus.toLowerCase());
    }

    // Filter by date range
    if (startDate) {
      filtered = filtered.filter(p => new Date(p.paymentDate) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(p => new Date(p.paymentDate) <= new Date(endDate));
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());

    return filtered;
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; bg: string }> = {
      succeeded: { color: "#10b981", bg: "#d1fae5" },
      paid: { color: "#10b981", bg: "#d1fae5" },
      pending: { color: "#f59e0b", bg: "#fef3c7" },
      failed: { color: "#ef4444", bg: "#fee2e2" },
      unpaid: { color: "#ef4444", bg: "#fee2e2" },
    };

    const info = statusMap[status.toLowerCase()] || { color: "#6b7280", bg: "#f3f4f6" };
    
    return (
      <span
        className="payment-status-badge"
        style={{
          backgroundColor: info.bg,
          color: info.color,
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredPayments = getFilteredPayments();

  // Calculate summary stats
  const totalPayments = filteredPayments.length;
  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const successfulPayments = filteredPayments.filter(p => p.status === "succeeded" || p.status === "paid").length;

  if (loading) {
    return (
      <div className="payments-loading">
        <div className="spinner"></div>
        <p>Loading payments...</p>
      </div>
    );
  }

  return (
    <div className="subscription-payments-management">
      {/* Summary Cards */}
      <div className="payments-summary">
        <div className="summary-card">
          <span className="summary-icon">💰</span>
          <div>
            <h4>Total Payments</h4>
            <p className="summary-value">{totalPayments}</p>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">💵</span>
          <div>
            <h4>Total Amount</h4>
            <p className="summary-value">{formatCurrency(totalAmount)}</p>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">✅</span>
          <div>
            <h4>Successful</h4>
            <p className="summary-value">{successfulPayments}</p>
          </div>
        </div>
        <div className="summary-card">
          <span className="summary-icon">📊</span>
          <div>
            <h4>Success Rate</h4>
            <p className="summary-value">
              {totalPayments > 0 ? Math.round((successfulPayments / totalPayments) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="payments-filters">
        <div className="filter-group">
          <label>Subscription</label>
          <select
            value={selectedSubscription}
            onChange={(e) => setSelectedSubscription(e.target.value === "all" ? "all" : Number(e.target.value))}
          >
            <option value="all">All Subscriptions</option>
            {subscriptions.map((sub) => (
              <option key={sub.id} value={sub.id}>
                #{sub.id} - {sub.student.fullName} ({sub.plan.name})
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="succeeded">Succeeded</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>From</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>To</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          className="clear-filters-btn"
          onClick={() => {
            setSelectedSubscription("all");
            setFilterStatus("all");
            setStartDate("");
            setEndDate("");
          }}
        >
          Clear Filters
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="payments-error">
          <span>❌</span>
          <p>{error}</p>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Payments Table */}
      <div className="payments-table-wrapper">
        {filteredPayments.length === 0 ? (
          <div className="no-payments">
            <span className="no-payments-icon">💳</span>
            <h4>No Payments Found</h4>
            <p>No subscription payments match your filters.</p>
          </div>
        ) : (
          <table className="payments-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>#{payment.id}</td>
                  <td>
                    <div className="student-info">
                      <div className="student-avatar-wrapper">
                        {payment.subscription.student.profileImage && 
                        !payment.subscription.student.profileImage.includes('default') ? (
                          <Image
                            src={payment.subscription.student.profileImage}
                            alt={payment.subscription.student.fullName}
                            width={40}
                            height={40}
                            className="student-avatar"
                          />
                        ) : (
                          <div className="student-avatar-fallback">
                            {getInitials(payment.subscription.student.fullName)}
                          </div>
                        )}
                      </div>
                      <div className="student-details">
                        <strong>{payment.subscription.student.fullName}</strong>
                        {payment.subscription.student.programName && (
                          <span className="student-program">{payment.subscription.student.programName}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="plan-info">
                      <span className="plan-name">{payment.subscription.plan.name}</span>
                      <span className="plan-program">{payment.subscription.plan.programName}</span>
                    </div>
                  </td>
                  <td className="amount-cell">
                    <strong>{formatCurrency(payment.amount)}</strong>
                  </td>
                  <td>{getStatusBadge(payment.status)}</td>
                  <td>{formatDate(payment.paymentDate)}</td>
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
        )}
      </div>

      {/* Footer Stats */}
      {filteredPayments.length > 0 && (
        <div className="payments-footer">
          <span>Showing {filteredPayments.length} payments</span>
          <span>Total: {formatCurrency(totalAmount)}</span>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPaymentsManagement;