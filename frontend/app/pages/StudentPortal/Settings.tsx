"use client";

import { useState, useEffect } from "react";
import "./style/Settings.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface AcademicInfo {
  programName: string;
  studyArea: string;
  qualification: string;
  institution: string;
  graduationYear: number | null;
}

interface NotificationPrefs {
  gradeAlerts: boolean;
  assignmentReminders: boolean;
  systemAnnouncements: boolean;
}

interface Session {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: Date;
  isCurrent: boolean;
}

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Academic Info State
  const [academicInfo, setAcademicInfo] = useState<AcademicInfo>({
    programName: "",
    studyArea: "",
    qualification: "",
    institution: "",
    graduationYear: null
  });
  
  // Notification Preferences State
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    gradeAlerts: true,
    assignmentReminders: true,
    systemAnnouncements: true
  });
  
  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // Session History State
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  // Get user email from localStorage
  const getUserEmail = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.email;
      } catch {
        return null;
      }
    }
    return null;
  };
  
  const userEmail = getUserEmail();

  // Fetch settings on mount
  useEffect(() => {
    if (userEmail) {
      fetchSettings();
      fetchSessions();
    }
  }, [userEmail]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/student-settings/${encodeURIComponent(userEmail)}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      
      if (!response.ok) throw new Error("Failed to fetch settings");
      
      const result = await response.json();
      if (result.success) {
        setAcademicInfo(result.data.academic);
        setNotifications(result.data.notifications);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/student-settings/${encodeURIComponent(userEmail)}/sessions`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        setSessions(result.data);
      }
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const handleAcademicUpdate = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/student-settings/${encodeURIComponent(userEmail)}/academic`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(academicInfo)
      });
      
      const result = await response.json();
      if (result.success) {
        setSuccess("Academic information updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result.message || "Failed to update");
      }
    } catch (err) {
      setError("Failed to update academic information");
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/student-settings/${encodeURIComponent(userEmail)}/notifications`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(notifications)
      });
      
      const result = await response.json();
      if (result.success) {
        setSuccess("Notification preferences updated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result.message || "Failed to update");
      }
    } catch (err) {
      setError("Failed to update notification preferences");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    
    setSaving(true);
    setError("");
    setSuccess("");
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/student-settings/${encodeURIComponent(userEmail)}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setSuccess("Password changed successfully! Please log in again.");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowPasswordForm(false);
        
        // Clear tokens and redirect to login after 3 seconds
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }, 3000);
      } else {
        setError(result.message || "Failed to change password");
      }
    } catch (err) {
      setError("Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/api/student-settings/${encodeURIComponent(userEmail)}/sessions/${sessionId}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      
      fetchSessions(); // Refresh session list
      setSuccess("Session revoked successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to revoke session");
    }
  };

  if (loading) {
    return (
      <div className="settings-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and security</p>
      </div>

      {error && (
        <div className="alert error">
          <i className="bi bi-exclamation-triangle-fill"></i>
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="alert success">
          <i className="bi bi-check-circle-fill"></i>
          <span>{success}</span>
        </div>
      )}

      <div className="settings-grid">
        {/* Academic Information */}
        <div className="settings-card">
          <div className="card-header">
            <div className="card-icon">
              <i className="bi bi-mortarboard-fill"></i>
            </div>
            <div>
              <h3>Academic Information</h3>
              <p>Update your academic details</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="form-group">
              <label>Program Name</label>
              <input
                type="text"
                value={academicInfo.programName}
                onChange={(e) => setAcademicInfo({ ...academicInfo, programName: e.target.value })}
                placeholder="e.g., Computer Science"
              />
            </div>

            <div className="form-group">
              <label>Study Area / Specialization</label>
              <input
                type="text"
                value={academicInfo.studyArea}
                onChange={(e) => setAcademicInfo({ ...academicInfo, studyArea: e.target.value })}
                placeholder="e.g., Web Development, Data Science"
              />
            </div>

            <div className="form-group">
              <label>Qualification</label>
              <input
                type="text"
                value={academicInfo.qualification}
                onChange={(e) => setAcademicInfo({ ...academicInfo, qualification: e.target.value })}
                placeholder="e.g., Bachelor's Degree, Diploma"
              />
            </div>

            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                value={academicInfo.institution}
                onChange={(e) => setAcademicInfo({ ...academicInfo, institution: e.target.value })}
                placeholder="Your institution name"
              />
            </div>

            <div className="form-group">
              <label>Graduation Year</label>
              <input
                type="number"
                value={academicInfo.graduationYear || ""}
                onChange={(e) => setAcademicInfo({ ...academicInfo, graduationYear: parseInt(e.target.value) || null })}
                placeholder="e.g., 2025"
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 10}
              />
            </div>

            <button className="btn-save" onClick={handleAcademicUpdate} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="settings-card">
          <div className="card-header">
            <div className="card-icon">
              <i className="bi bi-bell-fill"></i>
            </div>
            <div>
              <h3>Notification Preferences</h3>
              <p>Choose what updates you want to receive</p>
            </div>
          </div>

          <div className="settings-form">
            <div className="toggle-item">
              <div className="toggle-info">
                <h4>Grade Alerts</h4>
                <p>Get notified when new grades are posted</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.gradeAlerts}
                  onChange={(e) => setNotifications({ ...notifications, gradeAlerts: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <h4>Assignment Reminders</h4>
                <p>Receive reminders for upcoming assignments</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.assignmentReminders}
                  onChange={(e) => setNotifications({ ...notifications, assignmentReminders: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-item">
              <div className="toggle-info">
                <h4>System Announcements</h4>
                <p>Important updates about the platform</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.systemAnnouncements}
                  onChange={(e) => setNotifications({ ...notifications, systemAnnouncements: e.target.checked })}
                />
                <span className="slider"></span>
              </label>
            </div>

            <button className="btn-save" onClick={handleNotificationUpdate} disabled={saving}>
              {saving ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </div>

        {/* Account Security */}
        <div className="settings-card full-width">
          <div className="card-header">
            <div className="card-icon">
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <div>
              <h3>Account Security</h3>
              <p>Manage your password and active sessions</p>
            </div>
          </div>

          <div className="security-section">
            {/* Change Password */}
            <div className="password-section">
              <h4>Change Password</h4>
              {!showPasswordForm ? (
                <button className="btn-secondary" onClick={() => setShowPasswordForm(true)}>
                  Change Password
                </button>
              ) : (
                <div className="password-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="password-actions">
                    <button className="btn-secondary" onClick={() => setShowPasswordForm(false)}>
                      Cancel
                    </button>
                    <button className="btn-primary" onClick={handlePasswordChange} disabled={saving}>
                      {saving ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Active Sessions */}
            <div className="sessions-section">
              <h4>Active Sessions</h4>
              {sessions.length === 0 ? (
                <p className="no-sessions">No active sessions found</p>
              ) : (
                <div className="sessions-list">
                  {sessions.map((session) => (
                    <div key={session.id} className="session-item">
                      <div className="session-info">
                        <div className="session-device">
                          <i className="bi bi-laptop"></i>
                          <span>{session.device}</span>
                          {session.isCurrent && <span className="current-badge">Current</span>}
                        </div>
                        <div className="session-details">
                          <span>{session.location}</span>
                          <span>•</span>
                          <span>IP: {session.ipAddress}</span>
                          <span>•</span>
                          <span>Last active: {new Date(session.lastActive).toLocaleString()}</span>
                        </div>
                      </div>
                      {!session.isCurrent && (
                        <button className="btn-danger" onClick={() => revokeSession(session.id)}>
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;