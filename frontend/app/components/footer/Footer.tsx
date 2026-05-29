"use client";

import "./Footer.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../Header/appcode.png";

const Footer = () => {
  const pathname = usePathname();

  // Helper function to check if link is active
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <footer className="footer">
        <div className="logo container">
          <Image 
            src={logo} 
            alt="AppCode logo" 
          />
        </div>
        
        <div className="footer-container container">
          <div className="footer-items">
            <div className="items">
              {/* First Column - Programs */}
              <ul className="links">
                <li>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <Link 
                    href="/bootcamps"
                    className={isActive("/bootcamps") ? "active" : ""}
                  >
                    Bootcamps
                  </Link>
                </li>
                <li>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <Link 
                    href="/events"
                    className={isActive("/events") ? "active" : ""}
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <Link 
                    href="/pre-session"
                    className={isActive("/pre-session") ? "active" : ""}
                  >
                    Pre-Session
                  </Link>
                </li>
                <li>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <Link 
                    href="/workshops"
                    className={isActive("/workshops") ? "active" : ""}
                  >
                    Workshops
                  </Link>
                </li>
              </ul>

              {/* Second Column - Company */}
              <ul className="links">
                <li>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <Link 
                    href="/about"
                    className={isActive("/about") ? "active" : ""}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <Link 
                    href="/contact"
                    className={isActive("/contact") ? "active" : ""}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <Link 
                    href="/blog"
                    className={isActive("/blog") ? "active" : ""}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <Link 
                    href="/services"
                    className={isActive("/services") ? "active" : ""}
                  >
                    Services
                  </Link>
                </li>
              </ul>

              {/* Third Column - Legal */}
              <ul className="links">
                <li>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <Link 
                    href="/privacy-policy"
                    className={isActive("/privacy-policy") ? "active" : ""}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <span className="material-symbols-outlined">chevron_right</span>
                  <Link 
                    href="/terms"
                    className={isActive("/terms") ? "active" : ""}
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* About Section */}
            <div className="about-us">
              <h2>About AppCode</h2>
              <p>
                Our Courses are for anyone wishing to start a
                career in Software Engineering, Cyber Security, or
                working professionals looking to upgrade their skills.
                Come and experience AppCode Lecturing.
              </p>
            </div>
          </div>

          <div className="footer-items">
            {/* Learn More Section */}
            <div className="learn-more">
              <h6>Learn More</h6>
              <ul>
                <li>
                  <Link 
                    href="/platform"
                    className={isActive("/platform") ? "active" : ""}
                  >
                    Our Platform
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/pricing"
                    className={isActive("/pricing") ? "active" : ""}
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/faq"
                    className={isActive("/faq") ? "active" : ""}
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <ul className="social-links">
              <li>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Copyright Footer */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} AppCode. All rights reserved.
      </div>
    </>
  );
};

export default Footer;