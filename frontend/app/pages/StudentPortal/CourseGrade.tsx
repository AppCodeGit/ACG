// app/components/CourseGrade.tsx
"use client";

import { useState } from "react";
import "./style/CourseGrade.css";

// Types
interface Assignment {
  name: string;
  weight: number;
  score: number;
  maxScore: number;
}

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  grade: string;
  points: number;
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
}

// Type for grade colors
type GradeColors = {
  [key: string]: string;
};

// Type for GPA status
interface GPAStatus {
  status: string;
  color: string;
  icon: string;
}

const CourseGrade = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("detailed"); // 'detailed' or 'summary'

  // Sample grade data
  const gradeData: GradeData = {
    overallGPA: 3.75,
    cumulativeCredits: 45,
    completedCourses: 12,
    currentSemester: {
      name: "Spring 2024",
      gpa: 3.82,
      credits: 15,
      courses: 4
    },
    semesters: [
      {
        id: "spring2024",
        name: "Spring 2024",
        gpa: 3.82,
        credits: 15,
        status: "current",
        courses: [
          {
            id: "cs401",
            code: "CS401",
            name: "Advanced Web Development",
            instructor: "Dr. Sarah Chen",
            credits: 4,
            grade: "A",
            points: 4.0,
            assignments: [
              { name: "React Project", weight: 25, score: 95, maxScore: 100 },
              { name: "Midterm Exam", weight: 30, score: 88, maxScore: 100 },
              { name: "Final Project", weight: 35, score: 92, maxScore: 100 },
              { name: "Participation", weight: 10, score: 100, maxScore: 100 }
            ]
          },
          {
            id: "cs402",
            code: "CS402",
            name: "Database Systems",
            instructor: "Prof. Michael Rodriguez",
            credits: 3,
            grade: "A-",
            points: 3.7,
            assignments: [
              { name: "SQL Queries", weight: 20, score: 90, maxScore: 100 },
              { name: "Database Design", weight: 25, score: 85, maxScore: 100 },
              { name: "Final Exam", weight: 40, score: 82, maxScore: 100 },
              { name: "Labs", weight: 15, score: 95, maxScore: 100 }
            ]
          },
          {
            id: "math301",
            code: "MATH301",
            name: "Advanced Statistics",
            instructor: "Dr. Emily Watson",
            credits: 4,
            grade: "B+",
            points: 3.3,
            assignments: [
              { name: "Problem Sets", weight: 30, score: 85, maxScore: 100 },
              { name: "Midterm", weight: 30, score: 78, maxScore: 100 },
              { name: "Final Project", weight: 40, score: 82, maxScore: 100 }
            ]
          },
          {
            id: "eng201",
            code: "ENG201",
            name: "Technical Writing",
            instructor: "Prof. James Wilson",
            credits: 4,
            grade: "A",
            points: 4.0,
            assignments: [
              { name: "Research Paper", weight: 40, score: 94, maxScore: 100 },
              { name: "Documentation", weight: 35, score: 96, maxScore: 100 },
              { name: "Presentations", weight: 25, score: 92, maxScore: 100 }
            ]
          }
        ]
      },
      {
        id: "fall2023",
        name: "Fall 2023",
        gpa: 3.68,
        credits: 16,
        status: "completed",
        courses: [
          {
            id: "cs301",
            code: "CS301",
            name: "Data Structures",
            instructor: "Dr. Sarah Chen",
            credits: 4,
            grade: "A-",
            points: 3.7
          },
          {
            id: "cs302",
            code: "CS302",
            name: "Algorithms",
            instructor: "Prof. Robert Kim",
            credits: 4,
            grade: "B+",
            points: 3.3
          },
          {
            id: "math202",
            code: "MATH202",
            name: "Linear Algebra",
            instructor: "Dr. Emily Watson",
            credits: 4,
            grade: "A",
            points: 4.0
          },
          {
            id: "phys101",
            code: "PHYS101",
            name: "Physics I",
            instructor: "Prof. David Lee",
            credits: 4,
            grade: "B+",
            points: 3.3
          }
        ]
      },
      {
        id: "spring2023",
        name: "Spring 2023",
        gpa: 3.72,
        credits: 14,
        status: "completed",
        courses: [
          {
            id: "cs201",
            code: "CS201",
            name: "OOP Programming",
            instructor: "Dr. Sarah Chen",
            credits: 4,
            grade: "A-",
            points: 3.7
          },
          {
            id: "cs202",
            code: "CS202",
            name: "Computer Architecture",
            instructor: "Prof. Michael Rodriguez",
            credits: 4,
            grade: "B+",
            points: 3.3
          },
          {
            id: "math201",
            code: "MATH201",
            name: "Calculus III",
            instructor: "Dr. Emily Watson",
            credits: 4,
            grade: "A",
            points: 4.0
          },
          {
            id: "hist101",
            code: "HIST101",
            name: "World History",
            instructor: "Prof. Anna Scott",
            credits: 2,
            grade: "A",
            points: 4.0
          }
        ]
      }
    ],
    gradeDistribution: {
      "A": 8,
      "A-": 3,
      "B+": 4,
      "B": 2,
      "B-": 1,
      "C+": 0,
      "C": 0,
      "D": 0,
      "F": 0
    },
    gpaProgression: [
      { semester: "Spr 23", gpa: 3.72 },
      { semester: "Fall 23", gpa: 3.68 },
      { semester: "Spr 24", gpa: 3.82 }
    ]
  };

  const getGradeColor = (grade: string): string => {
    const colors: GradeColors = {
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

  const getGPAStatus = (gpa: number): GPAStatus => {
    if (gpa >= 3.7) return { status: "Excellent", color: "#4CAF50", icon: "🏆" };
    if (gpa >= 3.3) return { status: "Very Good", color: "#8BC34A", icon: "👍" };
    if (gpa >= 3.0) return { status: "Good", color: "#FFC107", icon: "✅" };
    return { status: "Needs Improvement", color: "#F44336", icon: "📈" };
  };

  const calculateCourseAverage = (assignments?: Assignment[]): number | null => {
    if (!assignments) return null;
    const totalWeightedScore = assignments.reduce((sum: number, assignment: Assignment) => {
      return sum + (assignment.score * assignment.weight) / 100;
    }, 0);
    return Math.round(totalWeightedScore);
  };

  const filteredSemesters = selectedSemester === "all" 
    ? gradeData.semesters 
    : gradeData.semesters.filter((sem: Semester) => sem.id === selectedSemester);

  const currentSemester = gradeData.semesters.find((sem: Semester) => sem.status === "current");
  const gpaStatus = getGPAStatus(gradeData.overallGPA);

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
        </div>
      </div>

      {/* Overall GPA Stats */}
      <div className="gpa-overview">
        <div className="gpa-card main">
          <div className="gpa-content">
            <div className="gpa-icon">📊</div>
            <div className="gpa-info">
              <h3>Overall GPA</h3>
              <div className="gpa-score">{gradeData.overallGPA}</div>
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
                {gradeData.gradeDistribution["A"] + gradeData.gradeDistribution["A-"]}
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSemester(e.target.value)}
          >
            <option value="all">All Semesters</option>
            {gradeData.semesters.map((semester: Semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.name} {semester.status === "current" && "(Current)"}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Course:</label>
          <select 
            value={selectedCourse} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>
            {currentSemester?.courses.map((course: Course) => (
              <option key={course.id} value={course.id}>{course.code}</option>
            ))}
          </select>
        </div>
      </div>

      {viewMode === "summary" ? (
        /* Summary View */
        <div className="summary-view">
          {/* Semester Overview */}
          <div className="section-card">
            <div className="section-header">
              <h3>Semester Overview</h3>
              <span className="section-subtitle">Your academic performance by semester</span>
            </div>
            <div className="semesters-grid">
              {gradeData.semesters.map((semester: Semester) => (
                <div key={semester.id} className={`semester-card ${semester.status}`}>
                  <div className="semester-header">
                    <h4>{semester.name}</h4>
                    {semester.status === "current" && (
                      <span className="current-badge">Current</span>
                    )}
                  </div>
                  <div className="semester-gpa">
                    <span className="gpa-value">{semester.gpa}</span>
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
                    {semester.courses.slice(0, 3).map((course: Course) => (
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
                {gradeData.gpaProgression.map((point: GPAProgression, index: number) => (
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
        /* Detailed View */
        <div className="detailed-view">
          {filteredSemesters.map((semester: Semester) => (
            <div key={semester.id} className="semester-detailed">
              <div className="semester-header-detailed">
                <h3>{semester.name}</h3>
                <div className="semester-stats">
                  <span className="gpa-badge">GPA: {semester.gpa}</span>
                  <span className="credits-badge">{semester.credits} Credits</span>
                  {semester.status === "current" && (
                    <span className="current-badge">In Progress</span>
                  )}
                </div>
              </div>
              
              <div className="courses-grid">
                {semester.courses.map((course: Course) => (
                  <div key={course.id} className="course-grade-card">
                    <div className="course-header">
                      <div className="course-info">
                        <h4>{course.code} - {course.name}</h4>
                        <p>Instructor: {course.instructor}</p>
                      </div>
                      <div className="course-grade">
                        <div 
                          className="final-grade"
                          style={{ backgroundColor: getGradeColor(course.grade) }}
                        >
                          {course.grade}
                        </div>
                        <div className="grade-points">{course.points} GPA</div>
                      </div>
                    </div>
                    
                    <div className="course-meta">
                      <div className="meta-item">
                        <i className="bi bi-credit-card"></i>
                        <span>{course.credits} Credits</span>
                      </div>
                      <div className="meta-item">
                        <i className="bi bi-bar-chart"></i>
                        <span>Grade Points: {course.points}</span>
                      </div>
                    </div>

                    {/* Assignment Breakdown */}
                    {course.assignments && (
                      <div className="assignments-breakdown">
                        <h5>Assignment Breakdown</h5>
                        <div className="assignments-list">
                          {course.assignments.map((assignment: Assignment, index: number) => (
                            <div key={index} className="assignment-item">
                              <div className="assignment-info">
                                <span className="assignment-name">{assignment.name}</span>
                                <span className="assignment-weight">{assignment.weight}%</span>
                              </div>
                              <div className="assignment-score">
                                <div className="score-bar">
                                  <div 
                                    className="score-fill"
                                    style={{ width: `${assignment.score}%` }}
                                  ></div>
                                </div>
                                <span className="score-value">
                                  {assignment.score}/{assignment.maxScore}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="course-average">
                          <span>Course Average: {calculateCourseAverage(course.assignments)}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Academic Standing */}
      <div className="academic-standing">
        <div className="section-card">
          <div className="section-header">
            <h3>Academic Standing</h3>
            <span className="section-subtitle">Your current academic status and achievements</span>
          </div>
          <div className="standing-content">
            <div className="standing-card good">
              <div className="standing-icon">✅</div>
              <div className="standing-info">
                <h4>Good Academic Standing</h4>
                <p>You are meeting all academic requirements and making satisfactory progress.</p>
              </div>
            </div>
            <div className="achievements">
              <h5>Recent Achievements</h5>
              <div className="achievement-list">
                <div className="achievement-item">
                  <span className="achievement-icon">🏆</span>
                  <span>Dean's List - Fall 2023</span>
                </div>
                <div className="achievement-item">
                  <span className="achievement-icon">⭐</span>
                  <span>4.0 GPA in Technical Writing</span>
                </div>
                <div className="achievement-item">
                  <span className="achievement-icon">📈</span>
                  <span>GPA Improvement This Semester</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseGrade;