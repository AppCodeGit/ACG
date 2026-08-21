"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import "./style/StudentPortal.css";
import Logo from "./images/appcode.png";
import PaymentInfo from "./PaymentInfo";
import Dashboard from "./Dashboard";
import FeesPayment from "./FeesPayment";
import CourseModule from "./CourseModule";
import CoursePerformance from "./CoursePerformance";
import CourseGrade from "./CourseGrade";
import Settings from "./Settings";
import { getSetting } from "../../../lib/settings";
import SubscriptionManagement from "./SubscriptionManagement";
import StudentNotificationBell from "./StudentNotificationBell";

// Import SearchResults
import SearchResults from "./SearchResults";

// Define interfaces for type safety
interface StudentData {
  id?: number;
  name?: string;
  email?: string;
  profileImage?: string;
  personalDetails?: {
    profileImage?: string;
    phone?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface ProfileModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  studentData: StudentData | null;
  fetchStudentData: () => void;
}

interface User {
  id?: string;
  name?: string;
  email?: string;
}

interface ProfileImageResponse {
  success: boolean;
  profileImage?: string;
}

// Profile Modal Component
const ProfileModal = ({
  isOpen,
  setIsOpen,
  studentData,
  fetchStudentData,
}: ProfileModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserFromStorage = () => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      try {
        return userStr ? JSON.parse(userStr) : null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const user = getUserFromStorage();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("modal") === "profile") {
        setIsOpen(true);
      }
    }
  }, [setIsOpen]);

  const [profileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editPhone, setEditPhone] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [editName, setEditName] = useState(false);
  const [newName, setNewName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkUserData = () => {
      try {
        let parsedUser: { email?: string } | null = null;
        const userStr = localStorage.getItem("user");
        if (userStr) {
          try {
            parsedUser = JSON.parse(userStr);
          } catch (e) {
            console.error("Invalid user JSON:", e);
          }
        }

        const userEmail: string | null =
          localStorage.getItem("userEmail") ||
          localStorage.getItem("email") ||
          parsedUser?.email ||
          null;

        const userDataStr =
          localStorage.getItem("user") ||
          localStorage.getItem("userData") ||
          localStorage.getItem("studentData");

        if (userDataStr) {
          try {
            const userData = JSON.parse(userDataStr);
            setUserData(userData);
            if (userData.email) {
              setUserEmail(userData.email);
              setNewEmail(userData.email);
            }
            if (userData.name) {
              setUserName(userData.name);
              setNewName(userData.name);
            }
            if (userData.phone) {
              setPhoneNumber(userData.phone);
              setNewPhone(userData.phone);
            }
          } catch (e) {
            console.error("Error parsing user data:", e);
          }
        }

        if (userEmail) {
          setUserEmail(userEmail);
          setNewEmail(userEmail);
          fetchProfileData(userEmail);
        } else {
          setMessage("User email not found in storage. Please log in again.");
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        setMessage(
          "Error accessing browser storage. Please check if cookies are enabled.",
        );
      }
    };

    checkUserData();
  }, []);

  const fetchProfileData = async (email: string | null) => {
    if (!email) {
      setMessage("No email provided for fetching profile data");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const userResponse = await fetch(`${API_URL}/api/profile/${email}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        const userData = await userResponse.json();

        if (userData.success) {
          const userDataInfo = userData.user;
          setUserName(userDataInfo.name);
          setNewName(userDataInfo.name);
          setUserEmail(userDataInfo.email);
          setNewEmail(userDataInfo.email);

          try {
            const userStr = localStorage.getItem("user");
            if (userStr) {
              const existingData = JSON.parse(userStr);
              existingData.name = userDataInfo.name;
              existingData.email = userDataInfo.email;
              localStorage.setItem("user", JSON.stringify(existingData));
            }
          } catch (e) {
            console.error("Error updating localStorage:", e);
          }
        }
      } catch (userError) {
        console.log("User endpoint might not be implemented yet:", userError);
      }

      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const imageResponse = await fetch(
          `${API_URL}/api/profile/profile-image/${email}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );

        const imageData = await imageResponse.json();

        if (imageData.success) {
          setProfileImage(imageData.profileImage);
        }
      } catch (imageError) {
        console.log("Image endpoint might not be implemented yet:", imageError);
      }

      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const phoneResponse = await fetch(
          `${API_URL}/api/profile/phone/${email}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          },
        );

        const phoneData = await phoneResponse.json();

        if (phoneData.success && phoneData.phone) {
          setPhoneNumber(phoneData.phone);
          setNewPhone(phoneData.phone);
        }
      } catch (phoneError) {
        console.log("Phone endpoint might not be implemented yet:", phoneError);
      }

      setMessage("");
    } catch (error) {
      console.error("Error fetching profile data:", error);

      if (error instanceof Error) {
        if (error.message === "Failed to fetch") {
          setMessage(
            "Cannot connect to server. Please make sure the backend is running on port 5000.",
          );
        } else {
          setMessage("Failed to fetch profile data: " + error.message);
        }
      } else {
        setMessage("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage("File size must be less than 2MB");
        return;
      }
      if (!file.type.match("image.*")) {
        setMessage("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      setSelectedFile(file);
      setMessage("");
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!userEmail) {
      setMessage("User email not found. Please log in again.");
      return;
    }
    if (!selectedFile) {
      setMessage("Please select an image first");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onloadend = async () => {
        const base64Image = reader.result;
        const token = localStorage.getItem("token");

        try {
          const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          const response = await fetch(
            `${API_URL}/api/profile/profile-image/${userEmail}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
              },
              body: JSON.stringify({ profileImage: base64Image }),
            },
          );

          const data = await response.json();

          if (data.success) {
            setProfileImage(data.profileImage);
            setMessage("Profile image updated successfully!");
            setSelectedFile(null);
            setPreview("");
            if (fetchStudentData) fetchStudentData();
          } else {
            setMessage(data.message || "Failed to update profile image");
          }
        } catch (error) {
          console.error("Error updating profile image:", error);
          if (error instanceof Error) {
            if (error.message === "Failed to fetch") {
              setMessage(
                "Cannot connect to server. Please make sure the backend is running.",
              );
            } else {
              setMessage("Failed to update profile image: " + error.message);
            }
          } else {
            setMessage("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setMessage("Something went wrong while processing the image");
        setLoading(false);
      };
    } catch (error) {
      console.error("Error in handleUpload:", error);
      setMessage("An unexpected error occurred");
      setLoading(false);
    }
  };

  const handlePhoneUpdate = async () => {
    if (!userEmail) {
      setMessage("User email not found. Please log in again.");
      return;
    }
    if (!newPhone) {
      setMessage("Please enter a valid phone number");
      return;
    }

    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!phoneRegex.test(newPhone.replace(/[\s()-]/g, ""))) {
      setMessage("Please enter a valid phone number (10-15 digits)");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const token = localStorage.getItem("token");
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(
        `${API_URL}/api/profile/phone/${userEmail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ phone: newPhone }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setPhoneNumber(newPhone);
        setEditPhone(false);
        setMessage("Phone number updated successfully!");

        try {
          const userDataStr =
            localStorage.getItem("user") ||
            localStorage.getItem("userData") ||
            localStorage.getItem("studentData");
          if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            userData.phone = newPhone;
            localStorage.setItem("user", JSON.stringify(userData));
          }
        } catch (e) {
          console.error("Error updating local storage:", e);
        }
        if (fetchStudentData) fetchStudentData();
      } else {
        setMessage(data.message || "Failed to update phone number");
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      if (message === "Failed to fetch") {
        setMessage(
          "Cannot connect to server. Please make sure the backend is running.",
        );
      } else {
        setMessage("Failed to update phone number: " + message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNameUpdate = async () => {
    if (!userEmail) {
      setMessage("User email not found. Please log in again.");
      return;
    }
    if (!newName) {
      setMessage("Please enter a valid name");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const token = localStorage.getItem("token");
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/profile/name/${userEmail}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ name: newName }),
      });

      const data = await response.json();

      if (data.success) {
        setUserName(newName);
        setEditName(false);
        setMessage("Name updated successfully!");

        try {
          const userDataStr =
            localStorage.getItem("user") || localStorage.getItem("userData");
          if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            userData.name = newName;
            localStorage.setItem("user", JSON.stringify(userData));
          }
        } catch (e) {
          console.error("Error updating local storage:", e);
        }
        if (fetchStudentData) fetchStudentData();
      } else {
        setMessage(data.message || "Failed to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
      if (error instanceof Error) {
        if (error.message === "Failed to fetch") {
          setMessage(
            "Cannot connect to server. Please make sure the backend is running.",
          );
        } else {
          setMessage("Failed to update name: " + error.message);
        }
      } else {
        setMessage("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailUpdate = async () => {
    if (!userEmail) {
      setMessage("User email not found. Please log in again.");
      return;
    }
    if (!newEmail) {
      setMessage("Please enter a valid email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setMessage("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const token = localStorage.getItem("token");
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(
        `${API_URL}/api/profile/email/${userEmail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ newEmail }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setUserEmail(newEmail);
        setEditEmail(false);
        setMessage("Email updated successfully!");

        try {
          const userDataStr =
            localStorage.getItem("user") || localStorage.getItem("userData");
          if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            userData.email = newEmail;
            localStorage.setItem("user", JSON.stringify(userData));
          }
          localStorage.setItem("userEmail", newEmail);
        } catch (e) {
          console.error("Error updating local storage:", e);
        }
        if (fetchStudentData) fetchStudentData();
      } else {
        setMessage(data.message || "Failed to update email");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      if (error instanceof Error) {
        if (error.message === "Failed to fetch") {
          setMessage(
            "Cannot connect to server. Please make sure the backend is running.",
          );
        } else {
          setMessage("Failed to update email: " + error.message);
        }
      } else {
        setMessage("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!userEmail) {
      setMessage("User email not found. Please log in again.");
      return;
    }
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setMessage("Session expired. Please log in again.");
        return;
      }

      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(
        `${API_URL}/api/profile/password/${userEmail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            accessToken,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setEditPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setMessage(
          "Password updated successfully! Please login again with your new password.",
        );

        setTimeout(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("tokenExpiry");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userData");
          localStorage.removeItem("studentData");
          window.location.href = "/login";
        }, 3000);
      } else {
        setMessage(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      if (error instanceof Error) {
        if (error.message === "Failed to fetch") {
          setMessage(
            "Cannot connect to server. Please make sure the backend is running.",
          );
        } else {
          setMessage("Failed to update password: " + error.message);
        }
      } else {
        setMessage("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = (field: string) => {
    switch (field) {
      case "name":
        setNewName(userName);
        setEditName(false);
        break;
      case "email":
        setNewEmail(userEmail);
        setEditEmail(false);
        break;
      case "password":
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setEditPassword(false);
        break;
      case "phone":
        setNewPhone(phoneNumber);
        setEditPhone(false);
        break;
      default:
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`profile-modal-overlay ${isOpen ? "active" : ""}`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="profile-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="profile-manager-container">
          {loading && <div className="profile-loading">Loading...</div>}

          {message && (
            <div
              className={
                message.includes("success")
                  ? "profile-message profile-message-success"
                  : "profile-message profile-message-error"
              }
            >
              {message}
            </div>
          )}

          <div className="profile-user-info">
            <div className="profile-section-header">
              <span className="profile-section-icon">👤</span>
              <h3>Personal Information</h3>
            </div>

            <div className="profile-image-section">
              <div className="profile-current-image">
                <h4>
                  <span className="profile-icon">🖼️</span> Profile Image
                </h4>
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="profile-avatar"
                    onError={(e: any) => {
                      e.target.src = `https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true&size=128&name=${encodeURIComponent(user?.name || "User")}`;
                    }}
                  />
                ) : (
                  <div className="profile-no-image">
                    <img
                      src={`https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true&size=128&name=${encodeURIComponent(user?.name || "User")}`}
                      alt="Default Avatar"
                      className="profile-avatar"
                    />
                  </div>
                )}
              </div>

              <div className="profile-update-section">
                <h4>
                  <span className="profile-icon">📤</span> Update Profile Image
                </h4>
                <div className="profile-file-input">
                  <div className="profile-btn-wrapper">
                    <label
                      htmlFor="profile-upload"
                      className="profile-btn profile-btn-outline"
                    >
                      <span className="profile-btn-icon material-symbols-outlined">
                        cloud_upload
                      </span>
                      Choose Image
                      <span className="material-symbols-outlined">east</span>
                    </label>
                  </div>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    disabled={loading || !userEmail}
                  />
                  {selectedFile && (
                    <span className="profile-file-name">
                      <span className="material-symbols-outlined">
                        description
                      </span>
                      {selectedFile.name}
                    </span>
                  )}
                </div>

                {preview && (
                  <div className="profile-preview">
                    <h4>
                      <span className="material-symbols-outlined">preview</span>{" "}
                      Preview
                    </h4>
                    <img
                      src={preview}
                      alt="Preview"
                      className="profile-preview-img"
                    />
                  </div>
                )}

                <div className="profile-btn-wrapper">
                  <button
                    onClick={handleImageUpload}
                    disabled={!selectedFile || loading || !userEmail}
                    className="profile-btn profile-btn-primary"
                  >
                    {loading ? (
                      <>
                        <span className="profile-spinner"></span> Uploading...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">
                          upload
                        </span>{" "}
                        Upload Image
                        <span className="material-symbols-outlined">east</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div className="profile-field">
              <label>
                <span className="material-symbols-outlined">person</span> Name
              </label>
              {editName ? (
                <div className="profile-edit-field">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    disabled={loading}
                    className="profile-input"
                    placeholder="Enter your name"
                  />
                  <div className="profile-field-actions">
                    <div className="profile-btn-wrapper">
                      <button
                        onClick={handleNameUpdate}
                        disabled={loading}
                        className="profile-btn profile-btn-success"
                      >
                        <span className="material-symbols-outlined">save</span>{" "}
                        Save
                        <span className="material-symbols-outlined">east</span>
                      </button>
                      <button
                        onClick={() => cancelEdit("name")}
                        disabled={loading}
                        className="profile-btn profile-btn-danger"
                      >
                        <span className="material-symbols-outlined">close</span>{" "}
                        Cancel
                        <span className="material-symbols-outlined">east</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-display-field">
                  <span>
                    <span className="material-symbols-outlined">badge</span>
                    {userName || "Not set"}
                  </span>
                  <div className="profile-btn-wrapper">
                    <button
                      onClick={() => setEditName(true)}
                      className="profile-btn profile-btn-edit"
                    >
                      <span className="material-symbols-outlined">edit</span>{" "}
                      Edit
                      <span className="material-symbols-outlined">east</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className="profile-field">
              <label>
                <span className="material-symbols-outlined">email</span> Email
              </label>
              {editEmail ? (
                <div className="profile-edit-field">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    disabled={loading}
                    className="profile-input"
                    placeholder="Enter your email"
                  />
                  <div className="profile-field-actions">
                    <div className="profile-btn-wrapper">
                      <button
                        onClick={handleEmailUpdate}
                        disabled={loading}
                        className="profile-btn profile-btn-success"
                      >
                        <span className="material-symbols-outlined">save</span>{" "}
                        Save
                        <span className="material-symbols-outlined">east</span>
                      </button>
                      <button
                        onClick={() => cancelEdit("email")}
                        disabled={loading}
                        className="profile-btn profile-btn-danger"
                      >
                        <span className="material-symbols-outlined">close</span>{" "}
                        Cancel
                        <span className="material-symbols-outlined">east</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-display-field">
                  <span>
                    <span className="material-symbols-outlined">mail</span>
                    {userEmail || "Not set"}
                  </span>
                  <div className="profile-btn-wrapper">
                    <button
                      onClick={() => setEditEmail(true)}
                      className="profile-btn profile-btn-edit"
                    >
                      <span className="material-symbols-outlined">edit</span>{" "}
                      Edit
                      <span className="material-symbols-outlined">east</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="profile-field">
              <label>
                <span className="material-symbols-outlined">lock</span> Password
              </label>
              {editPassword ? (
                <div className="profile-edit-field">
                  <div className="profile-password-input">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current password"
                      disabled={loading}
                      className="profile-input"
                    />
                    <span
                      className="profile-password-toggle"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      <span className="material-symbols-outlined">
                        {showCurrentPassword ? "visibility_off" : "visibility"}
                      </span>
                    </span>
                  </div>

                  <div className="profile-password-input">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      disabled={loading}
                      className="profile-input"
                    />
                    <span
                      className="profile-password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      <span className="material-symbols-outlined">
                        {showNewPassword ? "visibility_off" : "visibility"}
                      </span>
                    </span>
                  </div>

                  <div className="profile-password-input">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      disabled={loading}
                      className="profile-input"
                    />
                    <span
                      className="profile-password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <span className="material-symbols-outlined">
                        {showConfirmPassword ? "visibility_off" : "visibility"}
                      </span>
                    </span>
                  </div>

                  <div className="profile-field-actions">
                    <div className="profile-btn-wrapper">
                      <button
                        onClick={handlePasswordUpdate}
                        disabled={loading}
                        className="profile-btn profile-btn-success"
                      >
                        <span className="material-symbols-outlined">save</span>{" "}
                        Save
                        <span className="material-symbols-outlined">east</span>
                      </button>
                      <button
                        onClick={() => cancelEdit("password")}
                        disabled={loading}
                        className="profile-btn profile-btn-danger"
                      >
                        <span className="material-symbols-outlined">close</span>{" "}
                        Cancel
                        <span className="material-symbols-outlined">east</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-display-field">
                  <span>
                    <span className="material-symbols-outlined">password</span>
                    ••••••••
                  </span>
                  <div className="profile-btn-wrapper">
                    <button
                      onClick={() => setEditPassword(true)}
                      className="profile-btn profile-btn-edit"
                    >
                      <span className="material-symbols-outlined">edit</span>{" "}
                      Edit
                      <span className="material-symbols-outlined">east</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="profile-field">
              <label>
                <span className="material-symbols-outlined">phone</span> Phone
                Number
              </label>
              {editPhone ? (
                <div className="profile-edit-field">
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    disabled={loading}
                    className="profile-input"
                  />
                  <div className="profile-field-actions">
                    <div className="profile-btn-wrapper">
                      <button
                        onClick={handlePhoneUpdate}
                        disabled={loading}
                        className="profile-btn profile-btn-success"
                      >
                        <span className="material-symbols-outlined">save</span>{" "}
                        Save
                        <span className="material-symbols-outlined">east</span>
                      </button>
                      <button
                        onClick={() => cancelEdit("phone")}
                        disabled={loading}
                        className="profile-btn profile-btn-danger"
                      >
                        <span className="material-symbols-outlined">close</span>{" "}
                        Cancel
                        <span className="material-symbols-outlined">east</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-display-field">
                  <span>
                    <span className="material-symbols-outlined">call</span>
                    {phoneNumber || "No phone number set"}
                  </span>
                  <div className="profile-btn-wrapper">
                    <button
                      onClick={() => setEditPhone(true)}
                      className="profile-btn profile-btn-edit"
                    >
                      <span className="material-symbols-outlined">edit</span>{" "}
                      Edit
                      <span className="material-symbols-outlined">east</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main StudentPortal Component
const StudentPortal = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] =
    useState<boolean>(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] =
    useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [checkingMaintenance, setCheckingMaintenance] = useState<boolean>(true);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // NEW: Sidebar open/close state for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSearch = (): void => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    } else {
      setShowSearchResults(false);
      setSearchQuery("");
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.trim().length > 0);
  };

  const handleSearchResultClick = (sectionId: string) => {
    setShowSearchResults(false);
    setSearchQuery("");
    setIsSearchVisible(false);
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }

    const sectionMap: Record<string, string> = {
      dashboard: "dashboard",
      feespayment: "feespayment",
      paymentdetails: "paymentdetails",
      "course Module": "course Module",
      Performance: "Performance",
      Grade: "Grade",
      settings: "settings",
      profile: "profile",
      notifications: "notifications",
      progress: "progress",
      subscription: "subscription",
    };

    const targetSection = sectionMap[sectionId] || sectionId;

    if (sectionId === "profile") {
      const url = new URL(window.location.href);
      url.searchParams.set("modal", "profile");
      window.history.pushState({}, "", url.toString());
      window.location.reload();
      return;
    }

    setActiveSection(targetSection);
    setIsSidebarOpen(false);
  };

  const toggleSidebarMobile = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarDesktop = (): void => {
    setIsSidebarExpanded(!isSidebarExpanded);
    if (isSidebarExpanded) {
      setIsPaymentDropdownOpen(false);
      setIsCoursesDropdownOpen(false);
    }
  };

  const getUserFromStorage = (): User | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      try {
        return userStr ? JSON.parse(userStr) : null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const user: User | null = getUserFromStorage();
  const userEmail: string | undefined = user?.email;

  const isAuthenticated = (): boolean => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      return !!token && !!user;
    }
    return false;
  };

  const togglePaymentDropdown = (e?: React.MouseEvent): void => {
    if (e) e.stopPropagation();
    if (!isSidebarExpanded) {
      setIsCoursesDropdownOpen(false);
      setIsPaymentDropdownOpen(!isPaymentDropdownOpen);
    } else {
      setIsPaymentDropdownOpen(!isPaymentDropdownOpen);
    }
  };

  const toggleCoursesDropdown = (e?: React.MouseEvent): void => {
    if (e) e.stopPropagation();
    if (!isSidebarExpanded) {
      setIsPaymentDropdownOpen(false);
      setIsCoursesDropdownOpen(!isCoursesDropdownOpen);
    } else {
      setIsCoursesDropdownOpen(!isCoursesDropdownOpen);
    }
  };

  useEffect(() => {
    const checkSessionExpiry = () => {
      const sessionExpiry = localStorage.getItem("sessionExpiry");
      const sessionLifetimeHours = localStorage.getItem("sessionLifetimeHours");

      if (sessionExpiry) {
        const expiryTime = parseInt(sessionExpiry);
        const now = new Date().getTime();

        if (now > expiryTime) {
          console.log("Session expired! Logging out...");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("sessionExpiry");
          localStorage.removeItem("sessionLifetimeHours");
          localStorage.removeItem("loginTime");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userData");
          localStorage.removeItem("studentData");
          setSessionExpired(true);
          router.push("/login?expired=true");
          return false;
        }
      }
      return true;
    };

    if (!checkingMaintenance) {
      checkSessionExpiry();
    }
  }, [checkingMaintenance, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionExpiry = localStorage.getItem("sessionExpiry");
      if (sessionExpiry) {
        const expiryTime = parseInt(sessionExpiry);
        const now = new Date().getTime();

        if (now > expiryTime) {
          console.log("Session expired during active session!");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("sessionExpiry");
          localStorage.removeItem("sessionLifetimeHours");
          localStorage.removeItem("loginTime");
          router.push("/login?expired=true");
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    const checkMaintenanceMode = async () => {
      try {
        const mode = await getSetting("maintenance_mode");
        setMaintenanceMode(mode === "true");
      } catch (error) {
        console.error("Error checking maintenance mode:", error);
        setMaintenanceMode(false);
      } finally {
        setCheckingMaintenance(false);
      }
    };
    checkMaintenanceMode();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        !isSidebarExpanded &&
        (isPaymentDropdownOpen || isCoursesDropdownOpen)
      ) {
        const sidebar = document.querySelector(".sidebar");
        const target = event.target as Node;

        if (sidebar && !sidebar.contains(target)) {
          setIsPaymentDropdownOpen(false);
          setIsCoursesDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarExpanded, isPaymentDropdownOpen, isCoursesDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (window.innerWidth <= 991 && isSidebarOpen) {
        const sidebar = document.querySelector(".sidebar");
        const hamburger = document.querySelector(".sidebar-hamburger");
        const target = event.target as Node;

        if (
          sidebar &&
          !sidebar.contains(target) &&
          hamburger &&
          !hamburger.contains(target)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  const fetchStudentData = useCallback(async (): Promise<void> => {
    if (!user?.email) return;

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");

      let profileImage: string | null = null;
      const imageResponse = await fetch(
        `${API_URL}/api/profile/profile-image/${user.email}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );
      const imageData: ProfileImageResponse = await imageResponse.json();

      if (imageData.success && imageData.profileImage) {
        profileImage = imageData.profileImage;
      }

      setStudentData({
        id: user.id ? parseInt(user.id) : undefined,
        name: user.name || "",
        email: user.email,
        profileImage: profileImage || undefined,
      });
    } catch (err: unknown) {
      console.error("Error fetching student data:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch student data";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user?.email, user?.id, user?.name]);

  useEffect(() => {
    if (!isProfileModalOpen && user?.email) {
      fetchStudentData();
    }
  }, [isProfileModalOpen, fetchStudentData, user?.email]);

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  useEffect(() => {
    if (typeof window !== "undefined" && !isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userData");
    localStorage.removeItem("studentData");
    router.push("/login");
  };

  if (!checkingMaintenance && maintenanceMode) {
    return (
      <div className="maintenance-page">
        <div className="maintenance-content">
          <div className="maintenance-icon">🔧</div>
          <h1>System Under Maintenance</h1>
          <p>We're currently updating our system to serve you better.</p>
          <p>Please check back in a few minutes.</p>
          <small>Thank you for your patience.</small>
        </div>
      </div>
    );
  }

  if (loading || checkingMaintenance) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <button className="sidebar-hamburger" onClick={toggleSidebarMobile}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div
        className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={toggleSidebarMobile}
      ></div>

      <div
        className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"} ${isSidebarOpen ? "open" : "closed"}`}
      >
        <button className="sidebar-close" onClick={toggleSidebarMobile}>
          <span className="material-symbols-outlined">close</span>
        </button>

        <button className="sidebar-toggle" onClick={toggleSidebarDesktop}>
          <i
            className={`bi ${isSidebarExpanded ? "bi-chevron-left" : "bi-chevron-right"}`}
          ></i>
        </button>

        <div className="p-container">
          <div
            className="sidebar-profile"
            onClick={() => setIsProfileModalOpen(true)}
          >
            <img
              src={
                studentData?.profileImage && studentData.profileImage.trim()
                  ? studentData.profileImage
                  : `https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true&size=128&name=${encodeURIComponent(user?.name || "User")}`
              }
              alt="Profile Icon"
              className="p-image"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true&size=128&name=${encodeURIComponent(user?.name || "User")}`;
              }}
            />
          </div>
          {isSidebarExpanded && <p className="name">{user?.name}</p>}
        </div>

        <ul className="p-3 nav flex-column">
          {/* Dashboard */}
          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("dashboard");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-speedometer2 me-2"></i>
              {isSidebarExpanded && "Dashboard"}
            </button>
          </li>

          {/* ✅ NEW: Subscription Link */}
          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "subscription" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("subscription");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-collection me-2"></i>
              {isSidebarExpanded && "Subscription"}
            </button>
          </li>

          {/* Payment Info Dropdown */}
          <li className="mb-3 nav-item">
            <div className="sidebar-item">
              <div
                className={`dropdown-header ${isPaymentDropdownOpen ? "active" : ""}`}
                onClick={togglePaymentDropdown}
              >
                <button
                  className={`nav-link ${isPaymentDropdownOpen ? "active" : ""}`}
                >
                  <i className="bi bi-card-list me-2"></i>
                  {isSidebarExpanded && "Payment Info"}
                  {isSidebarExpanded && (
                    <span
                      className={`arrow-icon ${isPaymentDropdownOpen ? "open" : ""}`}
                    >
                      &#9662;
                    </span>
                  )}
                </button>
              </div>
              {isSidebarExpanded && isPaymentDropdownOpen && (
                <div className="dropdown-list">
                  <div
                    className={`dropdown-item ${activeSection === "feespayment" ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection("feespayment");
                      setIsPaymentDropdownOpen(false);
                      setIsSidebarOpen(false);
                    }}
                  >
                    Fees Payment
                  </div>
                  <div
                    className={`dropdown-item ${activeSection === "paymentdetails" ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection("paymentdetails");
                      setIsPaymentDropdownOpen(false);
                      setIsSidebarOpen(false);
                    }}
                  >
                    Payment Details
                  </div>
                </div>
              )}
              {!isSidebarExpanded && isPaymentDropdownOpen && (
                <div className="dropdown-list collapsed-dropdown">
                  <div
                    className={`dropdown-item ${activeSection === "feespayment" ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection("feespayment");
                      setIsPaymentDropdownOpen(false);
                      setIsSidebarOpen(false);
                    }}
                  >
                    Fees Payment
                  </div>
                  <div
                    className={`dropdown-item ${activeSection === "paymentdetails" ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection("paymentdetails");
                      setIsPaymentDropdownOpen(false);
                      setIsSidebarOpen(false);
                    }}
                  >
                    Payment Details
                  </div>
                </div>
              )}
            </div>
          </li>

          {/* Courses Dropdown */}
          <li className="mb-3 nav-item">
            <div className="sidebar-item">
              <div
                className={`dropdown-header ${isCoursesDropdownOpen ? "active" : ""}`}
                onClick={toggleCoursesDropdown}
              >
                <button
                  className={`nav-link ${isCoursesDropdownOpen ? "active" : ""}`}
                >
                  <i className="bi bi-book me-2"></i>
                  {isSidebarExpanded && "Courses"}
                  {isSidebarExpanded && (
                    <span
                      className={`arrow-icon ${isCoursesDropdownOpen ? "open" : ""}`}
                    >
                      &#9662;
                    </span>
                  )}
                </button>
              </div>
              {isSidebarExpanded && isCoursesDropdownOpen && (
                <div className="dropdown-list">
                  <div
                    className={`dropdown-item ${activeSection === "course Module" ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection("course Module");
                      setIsCoursesDropdownOpen(false);
                      setIsSidebarOpen(false);
                    }}
                  >
                    Course Module
                  </div>
                  <div
                    className={`dropdown-item ${activeSection === "Performance" ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection("Performance");
                      setIsCoursesDropdownOpen(false);
                      setIsSidebarOpen(false);
                    }}
                  >
                    Performance
                  </div>
                  <div
                    className={`dropdown-item ${activeSection === "Grade" ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection("Grade");
                      setIsCoursesDropdownOpen(false);
                      setIsSidebarOpen(false);
                    }}
                  >
                    Grade
                  </div>
                </div>
              )}
              {!isSidebarExpanded && isCoursesDropdownOpen && (
                <div className="dropdown-list collapsed-dropdown">
                  <div
                    className={`dropdown-item ${activeSection === "course Module" ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection("course Module");
                      setIsCoursesDropdownOpen(false);
                      setIsSidebarOpen(false);
                    }}
                  >
                    Course Module
                  </div>
                  <div
                    className={`dropdown-item ${activeSection === "Performance" ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection("Performance");
                      setIsCoursesDropdownOpen(false);
                      setIsSidebarOpen(false);
                    }}
                  >
                    Performance
                  </div>
                  <div
                    className={`dropdown-item ${activeSection === "Grade" ? "active" : ""}`}
                    onClick={() => {
                      setActiveSection("Grade");
                      setIsCoursesDropdownOpen(false);
                      setIsSidebarOpen(false);
                    }}
                  >
                    Grade
                  </div>
                </div>
              )}
            </div>
          </li>

          {/* Settings */}
          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "settings" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("settings");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-gear me-2"></i>
              {isSidebarExpanded && "Settings"}
            </button>
          </li>

          {/* Logout */}
          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "logout" ? "active" : ""}`}
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              {isSidebarExpanded && "Log Out"}
            </button>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="nav-container">
          <div className="navba">
            <div className="navbar-left">
              <Image
                src={Logo}
                alt="AppCode Logo"
                className="logo"
                width={120}
                height={40}
              />
            </div>
            <div className="student-icons">
              <div className="notification-container">
                <span className="notification-badge"></span>
                <StudentNotificationBell />
              </div>

              <div className="search-bar-container">
                {!isSearchVisible && (
                  <button className="search-icon-button" onClick={toggleSearch}>
                    <span className="material-symbols-outlined">search</span>
                  </button>
                )}
                {isSearchVisible && (
                  <div className="search-wrapper">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search courses, payments, settings..."
                      className="search-input"
                      value={searchQuery}
                      onChange={handleSearchInput}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setShowSearchResults(false);
                          setSearchQuery("");
                          setIsSearchVisible(false);
                        }
                      }}
                    />
                    <button
                      className="close-icon-button"
                      onClick={toggleSearch}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                    {showSearchResults && (
                      <SearchResults
                        query={searchQuery}
                        onClose={() => {
                          setShowSearchResults(false);
                          setSearchQuery("");
                        }}
                        onResultClick={handleSearchResultClick}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ NEW: Subscription Management Section */}
        {activeSection === "subscription" && (
          <div className="subscription-section">
            <SubscriptionManagement />
          </div>
        )}

        {activeSection === "dashboard" && (
          <div className="md-4">
            <Dashboard />
          </div>
        )}
        {activeSection === "paymentdetails" && (
          <div className="mb-4">{<PaymentInfo />}</div>
        )}
        {activeSection === "feespayment" && (
          <div className="mb-4">
            <FeesPayment />
          </div>
        )}
        {activeSection === "course Module" && (
          <div className="section">
            <CourseModule />
          </div>
        )}
        {activeSection === "Performance" && (
          <div className="section">
            <CoursePerformance />
          </div>
        )}
        {activeSection === "Grade" && (
          <div className="section">
            <CourseGrade />
          </div>
        )}

        {activeSection === "settings" && (
          <div className="mb-4 section">
            <Settings />
          </div>
        )}
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        setIsOpen={setIsProfileModalOpen}
        studentData={studentData}
        fetchStudentData={fetchStudentData}
      />
    </div>
  );
};

export default StudentPortal;
