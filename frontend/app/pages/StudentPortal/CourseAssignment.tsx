// app/pages/StudentPortal/CourseAssignment.tsx
"use client";

import { useState } from "react";
import "./style/CourseAssignment.css";

// Types
interface Course {
  id: string;
  name: string;
  color: string;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  timeLeft: string;
  status: string;
  priority: string;
  progress: number;
  points: number;
  submitted: boolean;
  attachments: number;
  requirements: string[];
  submissions: number;
  averageScore: number;
  instructor: string;
  lastUpdated: string;
  grade?: number;
  feedback?: string;
}

interface Stats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
  overdue: number;
  upcoming: number;
}

interface AssignmentData {
  courses: Course[];
  assignments: Assignment[];
  stats: Stats;
}

// Type for status colors
type StatusColors = {
  [key: string]: string;
};

// Type for priority colors
type PriorityColors = {
  [key: string]: string;
};

const CourseAssignment = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<string>("grid");

  // Sample assignment data
  const assignmentData: AssignmentData = {
    courses: [
      { id: "web-dev", name: "Web Development", color: "#e9691e" },
      { id: "javascript", name: "Advanced JavaScript", color: "#4CAF50" },
      { id: "react", name: "React Masterclass", color: "#61dafb" },
      { id: "database", name: "Database Systems", color: "#FF6B6B" }
    ],
    assignments: [
      {
        id: 1,
        title: "E-commerce Dashboard", 
        course: "web-dev",
        description: "Build a responsive e-commerce dashboard using React and modern CSS frameworks with real-time data visualization.",
        dueDate: "2024-02-15",
        timeLeft: "5 days",
        status: "in-progress",
        priority: "high",
        progress: 65,
        points: 100,
        submitted: false,
        attachments: 3,
        requirements: [
          "Responsive design for all screen sizes",
          "Implement product catalog with search",
          "Shopping cart functionality",
          "User authentication system",
          "Order management dashboard"
        ],
        submissions: 1247,
        averageScore: 78,
        instructor: "Dr. Sarah Chen",
        lastUpdated: "2024-02-08"
      },
      {
        id: 2,
        title: "JavaScript Algorithms",
        course: "javascript",
        description: "Implement common data structures and algorithms in JavaScript with optimized time complexity.",
        dueDate: "2024-02-12",
        timeLeft: "2 days",
        status: "pending",
        priority: "high",
        progress: 0,
        points: 85,
        submitted: false,
        attachments: 2,
        requirements: [
          "Binary Search Tree implementation",
          "Sorting algorithms (QuickSort, MergeSort)",
          "Graph traversal algorithms",
          "Dynamic programming problems",
          "Unit tests for all functions"
        ],
        submissions: 892,
        averageScore: 72,
        instructor: "Prof. Michael Rodriguez",
        lastUpdated: "2024-02-01"
      },
      {
        id: 3,
        title: "React Component Library",
        course: "react",
        description: "Create a reusable React component library with Storybook documentation and TypeScript support.",
        dueDate: "2024-02-20",
        timeLeft: "10 days",
        status: "not-started",
        priority: "medium",
        progress: 0,
        points: 120,
        submitted: false,
        attachments: 4,
        requirements: [
          "10+ reusable components",
          "TypeScript definitions",
          "Storybook documentation",
          "Unit testing with Jest",
          "CSS-in-JS styling"
        ],
        submissions: 567,
        averageScore: 85,
        instructor: "Dr. Emily Watson",
        lastUpdated: "2024-01-25"
      },
      {
        id: 4,
        title: "Database Design Project",
        course: "database",
        description: "Design and implement a normalized database schema for a university management system.",
        dueDate: "2024-02-08",
        timeLeft: "Overdue",
        status: "overdue",
        priority: "high",
        progress: 90,
        points: 95,
        submitted: false,
        attachments: 2,
        requirements: [
          "ER diagram with relationships",
          "Normalized schema up to 3NF",
          "SQL queries for common operations",
          "Performance optimization",
          "Backup and recovery plan"
        ],
        submissions: 734,
        averageScore: 68,
        instructor: "Prof. James Wilson",
        lastUpdated: "2024-02-05"
      },
      {
        id: 5,
        title: "API Integration Task",
        course: "web-dev",
        description: "Integrate third-party APIs into a web application with proper error handling and loading states.",
        dueDate: "2024-01-30",
        timeLeft: "Completed",
        status: "submitted",
        priority: "medium",
        progress: 100,
        points: 75,
        submitted: true,
        attachments: 1,
        grade: 88,
        feedback: "Excellent work on error handling and user experience. Consider adding more loading states for better UX.",
        requirements: [
          "REST API integration",
          "Error handling and validation",
          "Loading states and user feedback",
          "Response caching strategy",
          "Documentation"
        ],
        submissions: 1045,
        averageScore: 72,
        instructor: "Dr. Sarah Chen",
        lastUpdated: "2024-01-29"
      },
      {
        id: 6,
        title: "CSS Animation Project",
        course: "web-dev",
        description: "Create engaging CSS animations and transitions for a modern web application interface.",
        dueDate: "2024-02-25",
        timeLeft: "15 days",
        status: "not-started",
        priority: "low",
        progress: 0,
        points: 60,
        submitted: false,
        attachments: 3,
        requirements: [
          "10+ different animations",
          "Smooth transitions",
          "Performance optimization",
          "Cross-browser compatibility",
          "Mobile-responsive animations"
        ],
        submissions: 423,
        averageScore: 81,
        instructor: "Dr. Sarah Chen",
        lastUpdated: "2024-01-20"
      }
    ],
    stats: {
      total: 12,
      completed: 3,
      inProgress: 2,
      pending: 4,
      overdue: 1,
      upcoming: 2
    }
  };

  const getStatusColor = (status: string): string => {
    const colors: StatusColors = {
      'completed': '#4CAF50',
      'in-progress': '#2196F3',
      'pending': '#FF9800',
      'overdue': '#F44336',
      'not-started': '#9E9E9E',
      'submitted': '#4CAF50'
    };
    return colors[status] || '#666';
  };

  const getPriorityColor = (priority: string): string => {
    const colors: PriorityColors = {
      'high': '#F44336',
      'medium': '#FF9800',
      'low': '#4CAF50'
    };
    return colors[priority] || '#666';
  };

  const getTimeLeftColor = (timeLeft: string): string => {
    if (timeLeft === 'Overdue') return '#F44336';
    if (timeLeft.includes('hour') || (timeLeft.includes('day') && parseInt(timeLeft) <= 2)) return '#FF9800';
    return '#4CAF50';
  };

  const filteredAssignments: Assignment[] = assignmentData.assignments.filter((assignment: Assignment) => {
    const matchesCourse = selectedCourse === 'all' || assignment.course === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStartAssignment = (assignment: Assignment): void => {
    console.log('Starting assignment:', assignment.title);
    alert(`Opening assignment: ${assignment.title}`);
  };

  const handleSubmitAssignment = (assignment: Assignment): void => {
    console.log('Submitting assignment:', assignment.title);
    alert(`Submitting assignment: ${assignment.title}`);
  };

  const handleViewDetails = (assignment: Assignment): void => {
    console.log('Viewing details:', assignment.title);
    alert(`Viewing details for: ${assignment.title}`);
  };

  return (
    <div className="course-assignment-container">
      {/* Header Section */}
      <div className="assignment-header">
        <div className="header-content">
          <h1>Course Assignments</h1>
          <p>Manage your assignments, track progress, and meet deadlines</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <span className="stat-number">{assignmentData.stats.total}</span>
              <span className="stat-label">Total Assignments</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-number">{assignmentData.stats.completed}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <span className="stat-number">{assignmentData.stats.overdue}</span>
              <span className="stat-label">Overdue</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <span className="stat-number">78%</span>
              <span className="stat-label">Avg. Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="assignment-filters">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select 
            value={selectedCourse} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>
            {assignmentData.courses.map((course: Course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select 
            value={selectedStatus} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <i className="bi bi-grid-3x3-gap"></i>
            Grid
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <i className="bi bi-list-task"></i>
            List
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn primary">
          <i className="bi bi-plus-circle"></i>
          Create New Assignment
        </button>
        <button className="action-btn">
          <i className="bi bi-download"></i>
          Export Schedule
        </button>
        <button className="action-btn">
          <i className="bi bi-calendar-check"></i>
          View Calendar
        </button>
      </div>

      {/* Assignments Grid/List */}
      <div className={`assignments-container ${viewMode}`}>
        {filteredAssignments.length === 0 ? (
          <div className="no-assignments">
            <i className="bi bi-inbox"></i>
            <h3>No assignments found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredAssignments.map((assignment: Assignment) => (
            <div key={assignment.id} className="assignment-card">
              {/* Card Header */}
              <div className="card-header">
                <div className="course-badge" style={{ 
                  backgroundColor: assignmentData.courses.find((c: Course) => c.id === assignment.course)?.color 
                }}>
                  {assignmentData.courses.find((c: Course) => c.id === assignment.course)?.name}
                </div>
                <div className="card-actions">
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(assignment.priority) }}
                  >
                    {assignment.priority}
                  </span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(assignment.status) }}
                  >
                    {assignment.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content">
                <h3 className="assignment-title">{assignment.title}</h3>
                <p className="assignment-description">{assignment.description}</p>
                
                <div className="assignment-meta">
                  <div className="meta-item">
                    <i className="bi bi-person"></i>
                    <span>{assignment.instructor}</span>
                  </div>
                  <div className="meta-item">
                    <i className="bi bi-coin"></i>
                    <span>{assignment.points} points</span>
                  </div>
                  <div className="meta-item">
                    <i className="bi bi-paperclip"></i>
                    <span>{assignment.attachments} files</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {assignment.status !== 'submitted' && (
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span>{assignment.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${assignment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Requirements Preview */}
                <div className="requirements-preview">
                  <h5>Requirements:</h5>
                  <ul>
                    {assignment.requirements.slice(0, 3).map((req: string, index: number) => (
                      <li key={index}>{req}</li>
                    ))}
                    {assignment.requirements.length > 3 && (
                      <li className="more-items">+{assignment.requirements.length - 3} more requirements</li>
                    )}
                  </ul>
                </div>

                {/* Grade and Feedback (for submitted assignments) */}
                {assignment.submitted && assignment.grade && (
                  <div className="grade-feedback">
                    <div className="grade-section">
                      <strong>Grade: </strong>
                      <span className="grade-value">{assignment.grade}%</span>
                    </div>
                    <div className="feedback-section">
                      <strong>Feedback: </strong>
                      <p>{assignment.feedback}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="card-footer">
                <div className="due-date-section">
                  <div className="due-date">
                    <i className="bi bi-calendar"></i>
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                  </div>
                  <div 
                    className="time-left"
                    style={{ color: getTimeLeftColor(assignment.timeLeft) }}
                  >
                    <i className="bi bi-clock"></i>
                    <span>{assignment.timeLeft}</span>
                  </div>
                </div>
                
                <div className="action-buttons">
                  <button 
                    className="btn secondary"
                    onClick={() => handleViewDetails(assignment)}
                  >
                    <i className="bi bi-eye"></i>
                    View
                  </button>
                  
                  {assignment.status === 'submitted' ? (
                    <button className="btn success">
                      <i className="bi bi-check-circle"></i>
                      Submitted
                    </button>
                  ) : assignment.progress === 0 ? (
                    <button 
                      className="btn primary"
                      onClick={() => handleStartAssignment(assignment)}
                    >
                      <i className="bi bi-play-circle"></i>
                      Start
                    </button>
                  ) : assignment.progress === 100 ? (
                    <button 
                      className="btn warning"
                      onClick={() => handleSubmitAssignment(assignment)}
                    >
                      <i className="bi bi-send"></i>
                      Submit
                    </button>
                  ) : (
                    <button 
                      className="btn primary"
                      onClick={() => handleStartAssignment(assignment)}
                    >
                      <i className="bi bi-pencil"></i>
                      Continue
                    </button>
                  )}
                </div>
              </div>

              {/* Stats Overlay */}
              <div className="stats-overlay">
                <div className="stat">
                  <i className="bi bi-people"></i>
                  <span>{assignment.submissions} submissions</span>
                </div>
                <div className="stat">
                  <i className="bi bi-graph-up"></i>
                  <span>Avg: {assignment.averageScore}%</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upcoming Deadlines */}
      <div className="upcoming-deadlines">
        <div className="section-header">
          <h3>Upcoming Deadlines</h3>
          <span className="view-all">View All</span>
        </div>
        <div className="deadlines-list">
          {assignmentData.assignments
            .filter((a: Assignment) => !a.submitted && a.status !== 'overdue')
            .slice(0, 3)
            .map((assignment: Assignment) => (
              <div key={assignment.id} className="deadline-item">
                <div className="deadline-info">
                  <h5>{assignment.title}</h5>
                  <span className="course-name">
                    {assignmentData.courses.find((c: Course) => c.id === assignment.course)?.name}
                  </span>
                </div>
                <div className="deadline-meta">
                  <span className="due-date">{formatDate(assignment.dueDate)}</span>
                  <span 
                    className="time-left"
                    style={{ color: getTimeLeftColor(assignment.timeLeft) }}
                  >
                    {assignment.timeLeft}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseAssignment;