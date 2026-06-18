"use client";

import { useState, useEffect } from "react";
import "./style/CourseGrade.css";

// Types
interface Assignment {
  id: number;
  name: string;
  weight: number;
  score: number;
  maxScore: number;
  grade?: number;
  feedback?: string;
}

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  grade: string;
  points: number;
  averageScore: number;
  assignments?: Assignment[];
}

interface Semester {
  id: string;
  name: string;
  gpa: number;
  credits: number;
  status: string;
  courses: Course[];
}

interface GradeDistribution {
  A: number;
  "A-": number;
  "B+": number;
  B: number;
  "B-": number;
  "C+": number;
  C: number;
  D: number;
  F: number;
}

interface GPAProgression {
  semester: string;
  gpa: number;
}

interface FinalGradeData {
  id: number;
  programName: string;
  projectTitle: string;
  projectScore: number;
  weightedScore: number;
  certificateIssued: boolean;
  certificateUrl?: string;
}

interface GradeData {
  overallGPA: number;
  cumulativeCredits: number;
  completedCourses: number;
  currentSemester: {
    name: string;
    gpa: number;
    credits: number;
    courses: number;
  };
  semesters: Semester[];
  gradeDistribution: GradeDistribution;
  gpaProgression: GPAProgression[];
  finalGrade?: FinalGradeData;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CourseGrade = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [gradeData, setGradeData] = useState<GradeData | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("detailed");
  const [showFinalGradeModal, setShowFinalGradeModal] = useState(false);

