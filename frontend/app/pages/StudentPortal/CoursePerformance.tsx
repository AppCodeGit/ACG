// app/components/CoursePerformance.tsx
"use client";

import { useState } from "react";
import "./style/CoursePerformance.css";

// Types
interface OverallStats {
  averageScore: number;
  completionRate: number;
  timeSpent: number;
  rank: number;
  totalStudents: number;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  grade: string;
  score: number;
  timeSpent: number;
  lastActivity: string;
  assignmentsCompleted: number;
  totalAssignments: number;
  quizzesCompleted: number;
  totalQuizzes: number;
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
}

interface SkillMetric {
  skill: string;
  level: number;
  trend: "up" | "down" | "stable";
}

interface WeeklyActivity {
  day: string;
  hours: number;
  completed: number;
}

interface PerformanceData {
  overallStats: OverallStats;
  courses: Course[];
  progressHistory: ProgressHistory[];
  assignmentPerformance: AssignmentPerformance[];
  skillMetrics: SkillMetric[];
  weeklyActivity: WeeklyActivity[];
}

// Type for grade colors
type GradeColors = {
  [key: string]: string;
};

// Type for trend icons
type TrendIcons = {
  [key in SkillMetric['trend']]: string;
};

const CoursePerformance = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  // Sample performance data
  const performanceData: PerformanceData = {
    overallStats: {
      averageScore: 87,
      completionRate: 92,
      timeSpent: 45,
      rank: 15,
      totalStudents: 1247
    },
    courses: [
      {
        id: "web-dev",
        title: "Web Development",
        instructor: "Dr. Sarah Chen",
        progress: 95,
        grade: "A",
        score: 92,
        timeSpent: 28,
        lastActivity: "2024-01-25",
        assignmentsCompleted: 8,
        totalAssignments: 10,
        quizzesCompleted: 5,
        totalQuizzes: 5
      },
      {
        id: "javascript",
        title: "Advanced JavaScript",
        instructor: "Prof. Michael Rodriguez",
        progress: 88,
        grade: "A-",
        score: 86,
        timeSpent: 32,
        lastActivity: "2024-01-24",
        assignmentsCompleted: 6,
        totalAssignments: 8,
        quizzesCompleted: 4,
        totalQuizzes: 5
      },
      {
        id: "react",
        title: "React Masterclass",
        instructor: "Dr. Emily Watson",
        progress: 75,
        grade: "B+",
        score: 82,
        timeSpent: 25,
        lastActivity: "2024-01-22",
        assignmentsCompleted: 5,
        totalAssignments: 7,
        quizzesCompleted: 3,
        totalQuizzes: 4
      },
      {
        id: "css",
        title: "CSS & Design Systems",
        instructor: "Prof. James Wilson",
        progress: 100,
        grade: "A",
        score: 94,
        timeSpent: 18,
        lastActivity: "2024-01-20",
        assignmentsCompleted: 6,
        totalAssignments: 6,
        quizzesCompleted: 4,
        totalQuizzes: 4
      }
    ],
    progressHistory: [
      { month: "Sep", progress: 20, score: 72 },
      { month: "Oct", progress: 45, score: 78 },
      { month: "Nov", progress: 65, score: 82 },
      { month: "Dec", progress: 80, score: 85 },
      { month: "Jan", progress: 92, score: 87 }
    ],
    assignmentPerformance: [
      { name: "HTML Basics", score: 95, average: 82, type: "assignment" },
      { name: "CSS Layout", score: 88, average: 75, type: "assignment" },
      { name: "JS Functions", score: 92, average: 78, type: "assignment" },
      { name: "React Components", score: 85, average: 72, type: "assignment" },
      { name: "Mid-term Exam", score: 90, average: 80, type: "exam" },
      { name: "Final Project", score: 94, average: 76, type: "project" }
    ],
    skillMetrics: [
      { skill: "HTML/CSS", level: 95, trend: "up" },
      { skill: "JavaScript", level: 88, trend: "up" },
      { skill: "React", level: 82, trend: "up" },
      { skill: "UI/UX Design", level: 78, trend: "stable" },
      { skill: "Backend Basics", level: 70, trend: "up" },
      { skill: "Database", level: 65, trend: "stable" }
    ],
    weeklyActivity: [
      { day: "Mon", hours: 3.5, completed: 4 },
      { day: "Tue", hours: 2.8, completed: 3 },
      { day: "Wed", hours: 4.2, completed: 5 },
      { day: "Thu", hours: 3.1, completed: 3 },
      { day: "Fri", hours: 2.5, completed: 2 },
      { day: "Sat", hours: 5.0, completed: 6 },
      { day: "Sun", hours: 1.8, completed: 2 }
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

  const getTrendIcon = (trend: SkillMetric['trend']): string => {
    const icons: TrendIcons = {
      "up": "📈",
      "down": "📉",
      "stable": "➡️"
    };
    return icons[trend];
  };

  const calculateOverallProgress = (): number => {
    const total = performanceData.courses.reduce((sum: number, course: Course) => sum + course.progress, 0);
    return Math.round(total / performanceData.courses.length);
  };

  const filteredCourses: Course[] = selectedCourse === "all" 
    ? performanceData.courses 
    : performanceData.courses.filter((course: Course) => course.id === selectedCourse);

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
            value={selectedTimeframe} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTimeframe(e.target.value)}
            className="time-filter"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
          <select 
            value={selectedCourse} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCourse(e.target.value)}
            className="course-filter"
          >
            <option value="all">All Courses</option>
            {performanceData.courses.map((course: Course) => (
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
            <span className="trend positive">+5% this month</span>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{performanceData.overallStats.completionRate}%</h3>
            <p>Completion Rate</p>
            <span className="trend positive">On track</span>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>{performanceData.overallStats.timeSpent}h</h3>
            <p>Time Spent</p>
            <span className="trend positive">+12h this week</span>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>#{performanceData.overallStats.rank}</h3>
            <p>Class Rank</p>
            <span className="trend positive">Top 2%</span>
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
              {filteredCourses.map((course: Course) => (
                <div key={course.id} className="course-progress-item">
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <p>Instructor: {course.instructor}</p>
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
                      <i className="bi bi-clock"></i>
                      <span>{course.timeSpent}h spent</span>
                    </div>
                    <div className="meta-item">
                      <i className="bi bi-check-circle"></i>
                      <span>{course.assignmentsCompleted}/{course.totalAssignments} assignments</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Development */}
          <div className="section-card">
            <div className="section-header">
              <h3>Skill Development</h3>
              <span className="section-subtitle">Your proficiency levels</span>
            </div>
            <div className="skills-grid">
              {performanceData.skillMetrics.map((skill: SkillMetric, index: number) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.skill}</span>
                    <span className="skill-trend">{getTrendIcon(skill.trend)}</span>
                  </div>
                  <div className="skill-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Progress Over Time */}
          <div className="section-card">
            <div className="section-header">
              <h3>Progress Over Time</h3>
              <span className="section-subtitle">Monthly progression</span>
            </div>
            <div className="progress-chart">
              <div className="chart-bars">
                {performanceData.progressHistory.map((month: ProgressHistory, index: number) => (
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
                  <span>Course Progress</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color score-color"></div>
                  <span>Average Score</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Performance */}
          <div className="section-card">
            <div className="section-header">
              <h3>Assignment Performance</h3>
              <span className="section-subtitle">Your scores vs class average</span>
            </div>
            <div className="assignment-performance">
              {performanceData.assignmentPerformance.map((assignment: AssignmentPerformance, index: number) => (
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
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="section-card">
            <div className="section-header">
              <h3>Weekly Activity</h3>
              <span className="section-subtitle">Study hours and completed items</span>
            </div>
            <div className="weekly-activity">
              <div className="activity-chart">
                {performanceData.weeklyActivity.map((day: WeeklyActivity, index: number) => (
                  <div key={index} className="activity-day">
                    <div className="activity-bars">
                      <div 
                        className="activity-bar hours-bar"
                        style={{ height: `${(day.hours / 6) * 100}%` }}
                        title={`${day.hours} hours`}
                      ></div>
                      <div 
                        className="activity-bar completed-bar"
                        style={{ height: `${(day.completed / 6) * 100}%` }}
                        title={`${day.completed} items completed`}
                      ></div>
                    </div>
                    <span className="day-label">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="activity-legend">
                <div className="legend-item">
                  <div className="legend-color hours-color"></div>
                  <span>Study Hours</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color completed-color"></div>
                  <span>Completed Items</span>
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
            <h3>Performance Recommendations</h3>
            <span className="section-subtitle">Tips to improve your learning</span>
          </div>
          <div className="recommendations-grid">
            <div className="recommendation-card">
              <div className="rec-icon">📚</div>
              <h4>Review React Concepts</h4>
              <p>Your React score is 8% below your average. Consider reviewing component lifecycle and state management.</p>
              <button className="rec-action">Start Review</button>
            </div>
            <div className="recommendation-card">
              <div className="rec-icon">⏰</div>
              <h4>Increase Study Consistency</h4>
              <p>Try to maintain more consistent study hours throughout the week rather than concentrating on weekends.</p>
              <button className="rec-action">Set Schedule</button>
            </div>
            <div className="recommendation-card">
              <div className="rec-icon">🎯</div>
              <h4>Focus on Backend Skills</h4>
              <p>Your backend development skills are developing. Practice with database concepts and API development.</p>
              <button className="rec-action">Practice Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePerformance;