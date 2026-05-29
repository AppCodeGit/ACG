"use client";

import { useState, useEffect } from "react";
// import "./style/CoursePerformance.css";
import "./style.css";

// Types
interface OverallStats {
  averageScore: number;
  completionRate: number;
  rank: number;
  totalStudents: number;
}

interface Course {
  id: number;
  title: string;
  programName: string;
  progress: number;
  grade: string;
  score: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  lastActivity: string;
}

interface ProgressHistory {
  month: string;
  progress: number;
  score: number;
}

interface AssignmentPerformance {
  name: string;
  score: number;
  average: number;
  type: string;
  feedback?: string;
}

interface WeeklyActivity {
  day: string;
  completed: number;
}

interface Recommendation {
  icon: string;
  title: string;
  description: string;
  action: string;
}

interface PerformanceData {
  overallStats: OverallStats;
  courses: Course[];
  progressHistory: ProgressHistory[];
  assignmentPerformance: AssignmentPerformance[];
  weeklyActivity: WeeklyActivity[];
  recommendations: Recommendation[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CoursePerformance = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          setError("User not found");
          setLoading(false);
          return;
        }
        
        const user = JSON.parse(userStr);
        const email = user.email;
        
        const response = await fetch(`${API_URL}/api/course-performance/${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch performance data");
        }
        
        const result = await response.json();
        if (result.success) {
          setPerformanceData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Error fetching performance data:", err);
        setError("Failed to load performance data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPerformanceData();
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

  const filteredCourses = performanceData?.courses.filter(course => 
    selectedCourse === "all" || course.id.toString() === selectedCourse
  ) || [];

  const calculateOverallProgress = (): number => {
    if (!performanceData?.courses.length) return 0;
    const total = performanceData.courses.reduce((sum, course) => sum + course.progress, 0);
    return Math.round(total / performanceData.courses.length);
  };

  if (loading) {
    return (
      <div className="course-performance-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your performance data...</p>
        </div>
      </div>
    );
  }

  if (error || !performanceData) {
    return (
      <div className="course-performance-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <p>{error || "Failed to load performance data"}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-performance-container">
      {/* Header Section */}
      <div className="performance-header">
        <div className="header-content">
          <h1>Course Performance</h1>
          <p>Track your learning progress, grades, and skill development</p>
        </div>
        <div className="header-filters">
          <select 
            value={selectedCourse} 
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="course-filter"
          >
            <option value="all">All Courses</option>
            {performanceData.courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="overall-stats">
        <div className="stat-card primary">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{performanceData.overallStats.averageScore}%</h3>
            <p>Average Score</p>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{performanceData.overallStats.completionRate}%</h3>
            <p>Completion Rate</p>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>#{performanceData.overallStats.rank}</h3>
            <p>Class Rank</p>
            <span className="stat-sub">of {performanceData.overallStats.totalStudents} students</span>
          </div>
        </div>
      </div>

      <div className="performance-content">
        {/* Left Column */}
        <div className="left-column">
          {/* Course Progress */}
          <div className="section-card">
            <div className="section-header">
              <h3>Course Progress</h3>
              <span className="overall-progress">
                Overall: {calculateOverallProgress()}%
              </span>
            </div>
            <div className="courses-list">
              {filteredCourses.map((course) => (
                <div key={course.id} className="course-progress-item">
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <p>{course.programName}</p>
                  </div>
                  <div className="progress-section">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="progress-stats">
                      <span className="progress-percent">{course.progress}%</span>
                      <span 
                        className="grade-badge"
                        style={{ backgroundColor: getGradeColor(course.grade) }}
                      >
                        {course.grade}
                      </span>
                    </div>
                  </div>
                  <div className="course-meta">
                    <div className="meta-item">
                      <i className="bi bi-check-circle"></i>
                      <span>{course.assignmentsCompleted}/{course.totalAssignments} assignments</span>
                    </div>
                    <div className="meta-item">
                      <i className="bi bi-calendar"></i>
                      <span>Score: {course.score}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Over Time */}
          <div className="section-card">
            <div className="section-header">
              <h3>Progress Over Time</h3>
              <span className="section-subtitle">Last 6 months</span>
            </div>
            <div className="progress-chart">
              <div className="chart-bars">
                {performanceData.progressHistory.map((month, index) => (
                  <div key={index} className="chart-bar-container">
                    <div className="chart-bar-group">
                      <div 
                        className="chart-bar progress-bar"
                        style={{ height: `${month.progress}%` }}
                        title={`Progress: ${month.progress}%`}
                      ></div>
                      <div 
                        className="chart-bar score-bar"
                        style={{ height: `${month.score}%` }}
                        title={`Score: ${month.score}%`}
                      ></div>
                    </div>
                    <span className="chart-label">{month.month}</span>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color progress-color"></div>
                  <span>Content Progress</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color score-color"></div>
                  <span>Average Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Assignment Performance */}
          <div className="section-card">
            <div className="section-header">
              <h3>Assignment Performance</h3>
              <span className="section-subtitle">Your scores vs class average</span>
            </div>
            <div className="assignment-performance">
              {performanceData.assignmentPerformance.map((assignment, index) => (
                <div key={index} className="assignment-item">
                  <div className="assignment-info">
                    <h5>{assignment.name}</h5>
                    <span className={`assignment-type ${assignment.type}`}>
                      {assignment.type}
                    </span>
                  </div>
                  <div className="assignment-scores">
                    <div className="score-comparison">
                      <div className="score-bar-container">
                        <div 
                          className="score-bar your-score"
                          style={{ width: `${assignment.score}%` }}
                        >
                          <span className="score-label">{assignment.score}%</span>
                        </div>
                        <div 
                          className="score-bar average-score"
                          style={{ width: `${assignment.average}%` }}
                        >
                          <span className="score-label">{assignment.average}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="score-difference">
                      {assignment.score >= assignment.average ? (
                        <span className="positive">+{assignment.score - assignment.average}%</span>
                      ) : (
                        <span className="negative">{assignment.score - assignment.average}%</span>
                      )}
                    </div>
                  </div>
                  {assignment.feedback && (
                    <div className="assignment-feedback">
                      <i className="bi bi-chat"></i>
                      <span>"{assignment.feedback}"</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Activity - Content Completion */}
          <div className="section-card">
            <div className="section-header">
              <h3>Weekly Activity</h3>
              <span className="section-subtitle">Content completed this week</span>
            </div>
            <div className="weekly-activity">
              <div className="activity-chart">
                {performanceData.weeklyActivity.map((day, index) => {
                  const maxCompleted = Math.max(...performanceData.weeklyActivity.map(d => d.completed), 1);
                  const height = (day.completed / maxCompleted) * 100;
                  return (
                    <div key={index} className="activity-day">
                      <div className="activity-bar-container">
                        <div 
                          className="activity-bar"
                          style={{ height: `${height}%` }}
                        >
                          <span className="activity-value">{day.completed}</span>
                        </div>
                      </div>
                      <span className="day-label">{day.day}</span>
                    </div>
                  );
                })}
              </div>
              <div className="activity-stats">
                <div className="stat-item">
                  <span className="stat-label">Total Completed</span>
                  <span className="stat-value">
                    {performanceData.weeklyActivity.reduce((sum, day) => sum + day.completed, 0)} items
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="recommendations-section">
        <div className="section-card">
          <div className="section-header">
            <h3>Personalized Recommendations</h3>
            <span className="section-subtitle">Based on your performance</span>
          </div>
          <div className="recommendations-grid">
            {performanceData.recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <div className="rec-icon">{rec.icon}</div>
                <h4>{rec.title}</h4>
                <p>{rec.description}</p>
                <button className="rec-action">{rec.action}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePerformance;