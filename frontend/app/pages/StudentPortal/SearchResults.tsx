// app/pages/StudentPortal/SearchResults.tsx
"use client";

import { useState, useEffect } from "react";
import "./style/SearchResults.css";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  section: string;
  icon: string;
  sectionId: string; // Changed from 'url' to 'sectionId' for clarity
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
  onResultClick?: (sectionId: string) => void; // Changed to pass sectionId
}

// Student Portal specific searchable content
const studentPortalContent: SearchResult[] = [
  // Dashboard
  {
    id: "dashboard",
    title: "Dashboard",
    description: "View your student dashboard overview",
    section: "Dashboard",
    icon: "dashboard",
    sectionId: "dashboard"
  },
  // Payment Info
  {
    id: "fees-payment",
    title: "Fees Payment",
    description: "Pay your tuition fees and view payment options",
    section: "Payment",
    icon: "payments",
    sectionId: "feespayment"
  },
  {
    id: "payment-details",
    title: "Payment Details",
    description: "View your payment history and transaction details",
    section: "Payment",
    icon: "receipt_long",
    sectionId: "paymentdetails"
  },
  // Courses
  {
    id: "course-module",
    title: "Course Module",
    description: "Access your course modules and learning materials",
    section: "Courses",
    icon: "menu_book",
    sectionId: "course Module"
  },
  {
    id: "course-performance",
    title: "Course Performance",
    description: "View your course performance and progress",
    section: "Courses",
    icon: "trending_up",
    sectionId: "Performance"
  },
  {
    id: "course-grade",
    title: "Course Grade",
    description: "Check your grades and academic progress",
    section: "Courses",
    icon: "grade",
    sectionId: "Grade"
  },
  // Settings
  {
    id: "settings",
    title: "Settings",
    description: "Manage your account settings and preferences",
    section: "Settings",
    icon: "settings",
    sectionId: "settings"
  },
  // Profile - Special case (opens modal)
  {
    id: "profile",
    title: "Profile",
    description: "View and edit your profile information",
    section: "Profile",
    icon: "person",
    sectionId: "profile"
  },
  // Additional student portal specific items
  {
    id: "notifications",
    title: "Notifications",
    description: "View your notifications and alerts",
    section: "General",
    icon: "notifications",
    sectionId: "notifications"
  },
  {
    id: "progress",
    title: "Academic Progress",
    description: "Track your academic progress and achievements",
    section: "Courses",
    icon: "assessment",
    sectionId: "progress"
  }
];

// Map section names to colors
const sectionColors: Record<string, string> = {
  "Dashboard": "#4F46E5",
  "Payment": "#e9691e",
  "Courses": "#10b981",
  "Settings": "#6b7280",
  "Profile": "#8b5cf6",
  "General": "#3b82f6"
};

// Map section names to section icons
const sectionIcons: Record<string, string> = {
  "Dashboard": "dashboard",
  "Payment": "payments",
  "Courses": "menu_book",
  "Settings": "settings",
  "Profile": "person",
  "General": "notifications"
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
    const filtered = studentPortalContent.filter((item) => {
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
    // Handle special cases
    if (result.id === "profile") {
      // Open profile modal by adding URL param
      const url = new URL(window.location.href);
      url.searchParams.set('modal', 'profile');
      window.history.pushState({}, '', url.toString());
      window.location.reload();
      onClose();
      return;
    }

    // For other results, call the parent callback with the sectionId
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
      <div className="student-search-results-dropdown">
        {query.trim() && (
          <div className="student-search-no-results">
            <span className="material-symbols-outlined">search_off</span>
            <p>No results found for "{query}"</p>
            <span className="student-search-suggestion">Try searching for courses, payments, or settings</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="student-search-results-dropdown" onKeyDown={handleKeyDown}>
      <div className="student-search-results-header">
        <span className="student-search-results-count">{results.length} results found</span>
        <button className="student-search-results-close" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="student-search-results-list">
        {Object.entries(groupedResults).map(([section, items]) => (
          <div key={section} className="student-search-section-group">
            <div className="student-search-section-header">
              <span 
                className="section-icon"
                style={{ color: getSectionColor(section) }}
              >
                <span className="material-symbols-outlined">
                  {sectionIcons[section] || "folder"}
                </span>
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
                  className={`student-search-result-item ${selectedIndex === globalIndex ? "selected" : ""}`}
                  onClick={() => handleResultClick(result)}
                  onMouseEnter={() => setSelectedIndex(globalIndex)}
                >
                  <div 
                    className="student-search-result-icon"
                    style={{ backgroundColor: getSectionColor(result.section) + '15' }}
                  >
                    <span 
                      className="material-symbols-outlined"
                      style={{ color: getSectionColor(result.section) }}
                    >
                      {getIconName(result.icon)}
                    </span>
                  </div>
                  <div className="student-search-result-content">
                    <div className="student-search-result-title">{result.title}</div>
                    <div className="student-search-result-description">{result.description}</div>
                    <div className="student-search-result-badge">
                      <span 
                        className="section-badge"
                        style={{ backgroundColor: getSectionColor(result.section) + '20', color: getSectionColor(result.section) }}
                      >
                        {result.section}
                      </span>
                    </div>
                  </div>
                  <div className="student-search-result-arrow">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="student-search-results-footer">
        <span className="student-search-keyboard-hint">
          <kbd>↑</kbd> <kbd>↓</kbd> navigate
        </span>
        <span className="student-search-keyboard-hint">
          <kbd>Enter</kbd> select
        </span>
        <span className="student-search-keyboard-hint">
          <kbd>Esc</kbd> close
        </span>
      </div>
    </div>
  );
};

export default SearchResults;