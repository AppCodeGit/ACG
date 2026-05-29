"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./NavPage.css";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper function to check if link is active
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className={`nav-bar ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="container">
          <div className="navbar-toggle" onClick={toggleMobileMenu}>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </div>

          <div className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
            <p>
              <Link
                href="/Software"
                className={isActive("/Software") ? "active" : ""}
                data-text="Software Engineering"
              >
                Software Engineering
              </Link>
            </p>
            
            <div className="Link-dropdown">
              <p className="drop-toggle" data-text="Cloud Engineering">
                Cloud Engineering
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </p>
              <div className="dropdown-menu">
                <Link
                  href="/aws"
                  className={isActive("/aws") ? "active" : ""}
                  data-text="AWS"
                >
                  <span role="img" aria-label="lightning">⚡️</span> AWS Certifications
                  <p className="description">
                    Master AWS services like EC2, S3, and Lambda to elevate your
                    cloud expertise and boost your career!
                  </p>
                </Link>
                <Link
                  href="/azure"
                  className={isActive("/azure") ? "active" : ""}
                  data-text="Azure"
                >
                  <span role="img" aria-label="cloud">☁️</span> Microsoft Azure Certifications
                  <p className="description">
                    Become proficient in Microsoft Azure's cloud platform,
                    helping businesses manage and scale their infrastructure.
                  </p>
                </Link>
              </div>
            </div>

            <p>
              <Link
                href="/marketing"
                className={isActive("/marketing") ? "active" : ""}
                data-text="Digital Marketing"
              >
                Digital Marketing
              </Link>
            </p>
            
            <p>
              <Link
                href="/dataAnalytics"
                className={isActive("/dataAnalytics") ? "active" : ""}
                data-text="Data Analytics"
              >
                Data Analytics
              </Link>  
            </p>
            
            <div className="Link-dropdown">
              <p className="drop-toggle" data-text="Cyber Security">
                Cyber Security
                <span className="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </p>
              <div className="dropdown-menu">
                <Link
                  href="/microsoftAz500"
                  className={isActive("/microsoftAz500") ? "active" : ""}
                  data-text="MicrosoftAZ"
                >
                  <span role="img" aria-label="shield">🛡️</span> Microsoft AZ-500
                  <p className="description">
                    Learn cloud security and protect Azure environments with the
                    Microsoft Azure Security Engineer certification.
                  </p>
                </Link>
                <Link
                  href="/oscp"
                  className={isActive("/oscp") ? "active" : ""}
                  data-text="OSCP"
                >
                  <span role="img" aria-label="hacker">💻</span> OSCP
                  <p className="description">
                    Master penetration testing and ethical hacking with the
                    Offensive Security Certified Professional (OSCP)
                    certification.
                  </p>
                </Link>
              </div>
            </div>

            <p>
              <Link
                href="/forexTrading"
                className={isActive("/forexTrading") ? "active" : ""}
                data-text="Forex Trading"
              >
                Forex Trading
              </Link>
            </p>
          </div>

          {/* Button to navigate to payment page */}
          <div className="btn-container">
            <Link
              href="/pages/apply"
              className={`btn ${isActive("/payment") ? "active" : ""}`}
            >
              Apply Now
              <span className="material-symbols-outlined">east</span>
            </Link>
          </div>
        </div>
      </nav>

      <header className="grid-header">
        <div className="container">
          <p>
            <span className="material-symbols-outlined">calendar_today</span> Monday-Saturday - 7:30-20:00
          </p>
          <p>
            <span className="material-symbols-outlined">phone</span> +233 598044825
          </p>
          <p>
            <span className="material-symbols-outlined">location_on</span> Mallam-Gbawe.
          </p>
        </div>
      </header>
    </>
  );
};

export default Navigation;