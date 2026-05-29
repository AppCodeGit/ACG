// app/pages/StudentPortal/Settings.tsx
"use client";

import { useState } from "react";
import "./style/Settings.css";

// Types
interface Notifications {
  email: boolean;
  push: boolean;
  sms: boolean;
  assignmentReminders: boolean;
  gradeUpdates: boolean;
  courseAnnouncements: boolean;
  deadlineAlerts: boolean;
}

interface Privacy {
  profileVisibility: string;
  showEmail: boolean;
  showPhone: boolean;
  showEnrollment: boolean;
  allowMessages: boolean;
  dataSharing: boolean;
}

interface Security {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
}

interface Profile {
  name: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  enrollmentYear: string;
  bio: string;
  avatar: string;
  coverPhoto: string;
}

interface Preferences {
  theme: string;
  language: string;
  timezone: string;
  dateFormat: string;
  fontSize: string;
  reduceAnimations: boolean;
}

interface ConnectedAccount {
  provider: string;
  connected: boolean;
  email: string;
}

interface UserData {
  profile: Profile;
  preferences: Preferences;
  connectedAccounts: ConnectedAccount[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  department: string;
  enrollmentYear: string;
}

const Settings = () => {
  const [notifications, setNotifications] = useState<Notifications>({
    email: true,
    push: true,
    sms: false,
    assignmentReminders: true,
    gradeUpdates: true,
    courseAnnouncements: true,
    deadlineAlerts: true
  });
  const [privacy, setPrivacy] = useState<Privacy>({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showEnrollment: true,
    allowMessages: true,
    dataSharing: false
  });
  const [security, setSecurity] = useState<Security>({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30
  });

  // Sample user data
  const userData: UserData = {
    profile: {
      name: "Alex Johnson",
      email: "alex.johnson@student.edu",
      phone: "+1 (555) 123-4567",
      studentId: "STU2024001",
      department: "Computer Science",
      enrollmentYear: "2022",
      bio: "Passionate computer science student specializing in web development and AI. Always eager to learn new technologies and collaborate on innovative projects.",
      avatar: "/api/placeholder/150/150",
      coverPhoto: "/api/placeholder/800/200"
    },
    preferences: {
      theme: "light",
      language: "english",
      timezone: "UTC-5",
      dateFormat: "MM/DD/YYYY",
      fontSize: "medium",
      reduceAnimations: false
    },
    connectedAccounts: [
      { provider: "google", connected: true, email: "alex.j@gmail.com" },
      { provider: "github", connected: true, email: "alex-johnson" },
      { provider: "linkedin", connected: false, email: "" },
      { provider: "microsoft", connected: false, email: "" }
    ]
  };

  const [formData, setFormData] = useState<FormData>({
    name: userData.profile.name,
    email: userData.profile.email,
    phone: userData.profile.phone,
    bio: userData.profile.bio,
    department: userData.profile.department,
    enrollmentYear: userData.profile.enrollmentYear
  });

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationToggle = (key: keyof Notifications): void => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key: keyof Privacy, value: string | boolean): void => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSecurityChange = (key: keyof Security, value: boolean | number): void => {
    setSecurity(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveProfile = (): void => {
    console.log("Saving profile:", formData);
    alert("Profile updated successfully!");
  };

  const handleExportData = (): void => {
    console.log("Exporting user data...");
    alert("Your data export has started. You will receive an email when it is ready.");
  };

  const handleDeleteAccount = (): void => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account...");
      alert("Account deletion process initiated. You will receive a confirmation email.");
    }
  };

