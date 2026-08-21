// app/components/SearchResults.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./SearchResults.css";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "page" | "course" | "program" | "blog" | "certification";
  icon?: string;
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

// Sample data - this would come from your API or static data
const searchableContent: SearchResult[] = [
  // ====================
  // PAGES
  // ====================
  {
    id: "home",
    title: "Home",
    description: "Welcome to AppCode Academy - Home page",
    url: "/",
    type: "page",
    icon: "home"
  },
  {
    id: "software",
    title: "Software Engineering",
    description: "Learn full-stack development, frontend, backend, and more",
    url: "/Software",
    type: "program",
    icon: "code"
  },
  {
    id: "cloud",
    title: "Cloud Engineering",
    description: "AWS, Azure, and cloud computing certifications",
    url: "/aws",
    type: "program",
    icon: "cloud"
  },
  {
    id: "cybersecurity",
    title: "Cyber Security",
    description: "Microsoft AZ-500, OSCP, and security training",
    url: "/microsoftAz500",
    type: "program",
    icon: "security"
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    description: "Cloud and traditional data analytics courses",
    url: "/dataAnalytics",
    type: "program",
    icon: "analytics"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Facebook, Instagram, LinkedIn, and more marketing courses",
    url: "/marketing",
    type: "program",
    icon: "campaign"
  },
  {
    id: "forex",
    title: "Forex Trading",
    description: "Learn forex trading and financial market analysis",
    url: "/forexTrading",
    type: "program",
    icon: "trending_up"
  },
  {
    id: "about",
    title: "About Us",
    description: "Learn about AppCode Academy",
    url: "/about",
    type: "page",
    icon: "info"
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with AppCode Academy",
    url: "/contact",
    type: "page",
    icon: "contact_mail"
  },
  {
    id: "blog",
    title: "Blog",
    description: "Latest news and articles from AppCode Academy",
    url: "/blog",
    type: "page",
    icon: "article"
  },
  {
    id: "services",
    title: "Services",
    description: "Our services and offerings",
    url: "/services",
    type: "page",
    icon: "handshake"
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "Course fees and payment plans",
    url: "/pricing",
    type: "page",
    icon: "payments"
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Frequently asked questions",
    url: "/faq",
    type: "page",
    icon: "help"
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "Our privacy policy and terms",
    url: "/privacy-policy",
    type: "page",
    icon: "privacy_tip"
  },
  {
    id: "terms",
    title: "Terms & Conditions",
    description: "Terms and conditions for using our services",
    url: "/terms",
    type: "page",
    icon: "gavel"
  },
  {
    id: "bootcamps",
    title: "Bootcamps",
    description: "Intensive coding bootcamps",
    url: "/bootcamps",
    type: "page",
    icon: "school"
  },
  {
    id: "events",
    title: "Events",
    description: "Upcoming events and workshops",
    url: "/events",
    type: "page",
    icon: "event"
  },
  {
    id: "workshops",
    title: "Workshops",
    description: "Hands-on workshops and training",
    url: "/workshops",
    type: "page",
    icon: "psychology"
  },
  {
    id: "apply",
    title: "Apply Now",
    description: "Apply to AppCode Academy",
    url: "/pages/apply",
    type: "page",
    icon: "app_registration"
  },
  {
    id: "login",
    title: "Login",
    description: "Login to your AppCode Academy account",
    url: "/login",
    type: "page",
    icon: "login"
  },
  {
    id: "register",
    title: "Register",
    description: "Create a new account at AppCode Academy",
    url: "/signup",
    type: "page",
    icon: "app_registration"
  },

  // ====================
  // SOFTWARE ENGINEERING COURSES
  // ====================
  {
    id: "frontend",
    title: "Front End Development",
    description: "HTML, CSS, JavaScript, React, and more",
    url: "/Software/1.frontDetails",
    type: "course",
    icon: "web"
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Node.js, Express, databases, and server-side logic",
    url: "/Software/2.backendDetails",
    type: "course",
    icon: "storage"
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "React Native, Flutter, and mobile app development",
    url: "/Software/3.MobileDetails",
    type: "course",
    icon: "phone_android"
  },
  {
    id: "nextjs",
    title: "Next.js Development",
    description: "Server-side rendering, static sites, and React frameworks",
    url: "/Software/4.NextJsDetails",
    type: "course",
    icon: "next_plan"
  },
  {
    id: "flutter",
    title: "Flutter Development",
    description: "Cross-platform mobile development with Flutter",
    url: "/Software/5.FlutterDetails",
    type: "course",
    icon: "flutter_dash"
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Modern JavaScript, ES6+, and frameworks",
    url: "/Software/6.JavascriptDetails",
    type: "course",
    icon: "javascript"
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Type-safe JavaScript for large applications",
    url: "/Software/7.TypescriptDetails",
    type: "course",
    icon: "typescript"
  },

  // ====================
  // AWS CERTIFICATIONS
  // ====================
  {
    id: "aws-sap",
    title: "AWS Certified Solutions Architect Professional",
    description: "Advanced AWS architecture and deployment strategies",
    url: "/aws/1.AWS-SA-Pro-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect Associate",
    description: "AWS fundamentals and architecture design",
    url: "/aws/2.AWS-SA-Associate-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "aws-sysops",
    title: "AWS Certified SysOps Administrator Associate",
    description: "AWS deployment, management, and operations",
    url: "/aws/3.Aws-Sys-Ops-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "aws-devops",
    title: "AWS Certified DevOps Engineer Professional",
    description: "CI/CD, infrastructure as code, and monitoring on AWS",
    url: "/aws/4.AWS-Dev-En-Pro-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "aws-dev",
    title: "AWS Certified Developer Associate",
    description: "AWS application development and debugging",
    url: "/aws/5.AWS-Dev-Associate-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "aws-security",
    title: "AWS Certified Security Specialty",
    description: "AWS security, encryption, and compliance",
    url: "/aws/6.AWS-SS-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "aws-networking",
    title: "AWS Certified Advanced Networking Specialty",
    description: "AWS networking, routing, and hybrid architectures",
    url: "/aws/7.Aws-Ad-Net-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "aws-bigdata",
    title: "AWS Certified Big Data Specialty",
    description: "AWS data analytics and big data solutions",
    url: "/aws/8.AWS-Bi-Data-Details",
    type: "certification",
    icon: "cloud"
  },

  // ====================
  // AZURE CERTIFICATIONS
  // ====================
  {
    id: "azure-fund",
    title: "Microsoft Azure Fundamentals (AZ-900)",
    description: "Core Azure services and cloud concepts",
    url: "/azure/9.Azure-Fund-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-admin",
    title: "Microsoft Azure Administrator (AZ-104)",
    description: "Manage Azure resources, virtual networks, and services",
    url: "/azure/10.Azure-A-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-security-fund",
    title: "Microsoft Security, Compliance, and Identity Fundamentals (SC-900)",
    description: "Security, compliance, and identity in Azure",
    url: "/azure/11.Azure-Se-Com-Fun-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-data-engineer",
    title: "Data Engineering on Microsoft Azure (DP-203)",
    description: "Azure Data Factory, Synapse Analytics, and Databricks",
    url: "/azure/12.Azure-Data-En-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-data-science",
    title: "Designing Data Science Solution on Azure (DP-100)",
    description: "Azure Machine Learning and AI-driven services",
    url: "/azure/13.Azure-Designing-Data-S-S",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-database",
    title: "Administering Relational Databases on Azure (DP-300)",
    description: "Azure SQL database management and optimization",
    url: "/azure/14.Azure-A-R-D-Micro-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-dev",
    title: "Developing Solutions for Microsoft Azure (AZ-204)",
    description: "Azure SDKs, APIs, and DevOps tools",
    url: "/azure/15.Azure-D-S-Micro-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-enterprise-analytics",
    title: "Enterprise-Scale Analytics with Azure & Power BI (DP-500)",
    description: "Azure Synapse and Power BI analytics solutions",
    url: "/azure/16.Azure-I-E-S-A-S-Power-BI-Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-networking",
    title: "Azure Networking Solutions (AZ-700)",
    description: "Azure networking, security, and connectivity",
    url: "/azure/17.Des-Imple-Micro-A-N-S.Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-security",
    title: "Microsoft Azure Security Technologies (AZ-500)",
    description: "Azure security, threat management, and compliance",
    url: "/azure/18.Micro-Azure-Sec-Tech.Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-identity",
    title: "Microsoft Identity and Access Administrator (SC-300)",
    description: "Azure identity, authentication, and access management",
    url: "/azure/19.Micro-I-A-Ad.Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-security-ops",
    title: "Microsoft Security Operations Analyst (SC-200)",
    description: "Azure security monitoring, threat detection, and response",
    url: "/azure/20.Azure-Micro-Sec-Op-A.Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-hybrid",
    title: "Administering Windows Server Hybrid Core Infrastructure (AZ-800)",
    description: "Hybrid cloud infrastructure with Windows Server and Azure",
    url: "/azure/21.Azure-Ad-W-Se-Hy-Co-Inf.Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-virtual-desktop",
    title: "Azure Virtual Desktop Specialty (AZ-140)",
    description: "Virtual desktop configuration and operation on Azure",
    url: "/azure/22.Azure-C-Op-Micro-V-Desk.Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-infrastructure",
    title: "Designing Microsoft Azure Infrastructure Solutions (AZ-305)",
    description: "Azure infrastructure design, scalability, and security",
    url: "/azure/23.Des-Micro-A-I-S",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-cybersecurity",
    title: "Microsoft Cybersecurity Architect (SC-100)",
    description: "Azure cybersecurity, threat protection, and governance",
    url: "/azure/24.Azure-Micro-Cyber-Arch.Details",
    type: "certification",
    icon: "cloud"
  },
  {
    id: "azure-devops",
    title: "Designing and Implementing Microsoft DevOps Solutions (AZ-400)",
    description: "Azure DevOps, CI/CD, and infrastructure automation",
    url: "/azure/25.Des-I-Micro-Dev-S.Details",
    type: "certification",
    icon: "cloud"
  },

  // ====================
  // DIGITAL MARKETING COURSES
  // ====================
  {
    id: "dm-full",
    title: "Full Digital Marketing Program",
    description: "Complete digital marketing strategy and implementation",
    url: "/marketing/0.full_program",
    type: "course",
    icon: "campaign"
  },
  {
    id: "dm-facebook",
    title: "Facebook Marketing",
    description: "Facebook ads, campaigns, and business pages",
    url: "/marketing/1.facebook",
    type: "course",
    icon: "facebook"
  },
  {
    id: "dm-instagram",
    title: "Instagram Marketing",
    description: "Instagram stories, reels, and brand building",
    url: "/marketing/2.Instagram",
    type: "course",
    icon: "instagram"
  },
  {
    id: "dm-linkedin",
    title: "LinkedIn Marketing",
    description: "B2B marketing, LinkedIn ads, and professional networking",
    url: "/marketing/3.LinkedIn",
    type: "course",
    icon: "linkedin"
  },
  {
    id: "dm-twitter",
    title: "Twitter Marketing",
    description: "Twitter engagement, trends, and advertising",
    url: "/marketing/4.Twitter",
    type: "course",
    icon: "twitter"
  },
  {
    id: "dm-youtube",
    title: "YouTube Marketing",
    description: "Video content, SEO, and YouTube ads",
    url: "/marketing/5.YouTube",
    type: "course",
    icon: "youtube"
  },
  {
    id: "dm-google-ads",
    title: "Google Ads",
    description: "Google Search, Display Network, and YouTube ads",
    url: "/marketing/6.Google-Ads",
    type: "course",
    icon: "google"
  },
  {
    id: "dm-pinterest",
    title: "Pinterest Marketing",
    description: "Visual marketing, pins, and engagement on Pinterest",
    url: "/marketing/7.Pinterest",
    type: "course",
    icon: "pinterest"
  },
  {
    id: "dm-tiktok",
    title: "TikTok Marketing",
    description: "Short-form video marketing and TikTok advertising",
    url: "/marketing/8.TikTok",
    type: "course",
    icon: "tiktok"
  },

  // ====================
  // DATA ANALYTICS COURSES
  // ====================
  {
    id: "data-cloud",
    title: "Cloud Data Analytics",
    description: "Google BigQuery, AWS Redshift, and Azure data analytics",
    url: "/dataAnalytics/1.CloudDataAnalytics",
    type: "course",
    icon: "analytics"
  },
  {
    id: "data-traditional",
    title: "Traditional Data Analytics",
    description: "Excel, SQL, SAS, and data mining techniques",
    url: "/dataAnalytics/2.TraditionalDataAnalytics",
    type: "course",
    icon: "analytics"
  },

  // ====================
  // CYBER SECURITY COURSES
  // ====================
  {
    id: "az500",
    title: "Microsoft AZ-500 Security Training",
    description: "Azure security, identity management, and threat protection",
    url: "/microsoftAz500/Micro-AZ-500-Sec-Tra",
    type: "certification",
    icon: "security"
  },
  {
    id: "oscp",
    title: "OSCP - Offensive Security Certified Professional",
    description: "Penetration testing, vulnerability assessment, and ethical hacking",
    url: "/oscp/Off-Secu-Certified-Pro",
    type: "certification",
    icon: "security"
  },

  // ====================
  // FOREX TRADING
  // ====================
  {
    id: "forex-full",
    title: "Fullstack Forex Trading Program",
    description: "Forex trading, technical analysis, and risk management",
    url: "/forexTrading/forex",
    type: "course",
    icon: "trending_up"
  }
];

