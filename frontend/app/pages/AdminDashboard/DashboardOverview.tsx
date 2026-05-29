"use client";

import { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style/DashboardOverview.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface DashboardData {
  students: {
    total: number;
    active: number;
    inactive: number;
    withEnrollments: number;
    withoutEnrollments: number;
    genderDistribution: {
      male: number;
      female: number;
    };
  };
  courses: {
    total: number;
    published: number;
    draft: number;
    archived: number;
    topCourses: Array<{
      id: number;
      name: string;
      enrollmentCount: number;
    }>;
  };
  enrollments: {
    total: number;
    completed: number;
    inProgress: number;
    completionRate: number;
  };
  revenue: {
    total: number;
    monthly: number;
    weekly: number;
    completedPayments: number;
    pendingPayments: number;
    averagePayment: number;
    successRate: number;
  };
  programs: {
    total: number;
    withCourses: number;
    empty: number;
  };
  content: {
    total: number;
    published: number;
    assignments: number;
    submittedAssignments: number;
    gradedAssignments: number;
    pendingGrading: number;
  };
  notifications: {
    unreadAssignmentNotifications: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    icon: string;
    color: string;
    title: string;
    description: string;
    time: string;
    action: string;
  }>;
}

const DashboardOverview = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  // Format relative time
  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffHours < 1) {
      const minutes = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60),
      );
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else if (diffHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/dashboard/stats`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const result = await response.json();
      if (result.success) {
        setDashboardData(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch data");
      }
    } catch (err: any) {
      console.error("Error fetching dashboard:", err);
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

if (loading) {
  return (
    <div className="overview-container">
      <div className="simple-loader">
        <div className="simple-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    </div>
  );
}

  if (error || !dashboardData) {
    return (
      <div className="overview-container">
        <div className="error-state">
          <i className="bi bi-exclamation-triangle-fill"></i>
          <p>{error || "Failed to load dashboard"}</p>
          <button onClick={fetchDashboardData} className="btn-retry">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overview-container">
      {/* Welcome Section */}
      <div className="overview-welcome">
        <div className="row">
          <div className="col-md-12">
            <h2>Welcome back, Admin!</h2>
            <p>Here's what's happening with your platform today.</p>
          </div>
        </div>
      </div>

      {/* Stats Cards - Row 1 */}
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="stat-card">
            <div className="stat-icon students">
              <i className="bi bi-people"></i>
            </div>
            <div className="stat-content">
              <h3>{formatNumber(dashboardData.students.total)}</h3>
              <p>Total Students</p>
              <small className="stat-sub">
                {dashboardData.students.active} active
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="stat-card">
            <div className="stat-icon courses">
              <i className="bi bi-book"></i>
            </div>
            <div className="stat-content">
              <h3>{formatNumber(dashboardData.courses.published)}</h3>
              <p>Active Courses</p>
              <small className="stat-sub">
                {dashboardData.courses.total} total
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="stat-card">
            <div className="stat-icon revenue">
              <i className="bi bi-currency-dollar"></i>
            </div>
            <div className="stat-content">
              <h3>{formatCurrency(dashboardData.revenue.total)}</h3>
              <p>Total Revenue</p>
              <small className="stat-sub">
                +{formatCurrency(dashboardData.revenue.monthly)} this month
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="stat-card">
            <div className="stat-icon pending">
              <i className="bi bi-clock-history"></i>
            </div>
            <div className="stat-content">
              <h3>{formatNumber(dashboardData.revenue.pendingPayments)}</h3>
              <p>Pending Payments</p>
              <small className="stat-sub">
                {dashboardData.revenue.successRate}% success rate
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Row 2 - New Section */}
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="stat-card">
            <div className="stat-icon enrollments">
              <i className="bi bi-journal-check"></i>
            </div>
            <div className="stat-content">
              <h3>{formatNumber(dashboardData.enrollments.total)}</h3>
              <p>Total Enrollments</p>
              <small className="stat-sub">
                {formatNumber(dashboardData.enrollments.completed)} completed
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="stat-card">
            <div className="stat-icon programs">
              <i className="bi bi-diagram-3"></i>
            </div>
            <div className="stat-content">
              <h3>{formatNumber(dashboardData.programs.total)}</h3>
              <p>Programs</p>
              <small className="stat-sub">
                {dashboardData.programs.withCourses} with courses
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="stat-card">
            <div className="stat-icon content">
              <i className="bi bi-file-text"></i>
            </div>
            <div className="stat-content">
              <h3>{formatNumber(dashboardData.content.total)}</h3>
              <p>Content Items</p>
              <small className="stat-sub">
                {dashboardData.content.published} published
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="stat-card">
            <div className="stat-icon assignments">
              <i className="bi bi-check2-square"></i>
            </div>
            <div className="stat-content">
              <h3>{formatNumber(dashboardData.content.pendingGrading)}</h3>
              <p>Pending Grading</p>
              <small className="stat-sub">
                {dashboardData.content.submittedAssignments} submissions
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Revenue Overview */}
        <div className="state-card">
          <h4 className="stat-title">
            Revenue Overview
            <div className="design">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>
          </h4>

          <div className="stat-content">
            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">paid</span>
                <p className="stat-label">Total Revenue:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatCurrency(dashboardData.revenue.total)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  trending_up
                </span>
                <p className="stat-label">This Month:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatCurrency(dashboardData.revenue.monthly)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  date_range
                </span>
                <p className="stat-label">This Week:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatCurrency(dashboardData.revenue.weekly)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  check_circle
                </span>
                <p className="stat-label">Completed Payments:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.revenue.completedPayments)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  hourglass_top
                </span>
                <p className="stat-label">Pending Payments:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.revenue.pendingPayments)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">receipt</span>
                <p className="stat-label">Average Payment:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatCurrency(dashboardData.revenue.averagePayment)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Performance */}
        <div className="state-card">
          <h4 className="stat-title">
            Course Performance
            <div className="design">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>
          </h4>

          <div className="stat-content">
            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  menu_book
                </span>
                <p className="stat-label">Total Courses:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.courses.total)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  published_with_changes
                </span>
                <p className="stat-label">Published:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.courses.published)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">draw</span>
                <p className="stat-label">Draft:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.courses.draft)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">archive</span>
                <p className="stat-label">Archived:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.courses.archived)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">school</span>
                <p className="stat-label">Completion Rate:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {dashboardData.enrollments.completionRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Top Courses */}
          {dashboardData.courses.topCourses.length > 0 && (
            <div className="top-courses">
              <h5>Top Enrolled Courses</h5>
              {dashboardData.courses.topCourses.map((course, idx) => (
                <div key={course.id} className="top-course-item">
                  <span className="rank">{idx + 1}</span>
                  <span className="course-name">{course.name}</span>
                  <span className="enrollment-count">
                    {course.enrollmentCount} students
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Student Engagement */}
        <div className="state-card">
          <h4 className="stat-title">
            Student Engagement
            <div className="design">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>
          </h4>

          <div className="stat-content">
            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">person</span>
                <p className="stat-label">Active Students:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.students.active)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  person_off
                </span>
                <p className="stat-label">Inactive Students:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.students.inactive)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  how_to_reg
                </span>
                <p className="stat-label">Enrolled Students:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.students.withEnrollments)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  person_add
                </span>
                <p className="stat-label">Not Enrolled:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.students.withoutEnrollments)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  leaderboard
                </span>
                <p className="stat-label">Avg Enrollment/Student:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {dashboardData.students.total > 0
                    ? (
                        dashboardData.enrollments.total /
                        dashboardData.students.total
                      ).toFixed(1)
                    : "0"}
                </span>
              </div>
            </div>
          </div>

          {/* Gender Distribution */}
          <div className="gender-distribution">
            <h5>Gender Distribution</h5>
            <div className="gender-bars">
              <div className="gender-item">
                <span>Male</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill male"
                    style={{
                      width: `${
                        dashboardData.students.total > 0
                          ? (dashboardData.students.genderDistribution.male /
                              dashboardData.students.total) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span>{dashboardData.students.genderDistribution.male}</span>
              </div>
              <div className="gender-item">
                <span>Female</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill female"
                    style={{
                      width: `${
                        dashboardData.students.total > 0
                          ? (dashboardData.students.genderDistribution.female /
                              dashboardData.students.total) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <span>{dashboardData.students.genderDistribution.female}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assignment & Content Overview */}
        <div className="state-card">
          <h4 className="stat-title">
            Assignment Overview
            <div className="design">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>
          </h4>

          <div className="stat-content">
            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  assignment
                </span>
                <p className="stat-label">Total Assignments:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.content.assignments)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">task_alt</span>
                <p className="stat-label">Submitted:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.content.submittedAssignments)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">grading</span>
                <p className="stat-label">Graded:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value">
                  {formatNumber(dashboardData.content.gradedAssignments)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">pending</span>
                <p className="stat-label">Pending Grading:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value pending-value">
                  {formatNumber(dashboardData.content.pendingGrading)}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-left">
                <span className="material-symbols-outlined stat">
                  notifications
                </span>
                <p className="stat-label">Unread Notifications:</p>
              </div>
              <div className="stat-right">
                <span className="stat-value notification-badge">
                  {dashboardData.notifications.unreadAssignmentNotifications}
                </span>
              </div>
            </div>
          </div>

          {/* Content Stats */}
          <div className="content-stats">
            <h5>Content Library</h5>
            <div className="content-metrics">
              <div className="metric">
                <span className="metric-value">
                  {formatNumber(dashboardData.content.total)}
                </span>
                <span className="metric-label">Total Items</span>
              </div>
              <div className="metric">
                <span className="metric-value">
                  {dashboardData.content.published}
                </span>
                <span className="metric-label">Published</span>
              </div>
              <div className="metric">
                <span className="metric-value">
                  {dashboardData.content.total > 0
                    ? (
                        (dashboardData.content.published /
                          dashboardData.content.total) *
                        100
                      ).toFixed(0)
                    : 0}
                  %
                </span>
                <span className="metric-label">Publish Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="chart-card">
        <h4>Recent Activity</h4>
        <div className="activity-list">
          {dashboardData.recentActivity.length === 0 ? (
            <div className="activity-item">
              <p className="text-muted">No recent activity</p>
            </div>
          ) : (
            dashboardData.recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <i className={`bi ${activity.icon} text-${activity.color}`}></i>
                <div className="activity-content">
                  <p>
                    <strong>{activity.title}</strong>: {activity.description}
                  </p>
                  <small>{formatRelativeTime(activity.time)}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
