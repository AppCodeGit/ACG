"use client";

import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import AssignmentManagement from "./AssignmentManagement/page";

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

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [adminId, setAdminId] = useState<number | null>(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);
  
  // New state for history modal
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "read" | "unread">("all");
  const [historyCurrentPage, setHistoryCurrentPage] = useState(1);
  const [historyItemsPerPage] = useState(15);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  
  // State for profile images
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

  // Fetch notifications and setup WebSocket
  useEffect(() => {
    if (adminId) {
      fetchNotifications();
      fetchAllHistoryNotifications();
      setupWebSocket();
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [adminId]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch profile image for a student
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

  // Fetch profile images for all notifications
  const fetchAllProfileImages = async (notificationsList: Notification[]) => {
    const uniqueStudents = new Map();
    
    notificationsList.forEach(notification => {
      if (notification.studentEmail && notification.studentId && !profileImages[notification.studentId]) {
        uniqueStudents.set(notification.studentId, {
          id: notification.studentId,
          email: notification.studentEmail
        });
      }
    });
    
    for (const [studentId, student] of uniqueStudents) {
      await fetchProfileImage(student.email, studentId);
    }
  };

  const fetchNotifications = async () => {
    if (!adminId) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(
        `${API_URL}/api/assignments/notifications?adminId=${adminId}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

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
              return {
                ...notification,
                studentEmail: submissionData.submission?.student?.email,
                studentId: submissionData.submission?.student?.id,
              };
            }
          } catch (err) {
            console.error("Error fetching student data:", err);
          }
          return notification;
        })
      );

      setNotifications(notificationsWithStudentData || []);
      setUnreadCount(data.unreadCount || 0);
      
      await fetchAllProfileImages(notificationsWithStudentData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllHistoryNotifications = async () => {
    if (!adminId) return;

    try {
      setIsHistoryLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(
        `${API_URL}/api/assignments/notifications?adminId=${adminId}&limit=1000`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

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
              return {
                ...notification,
                studentEmail: submissionData.submission?.student?.email,
                studentId: submissionData.submission?.student?.id,
              };
            }
          } catch (err) {
            console.error("Error fetching student data:", err);
          }
          return notification;
        })
      );

      setAllNotifications(notificationsWithStudentData || []);
      await fetchAllProfileImages(notificationsWithStudentData);
    } catch (error) {
      console.error("Error fetching history notifications:", error);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const setupWebSocket = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    try {
      socketRef.current = io(API_URL, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        timeout: 20000,
      });

      socketRef.current.on("connect", () => {
        socketRef.current?.emit("join-admin", adminId);
      });

      socketRef.current.on("new-submission", async (notification) => {
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
            const notificationWithEmail = {
              ...notification,
              studentEmail: submissionData.submission?.student?.email,
              studentId: submissionData.submission?.student?.id,
            };
            
            setNotifications((prev) => [notificationWithEmail, ...prev]);
            setAllNotifications((prev) => [notificationWithEmail, ...prev]);
            setUnreadCount((prev) => prev + 1);
            
            if (notificationWithEmail.studentEmail && notificationWithEmail.studentId) {
              await fetchProfileImage(notificationWithEmail.studentEmail, notificationWithEmail.studentId);
            }
          }
        } catch (err) {
          console.error("Error fetching student data for new notification:", err);
          setNotifications((prev) => [notification, ...prev]);
          setAllNotifications((prev) => [notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
      });
    } catch (error) {
      console.error("Error setting up WebSocket:", error);
    }
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
          notif.id === notificationId ? { ...notif, read: true } : notif,
        ),
      );
      setAllNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, read: true } : notif,
        ),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
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
        prev.map((notif) => ({ ...notif, read: true })),
      );
      setAllNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true })),
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }

    setIsOpen(false);
    setShowHistoryModal(false);
    setSelectedSubmissionId(notification.submissionId);
    setShowAssignmentModal(true);
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

  // Filter history notifications
  const getFilteredHistoryNotifications = () => {
    let filtered = [...allNotifications];
    
    if (searchTerm) {
      filtered = filtered.filter(
        (n) =>
          n.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.programName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter === "read") {
      filtered = filtered.filter((n) => n.read === true);
    } else if (statusFilter === "unread") { 
      filtered = filtered.filter((n) => n.read === false);
    }
    
    return filtered;
  };

  const filteredHistory = getFilteredHistoryNotifications();
  const totalHistoryPages = Math.ceil(filteredHistory.length / historyItemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (historyCurrentPage - 1) * historyItemsPerPage,
    historyCurrentPage * historyItemsPerPage
  );

  const totalUnreadInHistory = allNotifications.filter((n) => !n.read).length;

  return (
    <>
      <div className="notification-bell" ref={dropdownRef}>
        <div className="notification-button" onClick={() => setIsOpen(!isOpen)}>
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </div>

        {isOpen && (
          <div className="notification-dropdown">
            <div className="dropdown-header">
              <h3>Notifications</h3>
              <div className="header-buttons">
                {unreadCount > 0 && (
                  <button className="mark-all-read" onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                )}
                <button
                  className="view-all"
                  onClick={() => {
                    setIsOpen(false);
                    setShowHistoryModal(true);
                  }}
                >
                  📋 View all history
                </button>
              </div>
            </div>
            <div className="dropdown-body">
              {isLoading ? (
                <div className="loading-state">
                  <div className="loading-spinner-small"></div>
                  <p>Loading...</p>
                </div>
              ) : notifications.filter((n) => !n.read).length === 0 ? (
                <div className="empty-state-dropdown">
                  <span className="empty-icon">✅</span>
                  <p>All caught up! No new notifications</p>
                </div>
              ) : (
                notifications
                  .filter((notification) => !notification.read)
                  .map((notification) => {
                    const profileImage = notification.studentId ? profileImages[notification.studentId] : null;
                    const hasError = notification.studentId ? imageErrors[notification.studentId] : false;
                    
                    return (
                      <div
                        key={notification.id}
                        className="notification-item unread"
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
                        <div className="notification-content">
                          <div className="notification-title">
                            <strong>{notification.studentName}</strong> submitted
                          </div>
                          <div className="notification-details">
                            {notification.assignmentTitle}
                          </div>
                          <div className="notification-meta">
                            <span className="program-tag">
                              {notification.programName}
                            </span>
                            <span className="time">
                              {formatTime(notification.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="unread-dot"></div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        )}
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
          <div className="history-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="history-modal-header">
              <div className="history-header-content">
                <div className="history-header-icon">
                  <i className="bi bi-bell-fill"></i>
                </div>
                <h2>Notification History</h2>
                <button className="history-modal-close" onClick={() => setShowHistoryModal(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="history-header-stats">
                <div className="stat-badge">
                  <span className="stat-number">{allNotifications.length}</span>
                  <span className="stat-label">Total</span>
                </div>
                <div className="stat-badge unread">
                  <span className="stat-number">{totalUnreadInHistory}</span>
                  <span className="stat-label">Unread</span>
                </div>
              </div>
            </div>

            <div className="history-filters-bar">
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
                {totalUnreadInHistory > 0 && (
                  <button className="mark-all-btn" onClick={markAllAsRead}>
                    <i className="bi bi-check2-all"></i> Mark all as read
                  </button>
                )}
              </div>
            </div>

            <div className="history-notifications-list">
              {isHistoryLoading ? (
                <div className="loading-state">
                  <div className="loading-spinner-small"></div>
                  <p>Loading history...</p>
                </div>
              ) : paginatedHistory.length === 0 ? (
                <div className="empty-state">
                  <i className="bi bi-inbox"></i>
                  <h3>No notifications found</h3>
                  <p>You're all caught up! No notifications match your filters.</p>
                </div>
              ) : (
                paginatedHistory.map((notification) => {
                  const profileImage = notification.studentId ? profileImages[notification.studentId] : null;
                  const hasError = notification.studentId ? imageErrors[notification.studentId] : false;
                  
                  return (
                    <div
                      key={notification.id}
                      className={`history-notification-card ${!notification.read ? "unread" : ""}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="history-notification-avatar">
                        {profileImage && !hasError ? (
                          <img
                            src={profileImage}
                            alt={notification.studentName}
                            className="history-avatar-img"
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
                          <div className="history-avatar-placeholder">
                            {notification.studentName?.charAt(0).toUpperCase() || 'S'}
                          </div>
                        )}
                      </div>
                      <div className="history-notification-info">
                        <div className="history-notification-header">
                          <div className="history-notification-title">
                            <strong>{notification.studentName}</strong> submitted
                            <span className="assignment-name"> {notification.assignmentTitle}</span>
                          </div>
                          {!notification.read && <div className="unread-badge">New</div>}
                        </div>
                        <div className="history-notification-details">
                          <span className="program-badge">
                            <i className="bi bi-building"></i> {notification.programName}
                          </span>
                          <span className="time-badge">
                            <i className="bi bi-clock"></i> {formatTime(notification.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="history-notification-action">
                        <i className="bi bi-chevron-right"></i>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {totalHistoryPages > 1 && (
              <div className="history-pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setHistoryCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={historyCurrentPage === 1}
                >
                  <i className="bi bi-chevron-left"></i> Previous
                </button>
                <span className="pagination-info">
                  Page {historyCurrentPage} of {totalHistoryPages}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() => setHistoryCurrentPage((prev) => Math.min(totalHistoryPages, prev + 1))}
                  disabled={historyCurrentPage === totalHistoryPages}
                >
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal with AssignmentManagement */}
      {showAssignmentModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAssignmentModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowAssignmentModal(false)}
            >
              ✕
            </button>
            <AssignmentManagement submissionId={selectedSubmissionId} />
          </div>
        </div>
      )}

      <style jsx>{`
        .notification-bell {
          position: relative;
          display: inline-block;
        }

        .notification-button {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .notification-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(233, 105, 30, 0.15);
          background: linear-gradient(135deg, #ffffff 0%, #fff5ed 100%);
        }

        .notification-button .material-symbols-outlined {
          font-size: 22px;
          color: #4a5568;
          transition: color 0.3s ease;
        }

        .notification-button:hover .material-symbols-outlined {
          color: #e9691e;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #f44336;
          color: white;
          font-size: 10px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          min-height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1.50);
            box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 4px rgba(244, 67, 54, 0);
          }
          100% {
            transform: scale(1.50);
            box-shadow: 0 0 0 0 rgba(244, 67, 54, 0);
          }
        }

        .notification-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 400px;
          max-height: 500px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          overflow: hidden;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #e0e0e0;
          background: #f8f9ff;
        }

        .dropdown-header h3 {
          margin: 0;
          font-size: 16px;
          color: #333;
        }

        .header-buttons {
          display: flex;
          gap: 8px;
        }

        .mark-all-read {
          background: none;
          border: none;
          color: #e9691e;
          font-size: 12px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: background 0.3s ease;
        }

        .mark-all-read:hover {
          background: rgba(233, 105, 30, 0.1);
        }

        .view-all {
          background: none;
          border: none;
          color: #e9691e;
          font-size: 12px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: background 0.3s ease;
        }

        .view-all:hover {
          background: rgba(233, 105, 30, 0.1);
        }

        .dropdown-body {
          max-height: 400px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 12px 16px;
          cursor: pointer;
          transition: background 0.3s ease;
          border-bottom: 1px solid #f0f0f0;
        }

        .notification-item:hover {
          background: #f8f9ff;
        }

        .notification-item.unread {
          background: #f0f4ff;
        }

        .notification-avatar {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(135deg, #fef3c7, #fde68a);
        }

        .notification-avatar .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .notification-avatar .avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          color: white;
          font-weight: bold;
          font-size: 16px;
          border-radius: 50%;
        }

        .notification-content {
          flex: 1;
        }

        .notification-title {
          font-size: 14px;
          color: #333;
          margin-bottom: 4px;
        }

        .notification-details {
          font-size: 12px;
          color: #666;
          margin-bottom: 6px;
        }

        .notification-meta {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .program-tag {
          background: #e9691e;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
        }

        .time {
          font-size: 10px;
          color: #999;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          background: #e9691e;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 8px;
        }

        .loading-state {
          text-align: center;
          padding: 40px;
          color: #999;
        }

        .loading-spinner-small {
          width: 30px;
          height: 30px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 10px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .empty-state-dropdown {
          text-align: center;
          padding: 40px;
          color: #999;
        }

        .empty-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 12px;
        }

        @media (max-width: 480px) {
          .notification-dropdown {
            width: 350px;
            right: -50px;
          }
        }

        /* History Modal Styles */
        .history-modal-content {
          background: white;
          border-radius: 24px;
          width: 90%;
          max-width: 900px;
          max-height: 85vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .history-modal-header {
          background: linear-gradient(135deg, #e9691e 0%, #0f172a 100%);
          border-radius: 24px 24px 0 0;
          padding: 24px;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .history-header-content {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .history-header-icon {
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .history-header-icon i {
          font-size: 28px;
          color: #e9691e;
        }

        .history-header-content h2 {
          flex: 1;
          margin: 0;
          color: white;
          font-size: 24px;
          font-weight: 700;
        }

        .history-modal-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        .history-modal-close:hover {
          background: #ef4444;
          transform: rotate(90deg);
        }

        .history-modal-close i {
          color: white;
          font-size: 18px;
        }

        .history-header-stats {
          display: flex;
          gap: 16px;
        }

        .stat-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 12px;
          text-align: center;
        }

        .stat-badge .stat-number {
          display: block;
          font-size: 20px;
          font-weight: 700;
          color: white;
        }

        .stat-badge .stat-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
        }

        .history-filters-bar {
          padding: 20px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 10px 16px;
          border-radius: 40px;
          border: 1px solid #e2e8f0;
        }

        .search-box i {
          color: #94a3b8;
        }

        .search-box input {
          flex: 1;
          border: none;
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
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          border-radius: 40px;
          color: white;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .mark-all-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .history-notifications-list {
          padding: 20px;
          max-height: 50vh;
          overflow-y: auto;
        }

        .history-notification-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
          cursor: pointer;
          transition: all 0.3s;
          border-radius: 12px;
        }

        .history-notification-card:hover {
          background: #f8fafc;
          transform: translateX(4px);
        }

        .history-notification-card.unread {
          background: #fefce8;
        }

        .history-notification-card.unread:hover {
          background: #fef9c3;
        }

        .history-notification-avatar {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }

        .history-avatar-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .history-avatar-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 20px;
        }

        .history-notification-info {
          flex: 1;
        }

        .history-notification-header {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .history-notification-title {
          font-size: 14px;
          color: #1e293b;
        }

        .history-notification-title strong {
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
        }

        .history-notification-details {
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

        .history-notification-action {
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

        .history-notification-card:hover .history-notification-action {
          background: #e9691e;
          transform: translateX(4px);
        }

        .history-notification-card:hover .history-notification-action i {
          color: white;
        }

        .history-notification-action i {
          color: #94a3b8;
          font-size: 18px;
        }

        .history-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 0 0 24px 24px;
        }

        .pagination-btn {
          padding: 8px 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 40px;
          cursor: pointer;
          font-size: 13px;
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
        }

        .pagination-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .pagination-info {
          color: #475569;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 16px;
          background: white;
          border-radius: 40px;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }

        .empty-state i {
          font-size: 60px;
          color: #cbd5e1;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          font-size: 18px;
          color: #1e293b;
          margin: 0 0 8px 0;
        }

        .empty-state p {
          color: #64748b;
          margin: 0;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .modal-content {
          width: 95%;
          max-width: 1200px;
          height: 90vh;
          background: white;
          border-radius: 16px;
          padding: 20px;
          position: relative;
          overflow-y: auto;
          animation: modalFade 0.3s ease;
        }

        @keyframes modalFade {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 20px;
          border: none;
          background: #f44336;
          color: white;
          font-size: 18px;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          z-index: 10;
        }
      `}</style>
    </>
  );
};

export default NotificationBell;