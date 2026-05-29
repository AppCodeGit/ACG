"use client";

import "../Software/Css/style.css";
import Header from "../components/Header/HeaderPage";
import Navigation from "../components/Navigation/NavPage";
import Footer from "../components/footer/Footer";
import image1 from "./images/image.png";
// Fixed: Renamed to avoid conflict with Next.js Image component
import OscpImage from "./images/Oscp.png";
// Fixed: Changed from NavLink to Next.js Link
import Link from "next/link";
// Added Next.js Image import
import Image from "next/image";

import { useState, useEffect, useRef } from "react";

const Oscp = () => {
  const [sidebarTop, setSidebarTop] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

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

      // Determine which section is in view
      const scrollPosition = window.scrollY + 100; // Adding some offset

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
            {/* Fixed: Changed NavLink to Link */}
            <Link href="/">Home</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>OSCP</span>
        </div>
        <div className="software-page container">
          {/* Sidebar */}
          <div className="sideBar-container">
            <div
              className="Sidebar"
              style={{
                top: `${sidebarTop}px`,
                transition: "top 0.3s ease",
              }}
            >
              <ul>
                <li
                  onClick={() => handleScrollToSection("section1", -75)}
                  className={activeSection === "section1" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    OSCP
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-Content">
            <div className="Content">
              <div className="course-details">
                <h2 className="course-title">
                  Offensive Security Certified Professional
                </h2>
                <div className="image-container">
                  {/* Fixed: Changed from <img src={Image} ... /> to <Image src={OscpImage} ... /> */}
                  <Image src={OscpImage} alt="Offensive Security" />
                </div>
                <div className="course-description">
                  <div className="text">
                    Learn the skills required to perform advanced penetration
                    testing and secure critical systems. This course includes:
                    <ul>
                      <li>
                        <strong>Penetration Testing:</strong> Gain hands-on
                        experience with network and application exploitation
                        techniques.
                      </li>
                      <li>
                        <strong>Vulnerability Assessment:</strong> Learn how to
                        identify and prioritize vulnerabilities in systems and
                        applications.
                      </li>
                      <li>
                        <strong>Privilege Escalation:</strong> Master techniques
                        to escalate user privileges after exploitation.
                      </li>
                      <li>
                        <strong>Buffer Overflows:</strong> Understand and
                        exploit buffer overflow vulnerabilities in software
                        applications.
                      </li>
                      <li>
                        <strong>Active Directory Attacks:</strong> Learn how to
                        target and compromise Active Directory environments
                        effectively.
                      </li>
                      <li>
                        <strong>Reporting and Documentation:</strong> Develop
                        skills to document findings and create professional
                        penetration testing reports.
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
                  {/* Fixed: Changed img to Image */}
                  <Image
                    src={image1}
                    alt="Offensive Security Certified Professional"
                  />
                </div>
                <div className="text-container">
                  <h2>Offensive Security Certified Professional</h2>
                  <p>
                    The Offensive Security Certified Professional (OSCP) program
                    is designed to teach advanced penetration testing skills. It
                    emphasizes hands-on experience in areas such as
                    vulnerability assessment, exploitation, privilege
                    escalation, and network security. The program prepares
                    candidates to identify security weaknesses, exploit
                    vulnerabilities, and secure critical systems effectively.
                    Master ethical hacking techniques to uncover and mitigate
                    threats in real-world scenarios.
                  </p>
                </div>

                <div className="button-container">
                  <p className="amount">Ghc 18,000</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/oscp/Off-Secu-Certified-Pro" className="btn">
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

export default Oscp;
