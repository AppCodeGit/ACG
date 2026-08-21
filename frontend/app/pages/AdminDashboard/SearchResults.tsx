// app/pages/AdminDashboard/SearchResults.tsx
"use client";

import { useState, useEffect } from "react";
import "./style/SearchResults.css";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  section: string;
  icon: string;
  sectionId: string;
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
  onResultClick?: (sectionId: string) => void;
}

// Admin Dashboard specific searchable content
const adminPortalContent: SearchResult[] = [
  // Overview
  {
    id: "overview",
    title: "Dashboard Overview",
    description: "View key metrics, statistics, and system status",
    section: "Overview",
    icon: "speedometer2",
    sectionId: "overview"
  },
  // Students
  {
    id: "students",
    title: "Student Management",
    description: "Manage student accounts, profiles, and enrollments",
    section: "Students",
    icon: "people",
    sectionId: "students"
  },
  // Courses
  {
    id: "courses",
    title: "Course Management",
    description: "Create, edit, and manage courses",
    section: "Courses",
    icon: "book",
    sectionId: "courses"
  },
  // Course Content
  {
    id: "content",
    title: "Course Content Management",
    description: "Upload and manage course materials, videos, and documents",
    section: "Content",
    icon: "play-btn",
    sectionId: "content"
  },
  // Assignments
  {
    id: "assignments",
    title: "Assignment Management",
    description: "Create, grade, and manage student assignments",
    section: "Assignments",
    icon: "list-check",
    sectionId: "assignments"
  },
  // Payments
  {
    id: "payments",
    title: "Payment Management",
    description: "View and manage student payments and transactions",
    section: "Payments",
    icon: "credit-card",
    sectionId: "payments"
  },
  // Reports
  {
    id: "reports",
    title: "Reports & Analytics",
    description: "View reports, analytics, and data insights",
    section: "Reports",
    icon: "bar-chart",
    sectionId: "reports"
  },
  // Settings
  {
    id: "settings",
    title: "System Settings",
    description: "Configure system settings and preferences",
    section: "Settings",
    icon: "gear",
    sectionId: "settings"
  }
];

// Map section names to colors
const sectionColors: Record<string, string> = {
  "Overview": "#4F46E5",
  "Students": "#e9691e",
  "Courses": "#10b981",
  "Content": "#8b5cf6",
  "Assignments": "#f59e0b",
  "Payments": "#3b82f6",
  "Reports": "#ec4899",
  "Settings": "#6b7280"
};

// Map section names to section icons
const sectionIcons: Record<string, string> = {
  "Overview": "speedometer2",
  "Students": "people",
  "Courses": "book",
  "Content": "play-btn",
  "Assignments": "list-check",
  "Payments": "credit-card",
  "Reports": "bar-chart",
  "Settings": "gear"
};

const SearchResults = ({ query, onClose, onResultClick }: SearchResultsProps) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [groupedResults, setGroupedResults] = useState<Record<string, SearchResult[]>>({});

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setGroupedResults({});
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const filtered = adminPortalContent.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.section.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm)
      );
    });

    // Sort results by relevance
    const sorted = filtered.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const aDesc = a.description.toLowerCase();
      const bDesc = b.description.toLowerCase();

      if (aTitle === searchTerm) return -1;
      if (bTitle === searchTerm) return 1;
      if (aTitle.includes(searchTerm) && !bTitle.includes(searchTerm)) return -1;
      if (bTitle.includes(searchTerm) && !aTitle.includes(searchTerm)) return 1;
      if (aDesc.includes(searchTerm) && !bDesc.includes(searchTerm)) return -1;
      if (bDesc.includes(searchTerm) && !aDesc.includes(searchTerm)) return 1;
      return 0;
    });

    setResults(sorted);
    setSelectedIndex(-1);

    // Group results by section
    const grouped: Record<string, SearchResult[]> = {};
    sorted.forEach((item) => {
      if (!grouped[item.section]) {
        grouped[item.section] = [];
      }
      grouped[item.section].push(item);
    });
    setGroupedResults(grouped);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selected = results[selectedIndex];
      if (selected) {
        handleResultClick(selected);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result.sectionId);
    }
    onClose();
  };

  const getIconName = (icon: string): string => {
    return icon;
  };

  const getSectionColor = (section: string): string => {
    return sectionColors[section] || "#6b7280";
  };

  if (!query.trim() || results.length === 0) {
    return (
      <div className="admin-search-results-dropdown">
        {query.trim() && (
          <div className="admin-search-no-results">
            <span className="material-symbols-outlined">search_off</span>
            <p>No results found for "{query}"</p>
            <span className="admin-search-suggestion">Try searching for students, courses, or settings</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="admin-search-results-dropdown" onKeyDown={handleKeyDown}>
      <div className="admin-search-results-header">
        <span className="admin-search-results-count">{results.length} results found</span>
        <button className="admin-search-results-close" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="admin-search-results-list">
        {Object.entries(groupedResults).map(([section, items]) => (
          <div key={section} className="admin-search-section-group">
            <div className="admin-search-section-header">
              <span 
                className="section-icon"
                style={{ color: getSectionColor(section) }}
              >
                <i className={`bi bi-${sectionIcons[section] || "folder"}`}></i>
              </span>
              <span className="section-name" style={{ color: getSectionColor(section) }}>
                {section}
              </span>
              <span className="section-count">{items.length}</span>
            </div>
            {items.map((result, index) => {
              const globalIndex = results.indexOf(result);
              return (
                <div
                  key={result.id}
                  className={`admin-search-result-item ${selectedIndex === globalIndex ? "selected" : ""}`}
                  onClick={() => handleResultClick(result)}
                  onMouseEnter={() => setSelectedIndex(globalIndex)}
                >
                  <div 
                    className="admin-search-result-icon"
                    style={{ backgroundColor: getSectionColor(result.section) + '15' }}
                  >
                    <i 
                      className={`bi bi-${getIconName(result.icon)}`}
                      style={{ color: getSectionColor(result.section) }}
                    ></i>
                  </div>
                  <div className="admin-search-result-content">
                    <div className="admin-search-result-title">{result.title}</div>
                    <div className="admin-search-result-description">{result.description}</div>
                    <div className="admin-search-result-badge">
                      <span 
                        className="section-badge"
                        style={{ backgroundColor: getSectionColor(result.section) + '20', color: getSectionColor(result.section) }}
                      >
                        {result.section}
                      </span>
                    </div>
                  </div>
                  <div className="admin-search-result-arrow">
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="admin-search-results-footer">
        <span className="admin-search-keyboard-hint">
          <kbd>↑</kbd> <kbd>↓</kbd> navigate
        </span>
        <span className="admin-search-keyboard-hint">
          <kbd>Enter</kbd> select
        </span>
        <span className="admin-search-keyboard-hint">
          <kbd>Esc</kbd> close
        </span>
      </div>
    </div>
  );
};

export default SearchResults;