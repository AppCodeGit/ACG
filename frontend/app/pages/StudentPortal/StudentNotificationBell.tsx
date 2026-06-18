"use client";

import { useState, useEffect, useRef } from "react";
import "./style/NotificationBell.css";

interface StudentNotification {
  id: number;
  studentId: number;
  type: string;
  title: string;
  message: string;
  data: any;
  read: boolean;
  createdAt: string;
}

const StudentNotificationBell = () => {
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [studentEmail, setStudentEmail] = useState<string | null>(null);

  // Get student email from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const studentDataStr = localStorage.getItem("studentData");
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setStudentEmail(user.email);
      } catch (err) {
        console.error("Error parsing user:", err);
      }
    }
    
    if (studentDataStr) {
      try {
        const studentData = JSON.parse(studentDataStr);
        setStudentEmail(studentData.email);
      } catch (err) {
        console.error("Error parsing student data:", err);
      }
    }
  }, []);

  // Fetch notifications
  useEffect(() => {
    if (studentEmail) {
      fetchNotifications();
    }
  }, [studentEmail]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    if (!studentEmail) return;
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API_URL}/api/student-notifications/${encodeURIComponent(studentEmail)}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      
      if (!response.ok) throw new Error("Failed to fetch notifications");
      
      const result = await response.json();
      setNotifications(result.data || []);
      setUnreadCount(result.unreadCount || 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: number) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      
      await fetch(`${API_URL}/api/student-notifications/${notificationId}/read`, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!studentEmail) return;
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      
      await fetch(`${API_URL}/api/student-notifications/mark-all-read/${encodeURIComponent(studentEmail)}`, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "GRADE_POSTED":
        return "📊";
      case "ASSIGNMENT_REMINDER":
        return "⏰";
      case "SYSTEM_ANNOUNCEMENT":
        return "📢";
      case "COURSE_ENROLLMENT":
        return "📚";
      case "PAYMENT_CONFIRMATION":
        return "💰";
      default:
        return "🔔";
    }
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

  return (
    <div className="student-notification-bell" ref={dropdownRef}>
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
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>
          <div className="dropdown-body">
            {isLoading ? (
              <div className="loading-state">
                <div className="loading-spinner-small"></div>
                <p>Loading...</p>
              </div>
            ) : notifications.filter((n) => !n.read).length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">✅</span>
                <p>All caught up! No new notifications</p>
              </div>
            ) : (
              notifications
                .filter((notification) => !notification.read)
                .map((notification) => (
                  <div
                    key={notification.id}
                    className="notification-item unread"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="notification-icon-wrapper">
                      <span className="notification-icon">
                        {getNotificationIcon(notification.type)}
                      </span>
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">
                        <strong>{notification.title}</strong>
                      </div>
                      <div className="notification-message">
                        {notification.message}
                      </div>
                      <div className="notification-time">
                        {formatTime(notification.createdAt)}
                      </div>
                    </div>
                    <div className="unread-dot"></div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentNotificationBell;