"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import OSCPImage from "../images/image.png";
import Image from "next/image";
import { useState } from "react";

const Details = () => {
  const [activeContent, setActiveContent] = useState(1);

  const handleScrollToSection = (sectionId: string, offset: number = 0) => {
    const section = document.getElementById(sectionId);

    if (section) {
      const sectionPosition = section.offsetTop - offset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
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
          <div className="items">
            <Link href="/oscp">Cybersecurity</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Offensive Security Certified Professional (OSCP)</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={OSCPImage}
                  alt="Offensive Security Certified Professional (OSCP)"
                />
              </div>

              <div className="concept-container">
                {/* Buttons */}
                <div className="button-group">
                  <p
                    onClick={() => setActiveContent(1)}
                    className={`btn ${activeContent === 1 ? "active" : ""}`}
                  >
                    Course Details
                  </p>
                  <p
                    onClick={() => setActiveContent(2)}
                    className={`btn ${activeContent === 2 ? "active" : ""}`}
                  >
                    Course Info
                  </p>
                  <p
                    onClick={() => setActiveContent(3)}
                    className={`btn ${activeContent === 3 ? "active" : ""}`}
                  >
                    Job Role
                  </p>
                </div>

                {/* Content Section */}
                <div className="content-wrapper">
                  <div
                    className={`content ${activeContent === 1 ? "show" : ""}`}
                  >
                    <div className="concept-data">
                      <h3>
                        ⚔️ Offensive Security Certified Professional (OSCP)
                      </h3>
                      <p>
                        The OSCP certification is the most practical penetration
                        testing certification available. This intense program
                        teaches you how to find vulnerabilities and execute
                        organized attacks in a controlled environment,
                        culminating in a challenging 24-hour exam.
                      </p>
                      <div className="data-item">
                        📌 1: Penetration Testing with Kali Linux - Methodology,
                        Tools, Environment setup
                      </div>
                      <div className="data-item">
                        📌 2: Information Gathering & Reconnaissance -
                        Passive/active reconnaissance, OSINT, Scanning
                      </div>
                      <div className="data-item">
                        📌 3: Vulnerability Scanning & Analysis - Automated
                        scanners, Manual verification, Prioritization
                      </div>
                      <div className="data-item">
                        📌 4: Buffer Overflow Exploitation - x86 architecture,
                        Shellcode development, Bypassing protections
                      </div>
                      <div className="data-item">
                        📌 5: Client-Side Attacks - Social engineering, Browser
                        exploits, Document-based attacks
                      </div>
                      <div className="data-item">
                        📌 6: Privilege Escalation Techniques - Windows/Linux
                        escalation, Kernel exploits, Service misconfigurations
                      </div>
                      <div className="data-item">
                        📌 7: Password Attacks & Cracking - Online/offline
                        attacks, Hash cracking, Pass-the-hash
                      </div>
                      <div className="data-item">
                        📌 8: Web Application Attacks - SQL injection, XSS,
                        CSRF, File inclusion
                      </div>
                      <div className="data-item">
                        📌 9: Post-Exploitation & Pivoting - Lateral movement,
                        Tunneling, Maintaining access
                      </div>
                      <div className="data-item">
                        📌 10: OSCP Exam Preparation - Lab practice, Report
                        writing, Time management
                      </div>
                    </div>
                  </div>
                  <div
                    className={`content ${activeContent === 2 ? "show" : ""}`}
                  >
                    <div className="course-data">
                      <div className="course-detail">
                        <p>
                          <strong>
                            <i className="fas fa-info-circle"></i> Course
                            Description:
                          </strong>{" "}
                          The OSCP certification is the most practical
                          penetration testing certification available. This
                          intense program teaches you how to find
                          vulnerabilities and execute organized attacks in a
                          controlled environment, culminating in a challenging
                          24-hour exam.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Strong understanding of networking, Linux, and Windows
                          systems. Scripting knowledge (Python/Bash)
                          recommended.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Conduct professional penetration tests following
                          industry methodologies
                        </li>
                        <li>
                          ✅ Perform advanced exploitation techniques against
                          various targets
                        </li>
                        <li>
                          ✅ Write custom exploits and tools for unique
                          scenarios
                        </li>
                        <li>
                          ✅ Bypass common security defenses and protections
                        </li>
                        <li>
                          ✅ Document and report findings professionally for
                          stakeholders
                        </li>
                        <li>
                          ✅ Think creatively to solve complex security
                          challenges
                        </li>
                        <li>
                          ✅ Perform buffer overflow exploitation on
                          Windows/Linux
                        </li>
                        <li>
                          ✅ Conduct privilege escalation on compromised systems
                        </li>
                        <li>✅ Pivot through networks and maintain access</li>
                        <li>
                          ✅ Prepare for and pass the OSCP certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🛡️ Complete penetration testing methodology framework
                        </li>
                        <li>
                          💻 Custom exploit scripts for various vulnerabilities
                        </li>
                        <li>📝 Professional penetration testing reports</li>
                        <li>🔧 Buffer overflow exploitation toolkit</li>
                        <li>🌐 Network pivoting and tunneling techniques</li>
                        <li>
                          📊 Vulnerability assessment and prioritization system
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>This intensive 10-module program covers:</p>
                      <ul>
                        <li>Module 1: Kali Linux & Methodology</li>
                        <li>Module 2: Reconnaissance</li>
                        <li>Module 3: Vulnerability Analysis</li>
                        <li>Module 4: Buffer Overflow</li>
                        <li>Module 5: Client-Side Attacks</li>
                        <li>Module 6: Privilege Escalation</li>
                        <li>Module 7: Password Attacks</li>
                        <li>Module 8: Web Application Attacks</li>
                        <li>Module 9: Post-Exploitation</li>
                        <li>Module 10: Exam Preparation</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Hands-on labs with vulnerable machines, practical
                        exercises, and access to the PWK (Penetration Testing
                        with Kali Linux) lab environment with 50+ machines.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for the Offensive Security Certified
                        Professional (OSCP) certification - the gold standard in
                        penetration testing certifications. Includes exam
                        preparation and practice.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities</h3>
                      <p>Graduates qualify for these high-demand positions:</p>
                      <ul>
                        <li>
                          🔹 <strong>Penetration Tester:</strong> Conduct
                          authorized simulated attacks. Average salary: $95,000
                          - $140,000
                        </li>
                        <li>
                          🔹 <strong>Red Team Operator:</strong> Simulate
                          advanced adversaries. Average salary: $105,000 -
                          $155,000
                        </li>
                        <li>
                          🔹 <strong>Security Consultant:</strong> Advise
                          organizations on security. Average salary: $100,000 -
                          $150,000
                        </li>
                        <li>
                          🔹 <strong>Vulnerability Researcher:</strong> Discover
                          new vulnerabilities. Average salary: $110,000 -
                          $165,000
                        </li>
                        <li>
                          🔹 <strong>Ethical Hacker:</strong> Identify security
                          weaknesses. Average salary: $92,000 - $135,000
                        </li>
                        <li>
                          🔹 <strong>Security Analyst (Offensive):</strong>{" "}
                          Focus on offensive security. Average salary: $88,000 -
                          $130,000
                        </li>
                      </ul>
                      <p>
                        OSCP certified professionals are among the most
                        sought-after in cybersecurity, with the certification
                        being a requirement for many senior technical roles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>OSCP Certification Training</h1>
                <p>
                  Become an Offensive Security Certified Professional through
                  this intensive hands-on training that teaches penetration
                  testing methodologies and tools used by security professionals
                  worldwide. This is the most challenging and respected
                  entry-level penetration testing certification.
                </p>
              </div>

              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>
                  Certification
                </h4>
                <p>
                  Prepares for Offensive Security Certified Professional (OSCP)
                  - the most respected penetration testing certification that
                  requires demonstrating practical skills in a 24-hour exam.
                </p>
              </div>
              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>
                  Duration
                </h4>
                <p>
                  14-week intensive program with 70 instructor-led hours and
                  250+ lab hours, including access to the PWK lab environment.
                </p>
              </div>
              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>
                  Benefits
                </h4>
                <div>
                  Key benefits of this OSCP training:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on penetration testing experience with real-world
                      scenarios
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Access to official PWK lab environment with 50+ machines
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn real-world exploitation and post-exploitation
                      techniques
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive certification exam preparation
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Develop professional reporting and documentation skills
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>
                  Tools Covered
                </h4>
                <p>
                  Kali Linux, Metasploit Framework, Burp Suite, Nmap, Wireshark,
                  John the Ripper, Hashcat, Hydra, Medusa, SQLmap, Nessus,
                  Nikto, Dirb, Gobuster, Netcat, Socat, PowerShell Empire,
                  Cobalt Strike, and custom exploit development tools.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 9,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  Course fee: Ghc 9,500 payable as Ghc 4,000 initial deposit and
                  Ghc 2,750 monthly installments.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Schedule:</b> 14 weeks, 3 sessions/week (Tue/Thu/Sat)
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-language">
                      language
                    </span>
                  </div>
                  <p>
                    <b>Language:</b> English
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-info">
                      info
                    </span>
                  </div>
                  <p>
                    <b>Requirements:</b> Laptop with 16GB+ RAM, virtualization
                    enabled, 100GB free space. Linux experience required.
                    Includes PWK lab access.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Tuesday, Thursday, Saturday
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-time">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Times:</b> Weekdays 6PM-9PM, Saturday 10AM-2PM (choose
                    your preferred batch)
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-location">
                      location_on
                    </span>
                  </div>
                  <p>
                    <b>Location:</b> Accra, Mallam-Gbawe or Online
                  </p>
                </div>
              </div>

              <div className="course-info">
                <h4>Course Policies</h4>
                <p>
                  <strong>Non-refundable policy:</strong> Payments are final
                  once made. Students are expected to review course details
                  carefully before enrollment.
                </p>
                <p>
                  <strong>Rescheduling:</strong> We may reschedule with advance
                  notice to participants in case of unforeseen circumstances.
                </p>
                <p>
                  <strong>Minimum enrollment:</strong> 5 students required to
                  commence class.
                </p>
                <p>
                  <strong>Exam attempt:</strong> Includes one OSCP exam attempt
                  voucher and 30 days of official PWK lab access.
                </p>
              </div>
            </div>
          </div>
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

export default Details;
