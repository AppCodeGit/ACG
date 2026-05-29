"use client";

import { useEffect, useState, useCallback } from "react";
import "./style/PaymentManagement.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Payment {
  id: number;
  amount: number | null;
  status: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  subtitle: string;
}

interface DashboardStats {
  totalRevenue: number;
  completedPayments: number;
  pendingPayments: number;
  averagePayment: number;
}

interface TransactionHistory {
  id: number;
  amount: number | null;
  status: string;
  date: string;
  semester: string;
  installment: string;
  subtitle: string;
  courseName?: string;
}

interface Notification {
  id: number;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
}

const PaymentManagement = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    completedPayments: 0,
    pendingPayments: 0,
    averagePayment: 0,
  });
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [pageSize] = useState(10);
  
  // Modal states
  const [showManualModal, setShowManualModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<{
    name: string;
    email: string;
    phone: string;
    avatar: string | null;
  } | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [manualForm, setManualForm] = useState({
    email: "",
    amountPaid: "",
    semester: "",
    installment: "",
    courseId: "",
    firstName: "",
    lastName: "",
  });
  
  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Format currency
  const formatCurrency = (amount: number | null) => {
    if (amount === null || amount === 0) return "0";
    return amount.toLocaleString("en-US");
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Get status badge class and display text
  const getStatusInfo = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === "paid" || lower === "success") {
      return { class: "success", text: "Paid" };
    }
    if (lower === "manual") {
      return { class: "manual", text: "Manual" };
    }
    if (lower === "pending") {
      return { class: "pending", text: "Pending" };
    }
    if (lower === "failed") {
      return { class: "failed", text: "Failed" };
    }
    return { class: "unknown", text: status };
  };

  // Notification helpers
  const addNotification = (
    type: Notification["type"],
    title: string,
    message: string
  ) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Fetch dashboard stats
  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/payments/stats`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }, []);

  // Fetch payments with cursor pagination
  const fetchPayments = useCallback(
    async (cursor?: number) => {
      try {
        const token = localStorage.getItem("token");
        const url = new URL(`${API_URL}/api/admin/payments`);
        url.searchParams.set("pageSize", String(pageSize));
        if (cursor) url.searchParams.set("cursor", String(cursor));

        const response = await fetch(url.toString(), {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch payments");

        const data = await response.json();
        const newPayments = data.payments as Payment[];
        setPayments((prev) => (cursor ? [...prev, ...newPayments] : newPayments));
        setNextCursor(data.nextCursor);
        setHasMore(data.nextCursor !== null);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
        addNotification("error", "Fetch Failed", "Could not load payments");
      }
    },
    [pageSize]
  );

  // Fetch transaction history for a student
  const fetchTransactionHistory = async (email: string) => {
    setHistoryLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/admin/payments/student/${encodeURIComponent(email)}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTransactionHistory(data.transactions);
      } else {
        setTransactionHistory([]);
      }
    } catch (error) {
      console.error("Failed to fetch transaction history:", error);
      setTransactionHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  // View payment details
  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsViewModalOpen(true);
  };

  // View transaction history
  const handleViewTransactionHistory = (payment: Payment) => {
    setSelectedStudent({
      name: payment.name,
      email: payment.email,
      phone: payment.phone,
      avatar: payment.avatar,
    });
    fetchTransactionHistory(payment.email);
    setShowHistoryModal(true);
  };

  // Load initial data
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchPayments()]);
    setLoading(false);
  }, [fetchStats, fetchPayments]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Load more
  const loadMore = () => {
    if (nextCursor && hasMore && !loading) {
      fetchPayments(nextCursor);
    }
  };

  // Refresh payments
  const refreshPayments = () => {
    setPayments([]);
    fetchPayments();
    fetchStats();
  };

  // Close modals
  const closeModals = () => {
    setIsViewModalOpen(false);
    setShowManualModal(false);
    setShowHistoryModal(false);
    setSelectedPayment(null);
    setSelectedStudent(null);
    setTransactionHistory([]);
  };

  // Handle manual payment submission
  const handleManualPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/payments/manual`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: manualForm.email,
          amountPaid: parseFloat(manualForm.amountPaid),
          semester: manualForm.semester,
          installment: manualForm.installment,
          courseId: manualForm.courseId ? parseInt(manualForm.courseId) : null,
          firstName: manualForm.firstName,
          lastName: manualForm.lastName,
        }),
      });

      if (response.ok) {
        addNotification(
          "success",
          "Payment Recorded",
          `Payment of ${formatCurrency(parseFloat(manualForm.amountPaid))} recorded successfully`
        );
        setShowManualModal(false);
        setManualForm({
          email: "",
          amountPaid: "",
          semester: "",
          installment: "",
          courseId: "",
          firstName: "",
          lastName: "",
        });
        refreshPayments();
      } else {
        const error = await response.json();
        addNotification("error", "Record Failed", error.message || "Failed to record payment");
      }
    } catch (error) {
      console.error("Manual payment failed:", error);
      addNotification("error", "Record Failed", "Failed to record payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Calculate transaction stats
  const getTransactionStats = () => {
    const totalPaid = transactionHistory.reduce((sum, t) => sum + (t.amount || 0), 0);
    const successfulPayments = transactionHistory.filter(
      (t) => t.status === "paid" || t.status === "manual" || t.status === "success"
    );
    const uniqueSemesters = new Set(transactionHistory.map((t) => t.semester)).size;

    return {
      totalPaid,
      paymentCount: transactionHistory.length,
      successfulCount: successfulPayments.length,
      uniqueSemesters,
    };
  };

  if (loading && payments.length === 0) {
    return (
      <div className="payment-management-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading payments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-management-container">
      {/* Notification Container */}
      <div className="notification-container">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification notification-${notification.type}`}
            onClick={() => removeNotification(notification.id)}
          >
            <div className="notification-content">
              <div className="notification-icon">
                {notification.type === "success" && "✓"}
                {notification.type === "error" && "✗"}
                {notification.type === "info" && "ℹ"}
                {notification.type === "warning" && "⚠"}
              </div>
              <div className="notification-text">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-message">{notification.message}</div>
              </div>
              <button className="notification-close">×</button>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="management-header">
        <div>
          <h3 className="title">Payment Management</h3>
          <p className="subtitle">Manage payment records, invoices and revenue tracking</p>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={() => setShowManualModal(true)}>
            Record Payment
            <span className="material-symbols-outlined icon">add_circle</span>
          </button>
        </div>
      </header>

      {/* Stats Section */}
      <section className="management-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{formatCurrency(stats.totalRevenue)}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.completedPayments}</div>
            <div className="stat-label">Completed Payments</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.pendingPayments}</div>
            <div className="stat-label">Pending Payments</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{formatCurrency(stats.averagePayment)}</div>
            <div className="stat-label">Average Payment</div>
          </div>
        </div>
      </section>

      {/* Payments Table */}
      <div className="table-wrap">
        <table className="payments-table">
          <thead>
            <tr>
              <th className="col-name">Student</th>
              <th className="col-amount">Amount</th>
              <th className="col-date">Date</th>
              <th className="col-status">Status</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={5} className="no-data-cell">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((payment) => {
                const statusInfo = getStatusInfo(payment.status);
                return (
                  <tr key={payment.id} className="table-row">
                    <td className="name-cell">
                      <div className="avatar">
                        {payment.avatar ? (
                          <img src={payment.avatar} alt={payment.name} className="avatar-img" />
                        ) : (
                          <span className="avatar-fallback">{getInitials(payment.name)}</span>
                        )}
                      </div>
                      <div>
                        <div className="student-name">{payment.name}</div>
                        <div className="student-sub">{payment.subtitle}</div>
                      </div>
                    </td>
                    <td className="amount-cell">{formatCurrency(payment.amount || 0)}</td>
                    <td className="date-cell">{formatDate(payment.date)}</td>
                    <td className="status-cell">
                      <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="icon-btn view"
                        title="View Details"
                        onClick={() => handleViewPayment(payment)}
                      >
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button
                        className="icon-btn history"
                        title="Transaction History"
                        onClick={() => handleViewTransactionHistory(payment)}
                      >
                        <span className="material-symbols-outlined">history</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with Pagination */}
      <footer className="management-footer">
        <div className="footer-left">
          Showing {payments.length} payments {hasMore && "· Load more for additional records"}
        </div>
        <nav className="pager">
          <button className="pager-btn" onClick={refreshPayments} disabled={loading}>
            Refresh
          </button>
          {hasMore && (
            <button className="pager-btn primary" onClick={loadMore} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </nav>
      </footer>

      {/* View Payment Modal */}
      {isViewModalOpen && selectedPayment && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-container view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Payment Details</h2>
              <button className="modal-close" onClick={closeModals}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="payment-details">
                <div className="detail-row">
                  <span className="detail-label">Student:</span>
                  <span className="detail-value">{selectedPayment.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedPayment.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedPayment.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value amount">
                    {formatCurrency(selectedPayment.amount || 0)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`badge ${getStatusInfo(selectedPayment.status).class}`}>
                    {getStatusInfo(selectedPayment.status).text}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{formatDate(selectedPayment.date)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Description:</span>
                  <span className="detail-value">{selectedPayment.subtitle}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModals}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History Modal */}
      {showHistoryModal && selectedStudent && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-container history-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Transaction History</h2>
              <button className="modal-close" onClick={closeModals}>
                ×
              </button>
            </div>

            {/* Student Info Header */}
            <div className="history-student-header">
              <div className="history-avatar">
                {selectedStudent.avatar ? (
                  <img src={selectedStudent.avatar} alt={selectedStudent.name} />
                ) : (
                  <div className="history-avatar-fallback">{getInitials(selectedStudent.name)}</div>
                )}
              </div>
              <div className="history-student-info">
                <h4>{selectedStudent.name}</h4>
                <p className="history-email">{selectedStudent.email}</p>
                <p className="history-phone">📞 {selectedStudent.phone}</p>
              </div>
            </div>

            {/* Transaction Stats */}
            {!historyLoading && transactionHistory.length > 0 && (
              <div className="history-stats-grid">
                <div className="history-stat-card">
                  <div className="history-stat-value">{formatCurrency(getTransactionStats().totalPaid)}</div>
                  <div className="history-stat-label">Total Paid</div>
                </div>
                <div className="history-stat-card">
                  <div className="history-stat-value">{getTransactionStats().paymentCount}</div>
                  <div className="history-stat-label">Total Payments</div>
                </div>
                <div className="history-stat-card">
                  <div className="history-stat-value">{getTransactionStats().successfulCount}</div>
                  <div className="history-stat-label">Successful</div>
                </div>
                <div className="history-stat-card">
                  <div className="history-stat-value">{getTransactionStats().uniqueSemesters}</div>
                  <div className="history-stat-label">Semesters</div>
                </div>
              </div>
            )}

            <div className="modal-body">
              {historyLoading ? (
                <div className="history-loading">
                  <div className="spinner-small"></div>
                  <p>Loading transaction history...</p>
                </div>
              ) : transactionHistory.length === 0 ? (
                <div className="empty-state">No transaction history found for this student</div>
              ) : (
                <div className="history-list">
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Semester</th>
                        <th>Installment</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionHistory.map((transaction) => (
                        <tr key={transaction.id}>
                          <td>{formatDate(transaction.date)}</td>
                          <td className="history-amount">{formatCurrency(transaction.amount || 0)}</td>
                          <td>{transaction.semester}</td>
                          <td>{transaction.installment}</td>
                          <td>
                            <span className={`badge ${getStatusInfo(transaction.status).class}`}>
                              {getStatusInfo(transaction.status).text}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manual Payment Modal */}
      {showManualModal && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-container add-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Record Manual Payment</h2>
              <button className="modal-close" onClick={closeModals}>
                ×
              </button>
            </div>
            <form onSubmit={handleManualPayment}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={manualForm.email}
                      onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                      placeholder="student@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>First Name (for guest payments)</label>
                    <input
                      type="text"
                      value={manualForm.firstName}
                      onChange={(e) => setManualForm({ ...manualForm, firstName: e.target.value })}
                      placeholder="Optional if user exists"
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name (for guest payments)</label>
                    <input
                      type="text"
                      value={manualForm.lastName}
                      onChange={(e) => setManualForm({ ...manualForm, lastName: e.target.value })}
                      placeholder="Optional if user exists"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Amount <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={manualForm.amountPaid}
                      onChange={(e) => setManualForm({ ...manualForm, amountPaid: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Semester <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={manualForm.semester}
                      onChange={(e) => setManualForm({ ...manualForm, semester: e.target.value })}
                      placeholder="e.g., Fall 2024"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Installment <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={manualForm.installment}
                      onChange={(e) => setManualForm({ ...manualForm, installment: e.target.value })}
                      placeholder="e.g., 1st Installment"
                    />
                  </div>

                  <div className="form-group">
                    <label>Course ID (optional)</label>
                    <input
                      type="number"
                      value={manualForm.courseId}
                      onChange={(e) => setManualForm({ ...manualForm, courseId: e.target.value })}
                      placeholder="If payment is for a course"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModals}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? "Recording..." : "Record Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;