  return (
    <div className="settings-container">
      {/* Header */}
      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage your account preferences and privacy settings</p>
      </div>

      <div className="settings-content-full">
        {/* Profile Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h2>Profile Information</h2>
            <p>Update your personal information and how others see you on the platform</p>
          </div>

          <div className="profile-cover">
            <img src={userData.profile.coverPhoto} alt="Cover" />
            <button className="edit-cover-btn">
              <i className="bi bi-camera"></i>
              Change Cover
            </button>
          </div>

          <div className="profile-avatar-section">
            <div className="avatar-container">
              <img src={userData.profile.avatar} alt="Avatar" />
              <button className="edit-avatar-btn">
                <i className="bi bi-camera-fill"></i>
              </button>
            </div>
            <div className="avatar-info">
              <h3>Profile Picture</h3>
              <p>Recommended: Square JPG, PNG, at least 500x500 pixels</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={formData.department}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange("department", e.target.value)}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Psychology">Psychology</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="enrollmentYear">Enrollment Year</label>
              <select
                id="enrollmentYear"
                value={formData.enrollmentYear}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange("enrollmentYear", e.target.value)}
              >
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                rows={4}
              />
              <div className="char-count">{formData.bio.length}/500</div>
            </div>
          </div>

          <div className="section-actions">
            <button className="btn secondary">Cancel</button>
            <button className="btn primary" onClick={handleSaveProfile}>
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h2>Notification Preferences</h2>
            <p>Choose how and when you want to be notified about platform activities</p>
          </div>

          <div className="notification-categories">
            <div className="category-group">
              <h3>Notification Methods</h3>
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Email Notifications</h4>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationToggle("email")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Push Notifications</h4>
                    <p>Receive browser push notifications</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() => handleNotificationToggle("push")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>SMS Notifications</h4>
                    <p>Receive text message alerts</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={() => handleNotificationToggle("sms")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="category-group">
              <h3>Course Notifications</h3>
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Assignment Reminders</h4>
                    <p>Get reminders for upcoming assignments</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.assignmentReminders}
                      onChange={() => handleNotificationToggle("assignmentReminders")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Grade Updates</h4>
                    <p>Notify when new grades are posted</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.gradeUpdates}
                      onChange={() => handleNotificationToggle("gradeUpdates")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Course Announcements</h4>
                    <p>Important announcements from instructors</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.courseAnnouncements}
                      onChange={() => handleNotificationToggle("courseAnnouncements")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Deadline Alerts</h4>
                    <p>Alerts for approaching deadlines</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.deadlineAlerts}
                      onChange={() => handleNotificationToggle("deadlineAlerts")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="section-actions">
            <button className="btn primary">Save Preferences</button>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h2>Privacy Settings</h2>
            <p>Control your privacy and how your information is shared</p>
          </div>

          <div className="privacy-options">
            <div className="privacy-group">
              <h3>Profile Visibility</h3>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={privacy.profileVisibility === "public"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePrivacyChange("profileVisibility", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  <div className="radio-info">
                    <h4>Public</h4>
                    <p>Anyone can see your profile</p>
                  </div>
                </label>

                <label className="radio-item">
                  <input
                    type="radio"
                    name="visibility"
                    value="students"
                    checked={privacy.profileVisibility === "students"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePrivacyChange("profileVisibility", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  <div className="radio-info">
                    <h4>Students Only</h4>
                    <p>Only enrolled students can see your profile</p>
                  </div>
                </label>

                <label className="radio-item">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={privacy.profileVisibility === "private"}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePrivacyChange("profileVisibility", e.target.value)}
                  />
                  <span className="radio-custom"></span>
                  <div className="radio-info">
                    <h4>Private</h4>
                    <p>Only you can see your profile</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="privacy-group">
              <h3>Information Sharing</h3>
              <div className="toggle-group">
                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Show Email Address</h4>
                    <p>Allow others to see your email address</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacy.showEmail}
                      onChange={() => handlePrivacyChange("showEmail", !privacy.showEmail)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Show Phone Number</h4>
                    <p>Allow others to see your phone number</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacy.showPhone}
                      onChange={() => handlePrivacyChange("showPhone", !privacy.showPhone)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Show Enrollment Status</h4>
                    <p>Display your courses and enrollment information</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacy.showEnrollment}
                      onChange={() => handlePrivacyChange("showEnrollment", !privacy.showEnrollment)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Allow Direct Messages</h4>
                    <p>Let other students send you messages</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacy.allowMessages}
                      onChange={() => handlePrivacyChange("allowMessages", !privacy.allowMessages)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="toggle-item">
                  <div className="toggle-info">
                    <h4>Data Sharing for Analytics</h4>
                    <p>Help improve the platform by sharing usage data</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={privacy.dataSharing}
                      onChange={() => handlePrivacyChange("dataSharing", !privacy.dataSharing)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="section-actions">
            <button className="btn primary">Update Privacy Settings</button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h2>Security Settings</h2>
            <p>Manage your account security and access controls</p>
          </div>

          <div className="security-options">
            <div className="security-group">
              <h3>Authentication</h3>
              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={security.twoFactorAuth}
                    onChange={() => handleSecurityChange("twoFactorAuth", !security.twoFactorAuth)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              {security.twoFactorAuth && (
                <div className="two-factor-setup">
                  <p>Two-factor authentication is now enabled. You'll need to enter a verification code from your authenticator app when signing in.</p>
                  <button className="btn secondary">Manage Authenticator App</button>
                </div>
              )}
            </div>

            <div className="security-group">
              <h3>Session Settings</h3>
              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>Login Alerts</h4>
                  <p>Get notified when your account is accessed from a new device</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={security.loginAlerts}
                    onChange={() => handleSecurityChange("loginAlerts", !security.loginAlerts)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="select-item">
                <div className="select-info">
                  <h4>Session Timeout</h4>
                  <p>Automatically log out after period of inactivity</p>
                </div>
                <select
                  value={security.sessionTimeout}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSecurityChange("sessionTimeout", parseInt(e.target.value))}
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                  <option value={0}>Never</option>
                </select>
              </div>
            </div>

            <div className="security-group">
              <h3>Active Sessions</h3>
              <div className="sessions-list">
                <div className="session-item current">
                  <div className="session-info">
                    <h4>Current Session</h4>
                    <p>Chrome • Windows • New York, USA</p>
                    <span className="session-time">Active now</span>
                  </div>
                  <button className="btn danger">Log Out</button>
                </div>
                
                <div className="session-item">
                  <div className="session-info">
                    <h4>Mobile App</h4>
                    <p>iOS • iPhone 14 • Boston, USA</p>
                    <span className="session-time">2 hours ago</span>
                  </div>
                  <button className="btn danger">Log Out</button>
                </div>
              </div>
            </div>
          </div>

          <div className="password-section">
            <h3>Change Password</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" placeholder="Enter current password" />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input type="password" id="newPassword" placeholder="Enter new password" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm new password" />
              </div>
            </div>
            <button className="btn primary">Update Password</button>
          </div>
        </div>

        {/* Preferences Settings */}
        <div className="settings-section">
          <div className="section-header">
            <h2>Appearance & Preferences</h2>
            <p>Customize your learning environment to suit your preferences</p>
          </div>

          <div className="preferences-options">
            <div className="preference-group">
              <h3>Appearance</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="theme">Theme</label>
                  <select id="theme" defaultValue={userData.preferences.theme}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="fontSize">Font Size</label>
                  <select id="fontSize" defaultValue={userData.preferences.fontSize}>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="language">Language</label>
                  <select id="language" defaultValue={userData.preferences.language}>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="timezone">Timezone</label>
                  <select id="timezone" defaultValue={userData.preferences.timezone}>
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">GMT (UTC+0)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="dateFormat">Date Format</label>
                  <select id="dateFormat" defaultValue={userData.preferences.dateFormat}>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="preference-group">
              <h3>Accessibility</h3>
              <div className="toggle-item">
                <div className="toggle-info">
                  <h4>Reduce Animations</h4>
                  <p>Minimize motion and animations throughout the platform</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    defaultChecked={userData.preferences.reduceAnimations}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="section-actions">
            <button className="btn primary">Save Preferences</button>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="settings-section">
          <div className="section-header">
            <h2>Connected Accounts</h2>
            <p>Manage your connected social and service accounts</p>
          </div>

          <div className="connected-accounts">
            {userData.connectedAccounts.map((account: ConnectedAccount, index: number) => (
              <div key={index} className="account-item">
                <div className="account-info">
                  <div className="account-icon">
                    {account.provider === "google" && "🔍"}
                    {account.provider === "github" && "💻"}
                    {account.provider === "linkedin" && "💼"}
                    {account.provider === "microsoft" && "🔵"}
                  </div>
                  <div className="account-details">
                    <h4>{account.provider.charAt(0).toUpperCase() + account.provider.slice(1)}</h4>
                    <p>{account.connected ? `Connected as ${account.email}` : "Not connected"}</p>
                  </div>
                </div>
                <button className={`btn ${account.connected ? "danger" : "primary"}`}>
                  {account.connected ? "Disconnect" : "Connect"}
                </button>
              </div>
            ))}
          </div>

          <div className="account-benefits">
            <h3>Benefits of Connecting Accounts</h3>
            <ul>
              <li>Faster login with single sign-on</li>
              <li>Sync your calendar and contacts</li>
              <li>Import projects and repositories</li>
              <li>Enhanced collaboration features</li>
            </ul>
          </div>
        </div>

        {/* Data Management */}
        <div className="settings-section">
          <div className="section-header">
            <h2>Data Management</h2>
            <p>Control your data and privacy on the platform</p>
          </div>

          <div className="data-options">
            <div className="data-card">
              <div className="data-icon">📥</div>
              <div className="data-info">
                <h3>Export Your Data</h3>
                <p>Download a copy of your personal data, including profile information, course progress, and submissions.</p>
              </div>
              <button className="btn primary" onClick={handleExportData}>
                Export Data
              </button>
            </div>

            <div className="data-card">
              <div className="data-icon">🗑️</div>
              <div className="data-info">
                <h3>Clear Learning Data</h3>
                <p>Remove your course progress, quiz attempts, and learning analytics while keeping your account active.</p>
              </div>
              <button className="btn warning">
                Clear Data
              </button>
            </div>

            <div className="data-card danger-zone">
              <div className="data-icon">⚠️</div>
              <div className="data-info">
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
              </div>
              <button className="btn danger" onClick={handleDeleteAccount}>
                Delete Account
              </button>
            </div>
          </div>

          <div className="data-stats">
            <h3>Data Storage Overview</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">2.7 GB</span>
                <span className="stat-label">Total Storage Used</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">156</span>
                <span className="stat-label">Course Files</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">42</span>
                <span className="stat-label">Assignment Submissions</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">18</span>
                <span className="stat-label">Quiz Attempts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;