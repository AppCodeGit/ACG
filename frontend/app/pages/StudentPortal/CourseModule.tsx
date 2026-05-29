"use client";

import { useState, useEffect } from "react";
import "./style/CourseModule.css";
import VideoPlayer from "./VideoPlayer";

// Types - ADD NEW TYPES
interface AssignmentSubmission {
  id: number;
  submissionUrl?: string | null;
  submissionText?: string | null;
  grade?: number;
  feedback?: string;
  status: string;
  attemptNumber: number;
  submittedAt: string;
}
interface Material {
  id: number;
  type: string;
  title: string;
  duration?: string;
  status: "completed" | "in-progress" | "not-started";
  fileUrl?: string;
  thumbnailUrl?: string;
  description?: string;
  lastPosition?: number;
  hasSubmitted?: boolean; // NEW - track if assignment submitted
  submissionId?: number; // NEW
}

interface Module {
  id: number;
  title: string;
  description: string;
  order: number;
  lessons: number;
  completed: boolean;
  materials: Material[];
}

interface CourseData {
  programName: string;
  studentName: string;
  studentEmail: string;
  progress: number;
  modules: Module[];
  stats: {
    totalModules: number;
    totalLessons: number;
    completedLessons: number;
  };
}

type StatusColors = {
  [key in Material["status"]]: string;
};

type StatusTexts = {
  [key in Material["status"]]: string;
};

const normalizeStatus = (status: string | undefined): Material["status"] => {
  if (status === "completed") return "completed";
  if (status === "in-progress") return "in-progress";
  return "not-started";
};

const CourseModule = () => {
  const [selectedModule, setSelectedModule] = useState<number>(0);
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lockedModuleMessage, setLockedModuleMessage] = useState<string | null>(
    null,
  );
  const [toastMessage, setToastMessage] = useState<{
    type: string;
    text: string;
  } | null>(null);

  // NEW: Assignment modal state
  const [selectedAssignment, setSelectedAssignment] = useState<{
    contentId: number;
    title: string;
    dueDate?: string;
    instructions?: string;
    maxPoints?: number;
    existingSubmission?: AssignmentSubmission;
  } | null>(null);

  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.email) {
          setUserEmail(user.email);
        } else {
          setError("User email not found");
          setIsLoading(false);
        }
      } catch (err) {
        setError("Invalid user data");
        setIsLoading(false);
      }
    } else {
      setError("Please log in");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchCourseContent();
    }
  }, [userEmail]);

const fetchCourseContent = async (showRefresh = false) => {
  if (showRefresh) setRefreshing(true);
  setIsLoading(true);
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    // ✅ Get the token from localStorage
    const token = localStorage.getItem("token");
    
    const response = await fetch(
      `${API_URL}/api/content-files/student/course-content?email=${encodeURIComponent(userEmail!)}`,
      {
        headers: {
          "Authorization": token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Handle 403 - Account Inactive
    if (response.status === 403) {
      const errorData = await response.json();
      setError(errorData.message || "Your account is inactive. Please contact support to access course content.");
      setIsLoading(false);
      if (showRefresh) setRefreshing(false);
      return;
    }

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid - redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }
      throw new Error("Failed to fetch");
    }

    const data = await response.json();

    if (data && data.modules) {
      // Fetch submission status for all assignments
      for (const module of data.modules) {
        for (const material of module.materials) {
          material.status = normalizeStatus(material.status as string);

          // If this is an assignment, check if student has submitted
          if (material.type === "assignment") {
            try {
              const submissionCheck = await fetch(
                `${API_URL}/api/assignments/content/${material.id}/details?email=${encodeURIComponent(userEmail!)}`,
                {
                  headers: {
                    "Authorization": token ? `Bearer ${token}` : "",
                  },
                }
              );
              if (submissionCheck.ok) {
                const submissionData = await submissionCheck.json();
                if (submissionData.submission) {
                  material.status = "completed";
                  material.hasSubmitted = true;
                  material.submissionId = submissionData.submission.id;
                }
              }
            } catch (err) {
              console.error("Error checking submission:", err);
            }
          }
        }
      }
    }

    setCourseData(data);
    setLockedModuleMessage(null);
    setError(null); // Clear any existing error
  } catch (err: any) {
    setError(err.message);
  } finally {
    setIsLoading(false);
    if (showRefresh) setRefreshing(false);
  }
};

const markContentCompleted = async (
  contentId: number,
  contentTitle: string,
) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");
    
    const response = await fetch(
      `${API_URL}/api/video-progress/content/mark-completed`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : "",  // ✅ Add auth header
        },
        body: JSON.stringify({
          email: userEmail,
          contentId: contentId,
          isCompleted: true,
        }),
      },
    );

    if (response.ok) {
      setToastMessage({
        type: "success",
        text: `✅ "${contentTitle}" marked as completed!`,
      });
      setTimeout(() => setToastMessage(null), 3000);
      await fetchCourseContent(true);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

  const handleDocumentClick = async (material: Material) => {
    if (material.fileUrl) {
      window.open(material.fileUrl, "_blank");
      if (material.status !== "completed") {
        await markContentCompleted(material.id, material.title);
      }
    }
  };

  const handleVideoClick = async (video: Material) => {
    setSelectedVideo({
      url: video.fileUrl!,
      contentId: video.id,
      title: video.title,
    });
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    fetchCourseContent(true);
  };

  // NEW: Fetch assignment details
const fetchAssignmentDetails = async (contentId: number, title: string) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");
    
    const response = await fetch(
      `${API_URL}/api/assignments/content/${contentId}/details?email=${encodeURIComponent(userEmail!)}`,
      {
        headers: {
          "Authorization": token ? `Bearer ${token}` : "",  // ✅ Add auth header
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch assignment details");

    const data = await response.json();

    setSelectedAssignment({
      contentId: data.contentId,
      title: data.title,
      dueDate: data.dueDate,
      instructions: data.instructions || data.description,
      maxPoints: data.maxPoints,
      existingSubmission: data.submission,
    });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    setToastMessage({
      type: "error",
      text: "Failed to load assignment details",
    });
    setTimeout(() => setToastMessage(null), 3000);
  }
};

  // NEW: Submit assignment
const handleSubmitAssignment = async () => {
  if (!selectedAssignment) return;

  if (!submissionText && !submissionFile) {
    setToastMessage({
      type: "error",
      text: "Please provide text or upload a file",
    });
    setTimeout(() => setToastMessage(null), 3000);
    return;
  }

  setIsSubmitting(true);

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token = localStorage.getItem("token");
    
    const formData = new FormData();
    formData.append("contentId", selectedAssignment.contentId.toString());
    formData.append("email", userEmail!);
    if (submissionText) formData.append("submissionText", submissionText);
    if (submissionFile) formData.append("file", submissionFile);

    const response = await fetch(`${API_URL}/api/assignments/submit`, {
      method: "POST",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "",  // ✅ Add auth header (don't set Content-Type with FormData)
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Submission failed");
    }

    const result = await response.json();

    setToastMessage({ type: "success", text: result.message });
    setTimeout(() => setToastMessage(null), 3000);

    // Close modal and refresh
    setSelectedAssignment(null);
    setSubmissionFile(null);
    setSubmissionText("");
    await fetchCourseContent(true);
  } catch (error: any) {
    console.error("Submission error:", error);
    setToastMessage({ type: "error", text: error.message });
    setTimeout(() => setToastMessage(null), 3000);
  } finally {
    setIsSubmitting(false);
  }
};

  // NEW: View submission (opens modal with existing submission)
  const handleViewSubmission = async (material: Material) => {
    await fetchAssignmentDetails(material.id, material.title);
  };

  const handleVideoProgressUpdate = async () => {
    await fetchCourseContent(true);
  };

  const isModuleAccessible = (moduleIndex: number): boolean => {
    if (!courseData) return false;
    if (moduleIndex === 0) return true;
    const previousModule = courseData.modules[moduleIndex - 1];
    return previousModule?.completed === true;
  };

  const handleModuleClick = (index: number) => {
    if (isModuleAccessible(index)) {
      setSelectedModule(index);
      setLockedModuleMessage(null);
    } else {
      const previousModule = courseData?.modules[index - 1];
      setLockedModuleMessage(
        `⚠️ Module "${previousModule?.title}" must be completed before accessing "${courseData?.modules[index]?.title}".\n\nComplete all materials in the current module to unlock the next module.`,
      );
      setTimeout(() => setLockedModuleMessage(null), 5000);
    }
  };

  const getStatusColor = (status: Material["status"]): string => {
    const colors: StatusColors = {
      completed: "#4CAF50",
      "in-progress": "#2196F3",
      "not-started": "#9E9E9E",
    };
    return colors[status];
  };

  const getMaterialStatusText = (status: Material["status"]): string => {
    const texts: StatusTexts = {
      completed: "Completed",
      "in-progress": "In Progress",
      "not-started": "Not Started",
    };
    return texts[status];
  };

  const getDisplayDuration = (material: Material): string => {
    if (material.type === "video" && material.duration) {
      return ` • ${material.duration}`;
    }
    return "";
  };

  const getMaterialTypeDisplay = (material: Material): string => {
    const type = material.type.charAt(0).toUpperCase() + material.type.slice(1);
    const duration = getDisplayDuration(material);
    return `${type}${duration}`;
  };

  const getModuleProgress = (module: Module): number => {
    if (!module.materials.length) return 0;
    const completedCount = module.materials.filter(
      (m) => m.status === "completed",
    ).length;
    return (completedCount / module.materials.length) * 100;
  };

  // UPDATED: No mark complete button for assignments
  const renderMarkCompleteButton = (material: Material) => {
    if (material.type === "assignment") return null; // REMOVED for assignments

    if (material.status === "completed") {
      return (
        <button className="start-btn completed" disabled>
          ✓ Completed
        </button>
      );
    }

    return (
      <button
        className="start-btn mark-complete"
        onClick={(e) => {
          e.stopPropagation();
          markContentCompleted(material.id, material.title);
        }}
      >
        Mark as Completed
      </button>
    );
  };

  if (isLoading && !refreshing) {
    return (
      <div className="course-module-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your course content...</p>
        </div>
      </div>
    );
  }

if (error || !courseData) {
  // ✅ Check if it's an inactive account error
  const isInactiveError = error?.toLowerCase().includes("inactive") || 
                          error?.toLowerCase().includes("contact support");
  
  return (
    <div className="course-module-container">
      <div className={`error-state ${isInactiveError ? "inactive-error" : ""}`}>
        {isInactiveError ? (
          <>
            <div className="inactive-icon">🔒</div>
            <h2>Account Inactive</h2>
            <p>{error || "Your account is currently inactive."}</p>
            <div className="inactive-message-box">
              <p>
                Your access to course content has been temporarily suspended.
                Please contact the administrator to reactivate your account.
              </p>
            </div>
            <button 
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">error</span>
            <p>{error || "No course content available"}</p>
            <button onClick={() => fetchCourseContent()}>Try Again</button>
          </>
        )}
      </div>
    </div>
  );
}

  const currentModule = courseData.modules[selectedModule];
  const overallProgress = courseData.progress;

  return (
    <div className="course-module-container">
      {/* Toast Message Notification */}
      {toastMessage && (
        <div className={`toast-notification ${toastMessage.type}`}>
          <div className="toast-content">
            <span className="toast-icon">
              {toastMessage.type === "success" ? "✅" : "❌"}
            </span>
            <span className="toast-text">{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Locked Module Message Toast */}
      {lockedModuleMessage && (
        <div className="locked-module-toast">
          <div className="toast-content">
            <span className="toast-icon">🔒</span>
            <div className="toast-text">
              <strong>Module Locked</strong>
              <p>{lockedModuleMessage}</p>
            </div>
            <button
              className="toast-close"
              onClick={() => setLockedModuleMessage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && userEmail && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-modal-header">
              <h3>{selectedVideo.title}</h3>
              <button className="video-modal-close" onClick={closeVideoModal}>
                ✕
              </button>
            </div>
            <VideoPlayer
              videoUrl={selectedVideo.url}
              contentId={selectedVideo.contentId}
              studentEmail={userEmail}
              title={selectedVideo.title}
              onProgressUpdate={handleVideoProgressUpdate}
            />
          </div>
        </div>
      )}

      {/* NEW: Assignment Submission Modal */}
      {selectedAssignment && (
        <div
          className="assignment-modal-overlay"
          onClick={() => setSelectedAssignment(null)}
        >
          <div
            className="assignment-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="assignment-modal-header">
              <h3>{selectedAssignment.title}</h3>
              <button
                className="assignment-modal-close"
                onClick={() => setSelectedAssignment(null)}
              >
                ✕
              </button>
            </div>

            <div className="assignment-modal-body">
              {selectedAssignment.instructions && (
                <div className="assignment-instructions">
                  <h4>Instructions</h4>
                  <p>{selectedAssignment.instructions}</p>
                </div>
              )}

              <div className="assignment-meta">
                {selectedAssignment.dueDate && (
                  <div className="meta-item">
                    <span className="meta-label">Due Date:</span>
                    <span
                      className={`meta-value ${new Date(selectedAssignment.dueDate) < new Date() ? "overdue" : ""}`}
                    >
                      {new Date(selectedAssignment.dueDate).toLocaleString()}
                    </span>
                  </div>
                )}
                {selectedAssignment.maxPoints && (
                  <div className="meta-item">
                    <span className="meta-label">Points:</span>
                    <span className="meta-value">
                      {selectedAssignment.maxPoints}
                    </span>
                  </div>
                )}
              </div>

              {selectedAssignment.existingSubmission && (
                <div className="existing-submission">
                  <h4>Your Submission</h4>
                  <div className="submission-details">
                    <p>
                      <strong>
                        Attempt #
                        {selectedAssignment.existingSubmission.attemptNumber}
                      </strong>
                    </p>
                    <p>
                      Submitted:{" "}
                      {new Date(
                        selectedAssignment.existingSubmission.submittedAt,
                      ).toLocaleString()}
                    </p>
                    {selectedAssignment.existingSubmission.grade !==
                      undefined && (
                      <p className="grade-display">
                        Grade: {selectedAssignment.existingSubmission.grade} /{" "}
                        {selectedAssignment.maxPoints || 100}
                        {selectedAssignment.existingSubmission.grade >= 60
                          ? " ✅"
                          : " 📝"}
                      </p>
                    )}
                    {selectedAssignment.existingSubmission.feedback && (
                      <div className="feedback">
                        <strong>Feedback:</strong>
                        <p>{selectedAssignment.existingSubmission.feedback}</p>
                      </div>
                    )}
                    {selectedAssignment.existingSubmission.submissionUrl && (
                      <p>
                        <a
                          href={
                            selectedAssignment.existingSubmission.submissionUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="submission-link"
                        >
                          📎 View Uploaded File
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="submission-form">
                <h4>
                  {selectedAssignment.existingSubmission
                    ? "Resubmit Assignment"
                    : "Submit Assignment"}
                </h4>

                <div className="form-group">
                  <label>Text Submission</label>
                  <textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Enter your answer here..."
                    rows={5}
                  />
                </div>

                <div className="form-group">
                  <label>File Upload (PDF, DOC, ZIP - Max 50MB)</label>
                  <input
                    type="file"
                    onChange={(e) =>
                      setSubmissionFile(e.target.files?.[0] || null)
                    }
                    accept=".pdf,.doc,.docx,.zip,.txt"
                  />
                  {submissionFile && (
                    <p className="file-name">Selected: {submissionFile.name}</p>
                  )}
                </div>

                <button
                  className="submit-assignment-btn"
                  onClick={handleSubmitAssignment}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Assignment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="course-header-wrapper">
        <div className="course-header-container">
          <div className="header-content-section">
            <div className="content-top-badge">
              <span className="welcome-badge">
                Welcome, {courseData.studentName}
              </span>
            </div>

            <h1 className="course-title">
              {courseData.programName}
              <span className="title-underline"></span>
            </h1>

            <p className="course-description">
              {courseData.programName} course content - Complete learning path
              from fundamentals to advanced topics.
            </p>

            <div className="course-stats-row">
              <div className="stat-item">
                <span className="stat-icon">📚</span>
                <div>
                  <strong>{courseData.modules?.length || 0}</strong>
                  <span>Total Modules</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">✅</span>
                <div>
                  <strong>
                    {courseData.modules?.filter((m) => m.completed).length || 0}
                  </strong>
                  <span>Completed Modules</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🎥</span>
                <div>
                  <strong>{courseData.stats?.totalLessons || 0}</strong>
                  <span>Total Lessons</span>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">✔️</span>
                <div>
                  <strong>{courseData.stats?.completedLessons || 0}</strong>
                  <span>Completed Lessons</span>
                </div>
              </div>
            </div>

            <div className="student-greeting">
              <div className="avatar-placeholder">
                <span>{courseData.studentName?.charAt(0) || "S"}</span>
              </div>
              <div className="greeting-text">
                <p className="student-name">{courseData.studentName}</p>
                <p className="student-email">{courseData.studentEmail}</p>
              </div>
              <div className="progress-indicator">
                <div className="mini-progress-bar">
                  <div
                    className="mini-progress-fill"
                    style={{ width: `${overallProgress || 0}%` }}
                  ></div>
                </div>
                <span>{overallProgress || 0}% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="course-content">
        {/* Modules Sidebar */}
        <div className="modules-sidebar">
          <h4>Course Modules</h4>
          <div className="modules-list">
            {courseData.modules.map((module, index) => {
              const moduleProgress = getModuleProgress(module);
              const isAccessible = isModuleAccessible(index);
              const isLocked = !isAccessible && index > 0;

              return (
                <div
                  key={module.id}
                  className={`module-item ${selectedModule === index ? "active" : ""} ${module.completed ? "completed" : ""} ${isLocked ? "locked" : ""}`}
                  onClick={() => handleModuleClick(index)}
                  style={
                    isLocked ? { opacity: 0.7, cursor: "not-allowed" } : {}
                  }
                >
                  <div className="module-status">
                    {module.completed ? (
                      <i className="bi bi-check-circle-fill"></i>
                    ) : isLocked ? (
                      <i className="bi bi-lock-fill"></i>
                    ) : (
                      <i className="bi bi-circle"></i>
                    )}
                  </div>
                  <div className="module-info">
                    <h5>
                      {module.title}
                      {isLocked && <span className="lock-badge"> 🔒</span>}
                    </h5>
                    <span>{module.lessons} lessons</span>
                    <div className="module-progress-bar">
                      <div
                        className="module-progress-fill"
                        style={{ width: `${moduleProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="module-arrow">
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module Details */}
        <div className="module-details">
          {currentModule && (
            <>
              <div className="module-header">
                <h2>{currentModule.title}</h2>
                <div className="module-meta">
                  <span className="lessons">
                    <i className="bi bi-list-ul"></i>
                    {currentModule.lessons} lessons
                  </span>
                  {currentModule.completed && (
                    <span className="completed-badge">
                      <i className="bi bi-check-circle"></i>
                      Completed
                    </span>
                  )}
                </div>
                {currentModule.description && (
                  <p className="module-description-full">
                    {currentModule.description}
                  </p>
                )}
              </div>

              <div className="materials-list">
                <h4>Learning Materials</h4>
                <div className="materials-grid">
                  {currentModule.materials.map((material) => {
                    const materialStatus = material.status;

                    return material.type === "video" ? (
                      // Video Card
                      <div
                        key={material.id}
                        className={`material-card video-card ${materialStatus}`}
                        onClick={() => handleVideoClick(material)}
                      >
                        <div className="material-header">
                          <div className="material-icon">
                            {material.thumbnailUrl ? (
                              <img
                                src={material.thumbnailUrl}
                                alt={material.title}
                                className="video-thumbnail"
                              />
                            ) : (
                              <span className="material-symbols-outlined">
                                play_circle
                              </span>
                            )}
                          </div>
                          <div className="material-title-section">
                            <h5>{material.title}</h5>
                            <span className="material-type">
                              {getMaterialTypeDisplay(material)}
                            </span>
                            {material.description && (
                              <p className="material-description">
                                {material.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="material-footer">
                          <div className="status-container">
                            <span
                              className="material-status"
                              style={{ color: getStatusColor(materialStatus) }}
                            >
                              {getMaterialStatusText(materialStatus)}
                            </span>
                            {materialStatus === "in-progress" &&
                              material.lastPosition && (
                                <span className="resume-indicator">
                                  {Math.floor(material.lastPosition / 60)} min
                                  watched
                                </span>
                              )}
                          </div>
                          <button className={`start-btn ${materialStatus}`}>
                            {materialStatus === "completed"
                              ? "Watch Again"
                              : materialStatus === "in-progress"
                                ? "Resume"
                                : "Start Watching"}
                          </button>
                        </div>
                      </div>
                    ) : material.type === "document" ? (
                      // Document Card
                      <div
                        key={material.id}
                        className={`material-card document-card ${materialStatus}`}
                      >
                        <div
                          className="material-header"
                          onClick={() => handleDocumentClick(material)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="material-icon">
                            <span className="material-symbols-outlined">
                              description
                            </span>
                          </div>
                          <div className="material-title-section">
                            <h5>{material.title}</h5>
                            <span className="material-type">
                              {getMaterialTypeDisplay(material)}
                            </span>
                            {material.description && (
                              <p className="material-description">
                                {material.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="material-footer">
                          <div className="status-container">
                            <span
                              className="material-status"
                              style={{ color: getStatusColor(materialStatus) }}
                            >
                              {getMaterialStatusText(materialStatus)}
                            </span>
                          </div>
                          <div className="button-group">
                            <button
                              className="start-btn view-btn"
                              onClick={() => handleDocumentClick(material)}
                            >
                              View Document
                            </button>
                            {renderMarkCompleteButton(material)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Assignment Card (UPDATED with click handlers)
                      <div
                        key={material.id}
                        className={`material-card assignment-card ${materialStatus}`}
                      >
                        <div className="material-header">
                          <div className="material-icon">
                            <span className="material-symbols-outlined">
                              assignment
                            </span>
                          </div>
                          <div className="material-title-section">
                            <h5>{material.title}</h5>
                            <span className="material-type">
                              {getMaterialTypeDisplay(material)}
                            </span>
                            {material.description && (
                              <p className="material-description">
                                {material.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="material-footer">
                          <div className="status-container">
                            <span
                              className="material-status"
                              style={{ color: getStatusColor(materialStatus) }}
                            >
                              {materialStatus === "completed"
                                ? "Submitted ✓"
                                : getMaterialStatusText(materialStatus)}
                            </span>
                          </div>
                          <div className="button-group">
                            {/* View Assignment Button - opens the assignment file */}
                            {material.fileUrl && (
                              <button
                                className="start-btn view-assignment-btn"
                                onClick={() =>
                                  window.open(material.fileUrl, "_blank")
                                }
                              >
                                📄 View Assignment
                              </button>
                            )}
                            {/* Submit / View Submission Button */}
                            <button
                              className={`start-btn ${materialStatus === "completed" ? "view-submission-btn" : "submit-btn"}`}
                              onClick={() => {
                                if (materialStatus === "completed") {
                                  handleViewSubmission(material);
                                } else {
                                  fetchAssignmentDetails(
                                    material.id,
                                    material.title,
                                  );
                                }
                              }}
                            >
                              {materialStatus === "completed"
                                ? "📋 View Submission"
                                : "✏️ Submit Assignment"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Module Progress */}
              <div className="module-progress">
                <h4>Module Progress</h4>
                <div className="module-progress-bar-large">
                  <div
                    className="module-progress-fill-large"
                    style={{ width: `${getModuleProgress(currentModule)}%` }}
                  >
                    <span>{Math.round(getModuleProgress(currentModule))}%</span>
                  </div>
                </div>
                <div className="progress-breakdown">
                  {currentModule.materials.map((material) => {
                    const materialStatus = material.status;
                    return (
                      <div key={material.id} className="progress-item">
                        <div className="progress-info">
                          <span className="material-name">
                            {material.title}
                          </span>
                          <span
                            className="progress-status"
                            style={{ color: getStatusColor(materialStatus) }}
                          >
                            {materialStatus === "completed" &&
                            material.type === "assignment"
                              ? "Submitted ✓"
                              : getMaterialStatusText(materialStatus)}
                          </span>
                        </div>
                        <div className="progress-indicator">
                          <div
                            className={`status-dot ${materialStatus}`}
                            style={{
                              backgroundColor: getStatusColor(materialStatus),
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn secondary">
          <i className="bi bi-chat"></i>
          Ask Instructor
        </button>
        <button className="action-btn secondary">
          <i className="bi bi-share"></i>
          Share Progress
        </button>
      </div>
    </div>
  );
};

export default CourseModule;