const SearchResults = ({ query, onClose }: SearchResultsProps) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const filtered = searchableContent.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm) ||
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
        router.push(selected.url);
        onClose();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // Map custom icons to Material Symbols - FIXED SOCIAL MEDIA ICONS
  const getMaterialIcon = (icon: string | undefined, type: string): string => {
    // Social Media Icons Mapping - These are valid Material Symbols
    const iconMap: Record<string, string> = {
      // Social Media Icons - Using valid Material Symbols
      "facebook": "facebook",
      "instagram": "instagram",
      "linkedin": "linkedin", 
      "twitter": "twitter",
      "youtube": "youtube",
      "google": "google",
      "pinterest": "pinterest",
      "tiktok": "music_note",
      "whatsapp": "whatsapp",
      "telegram": "telegram",
      "discord": "discord",
      "reddit": "reddit",
      "snapchat": "snapchat",
      "tumblr": "tumblr",
      "vimeo": "vimeo",
      "flickr": "flickr",
      
      // Marketing
      "marketing": "campaign",
      "campaign": "campaign",
      
      // Analytics
      "analytics": "analytics",
      
      // Frontend
      "frontend": "web",
      "web": "web",
      
      // Cloud
      "cloud": "cloud",
      "aws": "cloud",
      "azure": "cloud",
      
      // Security
      "security": "security",
      
      // Forex
      "trending_up": "trending_up",
      
      // Default icons
      "code": "code",
      "school": "school",
      "info": "info",
      "contact_mail": "contact_mail",
      "article": "article",
      "handshake": "handshake",
      "payments": "payments",
      "help": "help",
      "privacy_tip": "privacy_tip",
      "gavel": "gavel",
      "event": "event",
      "psychology": "psychology",
      "app_registration": "app_registration",
      "login": "login",
      "home": "home",
      "description": "description",
      "book": "book",
      "verified": "verified",
      "folder": "folder",
      "storage": "storage",
      "phone_android": "phone_android",
      "next_plan": "next_plan",
      "flutter_dash": "flutter_dash",
      "javascript": "javascript",
      "typescript": "typescript",
    };

    // Return mapped icon or the original if it exists, otherwise fallback
    if (icon && iconMap[icon]) {
      return iconMap[icon];
    }
    
    if (icon && icon.length > 0) {
      // Check if it might be a valid Material Symbol already
      return icon;
    }
    
    // Fallback based on type
    const typeMap: Record<string, string> = {
      "page": "description",
      "program": "school",
      "course": "book",
      "blog": "article",
      "certification": "verified"
    };
    return typeMap[type] || "folder";
  };

  const getTypeLabel = (type: string): string => {
    switch (type) {
      case "page": return "Page";
      case "program": return "Program";
      case "course": return "Course";
      case "blog": return "Blog";
      case "certification": return "Certification";
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case "page": return "#64748b";
      case "program": return "#d97706";
      case "course": return "#2563eb";
      case "blog": return "#dc2626";
      case "certification": return "#7c3aed";
      default: return "#64748b";
    }
  };

  if (!query.trim() || results.length === 0) {
    return (
      <div className="search-results-dropdown">
        {query.trim() && (
          <div className="search-no-results">
            <span className="material-symbols-outlined">search_off</span>
            <p>No results found for "{query}"</p>
            <span className="search-suggestion">Try different keywords</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="search-results-dropdown" onKeyDown={handleKeyDown}>
      <div className="search-results-header">
        <span className="search-results-count">{results.length} results</span>
        <button className="search-results-close" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="search-results-list">
        {results.map((result, index) => {
          const iconName = getMaterialIcon(result.icon, result.type);
          const typeColor = getTypeColor(result.type);
          
          return (
            <Link
              key={result.id}
              href={result.url}
              className={`search-result-item ${selectedIndex === index ? "selected" : ""}`}
              onClick={onClose}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div 
                className="search-result-icon"
                style={{ backgroundColor: typeColor + '15' }}
              >
                <span 
                  className="material-symbols-outlined"
                  style={{ color: typeColor }}
                >
                  {iconName}
                </span>
              </div>
              <div className="search-result-content">
                <div className="search-result-title">{result.title}</div>
                <div className="search-result-description">{result.description}</div>
                <div className="search-result-type">
                  <span 
                    className={`result-type-badge ${result.type}`}
                    style={{ backgroundColor: typeColor + '20', color: typeColor }}
                  >
                    {getTypeLabel(result.type)}
                  </span>
                </div>
              </div>
              <div className="search-result-arrow">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="search-results-footer">
        <span className="search-keyboard-hint">
          <kbd>↑</kbd> <kbd>↓</kbd> navigate
        </span>
        <span className="search-keyboard-hint">
          <kbd>Enter</kbd> select
        </span>
        <span className="search-keyboard-hint">
          <kbd>Esc</kbd> close
        </span>
      </div>
    </div>
  );
};

export default SearchResults;