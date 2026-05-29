"use client";

import { useEffect, useState, useCallback } from "react";
import "./style/CourseManagement.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface EnrolledStudent {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  profileImage: string | null;
  gender: string;
  programName: string | null;
  enrolledAt: string;
}

interface Course {
  id: number;
  name: string;
  description: string | null;
  programName: string | null;
  status: string;
  enrolledStudentsCount: number;
  enrolledStudents: EnrolledStudent[];
  createdAt: string;
  updatedAt: string;
}

interface CourseStats {
  totalCourses: number;
  activeCourses: number;
  totalEnrollments: number;
}

interface Notification {
  id: number;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message: string;
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<CourseStats>({
    totalCourses: 0,
    activeCourses: 0,
    totalEnrollments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCoursesCount, setTotalCoursesCount] = useState(0);
  
  // Modal states
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "published":
        return "badge published";
      case "draft":
        return "badge draft";
      case "archived":
        return "badge archived";
      default:
        return "badge unknown";
    }
  };

  // Get status display text
  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Published";
      case "draft":
        return "Draft";
      case "archived":
        return "Archived";
      default:
        return status;
    }
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

  // Fetch courses stats
  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/courses/stats`, {
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

  // Fetch courses with pagination and filters
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== "all" && { status: statusFilter }),
      });

      const response = await fetch(`${API_URL}/api/admin/courses?${queryParams}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      setCourses(data.courses);
      setTotalPages(data.pagination.totalPages);
      setTotalCoursesCount(data.pagination.total);
    } catch (error) {
      console.error("Error fetching courses:", error);
      addNotification("error", "Fetch Failed", "Could not load courses");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter]);

  // Fetch single course details with enrolled students
  const fetchCourseDetails = async (courseId: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/admin/courses/${courseId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch course details");
      }

      const data = await response.json();
      return data.course;
    } catch (error) {
      console.error("Error fetching course details:", error);
      addNotification("error", "Error", "Failed to fetch course details");
      return null;
    }
  };

  // View course details
  const handleViewCourse = async (course: Course) => {
    const fullCourse = await fetchCourseDetails(course.id);
    if (fullCourse) {
      setSelectedCourse(fullCourse);
      setIsViewModalOpen(true);
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

  // Close modal
  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedCourse(null);
  };

  useEffect(() => {
    fetchCourses();
    fetchStats();
  }, [fetchCourses, fetchStats]);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchCourses();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, fetchCourses, currentPage]);

  if (loading && courses.length === 0) {
    return (
      <div className="course-management-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="course-management-container">
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
          <h3 className="title">Course Catalog</h3>
          <p className="subtitle">Manage course offerings and view enrollments</p>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="search-wrapper">
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            type="text"
            placeholder="Search by course name..."
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
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Stats Section */}
      <section className="management-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalCourses}</div>
            <div className="stat-label">Total Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.activeCourses}</div>
            <div className="stat-label">Active Courses</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalEnrollments}</div>
            <div className="stat-label">Total Enrollments</div>
          </div>
        </div>
      </section>

      {/* Courses Table */}
      <div className="table-wrap">
        <table className="courses-table">
          <thead>
            <tr>
              <th className="col-name">Course Name</th>
              <th className="col-enrolled">Enrolled Students</th>
              <th className="col-status">Status</th>
              <th className="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="no-data-cell">
                  No courses found
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="table-row">
                  <td className="name-cell">
                    <div className="course-icon" aria-hidden>
                      <span className="material-symbols-outlined">school</span>
                    </div>
                    <div>
                      <div className="course-name">{course.name}</div>
                      <div className="course-sub">
                        {course.programName || "No Program"}
                      </div>
                    </div>
                  </td>
                  <td className="enrolled-cell">
                    <span className="enrolled-badge">
                      {course.enrolledStudentsCount} Student{course.enrolledStudentsCount !== 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="status-cell">
                    <span className={getStatusBadgeClass(course.status)}>
                      {getStatusText(course.status)}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="icon-btn view"
                      title="View Details"
                      aria-label={`View ${course.name}`}
                      onClick={() => handleViewCourse(course)}
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <footer className="management-footer">
        <div className="footer-left">
          Showing {courses.length} of {totalCoursesCount} courses
        </div>
        <nav className="pager" role="navigation" aria-label="Course pagination">
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </footer>

      {/* View Course Modal with Enrolled Students */}
      {isViewModalOpen && selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Course Details</h2>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>
            <div className="modal-body">
              {/* Course Info */}
              <div className="course-info-section">
                <div className="course-title-section">
                  <div className="course-icon-large">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div>
                    <h3>{selectedCourse.name}</h3>
                    <p className="course-program">{selectedCourse.programName || "No Program"}</p>
                  </div>
                </div>
                
                {selectedCourse.description && (
                  <div className="course-description">
                    <label>Description</label>
                    <p>{selectedCourse.description}</p>
                  </div>
                )}
                
                <div className="course-meta">
                  <div className="meta-item">
                    <span className="meta-label">Status:</span>
                    <span className={getStatusBadgeClass(selectedCourse.status)}>
                      {getStatusText(selectedCourse.status)}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Created:</span>
                    <span className="meta-value">{formatDate(selectedCourse.createdAt)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Last Updated:</span>
                    <span className="meta-value">{formatDate(selectedCourse.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Enrolled Students Section */}
              <div className="enrolled-students-section">
                <h4>
                  <span className="material-symbols-outlined">group</span>
                  Enrolled Students ({selectedCourse.enrolledStudentsCount})
                </h4>
                
                {selectedCourse.enrolledStudents.length === 0 ? (
                  <div className="empty-students">
                    <p>No students enrolled in this course yet</p>
                  </div>
                ) : (
                  <div className="students-list">
                    <table className="students-enrolled-table">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Program</th>
                          <th>Enrolled Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedCourse.enrolledStudents.map((student) => (
                          <tr key={student.id}>
                            <td className="student-cell">
                              <div className="student-avatar">
                                {student.profileImage ? (
                                  <img src={student.profileImage} alt={student.fullName} />
                                ) : (
                                  <span className="avatar-fallback-small">
                                    {getInitials(student.fullName)}
                                  </span>
                                )}
                              </div>
                              <span className="student-name">{student.fullName}</span>
                            </td>
                            <td>{student.email}</td>
                            <td>{student.phone || "N/A"}</td>
                            <td>{student.programName || "N/A"}</td>
                            <td>{formatDate(student.enrolledAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;