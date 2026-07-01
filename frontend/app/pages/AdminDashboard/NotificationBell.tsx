"use client";

import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import AssignmentManagement from "./AssignmentManagement/page";
import "./style/NotificationBell.css";

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
  
  // History modal states
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "read" | "unread">("all");
  const [historyCurrentPage, setHistoryCurrentPage] = useState(1);
  const [historyItemsPerPage] = useState(15);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  
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
      setupWebSocket();
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [adminId]);

  // Fetch history notifications when modal opens
  useEffect(() => {
    if (showHistoryModal && adminId) {
      fetchAllHistoryNotifications();
    }
  }, [showHistoryModal, adminId]);

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
      setHistoryError(null);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(
        `${API_URL}/api/assignments/notifications?adminId=${adminId}&limit=1000`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
      setHistoryCurrentPage(1);
    } catch (error) {
      console.error("Error fetching history notifications:", error);
      setHistoryError(error instanceof Error ? error.message : "Failed to load history");
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

  const handleViewHistory = () => {
    setIsOpen(false);
    setShowHistoryModal(true);
    if (adminId) {
      fetchAllHistoryNotifications();
    }
  };

  return (
    <>
      <div className="Admin-notification-bell" ref={dropdownRef}>
        <div className="notification-button" onClick={() => setIsOpen(!isOpen)}>
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </div>

        {isOpen && (
          <div className="Admin-notification-dropdown">
            <div className="dropdown-header">
              <h3>Notifications</h3>
              <div className="header-buttons">
                {unreadCount > 0 && (
                  <button className="mark-all-read" onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                )}
                <button className="view-all" onClick={handleViewHistory}>
                  <span className="material-symbols-outlined">history</span>
                  View all history
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

      {/* History Modal - NEW CLASS NAMES */}
      {showHistoryModal && (
        <div className="history-modal-backdrop" onClick={() => setShowHistoryModal(false)}>
          <div className="history-modal-panel" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="history-modal-topbar">
              <div className="history-modal-title-row">
                <div className="history-modal-icon-box">
                  <i className="bi bi-bell-fill"></i>
                </div>
                <h2>Notification History</h2>
                <button className="history-modal-close-btn" onClick={() => setShowHistoryModal(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
              <div className="history-modal-stats-row">
                <div className="history-stat-item">
                  <span className="history-stat-number">{allNotifications.length}</span>
                  <span className="history-stat-label">Total</span>
                </div>
                <div className="history-stat-item unread">
                  <span className="history-stat-number">{totalUnreadInHistory}</span>
                  <span className="history-stat-label">Unread</span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="history-modal-filters">
              <div className="history-modal-search">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Search by student, assignment, or program..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="history-modal-filter-group">
                <button
                  className={`history-filter-chip ${statusFilter === "all" ? "active" : ""}`}
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </button>
                <button
                  className={`history-filter-chip ${statusFilter === "unread" ? "active" : ""}`}
                  onClick={() => setStatusFilter("unread")}
                >
                  Unread
                </button>
                <button
                  className={`history-filter-chip ${statusFilter === "read" ? "active" : ""}`}
                  onClick={() => setStatusFilter("read")}
                >
                  Read
                </button>
                {totalUnreadInHistory > 0 && (
                  <button className="history-mark-all-btn" onClick={markAllAsRead}>
                    <i className="bi bi-check2-all"></i> Mark all as read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="history-modal-list">
              {isHistoryLoading ? (
                <div className="history-loading-state">
                  <div className="history-loading-spinner"></div>
                  <p>Loading history...</p>
                </div>
              ) : historyError ? (
                <div className="history-error-state">
                  <i className="bi bi-exclamation-triangle"></i>
                  <p>{historyError}</p>
                  <button onClick={() => fetchAllHistoryNotifications()} className="history-retry-btn">
                    <i className="bi bi-arrow-clockwise"></i> Retry
                  </button>
                </div>
              ) : paginatedHistory.length === 0 ? (
                <div className="history-empty-state">
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
                      className={`history-notification-entry ${!notification.read ? "unread" : ""}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="history-entry-avatar">
                        {profileImage && !hasError ? (
                          <img
                            src={profileImage}
                            alt={notification.studentName}
                            className="history-avatar-image"
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
                      <div className="history-entry-content">
                        <div className="history-entry-header">
                          <div className="history-entry-title">
                            <strong>{notification.studentName}</strong> submitted
                            <span className="history-assignment-name"> {notification.assignmentTitle}</span>
                          </div>
                          {!notification.read && <span className="history-unread-badge">New</span>}
                        </div>
                        <div className="history-entry-meta">
                          <span className="history-program-tag">
                            <i className="bi bi-building"></i> {notification.programName}
                          </span>
                          <span className="history-time-tag">
                            <i className="bi bi-clock"></i> {formatTime(notification.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="history-entry-action">
                        <i className="bi bi-chevron-right"></i>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Pagination */}
            {totalHistoryPages > 1 && !isHistoryLoading && !historyError && (
              <div className="history-modal-pagination">
                <button
                  className="history-page-btn"
                  onClick={() => setHistoryCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={historyCurrentPage === 1}
                >
                  <i className="bi bi-chevron-left"></i> Previous
                </button>
                <span className="history-page-info">
                  Page {historyCurrentPage} of {totalHistoryPages}
                </span>
                <button
                  className="history-page-btn"
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
            <AssignmentManagement />
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationBell;