"use client";

import "../Software/Css/style.css";
import Header from "../components/Header/HeaderPage";
import Navigation from "../components/Navigation/NavPage";
import Footer from "../components/footer/Footer";
import image1 from "./images/azure-security-engineer-associate.png";
import CyberImage from "./images/Cyber.png";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const CyberSecurity = () => {
  const [sidebarTop, setSidebarTop] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("courses");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleAccordion = (section: string) => {
    if (openAccordion === section) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(section);
    }
  };

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sidebarLimit = 0;
      const maxOffset = 70;

      if (scrollY > sidebarLimit) {
        setSidebarTop(Math.min(maxOffset, scrollY - sidebarLimit));
      } else {
        setSidebarTop(0);
      }

      const scrollPosition = window.scrollY + 100;

      sectionRefs.current.forEach(
        (section: HTMLElement | null, index: number) => {
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
              scrollPosition >= sectionTop &&
              scrollPosition < sectionTop + sectionHeight
            ) {
              setActiveSection(`section${index + 1}`);
            }
          }
        },
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToSection = (sectionId: string, offset: number = 0) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY;
      const scrollToPosition = sectionPosition + offset;
      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <div id="content">
        <Header />
        <Navigation />
        <div className="container navigate">
          <div className="items">
            <Link href="/">Home</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Microsoft Az 500</span>
        </div>
        <div className="software-page container">
          <div className="sideBar-container">
            <div
              className={`Sidebar ${isMobile ? 'accordion' : ''}`}
              style={{
                top: `${sidebarTop}px`,
                transition: "top 0.3s ease",
              }}
            >
              {/* Accordion Header */}
              <div 
                className={`accordion-header ${isMobile ? 'clickable' : ''}`}
                onClick={() => isMobile && toggleAccordion("courses")}
              >
                <h3>Courses</h3>
                {isMobile && (
                  <span className="accordion-icon">
                    {openAccordion === "courses" ? "−" : "+"}
                  </span>
                )}
              </div>

              {/* Accordion Content */}
              <div className={`accordion-content ${isMobile && openAccordion !== "courses" ? 'collapsed' : ''}`}>
                <ul>
                  <li
                    onClick={() => handleScrollToSection("section1", -75)}
                    className={activeSection === "section1" ? "active" : ""}
                  >
                    <div className="items-content">
                      <span className="material-symbols-outlined format">
                        format_indent_increase
                      </span>
                      Microsoft AZ-500
                    </div>
                    <span className="material-symbols-outlined arrow-icon">
                      south_east
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-Content">
            <div className="Content">
              <div className="course-details">
                <h2 className="course-title">
                  Microsoft AZ-500 Security Training
                </h2>
                <div className="image-container">
                  <Image
                    src={CyberImage}
                    alt="Microsoft AZ-500 Security Training"
                  />
                </div>
                <div className="course-description">
                  <div className="text">
                    Learn the essential skills to implement, manage, and secure
                    Microsoft Azure environments. This course includes:
                    <ul>
                      <li>
                        <strong>Identity and Access Management:</strong>{" "}
                        Understand how to manage Azure Active Directory (Azure
                        AD) and secure identities with Multi-Factor
                        Authentication (MFA).
                      </li>
                      <li>
                        <strong>Platform Protection:</strong> Learn how to
                        implement advanced security configurations for virtual
                        machines, networks, and apps.
                      </li>
                      <li>
                        <strong>Data and Application Security:</strong> Explore
                        methods to secure Azure Storage, implement encryption,
                        and manage access policies for applications.
                      </li>
                      <li>
                        <strong>Security Operations:</strong> Gain expertise in
                        configuring Azure Security Center, Azure Sentinel, and
                        monitoring security events.
                      </li>
                      <li>
                        <strong>Threat Protection:</strong> Learn how to deploy
                        Azure Defender to protect workloads against threats and
                        vulnerabilities.
                      </li>
                      <li>
                        <strong>Compliance and Governance:</strong> Understand
                        Azure compliance tools and implement security policies
                        to align with organizational standards.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <section
                id="section1"
                className={`section ${activeSection === "section1" ? "section-active" : ""}`}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[0] = el;
                }}
              >
                <div className="image-container">
                  <Image
                    src={image1}
                    alt="Microsoft AZ-500 Security Training"
                  />
                </div>
                <div className="text-container">
                  <h2>Microsoft AZ-500 Security Training</h2>
                  <p>
                    Learn to secure Microsoft Azure environments with advanced
                    security tools and techniques. This training covers identity
                    and access management, platform protection, data security,
                    and compliance. Gain expertise in using Azure Security
                    Center, Azure Sentinel, and Azure Defender to protect
                    workloads and respond to threats effectively.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/microsoftAz500/Micro-AZ-500-Sec-Tra"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            className="back-to-top"
            onClick={() => handleScrollToSection("content")}
          >
            ↑ <br />
            Top
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CyberSecurity;