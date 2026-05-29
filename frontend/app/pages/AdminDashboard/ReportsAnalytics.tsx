"use client";

import { useEffect, useState, useCallback } from "react";
import "./style/ReportsAnalytics.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface RevenueData {
  courseId: number;
  courseName: string;
  revenue: number;
}

interface RevenueBySemester {
  name: string;
  amount: number;
}

interface PopularityData {
  courseId: number;
  courseName: string;
  enrollments: number;
}

interface PerformanceData {
  month: string;
  enrollments: number;
  completions: number;
  retention: number;
}

interface ReportsData {
  enrollmentTrends: {
    currentYear: number[];
    previousYear: number[];
    labels: string[];
  };
  revenueByCourse: RevenueData[];
  totalRevenue: number;
  revenueBySemester: RevenueBySemester[];
  coursePopularity: PopularityData[];
  retentionRate: string;
  completionRate: string;
  performanceData: PerformanceData[];
  totalStudents: number;
  totalEnrollments: number;
  completedEnrollments: number;
}

type DonutItem = {
  name: string;
  value: number;
  colorIndex: number;
};

const ReportsAnalytics = () => {
  const [reportsData, setReportsData] = useState<ReportsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("last30days");
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const donutColors = ["#e9691e", "#f08b4a", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];

  const getDonutData = (): DonutItem[] => {
    if (!reportsData) return [];
    
    if (reportsData.revenueByCourse.length > 0) {
      return reportsData.revenueByCourse.slice(0, 6).map((item, index) => ({
        name: item.courseName,
        value: item.revenue,
        colorIndex: index,
      }));
    } else {
      return reportsData.revenueBySemester.slice(0, 6).map((item, index) => ({
        name: item.name,
        value: item.amount,
        colorIndex: index,
      }));
    }
  };

  const donutData = getDonutData();
  const totalDonutValue = donutData.reduce((sum, item) => sum + item.value, 0);

  const fetchReportsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      
      const response = await fetch(
        `${API_URL}/api/reports/dashboard?period=${selectedPeriod}&timeframe=${selectedTimeframe}`,
        { headers: { Authorization: token ? `Bearer ${token}` : "" } }
      );

      if (!response.ok) throw new Error("Failed to fetch reports data");

      const result = await response.json();
      if (result.success) {
        setReportsData(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch data");
      }
    } catch (err: any) {
      console.error("Error fetching reports:", err);
      setError(err.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod, selectedTimeframe]);

  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData]);

  const maxEnrollment = reportsData 
    ? Math.max(...reportsData.enrollmentTrends.currentYear, ...reportsData.enrollmentTrends.previousYear, 1)
    : 100;

  // Calculate max values for performance chart scaling
  const maxEnrollments = reportsData 
    ? Math.max(...reportsData.performanceData.map(d => d.enrollments), 1)
    : 1;
  const maxRetention = reportsData 
    ? Math.max(...reportsData.performanceData.map(d => d.retention), 1)
    : 1;

  if (loading) {
    return (
      <div className="reports-analytics">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error || !reportsData) {
    return (
      <div className="reports-analytics">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p>{error || "Failed to load reports"}</p>
          <button onClick={fetchReportsData} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-analytics">
      {/* Header */}
      <div className="reports-header">
        <div className="header-left">
          <h1 className="header-title">Reports & Analytics</h1>
          <p className="header-subtitle">Track performance metrics and enrollment trends</p>
        </div>
        <div className="header-right">
          <select 
            className="period-select" 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="last7days">Last 7 days</option>
            <option value="last30days">Last 30 days</option>
            <option value="last90days">Last 90 days</option>
            <option value="thisyear">This year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon students">👥</div>
          <div className="stat-info">
            <div className="stat-value">{formatNumber(reportsData.totalStudents)}</div>
            <div className="stat-label">Total Students</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon enrollments">📚</div>
          <div className="stat-info">
            <div className="stat-value">{formatNumber(reportsData.totalEnrollments)}</div>
            <div className="stat-label">Total Enrollments</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue">💰</div>
          <div className="stat-info">
            <div className="stat-value">{formatCurrency(reportsData.totalRevenue)}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon retention">📈</div>
          <div className="stat-info">
            <div className="stat-value">{reportsData.retentionRate}%</div>
            <div className="stat-label">Retention Rate</div>
          </div>
        </div>
      </div>

      {/* Enrollment Trends Chart */}
      <div className="analytics-card">
        <div className="card-header">
          <h3>Enrollment Trends</h3>
          <div className="legend">
            <span className="legend-dot current"></span>
            <span>Current Year</span>
            <span className="legend-dot previous"></span>
            <span>Previous Year</span>
          </div>
        </div>
        <div className="chart-container enrollment-chart">
          {reportsData.enrollmentTrends.labels.map((label, index) => {
            const currentHeight = maxEnrollment > 0 ? (reportsData.enrollmentTrends.currentYear[index] / maxEnrollment) * 100 : 0;
            const previousHeight = maxEnrollment > 0 ? (reportsData.enrollmentTrends.previousYear[index] / maxEnrollment) * 100 : 0;
            return (
              <div key={index} className="chart-bar-group">
                <div className="bars">
                  <div className="bar previous" style={{ height: `${previousHeight}%` }}>
                    <span className="bar-value">{reportsData.enrollmentTrends.previousYear[index]}</span>
                  </div>
                  <div className="bar current" style={{ height: `${currentHeight}%` }}>
                    <span className="bar-value">{reportsData.enrollmentTrends.currentYear[index]}</span>
                  </div>
                </div>
                <span className="bar-label">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout for Revenue and Performance */}
      <div className="two-columns">
        {/* Revenue Breakdown - Donut Chart */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Revenue Breakdown</h3>
            <div className="total-revenue">{formatCurrency(reportsData.totalRevenue)}</div>
          </div>
          <div className="donut-container">
            <div className="donut-chart">
              <svg viewBox="0 0 100 100" className="donut-svg">
                {donutData.map((item, index) => {
                  const percentage = totalDonutValue > 0 ? (item.value / totalDonutValue) * 100 : 0;
                  const previousPercentages = donutData.slice(0, index).reduce((sum, d) => sum + (d.value / totalDonutValue) * 100, 0);
                  const dashArray = `${percentage} ${100 - percentage}`;
                  const dashOffset = 25 - previousPercentages;
                  
                  return (
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={donutColors[index % donutColors.length]}
                      strokeWidth="12"
                      strokeDasharray={dashArray}
                      strokeDashoffset={String(dashOffset)}
                      strokeLinecap="round"
                      className="donut-segment"
                    />
                  );
                })}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="12" />
                <circle cx="50" cy="50" r="34" fill="white" />
              </svg>
              <div className="donut-center">
                <div className="donut-total">{formatCurrency(reportsData.totalRevenue)}</div>
                <div className="donut-label">Total</div>
              </div>
            </div>
            <div className="donut-legend">
              {donutData.map((item, index) => (
                <div key={index} className="legend-item">
                  <span className="legend-color" style={{ background: donutColors[index % donutColors.length] }}></span>
                  <span className="legend-name">{item.name}</span>
                  <span className="legend-amount">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Performance - Full Featured like Original Design */}
        <div className="analytics-card">
          <div className="card-header">
            <h3>Monthly Performance</h3>
            <div className="time-filters">
              <button 
                className={`time-btn ${selectedTimeframe === "monthly" ? "active" : ""}`}
                onClick={() => setSelectedTimeframe("monthly")}
              >
                Monthly
              </button>
              <button 
                className={`time-btn ${selectedTimeframe === "quarterly" ? "active" : ""}`}
                onClick={() => setSelectedTimeframe("quarterly")}
              >
                Quarterly
              </button>
              <button 
                className={`time-btn ${selectedTimeframe === "yearly" ? "active" : ""}`}
                onClick={() => setSelectedTimeframe("yearly")}
              >
                Yearly
              </button>
            </div>
          </div>
          
          {/* Metric Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon retention">
                <span className="material-symbols-outlined">group</span>
              </div>
              <div className="metric-content">
                <div className="metric-value">{reportsData.retentionRate}%</div>
                <div className="metric-label">Student Retention</div>
                <div className="metric-trend positive">
                  {reportsData.completedEnrollments}/{reportsData.totalEnrollments} completed
                </div>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon completion">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div className="metric-content">
                <div className="metric-value">{reportsData.completionRate}%</div>
                <div className="metric-label">Course Completion</div>
                <div className="metric-trend positive">Content progress</div>
              </div>
            </div>
          </div>
          
          {/* Grouped Bar Chart - Similar to Original Design */}
          <div className="performance-chart-container">
            <div className="performance-legend">
              <div className="legend-item-bar">
                <span className="legend-color enrollments-bar"></span>
                <span>Enrollments</span>
              </div>
              <div className="legend-item-bar">
                <span className="legend-color retention-bar"></span>
                <span>Retention (%)</span>
              </div>
            </div>
            
            <div className="grouped-bars-container">
              {reportsData.performanceData.map((data, index) => {
                const enrollmentHeight = (data.enrollments / maxEnrollments) * 100;
                const retentionHeight = (data.retention / maxRetention) * 100;
                
                return (
                  <div key={index} className="grouped-bar-group">
                    <div className="grouped-bars">
                      <div className="bar-wrapper">
                        <div 
                          className="bar enrollments" 
                          style={{ height: `${enrollmentHeight}px` }}
                        >
                          <span className="bar-tooltip">{data.enrollments}</span>
                        </div>
                      </div>
                      <div className="bar-wrapper">
                        <div 
                          className="bar retention" 
                          style={{ height: `${retentionHeight}px` }}
                        >
                          <span className="bar-tooltip">{data.retention.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                    <span className="bar-label">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Courses Table */}
      <div className="analytics-card full-width">
        <div className="card-header">
          <h3>Most Popular Courses</h3>
        </div>
        <div className="table-container">
          <table className="popularity-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Course Name</th>
                <th>Enrollments</th>
              </tr>
            </thead>
            <tbody>
              {reportsData.coursePopularity.map((course, index) => (
                <tr key={course.courseId}>
                  <td className="rank-cell">
                    <span className={`rank-badge rank-${index + 1}`}>#{index + 1}</span>
                  </td>
                  <td className="course-cell">{course.courseName}</td>
                  <td className="enrollment-cell">{course.enrollments} students</td>
                </tr>
              ))}
              {reportsData.coursePopularity.length === 0 && (
                <tr>
                  <td colSpan={3} className="no-data">No enrollment data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;