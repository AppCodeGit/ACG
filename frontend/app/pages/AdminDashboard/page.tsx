"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DashboardOverview from "./DashboardOverview";
import StudentManagement from "./StudentManagement";
import CourseManagement from "./CourseManagement";
import PaymentManagement from "./PaymentManagement";
import ReportsAnalytics from "./ReportsAnalytics";
import SystemSettings from "./SystemSettings";
import CourseContentManagement from "./CourseContentManagement";
import AssignmentManagement from "./AssignmentManagement/page";
import Logo from "../StudentPortal/images/appcode.png";
import "./style/AdminDashboard.css";
import NotificationBell from "./NotificationBell";

const AdminDashboard = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  
  // NEW: Sidebar open/close state for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSearch = (): void => {
    setIsSearchVisible(!isSearchVisible);
  };

  // NEW: Toggle sidebar for mobile
  const toggleSidebarMobile = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Modified: Toggle sidebar expand/collapse for desktop
  const toggleSidebarDesktop = (): void => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Check if user is authenticated
  const checkAuthentication = (): boolean => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      
      if (token && user) {
        try {
          const userData = JSON.parse(user);
          return true;
        } catch {
          return false;
        }
      }
    }
    return false;
  };

  const handleLogout = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userData");
    localStorage.removeItem("adminData");
    localStorage.removeItem("studentData");
    router.push("/login");
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (window.innerWidth <= 991 && isSidebarOpen) {
        const sidebar = document.querySelector(".admin-sidebar");
        const hamburger = document.querySelector(".admin-sidebar-hamburger");
        const target = event.target as Node;

        if (
          sidebar && 
          !sidebar.contains(target) && 
          hamburger && 
          !hamburger.contains(target)
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  // Check authentication on mount
  useEffect(() => {
    const auth = checkAuthentication();
    setIsAuthenticated(auth);
    setLoading(false);
    
    if (!auth) {
      router.push("/login");
    }
  }, [router]);

  // Also check authentication when the page gets focus
  useEffect(() => {
    const handleFocus = () => {
      const auth = checkAuthentication();
      if (!auth) {
        router.push("/login");
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="d-flex admin-dashboard">
      {/* Hamburger Menu Button - Mobile */}
      <button className="admin-sidebar-hamburger" onClick={toggleSidebarMobile}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Sidebar Overlay - Mobile */}
      <div 
        className={`admin-sidebar-overlay ${isSidebarOpen ? "active" : ""}`} 
        onClick={toggleSidebarMobile}
      ></div>

      {/* Sidebar */}
      <div 
        className={`admin-sidebar ${isSidebarExpanded ? "expanded" : "collapsed"} ${isSidebarOpen ? "open" : "closed"}`}
      >
        {/* Close Button - Mobile */}
        <button className="admin-sidebar-close" onClick={toggleSidebarMobile}>
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Toggle Button - Desktop */}
        <button className="admin-sidebar-toggle" onClick={toggleSidebarDesktop}>
          <i className={`bi ${isSidebarExpanded ? "bi-chevron-left" : "bi-chevron-right"}`}></i>
        </button>

        <div className="admin-sidebar-header">
          {isSidebarExpanded && (
            <>
              <h3>Admin Panel</h3>
              <p>Welcome, Admin</p>
            </>
          )}
          {!isSidebarExpanded && (
            <div className="admin-icon-only">
              <i className="bi bi-shield-lock"></i>
            </div>
          )}
        </div>

        <ul className="p-3 nav flex-column">
          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "overview" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("overview");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-speedometer2 me-2"></i>
              {isSidebarExpanded && "Overview"}
            </button>
          </li>

          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "students" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("students");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-people me-2"></i>
              {isSidebarExpanded && "Students"}
            </button>
          </li>

          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "courses" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("courses");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-book me-2"></i>
              {isSidebarExpanded && "Courses"}
            </button>
          </li>

          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "content" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("content");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-play-btn me-2"></i>
              {isSidebarExpanded && "Course Content"}
            </button>
          </li>

          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "assignments" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("assignments");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-list-check me-2"></i>
              {isSidebarExpanded && "Assignments"}
            </button>
          </li>

          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "payments" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("payments");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-credit-card me-2"></i>
              {isSidebarExpanded && "Payments"}
            </button>
          </li>

          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "reports" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("reports");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-bar-chart me-2"></i>
              {isSidebarExpanded && "Reports"}
            </button>
          </li>

          <li className="mb-3 nav-item">
            <button
              className={`nav-link ${activeSection === "settings" ? "active" : ""}`}
              onClick={() => {
                setActiveSection("settings");
                setIsSidebarOpen(false);
              }}
            >
              <i className="bi bi-gear me-2"></i>
              {isSidebarExpanded && "Settings"}
            </button>
          </li>

          {/* Logout Button */}
          <li className="mt-4 pt-2 nav-item logout-item">
            <hr className="sidebar-divider" />
            <button
              className={`nav-link logout-btn ${activeSection === "logout" ? "active" : ""}`}
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              {isSidebarExpanded && "Log Out"}
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        <div className="admin-header">
          <h2>
            {activeSection === "overview" && "Dashboard Overview"}
            {activeSection === "students" && "Student Management"}
            {activeSection === "courses" && "Course Management"}
            {activeSection === "content" && "Course Content Management"}
            {activeSection === "assignments" && "Assignment Management"}
            {activeSection === "payments" && "Payment Management"}
            {activeSection === "reports" && "Reports & Analytics"}
            {activeSection === "settings" && "System Settings"}
          </h2>

          <div className="logo-container">
            <Image
              src={Logo}
              alt="AppCode Logo"
              className="logo"
              width={120}
              height={40}
              priority
            />
          </div>
          <div className="admin-icons">
            {/* Notification Bell */}
              <NotificationBell />

            

            {/* Search Bar */}
            <div className="search-bar-container">
              {!isSearchVisible && (
                <button className="search-icon-button" onClick={toggleSearch}>
                  <span className="material-symbols-outlined">search</span>
                </button>
              )}
              {isSearchVisible && (
                <div className="search-wrapper">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                  />
                  <button className="close-icon-button" onClick={toggleSearch}>
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content based on active section */}
        <div className="admin-content">
          {activeSection === "overview" && <DashboardOverview />}
          {activeSection === "students" && <StudentManagement />}
          {activeSection === "courses" && <CourseManagement />}
          {activeSection === "content" && <CourseContentManagement />}
          {activeSection === "payments" && <PaymentManagement />}
          {activeSection === "reports" && <ReportsAnalytics />}
          {activeSection === "settings" && <SystemSettings />}
          {activeSection === "assignments" && <AssignmentManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;