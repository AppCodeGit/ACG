"use client";

import React, { useEffect, useState } from "react";
import "./style/SystemSettings.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface SystemSettings {
  maintenance_mode: string;
  allow_registrations: string;
  session_lifetime_hours: string;
}

interface SecuritySettings {
  max_login_attempts: string;
  account_lock_duration_minutes: string;
}

interface Notification {
  id: number;
  type: "success" | "error" | "info";
  title: string;
  message: string;
}

const SystemSettings = () => {
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    maintenance_mode: "false",
    allow_registrations: "true",
    session_lifetime_hours: "24",
  });
  
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    max_login_attempts: "5",
    account_lock_duration_minutes: "30",
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Add notification
  const addNotification = (type: Notification["type"], title: string, message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Fetch settings
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API_URL}/api/settings`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch settings");

      const result = await response.json();
      if (result.success) {
        setSystemSettings({
          maintenance_mode: result.data.system.maintenance_mode || "false",
          allow_registrations: result.data.system.allow_registrations || "true",
          session_lifetime_hours: result.data.system.session_lifetime_hours || "24",
        });
        
        setSecuritySettings({
          max_login_attempts: result.data.security.max_login_attempts || "5",
          account_lock_duration_minutes: result.data.security.account_lock_duration_minutes || "30",
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      addNotification("error", "Error", "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  // Save settings
  const handleSaveAll = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API_URL}/api/settings`, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system: systemSettings,
          security: securitySettings,
        }),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      const result = await response.json();
      if (result.success) {
        addNotification("success", "Saved!", "Settings have been updated successfully");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      addNotification("error", "Save Failed", "Could not save settings");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

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
      {/* Notifications */}
      <div className="notification-container">
        {notifications.map(notification => (
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
      <header className="settings-header">
        <div>
          <h1 className="settings-title">System Settings</h1>
          <p className="settings-subtitle">Configure system preferences and security controls</p>
        </div>
        <div className="header-actions">
          <button className="btn-save-all" onClick={handleSaveAll} disabled={saving}>
            {saving ? (
              <>
                <div className="save-spinner-small"></div>
                Saving...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">save</span>
                Save All Settings
              </>
            )}
          </button>
        </div>
      </header>

      <div className="settings-grid">
        {/* System Settings Card */}
        <div className="settings-card">
          <div className="card-header">
            <div className="card-icon">
              <span className="material-symbols-outlined">settings</span>
            </div>
            <div>
              <h3 className="card-title">System Settings</h3>
              <p className="card-desc">Control system behavior and access</p>
            </div>
          </div>
          
          <div className="settings-form">
            {/* Maintenance Mode */}
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <span className="material-symbols-outlined">build</span>
                  Maintenance Mode
                </label>
                <p className="setting-description">Shows maintenance page to everyone except admins</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input 
                    type="checkbox"
                    checked={systemSettings.maintenance_mode === "true"}
                    onChange={(e) => setSystemSettings(prev => ({ 
                      ...prev, 
                      maintenance_mode: e.target.checked ? "true" : "false" 
                    }))}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className="toggle-label">
                  {systemSettings.maintenance_mode === "true" ? "ON" : "OFF"}
                </span>
              </div>
            </div>

            {/* Allow Registrations */}
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <span className="material-symbols-outlined">person_add</span>
                  Allow Registrations
                </label>
                <p className="setting-description">Prevents new student signups when OFF</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input 
                    type="checkbox"
                    checked={systemSettings.allow_registrations === "true"}
                    onChange={(e) => setSystemSettings(prev => ({ 
                      ...prev, 
                      allow_registrations: e.target.checked ? "true" : "false" 
                    }))}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className="toggle-label">
                  {systemSettings.allow_registrations === "true" ? "Open" : "Closed"}
                </span>
              </div>
            </div>

            {/* Session Lifetime */}
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <span className="material-symbols-outlined">schedule</span>
                  Session Lifetime
                </label>
                <p className="setting-description">How long before auto-logout</p>
              </div>
              <div className="setting-control">
                <select 
                  className="setting-select"
                  value={systemSettings.session_lifetime_hours}
                  onChange={(e) => setSystemSettings(prev => ({ 
                    ...prev, 
                    session_lifetime_hours: e.target.value 
                  }))}
                >
                  <option value="12">12 hours</option>
                  <option value="24">24 hours</option>
                  <option value="48">48 hours</option>
                  <option value="72">72 hours</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings Card */}
        <div className="settings-card">
          <div className="card-header">
            <div className="card-icon">
              <span className="material-symbols-outlined">security</span>
            </div>
            <div>
              <h3 className="card-title">Security & Access Control</h3>
              <p className="card-desc">Protect your system from unauthorized access</p>
            </div>
          </div>
          
          <div className="settings-form">
            {/* Max Login Attempts */}
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <span className="material-symbols-outlined">lock</span>
                  Max Login Attempts
                </label>
                <p className="setting-description">Locks account after X wrong passwords</p>
              </div>
              <div className="setting-control">
                <select 
                  className="setting-select"
                  value={securitySettings.max_login_attempts}
                  onChange={(e) => setSecuritySettings(prev => ({ 
                    ...prev, 
                    max_login_attempts: e.target.value 
                  }))}
                >
                  <option value="3">3 attempts</option>
                  <option value="5">5 attempts</option>
                </select>
              </div>
            </div>

            {/* Account Lock Duration */}
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">
                  <span className="material-symbols-outlined">hourglass_top</span>
                  Account Lock Duration
                </label>
                <p className="setting-description">How long account stays locked before retry</p>
              </div>
              <div className="setting-control">
                <select 
                  className="setting-select"
                  value={securitySettings.account_lock_duration_minutes}
                  onChange={(e) => setSecuritySettings(prev => ({ 
                    ...prev, 
                    account_lock_duration_minutes: e.target.value 
                  }))}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Card */}
      <div className="info-card">
        <div className="info-header">
          <span className="material-symbols-outlined">info</span>
          <h4>About These Settings</h4>
        </div>
        <div className="info-grid">
          <div className="info-item">
            <strong>Maintenance Mode</strong>
            <p>When enabled, students see maintenance page. Admins can still access normally.</p>
          </div>
          <div className="info-item">
            <strong>Allow Registrations</strong>
            <p>Control whether new students can sign up. Great for managing semester intakes.</p>
          </div>
          <div className="info-item">
            <strong>Session Lifetime</strong>
            <p>Students stay logged in for selected hours. After that, they must login again.</p>
          </div>
          <div className="info-item">
            <strong>Security Lockout</strong>
            <p>After max failed attempts, account locks for selected duration to prevent brute force attacks.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;