  // Fetch grade data from backend
  useEffect(() => {
    const fetchGradeData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          setError("User not found");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userStr);
        const email = user.email;

        const response = await fetch(`${API_URL}/api/grades/${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch grade data");
        }
        
        const result = await response.json();
        if (result.success) {
          setGradeData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Error fetching grade data:", err);
        setError("Failed to load grade data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchGradeData();
  }, []);

  const getGradeColor = (grade: string): string => {
    const colors: Record<string, string> = {
      "A": "#4CAF50",
      "A-": "#8BC34A",
      "B+": "#CDDC39",
      "B": "#FFEB3B",
      "B-": "#FFC107",
      "C+": "#FF9800",
      "C": "#FF5722",
      "D": "#F44336",
      "F": "#D32F2F"
    };
    return colors[grade] || "#666";
  };

  const getGPAStatus = (gpa: number) => {
    if (gpa >= 3.7) return { status: "Excellent", color: "#4CAF50", icon: "🏆" };
    if (gpa >= 3.3) return { status: "Very Good", color: "#8BC34A", icon: "👍" };
    if (gpa >= 3.0) return { status: "Good", color: "#FFC107", icon: "✅" };
    return { status: "Needs Improvement", color: "#F44336", icon: "📈" };
  };

  if (loading) {
    return (
      <div className="course-grade-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your grades...</p>
        </div>
      </div>
    );
  }

  if (error || !gradeData) {
    return (
      <div className="course-grade-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>{error || "Failed to load grade data"}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const gpaStatus = getGPAStatus(gradeData.overallGPA);
  const currentSemester = gradeData.semesters.find(s => s.status === "current");
  const filteredSemesters = selectedSemester === "all" 
    ? gradeData.semesters 
    : gradeData.semesters.filter(s => s.id === selectedSemester);

  return (
    <div className="course-grade-container">
      {/* Header Section */}
      <div className="grade-header">
        <div className="header-content">
          <h1>Academic Grades</h1>
          <p>Track your academic performance and grade history</p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === "summary" ? "active" : ""}`}
              onClick={() => setViewMode("summary")}
            >
              <i className="bi bi-card-text"></i>
              Summary
            </button>
            <button 
              className={`toggle-btn ${viewMode === "detailed" ? "active" : ""}`}
              onClick={() => setViewMode("detailed")}
            >
              <i className="bi bi-list-check"></i>
              Detailed
            </button>
          </div>
          {gradeData.finalGrade && (
            <button 
              className="certificate-btn"
              onClick={() => setShowFinalGradeModal(true)}
            >
              <i className="bi bi-award"></i>
              View Final Score
            </button>
          )}
        </div>
      </div>

      {/* Overall GPA Stats */}
      <div className="gpa-overview">
        <div className="gpa-card main">
          <div className="gpa-content">
            <div className="gpa-icon">📊</div>
            <div className="gpa-info">
              <h3>Overall GPA</h3>
              <div className="gpa-score">{gradeData.overallGPA.toFixed(2)}</div>
              <div 
                className="gpa-status"
                style={{ color: gpaStatus.color }}
              >
                {gpaStatus.icon} {gpaStatus.status}
              </div>
            </div>
          </div>
          <div className="gpa-progress">
            <div className="progress-ring">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle 
                  cx="40" 
                  cy="40" 
                  r="36" 
                  stroke="#e9ecef" 
                  strokeWidth="8" 
                  fill="none"
                />
                <circle 
                  cx="40" 
                  cy="40" 
                  r="36" 
                  stroke={gpaStatus.color} 
                  strokeWidth="8" 
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="226.2"
                  strokeDashoffset={226.2 - (226.2 * gradeData.overallGPA) / 4.0}
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div className="progress-text">4.0</div>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-info">
              <span className="stat-number">{gradeData.completedCourses}</span>
              <span className="stat-label">Courses Completed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <span className="stat-number">{gradeData.cumulativeCredits}</span>
              <span className="stat-label">Total Credits</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <span className="stat-number">{currentSemester?.courses.length || 0}</span>
              <span className="stat-label">Current Courses</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <span className="stat-number">
                {gradeData.gradeDistribution.A + gradeData.gradeDistribution["A-"]}
              </span>
              <span className="stat-label">A Grades</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grade-filters">
        <div className="filter-group">
          <label>Semester:</label>
          <select 
            value={selectedSemester} 
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="all">All Semesters</option>
            {gradeData.semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.name} {semester.status === "current" && "(Current)"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* View Content */}
      {viewMode === "summary" ? (
        <div className="summary-view">
          {/* Semester Overview */}
          <div className="section-card">
            <div className="section-header">
              <h3>Semester Overview</h3>
              <span className="section-subtitle">Your academic performance by semester</span>
            </div>
            <div className="semesters-grid">
              {gradeData.semesters.map((semester) => (
                <div key={semester.id} className={`semester-card ${semester.status}`}>
                  <div className="semester-header">
                    <h4>{semester.name}</h4>
                    {semester.status === "current" && (
                      <span className="current-badge">Current</span>
                    )}
                  </div>
                  <div className="semester-gpa">
                    <span className="gpa-value">{semester.gpa.toFixed(2)}</span>
                    <span className="gpa-label">GPA</span>
                  </div>
                  <div className="semester-meta">
                    <div className="meta-item">
                      <i className="bi bi-book"></i>
                      <span>{semester.courses.length} courses</span>
                    </div>
                    <div className="meta-item">
                      <i className="bi bi-credit-card"></i>
                      <span>{semester.credits} credits</span>
                    </div>
                  </div>
                  <div className="course-grades">
                    {semester.courses.slice(0, 3).map((course) => (
                      <div key={course.id} className="course-grade-item">
                        <span className="course-code">{course.code}</span>
                        <span 
                          className="grade-badge"
                          style={{ backgroundColor: getGradeColor(course.grade) }}
                        >
                          {course.grade}
                        </span>
                      </div>
                    ))}
                    {semester.courses.length > 3 && (
                      <div className="more-courses">
                        +{semester.courses.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grade Distribution */}
          <div className="section-card">
            <div className="section-header">
              <h3>Grade Distribution</h3>
              <span className="section-subtitle">Overview of your grades across all courses</span>
            </div>
            <div className="distribution-chart">
              {Object.entries(gradeData.gradeDistribution).map(([grade, count]) => (
                <div key={grade} className="distribution-bar">
                  <div className="bar-container">
                    <div 
                      className="bar-fill"
                      style={{ 
                        height: `${(count / gradeData.completedCourses) * 100}%`,
                        backgroundColor: getGradeColor(grade)
                      }}
                    ></div>
                  </div>
                  <div className="bar-label">
                    <span className="grade">{grade}</span>
                    <span className="count">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GPA Progression */}
          <div className="section-card">
            <div className="section-header">
              <h3>GPA Progression</h3>
              <span className="section-subtitle">Your academic journey over time</span>
            </div>
            <div className="gpa-chart">
              <div className="chart-area">
                {gradeData.gpaProgression.map((point, index) => (
                  <div key={index} className="chart-point">
                    <div 
                      className="point-value"
                      style={{ bottom: `${(point.gpa / 4.0) * 100}%` }}
                      title={`GPA: ${point.gpa}`}
                    ></div>
                    <span className="point-label">{point.semester}</span>
                  </div>
                ))}
                <div className="chart-line"></div>
              </div>
              <div className="chart-y-axis">
                <span>4.0</span>
                <span>3.0</span>
                <span>2.0</span>
                <span>1.0</span>
                <span>0.0</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="detailed-view">
          {filteredSemesters.map((semester) => (
            <div key={semester.id} className="semester-detailed">
              <div className="semester-header-detailed">
                <h3>{semester.name}</h3>
                <div className="semester-stats">
                  <span className="gpa-badge">GPA: {semester.gpa.toFixed(2)}</span>
                  <span className="credits-badge">{semester.credits} Credits</span>
                  {semester.status === "current" && (
                    <span className="current-badge">In Progress</span>
                  )}
                </div>
              </div>
              
              <div className="courses-grid">
                {semester.courses.map((course) => (
                  <div key={course.id} className="course-grade-card">
                    <div className="course-header">
                      <div className="course-info">
                        <h4>{course.code} - {course.name}</h4>
                        <p>{course.credits} credits • {course.averageScore}% average</p>
                      </div>
                      <div className="course-grade">
                        <div 
                          className="final-grade"
                          style={{ backgroundColor: getGradeColor(course.grade) }}
                        >
                          {course.grade}
                        </div>
                        <div className="grade-points">{course.points.toFixed(2)} GPA</div>
                      </div>
                    </div>
                    
                    <div className="course-meta">
                      <div className="meta-item">
                        <i className="bi bi-credit-card"></i>
                        <span>{course.credits} Credits</span>
                      </div>
                      <div className="meta-item">
                        <i className="bi bi-bar-chart"></i>
                        <span>Average: {course.averageScore}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Final Grade Modal */}
      {showFinalGradeModal && gradeData.finalGrade && (
        <div className="modal-overlay" onClick={() => setShowFinalGradeModal(false)}>
          <div className="final-grade-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                <i className="bi bi-award-fill"></i>
                Final Program Score
              </h2>
              <button className="modal-close" onClick={() => setShowFinalGradeModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="final-grade-card">
                <div className="program-info">
                  <h3>{gradeData.finalGrade.programName}</h3>
                  <p>Project: {gradeData.finalGrade.projectTitle}</p>
                </div>
                <div className="final-score-display">
                  <div className="score-circle">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        stroke="#e9ecef" 
                        strokeWidth="12" 
                        fill="none"
                      />
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        stroke={gradeData.finalGrade.weightedScore >= 70 ? "#4CAF50" : "#FF9800"} 
                        strokeWidth="12" 
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="339.3"
                        strokeDashoffset={339.3 - (339.3 * gradeData.finalGrade.weightedScore) / 100}
                        transform="rotate(-90 60 60)"
                      />
                    </svg>
                    <div className="score-text">
                      <span className="percentage">{gradeData.finalGrade.weightedScore}%</span>
                      <span className="label">Final Score</span>
                    </div>
                  </div>
                </div>
                <div className="grade-breakdown">
                  <div className="breakdown-item">
                    <span>Project Score:</span>
                    <strong>{gradeData.finalGrade.projectScore}%</strong>
                  </div>
                  <div className="breakdown-item">
                    <span>Certificate Status:</span>
                    <strong className={gradeData.finalGrade.certificateIssued ? "success" : "pending"}>
                      {gradeData.finalGrade.certificateIssued ? "✓ Issued" : "Pending"}
                    </strong>
                  </div>
                  {gradeData.finalGrade.certificateUrl && (
                    <div className="breakdown-item">
                      <a 
                        href={gradeData.finalGrade.certificateUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="certificate-link"
                      >
                        <i className="bi bi-download"></i> Download Certificate
                      </a>
                    </div>
                  )}
                </div>
                <div className="grade-message">
                  {gradeData.finalGrade.weightedScore >= 70 ? (
                    <p>🎉 Congratulations! You have successfully completed the program with a score of {gradeData.finalGrade.weightedScore}%. Your certificate is ready.</p>
                  ) : gradeData.finalGrade.weightedScore >= 50 ? (
                    <p>📚 Good effort! Your final score is {gradeData.finalGrade.weightedScore}%. Keep improving!</p>
                  ) : (
                    <p>📖 Keep working hard! Your current score is {gradeData.finalGrade.weightedScore}%. Focus on improving your skills.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseGrade;