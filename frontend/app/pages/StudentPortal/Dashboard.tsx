"use client";

import { useState, useEffect } from "react";
import "./style/Dashboard.css";
import DynamicDateTable from "./DynamicDateTable";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Types
interface UserData {
  email: string;
  name: string;
  studentId?: string;
}

interface StudentProfileData {
  email: string;
  programName: string;
  phone: string;
  nationality: string;
  fullName: string;
  profileImage: string;
}

interface DashboardData {
  overallProgress: number;
  completedCourses: number;
  totalCourses: number;
  currentModule: {
    id: number;
    title: string;
    description: string;
    totalContent: number;
    completedContent: number;
  } | null;
  currentModuleContent: Array<{
    id: number;
    title: string;
    type: string;
    isCompleted: boolean;
  }>;
  nextModule: {
    id: number;
    title: string;
    description: string;
  } | null;
  recentGrades: Array<{
    id: number;
    grade: number;
    feedback: string;
    gradedAt: string;
    assignmentTitle: string;
  }>;
  upcomingAssignments: Array<{
    id: number;
    submittedAt: string;
    assignmentTitle: string;
  }>;
  publishedCourses: Array<{
    id: number;
    name: string;
    programName: string;
    publishedAt: string;
  }>;
}

// Fallback quotes in case API fails
const fallbackQuotes = [
  { quote: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { quote: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" }
];

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<UserData | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfileData | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [greeting, setGreeting] = useState("");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dailyQuote, setDailyQuote] = useState(fallbackQuotes[0]);
  const [quoteLoading, setQuoteLoading] = useState(true);

  // Fetch daily motivational quote with multiple fallbacks
  const fetchDailyQuote = async () => {
    setQuoteLoading(true);
    
    const quoteAPIs = [
      "https://api.quotable.io/random",
      "https://type.fit/api/quotes",
      "https://zenquotes.io/api/random"
    ];
    
    for (const apiUrl of quoteAPIs) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          let data;
          
          if (apiUrl.includes("quotable.io")) {
            data = await response.json();
            setDailyQuote({
              quote: data.content,
              author: data.author
            });
            setQuoteLoading(false);
            return;
          } 
          else if (apiUrl.includes("type.fit")) {
            data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            setDailyQuote({
              quote: data[randomIndex].text,
              author: data[randomIndex].author || "Unknown"
            });
            setQuoteLoading(false);
            return;
          }
          else if (apiUrl.includes("zenquotes.io")) {
            data = await response.json();
            setDailyQuote({
              quote: data[0].q,
              author: data[0].a
            });
            setQuoteLoading(false);
            return;
          }
        }
      } catch (error) {
        console.log(`Quote API failed: ${apiUrl}`, error);
      }
    }
    
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    setDailyQuote(fallbackQuotes[randomIndex]);
    setQuoteLoading(false);
  };

  // Fetch dashboard data from backend - FIXED URL
  const fetchDashboardData = async (email: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/student-dashboard/${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Dashboard API response:", result);
      
      if (result.success) {
        setDashboardData(result.data);
      } else {
        console.error("Dashboard API error:", result.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Fetch studentId separately from User table
  const fetchStudentId = async (email: string) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/student/student-id/${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Student ID data:", data);
      setStudentId(data.studentId);
    } catch (error) {
      console.error("Error fetching student ID:", error);
      setStudentId(null);
    }
  };

  const fetchStudentProfile = async (email: string) => {
    try {
      console.log("Fetching profile for email:", email);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/student/profile/${encodeURIComponent(email)}`);
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received data:", data);
      
      if (data.success && data.student) {
        setStudentProfile({
          email: data.student.email,
          programName: data.student.programName,
          phone: data.student.phone,
          nationality: data.student.nationality,
          fullName: data.student.fullName,
          profileImage: data.student.profileImage
        });
      } else {
        setStudentProfile({
          email: data.email,
          programName: data.programName,
          phone: data.phone,
          nationality: data.nationality,
          fullName: data.fullName,
          profileImage: data.profileImage
        });
      }
    } catch (error) {
      console.error("Error fetching student profile:", error);
      setError("Failed to load student profile");
    } finally {
      setLoading(false);
    }
  };

  // Get user from localStorage and fetch data
  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("Raw user data from localStorage:", userData);
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("Parsed user:", parsedUser);
        setUser(parsedUser);
        
        if (parsedUser.email) {
          console.log("Email being sent to API:", parsedUser.email);
          fetchStudentProfile(parsedUser.email);
          fetchStudentId(parsedUser.email);
          fetchDashboardData(parsedUser.email);
        } else {
          console.log("No email found in user data");
          setLoading(false);
          setError("User email not found");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setLoading(false);
        setError("Error loading user data");
      }
    } else {
      console.log("No user data in localStorage");
      setLoading(false);
      setError("No user data found");
    }
  }, []);

  // Fetch daily quote on mount
  useEffect(() => {
    fetchDailyQuote();
  }, []);

  // Set greeting based on time of day
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-danger">Error: {error}</div>;

  return (
    <div className="dashboard-section">
      <div className="welcome-container">
        <div className="welcome-banner">
          <div className="text-container">
            <div className="welcome-greeting">
              <span role="img" aria-label="wave">
                👋
              </span>{" "}
              {greeting}, <span className="user-name">{studentProfile?.fullName || user?.name}</span>
            </div>
            <h1>
              <div className="banner-item"></div>
              Welcome to AppCode Global Student Portal
            </h1>
            <p>
              <i className="fas fa-rocket"></i> We&apos;re excited to have you
              here. Explore your courses, check out the latest updates, and make
              the most of your learning journey.
            </p>
          </div>
        </div>

        <div className="student-dashboard">
          <div className="dashboard-sections">
            {/* Section 1: Progress Tracker */}
            <div className="dashboard-tile progress-tracker">
              <div className="title">
                <i className="bi bi-bar-chart-fill"></i>
                <h4>Your Progress</h4>
              </div>
              <div className="progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${dashboardData?.overallProgress || 0}%` }}
                >
                  {dashboardData?.overallProgress || 0}%
                </div>
              </div>
              <div className="progress-stats">
                <p>📊 Overall Completion: {dashboardData?.overallProgress || 0}%</p>
                <p>✅ Completed Courses: {dashboardData?.completedCourses || 0} / {dashboardData?.totalCourses || 0}</p>
              </div>
            </div>

            {/* Section 2: Current Module */}
            <div className="dashboard-tile daily-schedule">
              <div className="title">
                <i className="bi bi-book-half"></i>
                <h4>Current Module</h4>
              </div>
              {dashboardData?.currentModule ? (
                <>
                  <h5 className="module-title">{dashboardData.currentModule.title}</h5>
                  <p className="module-desc">{dashboardData.currentModule.description}</p>
                  <div className="module-progress">
                    <div className="progress">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${(dashboardData.currentModule.completedContent / dashboardData.currentModule.totalContent) * 100}%` }}
                      ></div>
                    </div>
                    <small>{dashboardData.currentModule.completedContent}/{dashboardData.currentModule.totalContent} concepts completed</small>
                  </div>
                  
                  {/* Concepts under this module */}
                  <div className="concepts-list">
                    <strong>📖 Concepts:</strong>
                    <ul>
                      {dashboardData.currentModuleContent.slice(0, 3).map(content => (
                        <li key={content.id}>
                          {content.isCompleted ? "✅" : "📌"} {content.title}
                        </li>
                      ))}
                      {dashboardData.currentModuleContent.length > 3 && (
                        <li>+{dashboardData.currentModuleContent.length - 3} more...</li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Next Module Preview */}
                  {dashboardData.nextModule && (
                    <div className="next-module">
                      <strong>🔜 Next Up:</strong>
                      <p>{dashboardData.nextModule.title}</p>
                    </div>
                  )}
                </>
              ) : (
                <p>🎉 You've completed all modules! Great job!</p>
              )}
            </div>

            {/* Section 3: Motivational Quote */}
            <div className="dashboard-tile motivation">
              <div className="title">
                <i className="bi bi-emoji-smile"></i>
                <h4>Daily Motivation</h4>
              </div>
              <div className="quote-content">
                {quoteLoading ? (
                  <p className="quote-text">✨ Loading inspiration...</p>
                ) : (
                  <>
                    <p className="quote-text">✨ "{dailyQuote.quote}"</p>
                    <p className="quote-author">— {dailyQuote.author || "Anonymous"}</p>
                    <small className="quote-refresh">✨ New quote tomorrow</small>
                  </>
                )}
              </div>
            </div>

            {/* Section 4: Academic Updates */}
            <div className="dashboard-tile quick-actions">
              <div className="title">
                <i className="bi bi-journal-bookmark-fill"></i>
                <h4>Academic Updates</h4>
              </div>
              
              {/* Recent Grades */}
              <div className="academic-section">
                <h5>📝 Recent Grades</h5>
                {dashboardData?.recentGrades && dashboardData.recentGrades.length > 0 ? (
                  <ul className="grade-list">
                    {dashboardData.recentGrades.map(grade => (
                      <li key={grade.id}>
                        <span className="grade-title">{grade.assignmentTitle}</span>
                        <span className="grade-score">{grade.grade}%</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No recent grades available</p>
                )}
              </div>
              
              {/* Upcoming Assignments */}
              <div className="academic-section">
                <h5>⏳ Pending Grading</h5>
                {dashboardData?.upcomingAssignments && dashboardData.upcomingAssignments.length > 0 ? (
                  <ul className="assignment-list">
                    {dashboardData.upcomingAssignments.map(assignment => (
                      <li key={assignment.id}>
                        <span>{assignment.assignmentTitle}</span>
                        <span className="pending-badge">Waiting for review</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No pending assignments</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header">
            <img
              className="profile-image"
              src={
                studentProfile?.profileImage?.trim()
                  ? studentProfile.profileImage
                  : `https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true&size=128&name=${encodeURIComponent(studentProfile?.fullName || user?.name || "User")}`
              }
              alt="Profile Icon"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?background=4F46E5&color=fff&bold=true&size=128&name=${encodeURIComponent(studentProfile?.fullName || user?.name || "User")}`;
              }}
            />
            <div className="student-profile-header">
              <h2 className="student-name">
                <i className="fas fa-user-graduate"></i> {studentProfile?.fullName || user?.name}
              </h2>
              <p className="student-id">
                <i className="fas fa-id-badge"></i> Student ID:{" "}
                {studentId || "N/A"}
              </p>
            </div>
          </div>

          <div className="profile-body">
            <div className="detail-item">
              <div className="icon-wrapper">
                <i className="bi bi-envelope-fill"></i>
              </div>
              <div className="info-text">
                <strong>Email</strong>
                <p>{studentProfile?.email || "N/A"}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="icon-wrapper">
                <i className="bi bi-mortarboard-fill"></i>
              </div>
              <div className="info-text">
                <strong>Program Name</strong>
                <p>{studentProfile?.programName || "Not enrolled"}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="icon-wrapper">
                <i className="bi bi-telephone-fill"></i>
              </div>
              <div className="info-text">
                <strong>Phone Number</strong>
                <p>{studentProfile?.phone || "N/A"}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="icon-wrapper">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div className="info-text">
                <strong>Country</strong>
                <p>{studentProfile?.nationality || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="announcement-date">
          <div className="announcement-banner">
            <div className="announcement-header">
              <h3>📣 Announcements</h3>
            </div>

            <div className="announcement-content">
              {/* Grade Announcements Section */}
              <div className="announcement-section">
                <h4>🎓 Grade Announcements</h4>
                {dashboardData?.recentGrades && dashboardData.recentGrades.length > 0 ? (
                  <ul className="announcement-list">
                    {dashboardData.recentGrades.map(grade => (
                      <li key={grade.id}>
                        <span className="icon">📊</span>
                        <div>
                          <strong>New Grade Posted:</strong>{" "}
                          <span className="Text">{grade.assignmentTitle}</span> -{" "}
                          <span className="highlight">{grade.grade}%</span>
                          {grade.feedback && <span className="feedback"> - "{grade.feedback}"</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No recent grade announcements</p>
                )}
              </div>

              {/* Published Courses Section */}
              <div className="announcement-section">
                <h4>🚀 New Courses Available</h4>
                {dashboardData?.publishedCourses && dashboardData.publishedCourses.length > 0 ? (
                  <ul className="announcement-list">
                    {dashboardData.publishedCourses.map(course => (
                      <li key={course.id}>
                        <span className="icon">📚</span>
                        <div>
                          <strong>New Course:</strong>{" "}
                          <span className="Text">{course.name}</span> -{" "}
                          <span className="highlight">{course.programName}</span>
                          <div className="course-date">
                            Published: {new Date(course.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No new courses published recently</p>
                )}
              </div>

              <div className="announcement-footer">
                <p>🔔 Stay updated! Check your portal for more details.</p>
              </div>
            </div>
          </div>

          <DynamicDateTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;