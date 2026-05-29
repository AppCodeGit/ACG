"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Notification {
  id: number;
  studentName: string;
  assignmentTitle: string;
  programName: string;
  submissionId: number;
  studentEmail?: string;
  studentId?: number;
  read: boolean;
  createdAt: string;
}

const NotificationsHistory = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminId, setAdminId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "read" | "unread">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [profileImages, setProfileImages] = useState<Record<number, string>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Get adminId from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        const id = user.id || user.userId || user.adminId || user.sub;
        if (id) {
          setAdminId(parseInt(id));
        } else {
          setAdminId(1);
        }
      } catch (err) {
        console.error("Error parsing user:", err);
        setAdminId(1);
      }
    } else {
      setAdminId(1);
    }
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (adminId) {
      fetchNotifications();
    }
  }, [adminId]);

  // Filter notifications
  useEffect(() => {
    filterNotifications();
  }, [notifications, searchTerm, statusFilter]);

  const fetchProfileImage = async (email: string, studentId: number) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API_URL}/api/profile/profile-image/${email}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      
      const data = await response.json();
      
      if (data.success && data.profileImage) {
        setProfileImages(prev => ({
          ...prev,
          [studentId]: data.profileImage
        }));
      }
    } catch (error) {
      console.error(`Error fetching profile image for ${email}:`, error);
    }
  };

  const fetchNotifications = async () => {
    if (!adminId) return;

    try {
      setIsLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(
        `${API_URL}/api/assignments/notifications?adminId=${adminId}&limit=1000`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      // Fetch student details for each notification
      const notificationsWithStudentData = await Promise.all(
        (data.notifications || []).map(async (notification: Notification) => {
          try {
            const submissionResponse = await fetch(
              `${API_URL}/api/assignments/submission/${notification.submissionId}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            
            if (submissionResponse.ok) {
              const submissionData = await submissionResponse.json();
              const notificationWithData = {
                ...notification,
                studentEmail: submissionData.submission?.student?.email,
                studentId: submissionData.submission?.student?.id,
              };
              
              // Fetch profile image
              if (notificationWithData.studentEmail && notificationWithData.studentId) {
                await fetchProfileImage(notificationWithData.studentEmail, notificationWithData.studentId);
              }
              
              return notificationWithData;
            }
          } catch (err) {
            console.error("Error fetching student data:", err);
          }
          return notification;
        })
      );

      setNotifications(notificationsWithStudentData || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterNotifications = () => {
    let filtered = [...notifications];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (n) =>
          n.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.programName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply read/unread filter
    if (statusFilter === "read") {
      filtered = filtered.filter((n) => n.read === true);
    } else if (statusFilter === "unread") {
      filtered = filtered.filter((n) => n.read === false);
    }

    setFilteredNotifications(filtered);
    setCurrentPage(1);
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await fetch(
        `${API_URL}/api/assignments/notifications/${notificationId}/read`,
        {
          method: "PUT",
        },
      );

      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        ),
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!adminId) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      await fetch(`${API_URL}/api/assignments/notifications/mark-all-read`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId }),
      });

      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    router.push(`/admin/assignments?submissionId=${notification.submissionId}`);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (isLoading) {
    return (
      <div className="notifications-history-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-history-page">
      {/* Header */}
      <div className="history-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => router.back()}>
            <i className="bi bi-arrow-left"></i> Back
          </button>
          <div className="header-title-section">
            <div className="header-icon">
              <i className="bi bi-bell-fill"></i>
            </div>
            <h1>Notification History</h1>
            <p>View all your assignment submission notifications</p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <span className="stat-number">{notifications.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-badge unread">
              <span className="stat-number">{unreadCount}</span>
              <span className="stat-label">Unread</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search by student, assignment, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${statusFilter === "unread" ? "active" : ""}`}
            onClick={() => setStatusFilter("unread")}
          >
            Unread
          </button>
          <button
            className={`filter-btn ${statusFilter === "read" ? "active" : ""}`}
            onClick={() => setStatusFilter("read")}
          >
            Read
          </button>
          {unreadCount > 0 && (
            <button className="mark-all-btn" onClick={markAllAsRead}>
              <i className="bi bi-check2-all"></i> Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="notifications-list">
        {paginatedNotifications.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <h3>No notifications found</h3>
            <p>You're all caught up! No notifications match your filters.</p>
          </div>
        ) : (
          paginatedNotifications.map((notification) => {
            const profileImage = notification.studentId ? profileImages[notification.studentId] : null;
            const hasError = notification.studentId ? imageErrors[notification.studentId] : false;
            
            return (
              <div
                key={notification.id}
                className={`notification-card ${!notification.read ? "unread" : ""}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-avatar">
                  {profileImage && !hasError ? (
                    <img
                      src={profileImage}
                      alt={notification.studentName}
                      className="avatar-img"
                      onError={() => {
                        if (notification.studentId) {
                          setImageErrors(prev => ({
                            ...prev,
                            [notification.studentId!]: true
                          }));
                        }
                      }}
                    />
                  ) : (
                    <div className="avatar-placeholder">
                      {notification.studentName?.charAt(0).toUpperCase() || 'S'}
                    </div>
                  )}
                </div>
                <div className="notification-info">
                  <div className="notification-header">
                    <div className="notification-title">
                      <strong>{notification.studentName}</strong> submitted
                      <span className="assignment-name"> {notification.assignmentTitle}</span>
                    </div>
                    {!notification.read && <div className="unread-badge">New</div>}
                  </div>
                  <div className="notification-details">
                    <span className="program-badge">
                      <i className="bi bi-building"></i> {notification.programName}
                    </span>
                    <span className="time-badge">
                      <i className="bi bi-clock"></i> {formatTime(notification.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="notification-action">
                  <i className="bi bi-chevron-right"></i>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i> Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}

      <style jsx>{`
        .notifications-history-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #f8f9fc 100%);
          padding: 28px;
        }

        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(233, 105, 30, 0.1);
          border-top-color: #e9691e;
          border-radius: 50%;
          animation: spin 0.8s ease infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Header */
        .history-header {
          background: linear-gradient(135deg, #e9691e 0%, #0f172a 100%);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 28px;
          position: relative;
          overflow: hidden;
        }

        .history-header::before {
          content: '';
          position: absolute;
          top: -30%;
          right: -10%;
          width: 60%;
          height: 160%;
          background: radial-gradient(circle, rgba(255,255,255,0.1), transparent);
          transform: rotate(25deg);
          pointer-events: none;
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .back-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          padding: 8px 16px;
          border-radius: 40px;
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          transition: all 0.3s;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(-4px);
        }

        .header-title-section {
          text-align: center;
        }

        .header-icon {
          width: 70px;
          height: 70px;
          background: white;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .header-icon i {
          font-size: 36px;
          color: #e9691e;
        }

        .header-title-section h1 {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin: 0 0 8px 0;
        }

        .header-title-section p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 16px;
          margin: 0;
        }

        .header-stats {
          display: flex;
          gap: 16px;
          justify-content: flex-end;
          margin-top: 24px;
        }

        .stat-badge {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 12px 20px;
          border-radius: 16px;
          text-align: center;
          min-width: 100px;
        }

        .stat-badge .stat-number {
          display: block;
          font-size: 28px;
          font-weight: 800;
          color: white;
        }

        .stat-badge .stat-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Filters Bar */
        .filters-bar {
          background: white;
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .search-box {
          flex: 1;
          min-width: 250px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          padding: 10px 16px;
          border-radius: 40px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s;
        }

        .search-box:focus-within {
          border-color: #e9691e;
          box-shadow: 0 0 0 3px rgba(233, 105, 30, 0.1);
        }

        .search-box i {
          color: #94a3b8;
          font-size: 18px;
        }

        .search-box input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 14px;
        }

        .filter-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 20px;
          border: 1px solid #e2e8f0;
          background: white;
          border-radius: 40px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .filter-btn:hover {
          border-color: #e9691e;
          color: #e9691e;
        }

        .filter-btn.active {
          background: #e9691e;
          border-color: #e9691e;
          color: white;
        }

        .mark-all-btn {
          padding: 8px 20px;
          background: #e9691e;
          border: none;
          border-radius: 40px;
          color: white;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
        }

        .mark-all-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(233, 105, 30, 0.3);
        }

        /* Notifications List */
        .notifications-list {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .notification-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }

        .notification-card:hover {
          background: #f8fafc;
          transform: translateX(4px);
        }

        .notification-card.unread {
          background: #fefce8;
        }

        .notification-card.unread:hover {
          background: #fef9c3;
        }

        /* Avatar */
        .notification-avatar {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 24px;
        }

        /* Notification Info */
        .notification-info {
          flex: 1;
        }

        .notification-header {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .notification-title {
          font-size: 16px;
          color: #1e293b;
        }

        .notification-title strong {
          color: #0f172a;
          font-weight: 700;
        }

        .assignment-name {
          font-weight: 600;
          color: #e9691e;
        }

        .unread-badge {
          background: #e9691e;
          color: white;
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .notification-details {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .program-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f1f5f9;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          color: #475569;
        }

        .program-badge i {
          font-size: 12px;
          color: #e9691e;
        }

        .time-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #94a3b8;
        }

        .time-badge i {
          font-size: 12px;
        }

        .notification-action {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .notification-card:hover .notification-action {
          background: #e9691e;
          transform: translateX(4px);
        }

        .notification-card:hover .notification-action i {
          color: white;
        }

        .notification-action i {
          color: #94a3b8;
          font-size: 18px;
          transition: color 0.3s;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 80px 40px;
        }

        .empty-state i {
          font-size: 80px;
          color: #cbd5e1;
          margin-bottom: 20px;
          display: inline-block;
        }

        .empty-state h3 {
          font-size: 20px;
          color: #1e293b;
          margin: 0 0 8px 0;
        }

        .empty-state p {
          color: #64748b;
          margin: 0;
        }

        /* Pagination */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 28px;
          padding: 20px;
          background: white;
          border-radius: 20px;
        }

        .pagination-btn {
          padding: 10px 24px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 40px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #e9691e;
          color: white;
          border-color: #e9691e;
          transform: translateY(-2px);
        }

        .pagination-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .pagination-info {
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 20px;
          background: #f8fafc;
          border-radius: 40px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .notifications-history-page {
            padding: 16px;
          }

          .history-header {
            padding: 20px;
          }

          .header-title-section h1 {
            font-size: 24px;
          }

          .header-stats {
            justify-content: center;
          }

          .filters-bar {
            flex-direction: column;
          }

          .search-box {
            width: 100%;
          }

          .filter-buttons {
            width: 100%;
            justify-content: center;
          }

          .notification-card {
            flex-direction: column;
            text-align: center;
          }

          .notification-header {
            justify-content: center;
          }

          .notification-details {
            justify-content: center;
          }

          .pagination {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationsHistory;