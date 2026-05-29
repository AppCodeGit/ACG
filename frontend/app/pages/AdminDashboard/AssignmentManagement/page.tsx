"use client";

import { useState, useEffect } from "react";
import "../style/AssignmentManagement.css";

interface Submission {
  id: number;
  assignmentId: number;
  studentId: number;
  submissionUrl?: string | null;
  submissionText?: string | null;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  gradedBy?: number;
  gradedAt?: string;
  attemptNumber: number;
  status: "submitted" | "graded" | "resubmitted" | "late";
  content?: {
    id: number;
    title: string;
    description: string;
    type: string;
    programName: string;
  };
  student?: {
    id: number;
    fullName: string;
    email: string;
    programName: string;
  };
}

interface Student {
  id: number;
  fullName: string;
  email: string;
  programName: string;
  profileImage?: string; 
}

const programOptions = [
  "Software Engineering",
  "Cloud Engineering",
  "Cyber Security",
  "Data Analytics",
  "Digital Marketing",
  "Forex Trading",
];

const AssignmentManagement = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>(
    [],
  );
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<{
    type: string;
    text: string;
  } | null>(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isGrading, setIsGrading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const itemsPerPage = 20;
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    graded: 0,
    late: 0,
    avgGrade: 0,
  });
  
  // State for profile images
  const [profileImages, setProfileImages] = useState<Record<number, string>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetchAllSubmissions();
    fetchStudents();
  }, [currentPage, selectedProgram, selectedStatus]);

  useEffect(() => {
    filterSubmissions();
    calculateStats();
  }, [submissions, selectedStudent, searchTerm]);

  // Fetch profile image for a single student
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

  // Fetch profile images for all students in submissions
  const fetchAllProfileImages = async (submissionsList: Submission[]) => {
    const uniqueStudents = new Map();
    
    submissionsList.forEach(submission => {
      if (submission.student && submission.student.email && !profileImages[submission.student.id]) {
        uniqueStudents.set(submission.student.id, {
          id: submission.student.id,
          email: submission.student.email
        });
      }
    });
    
    // Fetch images for all unique students
    for (const [studentId, student] of uniqueStudents) {
      await fetchProfileImage(student.email, studentId);
    }
  };

  const fetchAllSubmissions = async () => {
    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        program: selectedProgram,
        status: selectedStatus,
      });

      const response = await fetch(
        `${API_URL}/api/assignments/admin/submissions?${params}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Submissions data:", data.submissions[0]?.student);
        setSubmissions(data.submissions);
        setTotalPages(data.pagination.totalPages);
        setTotalSubmissions(data.pagination.total);
        
        // Fetch profile images for these submissions
        await fetchAllProfileImages(data.submissions);
      } else {
        showToast("error", "Failed to load submissions");
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
      showToast("error", "Failed to load submissions");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/users/students`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];
    if (selectedStudent) {
      filtered = filtered.filter(
        (s) => s.studentId === parseInt(selectedStudent),
      );
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.content?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.student?.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          s.submissionText?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredSubmissions(filtered);
  };

  const calculateStats = () => {
    const total = submissions.length;
    const submitted = submissions.filter(
      (s) => s.status === "submitted",
    ).length;
    const graded = submissions.filter((s) => s.status === "graded").length;
    const late = submissions.filter((s) => s.status === "late").length;
    const grades = submissions.filter((s) => s.grade).map((s) => s.grade || 0);
    const avgGrade =
      grades.length > 0 ? grades.reduce((a, b) => a + b, 0) / grades.length : 0;
    setStats({ total, submitted, graded, late, avgGrade });
  };

  const handleGrade = async (submissionId: number) => {
    if (!grade && !feedback) {
      showToast("error", "Please enter grade or feedback");
      return;
    }
    setIsGrading(true);
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(
        `${API_URL}/api/assignments/grade/${submissionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            grade: parseFloat(grade),
            feedback,
            gradedBy: 1,
          }),
        },
      );

      if (response.ok) {
        showToast("success", "Assignment graded successfully!");
        fetchAllSubmissions();
        setSelectedSubmission(null);
        setGrade("");
        setFeedback("");
      } else {
        showToast("error", "Failed to grade assignment");
      }
    } catch (error) {
      console.error("Error grading:", error);
      showToast("error", "Failed to grade assignment");
    } finally {
      setIsGrading(false);
    }
  };

  const showToast = (type: string, text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "submitted":
        return "status-badge submitted";
      case "graded":
        return "status-badge graded";
      case "late":
        return "status-badge late";
      case "resubmitted":
        return "status-badge resubmitted";
      default:
        return "status-badge";
    }
  };

  const getStatusText = (status: string) =>
    status.charAt(0).toUpperCase() + status.slice(1);
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };
  const handleProgramChange = (program: string) => {
    setSelectedProgram(program);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="assignment-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="assignment-management">
      {toastMessage && (
        <div className={`toast ${toastMessage.type}`}>
          <div className="toast-content">
            <i
              className={`bi ${toastMessage.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill"}`}
            ></i>
            <span className="toast-text">{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="management-header">
        <div className="header-content">
          <div className="header-icon-wrapper">
            <i className="bi bi-journal-check"></i>
          </div>
          <h1 className="header-title">Assignment Management</h1>
          <p className="header-subtitle">
            Grade and manage student submissions
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-files"></i>
          </div>
          <div className="stat-info">
            <h3>{totalSubmissions}</h3>
            <p>Total Submissions</p>
          </div>
        </div>
        <div className="stat-card submitted">
          <div className="stat-icon">
            <i className="bi bi-hourglass-split"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.submitted}</h3>
            <p>Pending Grading</p>
          </div>
        </div>
        <div className="stat-card graded">
          <div className="stat-icon">
            <i className="bi bi-check2-circle"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.graded}</h3>
            <p>Graded</p>
          </div>
        </div>
        <div className="stat-card late">
          <div className="stat-icon">
            <i className="bi bi-clock-history"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.late}</h3>
            <p>Late Submissions</p>
          </div>
        </div>
        <div className="stat-card average">
          <div className="stat-icon">
            <i className="bi bi-star-fill"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.avgGrade.toFixed(1)}</h3>
            <p>Average Grade</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-container">
          <div className="filter-group">
            <label>
              <i className="bi bi-diagram-3"></i> Program
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => handleProgramChange(e.target.value)}
            >
              <option value="all">All Programs</option>
              {programOptions.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>
              <i className="bi bi-people"></i> Student
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              <option value="">All Students</option>
              {students
                .filter(
                  (s) =>
                    selectedProgram === "all" ||
                    s.programName === selectedProgram,
                )
                .map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.fullName}
                  </option>
                ))}
            </select>
          </div>
          <div className="filter-group">
            <label>
              <i className="bi bi-tag"></i> Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
              <option value="late">Late</option>
              <option value="resubmitted">Resubmitted</option>
            </select>
          </div>
          <div className="filter-group search">
            <label>
              <i className="bi bi-search"></i> Search
            </label>
            <input
              type="text"
              placeholder="Search by assignment, student, or text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Submissions Grid */}
      <div className="submissions-table-container">
        {/* Header */}
        <div className="submissions-grid-header">
          <div className="grid-header-cell">
            <i className="bi bi-person-badge"></i> Student
          </div>
          <div className="grid-header-cell">
            <i className="bi bi-file-text"></i> Assignment
          </div>
          <div className="grid-header-cell">
            <i className="bi bi-building"></i> Program
          </div>
          <div className="grid-header-cell">
            <i className="bi bi-calendar"></i> Submitted
          </div>
          <div className="grid-header-cell">
            <i className="bi bi-repeat"></i> Attempt
          </div>
          <div className="grid-header-cell">
            <i className="bi bi-trophy"></i> Grade
          </div>
          <div className="grid-header-cell">
            <i className="bi bi-flag"></i> Status
          </div>
          <div className="grid-header-cell">
            <i className="bi bi-gear"></i> Actions
          </div>
        </div>

        {/* Body */}
        <div className="submissions-grid-body">
          {filteredSubmissions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-content">
                <i className="bi bi-inbox"></i>
                <p>No submissions found</p>
              </div>
            </div>
          ) : (
            filteredSubmissions.map((submission) => {
              const profileImage = submission.student ? profileImages[submission.student.id] : null;
              const hasImageError = submission.student ? imageErrors[submission.student.id] : false;
              
              return (
                <div key={submission.id} className="submissions-grid-row">
                  {/* Student Cell */}
                  <div className="grid-cell">
                    <div className="student-info">
                      <div className="student-avatar">
                        {profileImage && !hasImageError ? (
                          <img 
                            src={profileImage} 
                            alt={submission.student?.fullName || "Student"}
                            className="avatar-image"
                            onError={() => {
                              if (submission.student) {
                                setImageErrors(prev => ({
                                  ...prev,
                                  [submission.student!.id]: true
                                }));
                              }
                            }}
                          />
                        ) : (
                          <div className="default-avatar">
                            {submission.student?.fullName?.charAt(0).toUpperCase() || 'S'}
                          </div>
                        )}
                      </div>
                      <div className="student-details">
                        <strong>
                          {submission.student?.fullName ||
                            `Student #${submission.studentId}`}
                        </strong>
                        <small>{submission.student?.email}</small>
                      </div>
                    </div>
                  </div>

                  {/* Assignment Cell */}
                  <div className="grid-cell">
                    <div className="assignment-info">
                      <strong>
                        {submission.content?.title ||
                          `Assignment #${submission.assignmentId}`}
                      </strong>
                      <small>
                        <i className="bi bi-file-earmark-text"></i>{" "}
                        {submission.content?.type}
                      </small>
                    </div>
                  </div>

                  {/* Program Cell */}
                  <div className="grid-cell">
                    <span className="program-badge">
                      {submission.content?.programName ||
                        submission.student?.programName ||
                        "—"}
                    </span>
                  </div>

                  {/* Submitted Cell */}
                  <div className="grid-cell">
                    <i className="bi bi-clock"></i>{" "}
                    {formatDate(submission.submittedAt)}
                  </div>

                  {/* Attempt Cell */}
                  <div className="grid-cell">
                    <span className="attempt-badge">
                      <i className="bi bi-hash"></i>
                      {submission.attemptNumber}
                    </span>
                  </div>

                  {/* Grade Cell */}
                  <div className="grid-cell">
                    {submission.grade ? (
                      <span className="grade-value">
                        <i className="bi bi-percent"></i> {submission.grade}%
                      </span>
                    ) : (
                      <span className="grade-pending">—</span>
                    )}
                  </div>

                  {/* Status Cell */}
                  <div className="grid-cell">
                    <span className={getStatusBadgeClass(submission.status)}>
                      <i className="bi bi-circle-fill"></i>{" "}
                      {getStatusText(submission.status)}
                    </span>
                  </div>

                  {/* Actions Cell */}
                  <div className="grid-cell actions-cell">
                    <button
                      className="icon-btn edit" 
                      title="View Details"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    {submission.status !== "graded" && (
                      <button
                        className="icon-btn grade" 
                        title="Grade Assignment"
                        onClick={() => setSelectedSubmission(submission)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    )}
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
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-chevron-left"></i> Previous
            </button>
            <span className="pagination-info">
              <i className="bi bi-files"></i> Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>

      {/* Grading Modal */}
      {selectedSubmission && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedSubmission(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-icon">
                <i className="bi bi-pencil-square"></i>
              </div>
              <h2>Grade Submission</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedSubmission(null)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="submission-details">
                <div className="detail-row">
                  <span className="detail-label">
                    <i className="bi bi-person"></i> Student:
                  </span>
                  <span className="detail-value">
                    {selectedSubmission.student?.fullName ||
                      `Student #${selectedSubmission.studentId}`}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <i className="bi bi-building"></i> Program:
                  </span>
                  <span className="detail-value">
                    {selectedSubmission.content?.programName ||
                      selectedSubmission.student?.programName ||
                      "—"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <i className="bi bi-file-text"></i> Assignment:
                  </span>
                  <span className="detail-value">
                    {selectedSubmission.content?.title ||
                      `Assignment #${selectedSubmission.assignmentId}`}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <i className="bi bi-calendar"></i> Submitted:
                  </span>
                  <span className="detail-value">
                    {formatDate(selectedSubmission.submittedAt)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">
                    <i className="bi bi-repeat"></i> Attempt:
                  </span>
                  <span className="detail-value">
                    #{selectedSubmission.attemptNumber}
                  </span>
                </div>
                {selectedSubmission.submissionUrl && (
                  <div className="detail-row">
                    <span className="detail-label">
                      <i className="bi bi-file-earmark"></i> File:
                    </span>
                    <a
                      href={selectedSubmission.submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      <i className="bi bi-download"></i> View Submission File
                    </a>
                  </div>
                )}
                {selectedSubmission.submissionText && (
                  <div className="detail-row text-submission">
                    <span className="detail-label">
                      <i className="bi bi-chat-text"></i> Text Submission:
                    </span>
                    <div className="text-content">
                      {selectedSubmission.submissionText}
                    </div>
                  </div>
                )}
              </div>
              <div className="grading-form">
                <div className="form-group">
                  <label>
                    <i className="bi bi-percent"></i> Grade (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    placeholder="Enter grade..."
                  />
                </div>
                <div className="form-group">
                  <label>
                    <i className="bi bi-chat-dots"></i> Feedback
                  </label>
                  <textarea
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide feedback to the student..."
                  />
                </div>
                <div className="modal-actions">
                  <button
                    className="cancel-btn"
                    onClick={() => setSelectedSubmission(null)}
                  >
                    <i className="bi bi-x-circle"></i> Cancel
                  </button>
                  <button
                    className="submit-grade-btn"
                    onClick={() => handleGrade(selectedSubmission.id)}
                    disabled={isGrading}
                  >
                    {isGrading ? (
                      <i className="bi bi-hourglass-split"></i>
                    ) : (
                      <i className="bi bi-check-circle"></i>
                    )}
                    {isGrading ? " Submitting..." : " Submit Grade"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentManagement;