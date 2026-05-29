"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import SecurityOpsImage from "../images/12.Microsoft Security Operations Analyst.SC-200.png";
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
            <Link href="/azure">Azure</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Microsoft Security Operations Analyst</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={SecurityOpsImage}
                  alt="Microsoft Security Operations Analyst"
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
                      <h3>🛡️ Microsoft Security Operations Analyst (SC-200)</h3>
                      <p>
                        This comprehensive course teaches you to monitor,
                        detect, investigate, and respond to security threats
                        using Microsoft security technologies. You'll learn to
                        use Microsoft Defender suite, Azure Sentinel, and other
                        tools to protect organizational assets.
                      </p>
                      <div className="data-item">
                        📌 1: Security Operations Fundamentals - SOC concepts,
                        Threat landscape, Defense in depth
                      </div>
                      <div className="data-item">
                        📌 2: Microsoft Defender Suite - Defender for Endpoint,
                        Defender for Identity, Defender for Cloud Apps
                      </div>
                      <div className="data-item">
                        📌 3: Azure Sentinel Implementation - SIEM architecture,
                        Data connectors, Workbooks
                      </div>
                      <div className="data-item">
                        📌 4: Threat Hunting Techniques - Proactive hunting,
                        Hypothesis-based investigations
                      </div>
                      <div className="data-item">
                        📌 5: Incident Response Procedures - Triage,
                        Investigation, Remediation, Post-incident activities
                      </div>
                      <div className="data-item">
                        📌 6: Security Monitoring and Alerting - Analytics
                        rules, Alert tuning, Automation rules
                      </div>
                      <div className="data-item">
                        📌 7: KQL (Kusto Query Language) - Advanced queries,
                        Data analysis, Threat detection
                      </div>
                      <div className="data-item">
                        📌 8: Playbooks and Automation - SOAR capabilities,
                        Logic Apps integration
                      </div>
                      <div className="data-item">
                        📌 9: Microsoft 365 Defender - Cross-domain threat
                        protection, Investigation experiences
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and SC-200 Certification
                        Preparation
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
                          This comprehensive course teaches you to monitor,
                          detect, investigate, and respond to security threats
                          using Microsoft security technologies. You'll learn to
                          use Microsoft Defender suite, Azure Sentinel, and
                          other tools to protect organizational assets.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of security concepts and
                          familiarity with Microsoft cloud services. Experience
                          with security operations is helpful but not required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Implement Microsoft Defender security solutions
                          across endpoints, identity, and cloud apps
                        </li>
                        <li>
                          ✅ Configure and manage Azure Sentinel as a
                          cloud-native SIEM
                        </li>
                        <li>
                          ✅ Develop threat hunting queries and investigations
                          using KQL
                        </li>
                        <li>
                          ✅ Respond to security incidents using Microsoft tools
                          and playbooks
                        </li>
                        <li>
                          ✅ Create security monitoring rules, alerts, and
                          automation workflows
                        </li>
                        <li>
                          ✅ Write advanced KQL queries for security analysis
                          and threat detection
                        </li>
                        <li>
                          ✅ Implement security orchestration and automation
                          (SOAR) capabilities
                        </li>
                        <li>
                          ✅ Investigate cross-domain threats using Microsoft
                          365 Defender
                        </li>
                        <li>
                          ✅ Design and implement incident response procedures
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's SC-200 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🛡️ Complete security operations center (SOC)
                          environment with Azure Sentinel
                        </li>
                        <li>
                          🔍 Threat hunting queries and dashboards for proactive
                          security
                        </li>
                        <li>
                          ⚡ Automated incident response playbooks with Logic
                          Apps
                        </li>
                        <li>
                          📊 Security monitoring dashboards and analytics rules
                        </li>
                        <li>🚨 Alert tuning and automation workflows</li>
                        <li>
                          📋 Incident investigation and response procedures
                        </li>
                        <li>
                          🔗 Cross-domain threat detection with Microsoft 365
                          Defender
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on security operations implementations:
                      </p>
                      <ul>
                        <li>Module 1: Security Operations Fundamentals</li>
                        <li>Module 2: Microsoft Defender Suite</li>
                        <li>Module 3: Azure Sentinel</li>
                        <li>Module 4: Threat Hunting</li>
                        <li>Module 5: Incident Response</li>
                        <li>Module 6: Security Monitoring</li>
                        <li>Module 7: KQL for Security</li>
                        <li>Module 8: Playbooks and Automation</li>
                        <li>Module 9: Microsoft 365 Defender</li>
                        <li>Module 10: Security Operations Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on labs in live
                        Microsoft security environments. Includes access to
                        security operations tools for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: Security
                        Operations Analyst Associate (SC-200) exam. Includes one
                        free exam attempt voucher and practice tests.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities</h3>
                      <p>
                        Graduates of this course will be prepared for these
                        in-demand roles:
                      </p>
                      <ul>
                        <li>
                          🔹 <strong>Security Operations Analyst:</strong>{" "}
                          Monitor and respond to security threats. Average
                          salary: $95,000 - $140,000
                        </li>
                        <li>
                          🔹 <strong>Threat Hunter:</strong> Proactively search
                          for security risks. Average salary: $105,000 -
                          $155,000
                        </li>
                        <li>
                          🔹 <strong>Incident Responder:</strong> Investigate
                          and mitigate security incidents. Average salary:
                          $100,000 - $150,000
                        </li>
                        <li>
                          🔹 <strong>SIEM Specialist:</strong> Manage security
                          information and event systems. Average salary: $98,000
                          - $145,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Security Analyst:</strong> Protect
                          cloud-based assets and services. Average salary:
                          $102,000 - $148,000
                        </li>
                        <li>
                          🔹 <strong>Security Automation Engineer:</strong>{" "}
                          Implement SOAR capabilities. Average salary: $108,000
                          - $158,000
                        </li>
                      </ul>
                      <p>
                        Security operations professionals are in critical demand
                        as organizations face evolving cyber threats.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Microsoft Security Operations Analyst (SC-200)</h1>
                <p>
                  Master the skills to protect organizations from modern
                  security threats using Microsoft security technologies. This
                  comprehensive course covers threat detection, incident
                  response, security monitoring, and threat hunting while
                  preparing for the SC-200 certification exam.
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
                  This course prepares you for the Microsoft Certified: Security
                  Operations Analyst Associate certification (SC-200),
                  validating your ability to mitigate threats using Microsoft
                  security solutions. This certification is essential for
                  security operations professionals.
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
                  The course is 12 weeks long, with 60 hours of instructor-led
                  training and 80+ hours of hands-on labs and projects. Includes
                  access to Microsoft security tools for practice.
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
                  Benefits of completing this Security Operations course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Microsoft security tools and SIEM
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for SC-200 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand security operations roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of real-world security investigations
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Career guidance and job placement assistance
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>
                  Technologies Covered
                </h4>
                <p>
                  Microsoft Defender for Endpoint, Microsoft Defender for
                  Identity, Microsoft Defender for Cloud Apps, Azure Sentinel,
                  Microsoft 365 Defender, Kusto Query Language (KQL), Azure
                  Monitor, Logic Apps, Security Orchestration Automation and
                  Response (SOAR), Microsoft Threat Protection, and other
                  Microsoft security operations tools.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 8,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 8,500. You will be required to pay Ghc
                  3,000 for the first installment and Ghc 2,750 for each
                  additional month.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Course duration:</b> 3 months intensive program, with
                    classes 3 days a week (Monday to Wednesday). Security
                    project work continues through weekends.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-language">
                      language
                    </span>
                  </div>
                  <p>
                    <b>Course language:</b> English
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-info">
                      info
                    </span>
                  </div>
                  <p>
                    <b>Additional Notes:</b> Students receive full access to
                    Microsoft security operations resources including Azure
                    Sentinel and Defender suites. Basic security concepts
                    understanding recommended.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Monday to Wednesday (10 hours/week)
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-time">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Class Time:</b> 9:00 AM - 12:30 PM (Morning Batch) or
                    2:00 PM - 5:30 PM (Afternoon Batch)
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
                <h4>Course Cancellation/Reschedule Policy</h4>
                <p>
                  Once payment is made, it is <strong>non-refundable</strong>.
                  Students are expected to carefully review the course details
                  before making a payment.
                </p>
                <p>
                  In the event of unforeseen circumstances, we reserve the right
                  to reschedule the course. However, the course will still be
                  conducted at a later date, and enrolled students will be
                  notified in advance.
                </p>
                <p>A minimum of 5 students is required to start a class.</p>
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
