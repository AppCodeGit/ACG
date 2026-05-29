"use client";

import { useState, useEffect, useCallback } from "react";
import "./style/StudentManagement.css";

interface Student {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  profileImage: string;
  gender: string;
  status: "active" | "inactive";
  enrollments?: Enrollment[];
  address?: string;
  nationality?: string;
  dob?: string;
  programName?: string;
  courseDetails?: string;
  qualification?: string;
  institution?: string;
  graduationYear?: number;
  studyArea?: string;
  certifications?: string;
  guardianFullName?: string;
  relationship?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  guardianOccupation?: string;
}

interface Enrollment {
  id: number;
  courseId: number;
  course?: {
    id: number;
    name: string;
  };
  status: string;
  progress: number;
}

interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  totalEnrollments: number;
}

interface Notification {
  id: number;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
}

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<StudentStats>({
    totalStudents: 0,
    activeStudents: 0,
    inactiveStudents: 0,
    totalEnrollments: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalStudentsCount, setTotalStudentsCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal states
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] =
    useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<Partial<Student>>({});

  // Notification and Status Modal states
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
  const [statusAction, setStatusAction] = useState<{
    studentId: number;
    studentName: string;
    currentStatus: string;
    newStatus: string;
  } | null>(null);

  // Add these state variables with your other state declarations
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  // Add this with your other state declarations
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addFormData, setAddFormData] = useState<Partial<Student>>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    gender: "male",
    programName: "",
    qualification: "",
    institution: "",
    studyArea: "",
    guardianFullName: "",
    guardianPhone: "",
    guardianEmail: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Add new student function with profile image
  const handleAddStudentSubmit = async () => {
    // Validation
    if (!addFormData.fullName || !addFormData.email || !addFormData.phone) {
      addNotification(
        "error",
        "Validation Error",
        "Full name, email, and phone are required",
      );
      return;
    }

    setIsAdding(true);
    try {
      let profileImageUrl = addFormData.profileImage || "";

      // Upload profile image if selected
      if (profileImageFile) {
        // Option 1: Convert to base64 and store directly (simpler)
        profileImageUrl = profileImagePreview;

        // Option 2: Upload to server (uncomment if you have an upload endpoint)
        // profileImageUrl = await uploadProfileImage(profileImageFile);
      }

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/student-management/students`,
        {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: addFormData.fullName,
            email: addFormData.email.toLowerCase(),
            phone: addFormData.phone,
            address: addFormData.address || "",
            nationality: addFormData.nationality || "",
            dob: addFormData.dob
              ? new Date(addFormData.dob).toISOString()
              : new Date().toISOString(),
            gender: addFormData.gender || "male",
            profileImage: profileImageUrl, // Add profile image URL
            programName: addFormData.programName || "",
            courseDetails: addFormData.courseDetails || "",
            qualification: addFormData.qualification || "",
            institution: addFormData.institution || "",
            graduationYear: addFormData.graduationYear
              ? parseInt(addFormData.graduationYear.toString())
              : null,
            studyArea: addFormData.studyArea || "",
            certifications: addFormData.certifications || "",
            guardianFullName: addFormData.guardianFullName || "",
            relationship: addFormData.relationship || "",
            guardianPhone: addFormData.guardianPhone || "",
            guardianEmail: addFormData.guardianEmail || "",
            guardianOccupation: addFormData.guardianOccupation || "",
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add student");
      }

      const data = await response.json();
      addNotification(
        "success",
        "Student Added!",
        `${addFormData.fullName} has been added successfully.`,
      );

      // Reset form and close modal
      setAddFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        nationality: "",
        gender: "male",
        programName: "",
        qualification: "",
        institution: "",
        studyArea: "",
        guardianFullName: "",
        guardianPhone: "",
        guardianEmail: "",
      });
      setProfileImageFile(null);
      setProfileImagePreview("");
      setIsAddModalOpen(false);

      // Refresh the list
      await fetchStudents();
      await fetchStats();
    } catch (err: any) {
      console.error("Error adding student:", err);
      addNotification(
        "error",
        "Add Failed",
        err.message || "Failed to add student",
      );
    } finally {
      setIsAdding(false);
    }
  };

  // Update handleAddStudent to reset form when opening
  const handleAddStudent = () => {
    setAddFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      nationality: "",
      gender: "male",
      programName: "",
      qualification: "",
      institution: "",
      studyArea: "",
      guardianFullName: "",
      guardianPhone: "",
      guardianEmail: "",
    });
    setProfileImageFile(null);
    setProfileImagePreview("");
    setIsAddModalOpen(true);
  };

  // Handle profile image selection
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        addNotification(
          "error",
          "File Too Large",
          "Profile image must be less than 5MB",
        );
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        addNotification(
          "error",
          "Invalid File Type",
          "Please upload a valid image file (JPEG, PNG, GIF, WEBP)",
        );
        return;
      }

      setProfileImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to server (optional - if you have an upload endpoint)
  const uploadProfileImage = async (file: File): Promise<string> => {
    // If you have an image upload endpoint, use this
    // Otherwise, you can store as base64 or skip

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.imageUrl; // Return the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading image:", error);
      // If upload fails, return empty string or base64
      return "";
    }
  };

  // Notification helper functions
  const addNotification = (
    type: Notification["type"],
    title: string,
    message: string,
  ) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // Fetch students with pagination and filters
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      });

      const response = await fetch(
        `${API_URL}/api/student-management/students?${queryParams}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();
      setStudents(data.students);
      setTotalPages(data.pagination.totalPages);
      setTotalStudentsCount(data.pagination.total);
    } catch (err: any) {
      console.error("Error fetching students:", err);
      setError(err.message || "Failed to fetch students");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, API_URL]);

  // Fetch statistics
  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/student-management/students/stats`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }

      const data = await response.json();
      setStats(data);
    } catch (err: any) {
      console.error("Error fetching stats:", err);
    }
  }, [API_URL]);

  // Handle status toggle click - opens modal
  const handleToggleStatusClick = (
    studentId: number,
    studentName: string,
    currentStatus: string,
  ) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setStatusAction({
      studentId,
      studentName,
      currentStatus,
      newStatus,
    });
    setIsStatusModalOpen(true);
  };

  // Handle status toggle confirmation
  const handleToggleStatus = async () => {
    if (!statusAction) return;

    const { studentId, studentName, newStatus } = statusAction;
    const action = newStatus === "active" ? "activate" : "deactivate";

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/student-management/students/${studentId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update student status");
      }

      // Update the student in the local state - FIXED: explicitly type the status
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId
            ? { ...student, status: newStatus as "active" | "inactive" } // ← Added type assertion
            : student,
        ),
      );

      // Refresh stats from server to ensure accuracy
      await fetchStats();

      // Show success notification
      addNotification(
        "success",
        "Status Updated!",
        `${studentName} has been ${action}d successfully.`,
      );

      setIsStatusModalOpen(false);
      setStatusAction(null);
    } catch (err: any) {
      console.error("Error updating student status:", err);
      addNotification(
        "error",
        "Update Failed",
        err.message || "Failed to update student status",
      );
      // Refresh the entire list to ensure consistency
      await fetchStudents();
      await fetchStats();
      setIsStatusModalOpen(false);
      setStatusAction(null);
    }
  };

  // Fetch single student details
  const fetchStudentDetails = async (studentId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/student-management/students/${studentId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student details");
      }

      const data = await response.json();
      return data.student;
    } catch (err: any) {
      console.error("Error fetching student details:", err);
      addNotification(
        "error",
        "Error",
        err.message || "Failed to fetch student details",
      );
      return null;
    }
  };

  // Update student
  const handleUpdateStudent = async () => {
    if (!selectedStudent) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/student-management/students/${selectedStudent.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      addNotification(
        "success",
        "Student Updated!",
        `${selectedStudent.fullName}'s information has been updated successfully.`,
      );
      setIsEditModalOpen(false);
      setSelectedStudent(null);
      setEditFormData({});
      await fetchStudents();
      await fetchStats();
    } catch (err: any) {
      console.error("Error updating student:", err);
      addNotification(
        "error",
        "Update Failed",
        err.message || "Failed to update student",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete student
  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/student-management/students/${studentToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      addNotification(
        "success",
        "Student Deleted!",
        `${studentToDelete.name} has been removed from the system.`,
      );
      setIsDeleteConfirmOpen(false);
      setStudentToDelete(null);
      await fetchStudents();
      await fetchStats();
    } catch (err: any) {
      console.error("Error deleting student:", err);
      addNotification(
        "error",
        "Deletion Failed",
        err.message || "Failed to delete student",
      );
    }
  };

  // View student details
  const handleViewStudent = async (student: Student) => {
    const fullStudent = await fetchStudentDetails(student.id);
    if (fullStudent) {
      setSelectedStudent(fullStudent);
      setIsViewModalOpen(true);
    }
  };

  // Edit student
  const handleEditStudent = async (student: Student) => {
    const fullStudent = await fetchStudentDetails(student.id);
    if (fullStudent) {
      setSelectedStudent(fullStudent);
      setEditFormData({
        fullName: fullStudent.fullName,
        email: fullStudent.email,
        phone: fullStudent.phone,
        address: fullStudent.address || "",
        nationality: fullStudent.nationality || "",
        programName: fullStudent.programName || "",
        qualification: fullStudent.qualification || "",
        institution: fullStudent.institution || "",
        studyArea: fullStudent.studyArea || "",
        guardianFullName: fullStudent.guardianFullName || "",
        guardianPhone: fullStudent.guardianPhone || "",
        guardianEmail: fullStudent.guardianEmail || "",
      });
      setIsEditModalOpen(true);
    }
  };

  // Close modals
  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteConfirmOpen(false);
    setIsStatusModalOpen(false);
    setSelectedStudent(null);
    setStudentToDelete(null);
    setStatusAction(null);
    setEditFormData({});
  };

  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, [fetchStudents, fetchStats]);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchStudents();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, fetchStudents, currentPage]);

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "badge active";
      case "inactive":
        return "badge inactive";
      default:
        return "badge unknown";
    }
  };

  if (loading && students.length === 0) {
    return (
      <div className="management-container student-management">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="management-container student-management">
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={() => fetchStudents()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="management-container student-management">
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
                <div className="notification-message">
                  {notification.message}
                </div>
              </div>
              <button className="notification-close">×</button>
            </div>
          </div>
        ))}
      </div>

      {/* Status Confirmation Modal */}
      {isStatusModalOpen && statusAction && (
        <div className="status-modal-overlay" onClick={closeModals}>
          <div
            className="status-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="status-modal-header">
              <h2>Confirm Status Change</h2>
              <button className="status-modal-close" onClick={closeModals}>
                ×
              </button>
            </div>
            <div className="status-modal-body">
              <div className="status-warning">
                <div className="status-icon-wrapper">
                  <i
                    className={`bi bi-${statusAction.newStatus === "active" ? "check-circle" : "x-circle"}`}
                  ></i>
                </div>
                <p className="status-message">
                  Are you sure you want to{" "}
                  <strong>
                    {statusAction.newStatus === "active"
                      ? "activate"
                      : "deactivate"}
                  </strong>{" "}
                  <strong className="student-name">
                    {statusAction.studentName}
                  </strong>
                  ?
                </p>
                <p className="status-text">
                  {statusAction.newStatus === "active"
                    ? "This student will regain access to all courses and features."
                    : "This student will lose access to all courses and features until reactivated."}
                </p>
              </div>
            </div>
            <div className="status-modal-footer">
              <button className="status-btn-cancel" onClick={closeModals}>
                Cancel
              </button>
              <button
                className={`status-btn-confirm ${statusAction.newStatus}`}
                onClick={handleToggleStatus}
              >
                {statusAction.newStatus === "active"
                  ? "Activate Student"
                  : "Deactivate Student"}
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="management-header">
        <div>
          <h3 className="title">Student Management</h3>
          <p className="subtitle">
            Manage student records, enrollments and progress
          </p>
        </div>
        <div className="btn-container">
          <div
            className="btn"
            onClick={handleAddStudent}
            aria-label="Add new student"
          >
            Add New Student
            <span className="material-symbols-outlined icon">add_circle</span>
          </div>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-wrapper">
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-field"
          />
        </div>
        <div className="filter-wrapper">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="management-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalStudents}</div>
            <div className="stat-label">Total Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.activeStudents}</div>
            <div className="stat-label">Active Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.inactiveStudents}</div>
            <div className="stat-label">Inactive Students</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalEnrollments}</div>
            <div className="stat-label">Total Enrollments</div>
          </div>
        </div>
      </div>

      <div className="table-wrap" aria-labelledby="students-table">
        <table className="students-table" id="students-table">
          <thead>
            <tr>
              <th className="col-name">Name</th>
              <th className="col-email">Email</th>
              <th className="col-phone">Phone</th>
              <th className="col-courses">Courses</th>
              <th className="col-status">Status</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="no-data-cell">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr className="table-row" key={student.id}>
                  <td className="name-cell">
                    <div className="avatar" aria-hidden>
                      {student.profileImage ? (
                        <img
                          src={student.profileImage}
                          alt={student.fullName}
                          className="avatar-img"
                        />
                      ) : (
                        getInitials(student.fullName)
                      )}
                    </div>
                    <div>
                      <div className="student-name">{student.fullName}</div>
                      <div className="student-sub">Student</div>
                    </div>
                  </td>
                  <td className="email-cell">{student.email}</td>
                  <td className="phone-cell">{student.phone || "N/A"}</td>
                  <td className="courses-cell">
                    {student.enrollments?.length || 0} courses
                  </td>
                  <td className="status-cell">
                    <span
                      className={getStatusBadgeClass(student.status)}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleToggleStatusClick(
                          student.id,
                          student.fullName,
                          student.status,
                        )
                      }
                      title="Click to toggle status"
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="icon-btn edit"
                      title="Edit Student"
                      aria-label={`Edit ${student.fullName}`}
                      onClick={() => handleEditStudent(student)}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      className="icon-btn view"
                      title="View Details"
                      aria-label={`View ${student.fullName}`}
                      onClick={() => handleViewStudent(student)}
                    >
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                    <button
                      className="icon-btn delete"
                      title="Delete Student"
                      aria-label={`Delete ${student.fullName}`}
                      onClick={() => {
                        setStudentToDelete({
                          id: student.id,
                          name: student.fullName,
                        });
                        setIsDeleteConfirmOpen(true);
                      }}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <footer className="management-footer">
        <div className="footer-left">
          Showing {students.length} of {totalStudentsCount} students
        </div>
        <nav
          className="pager"
          role="navigation"
          aria-label="Student pagination"
        >
          <button
            className="pager-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return (
              <button
                key={pageNum}
                className={`pager-btn ${currentPage === pageNum ? "active" : ""}`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            className="pager-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </footer>

      {/* View Student Modal */}
      {isViewModalOpen && selectedStudent && (
        <div className="modal-overlay" onClick={closeModals}>
          <div
            className="modal-container view-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Student Details</h2>
              <button className="modal-close" onClick={closeModals}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="student-profile-header">
                <div className="profile-avatar large">
                  {selectedStudent.profileImage ? (
                    <img
                      src={selectedStudent.profileImage}
                      alt={selectedStudent.fullName}
                    />
                  ) : (
                    getInitials(selectedStudent.fullName)
                  )}
                </div>
                <div className="profile-info">
                  <h3>{selectedStudent.fullName}</h3>
                  <p className="status-badge">{selectedStudent.status}</p>
                </div>
              </div>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Email</label>
                  <p>{selectedStudent.email}</p>
                </div>
                <div className="detail-item">
                  <label>Phone</label>
                  <p>{selectedStudent.phone || "N/A"}</p>
                </div>
                <div className="detail-item">
                  <label>Gender</label>
                  <p>{selectedStudent.gender || "N/A"}</p>
                </div>
                <div className="detail-item">
                  <label>Nationality</label>
                  <p>{selectedStudent.nationality || "N/A"}</p>
                </div>
                <div className="detail-item">
                  <label>Address</label>
                  <p>{selectedStudent.address || "N/A"}</p>
                </div>
                <div className="detail-item">
                  <label>Date of Birth</label>
                  <p>
                    {selectedStudent.dob
                      ? new Date(selectedStudent.dob).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <div className="detail-item">
                  <label>Program</label>
                  <p>{selectedStudent.programName || "N/A"}</p>
                </div>
                <div className="detail-item">
                  <label>Qualification</label>
                  <p>{selectedStudent.qualification || "N/A"}</p>
                </div>
                <div className="detail-item">
                  <label>Institution</label>
                  <p>{selectedStudent.institution || "N/A"}</p>
                </div>
                <div className="detail-item">
                  <label>Study Area</label>
                  <p>{selectedStudent.studyArea || "N/A"}</p>
                </div>
              </div>
              {selectedStudent.enrollments &&
                selectedStudent.enrollments.length > 0 && (
                  <div className="enrollments-section">
                    <h4>Enrolled Courses</h4>
                    <div className="enrollments-list">
                      {selectedStudent.enrollments.map((enrollment) => (
                        <div key={enrollment.id} className="enrollment-item">
                          <span className="course-name">
                            {enrollment.course?.name || "Course"}
                          </span>
                          <span className="course-progress">
                            Progress: {enrollment.progress}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              <div className="guardian-section">
                <h4>Guardian Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Guardian Name</label>
                    <p>{selectedStudent.guardianFullName || "N/A"}</p>
                  </div>
                  <div className="detail-item">
                    <label>Relationship</label>
                    <p>{selectedStudent.relationship || "N/A"}</p>
                  </div>
                  <div className="detail-item">
                    <label>Guardian Phone</label>
                    <p>{selectedStudent.guardianPhone || "N/A"}</p>
                  </div>
                  <div className="detail-item">
                    <label>Guardian Email</label>
                    <p>{selectedStudent.guardianEmail || "N/A"}</p>
                  </div>
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

      {/* Edit Student Modal */}
      {isEditModalOpen && selectedStudent && (
        <div className="edit-modal-overlay" onClick={closeModals}>
          <div
            className="edit-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="edit-modal-header">
              <h2>Edit Student</h2>
              <button className="edit-modal-close" onClick={closeModals}>
                ×
              </button>
            </div>
            <div className="edit-modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateStudent();
                }}
              >
                <div className="edit-form-grid">
                  <div className="edit-form-group">
                    <label>
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      value={editFormData.fullName || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          fullName: e.target.value,
                        })
                      }
                      required
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      value={editFormData.email || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        })
                      }
                      required
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>
                      Phone <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      value={editFormData.phone || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          phone: e.target.value,
                        })
                      }
                      required
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={editFormData.address || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          address: e.target.value,
                        })
                      }
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Nationality</label>
                    <input
                      type="text"
                      value={editFormData.nationality || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          nationality: e.target.value,
                        })
                      }
                      placeholder="Enter nationality"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Program Name</label>
                    <input
                      type="text"
                      value={editFormData.programName || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          programName: e.target.value,
                        })
                      }
                      placeholder="Enter program name"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Qualification</label>
                    <input
                      type="text"
                      value={editFormData.qualification || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          qualification: e.target.value,
                        })
                      }
                      placeholder="Enter qualification"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Institution</label>
                    <input
                      type="text"
                      value={editFormData.institution || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          institution: e.target.value,
                        })
                      }
                      placeholder="Enter institution"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Study Area</label>
                    <input
                      type="text"
                      value={editFormData.studyArea || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          studyArea: e.target.value,
                        })
                      }
                      placeholder="Enter study area"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Guardian Name</label>
                    <input
                      type="text"
                      value={editFormData.guardianFullName || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          guardianFullName: e.target.value,
                        })
                      }
                      placeholder="Enter guardian name"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Guardian Phone</label>
                    <input
                      type="tel"
                      value={editFormData.guardianPhone || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          guardianPhone: e.target.value,
                        })
                      }
                      placeholder="Enter guardian phone"
                    />
                  </div>
                  <div className="edit-form-group">
                    <label>Guardian Email</label>
                    <input
                      type="email"
                      value={editFormData.guardianEmail || ""}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          guardianEmail: e.target.value,
                        })
                      }
                      placeholder="Enter guardian email"
                    />
                  </div>
                </div>
                <div className="edit-modal-footer">
                  <button
                    type="button"
                    className="edit-btn-cancel"
                    onClick={closeModals}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="edit-btn-save"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && studentToDelete && (
        <div className="delete-modal-overlay" onClick={closeModals}>
          <div
            className="delete-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-modal-header">
              <h2>Confirm Delete</h2>
              <button className="delete-modal-close" onClick={closeModals}>
                ×
              </button>
            </div>
            <div className="delete-modal-body">
              <div className="delete-warning">
                <div className="warning-icon-wrapper">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                </div>
                <p className="warning-message">
                  Are you sure you want to delete{" "}
                  <strong>{studentToDelete.name}</strong>?
                </p>
                <p className="warning-text">
                  This action cannot be undone. All associated data including
                  enrollments, payments, and submissions will be permanently
                  removed.
                </p>
              </div>
            </div>
            <div className="delete-modal-footer">
              <button className="delete-btn-cancel" onClick={closeModals}>
                Cancel
              </button>
              <button
                className="delete-btn-confirm"
                onClick={handleDeleteStudent}
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div
          className="add-modal-overlay"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="add-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="add-modal-header">
              <h2>Add New Student</h2>
              <button
                className="add-modal-close"
                onClick={() => setIsAddModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="add-modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddStudentSubmit();
                }}
              >
                {/* Profile Image Upload Section */}
                <div className="form-section">
                  <h3>Profile Image</h3>
                  <div className="profile-image-upload">
                    <div className="profile-image-preview">
                      {profileImagePreview ? (
                        <img
                          src={profileImagePreview}
                          alt="Profile preview"
                          className="preview-image"
                        />
                      ) : (
                        <div className="preview-placeholder">
                          <span className="material-symbols-outlined">
                            person
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="profile-image-actions">
                      <label className="upload-btn">
                        <span className="material-symbols-outlined">
                          upload
                        </span>
                        Choose Image
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                          onChange={handleProfileImageChange}
                          style={{ display: "none" }}
                        />
                      </label>
                      {profileImagePreview && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => {
                            setProfileImageFile(null);
                            setProfileImagePreview("");
                          }}
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                          Remove
                        </button>
                      )}
                      <p className="upload-hint">
                        JPEG, PNG, GIF, WEBP (Max 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Basic Information Section */}
                <div className="form-section">
                  <h3>Basic Information</h3>
                  <div className="add-form-grid">
                    <div className="add-form-group">
                      <label>
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        value={addFormData.fullName || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            fullName: e.target.value,
                          })
                        }
                        required
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="add-form-group">
                      <label>
                        Email <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        value={addFormData.email || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            email: e.target.value,
                          })
                        }
                        required
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="add-form-group">
                      <label>
                        Phone <span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        value={addFormData.phone || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            phone: e.target.value,
                          })
                        }
                        required
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="add-form-group">
                      <label>Gender</label>
                      <select
                        value={addFormData.gender || "male"}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            gender: e.target.value,
                          })
                        }
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="add-form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        value={addFormData.dob?.toString().split("T")[0] || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            dob: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="add-form-group">
                      <label>Nationality</label>
                      <input
                        type="text"
                        value={addFormData.nationality || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            nationality: e.target.value,
                          })
                        }
                        placeholder="Enter nationality"
                      />
                    </div>
                    <div className="add-form-group full-width">
                      <label>Address</label>
                      <input
                        type="text"
                        value={addFormData.address || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            address: e.target.value,
                          })
                        }
                        placeholder="Enter address"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information Section */}
                <div className="form-section">
                  <h3>Academic Information</h3>
                  <div className="add-form-grid">
                    <div className="add-form-group">
                      <label>Program Name</label>
                      <input
                        type="text"
                        value={addFormData.programName || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            programName: e.target.value,
                          })
                        }
                        placeholder="Enter program name"
                      />
                    </div>
                    <div className="add-form-group">
                      <label>Qualification</label>
                      <input
                        type="text"
                        value={addFormData.qualification || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            qualification: e.target.value,
                          })
                        }
                        placeholder="Enter qualification"
                      />
                    </div>
                    <div className="add-form-group">
                      <label>Institution</label>
                      <input
                        type="text"
                        value={addFormData.institution || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            institution: e.target.value,
                          })
                        }
                        placeholder="Enter institution"
                      />
                    </div>
                    <div className="add-form-group">
                      <label>Study Area</label>
                      <input
                        type="text"
                        value={addFormData.studyArea || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            studyArea: e.target.value,
                          })
                        }
                        placeholder="Enter study area"
                      />
                    </div>
                    <div className="add-form-group">
                      <label>Graduation Year</label>
                      <input
                        type="number"
                        value={addFormData.graduationYear || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            graduationYear: parseInt(e.target.value),
                          })
                        }
                        placeholder="Enter graduation year"
                        min="1950"
                        max={new Date().getFullYear() + 10}
                      />
                    </div>
                  </div>
                </div>

                {/* Guardian Information Section */}
                <div className="form-section">
                  <h3>Guardian Information</h3>
                  <div className="add-form-grid">
                    <div className="add-form-group">
                      <label>Guardian Full Name</label>
                      <input
                        type="text"
                        value={addFormData.guardianFullName || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            guardianFullName: e.target.value,
                          })
                        }
                        placeholder="Enter guardian name"
                      />
                    </div>
                    <div className="add-form-group">
                      <label>Relationship</label>
                      <input
                        type="text"
                        value={addFormData.relationship || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            relationship: e.target.value,
                          })
                        }
                        placeholder="e.g., Father, Mother"
                      />
                    </div>
                    <div className="add-form-group">
                      <label>Guardian Phone</label>
                      <input
                        type="tel"
                        value={addFormData.guardianPhone || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            guardianPhone: e.target.value,
                          })
                        }
                        placeholder="Enter guardian phone"
                      />
                    </div>
                    <div className="add-form-group">
                      <label>Guardian Email</label>
                      <input
                        type="email"
                        value={addFormData.guardianEmail || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            guardianEmail: e.target.value,
                          })
                        }
                        placeholder="Enter guardian email"
                      />
                    </div>
                    <div className="add-form-group full-width">
                      <label>Guardian Occupation</label>
                      <input
                        type="text"
                        value={addFormData.guardianOccupation || ""}
                        onChange={(e) =>
                          setAddFormData({
                            ...addFormData,
                            guardianOccupation: e.target.value,
                          })
                        }
                        placeholder="Enter guardian occupation"
                      />
                    </div>
                  </div>
                </div>

                <div className="add-modal-footer">
                  <button
                    type="button"
                    className="add-btn-cancel"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="add-btn-submit"
                    disabled={isAdding}
                  >
                    {isAdding ? "Adding..." : "Add Student"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
