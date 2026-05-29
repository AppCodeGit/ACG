"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import CyberArchitectImage from "../images/16.SC-100-Microsoft-Cybersecurity-Architect.webp";
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
          <span>Microsoft Cybersecurity Architect</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={CyberArchitectImage}
                  alt="Microsoft Cybersecurity Architect"
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
                      <h3>🔐 Microsoft Cybersecurity Architect (SC-100)</h3>
                      <p>
                        This expert-level course teaches you how to design and
                        implement comprehensive cybersecurity solutions using
                        Microsoft security technologies. You'll learn to develop
                        security strategies, design security architectures, and
                        implement security controls across Microsoft 365, Azure,
                        and hybrid environments.
                      </p>
                      <div className="data-item">
                        📌 1: Cybersecurity Architecture Fundamentals - Security
                        frameworks, Threat modeling, Risk assessment
                      </div>
                      <div className="data-item">
                        📌 2: Designing Zero Trust Security Strategies -
                        Identity-first security, Least privilege,
                        Micro-segmentation
                      </div>
                      <div className="data-item">
                        📌 3: Identity and Access Management Solutions - Azure
                        AD, Conditional Access, Identity governance
                      </div>
                      <div className="data-item">
                        📌 4: Cloud Security Posture Management - Microsoft
                        Defender for Cloud, Security policies, Compliance
                      </div>
                      <div className="data-item">
                        📌 5: Threat Protection Architectures - Microsoft
                        Defender XDR, Microsoft Sentinel, SIEM/SOAR
                      </div>
                      <div className="data-item">
                        📌 6: Information Protection Solutions - Microsoft
                        Purview, Data classification, Encryption
                      </div>
                      <div className="data-item">
                        📌 7: Security Operations and Incident Response - SOC
                        design, Threat hunting, Incident management
                      </div>
                      <div className="data-item">
                        📌 8: Governance, Risk, and Compliance - Regulatory
                        frameworks, Compliance management, Risk assessment
                      </div>
                      <div className="data-item">
                        📌 9: Endpoint and Application Security - Microsoft
                        Intune, Defender for Endpoint, App governance
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and SC-100 Certification
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
                          This expert-level course teaches you how to design and
                          implement comprehensive cybersecurity solutions using
                          Microsoft security technologies. You'll learn to
                          develop security strategies, design security
                          architectures, and implement security controls across
                          Microsoft 365, Azure, and hybrid environments.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Experience with Microsoft security technologies and
                          understanding of cybersecurity concepts. Familiarity
                          with Azure AD, Microsoft Defender, and Microsoft
                          Sentinel is recommended.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Design and implement Zero Trust security
                          architectures across Microsoft platforms
                        </li>
                        <li>
                          ✅ Develop comprehensive identity and access
                          management solutions using Azure AD
                        </li>
                        <li>
                          ✅ Architect threat protection solutions using
                          Microsoft Defender suite and Sentinel
                        </li>
                        <li>
                          ✅ Design information protection and governance
                          solutions with Microsoft Purview
                        </li>
                        <li>
                          ✅ Implement security operations and incident response
                          capabilities
                        </li>
                        <li>
                          ✅ Ensure compliance with regulatory requirements
                          using Microsoft compliance tools
                        </li>
                        <li>
                          ✅ Design cloud security posture management strategies
                        </li>
                        <li>
                          ✅ Architect endpoint and application security
                          solutions
                        </li>
                        <li>
                          ✅ Develop governance, risk, and compliance frameworks
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's SC-100 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🏛️ Complete Zero Trust security architecture for
                          enterprise organizations
                        </li>
                        <li>
                          🔐 Identity security framework with Azure AD and
                          Conditional Access
                        </li>
                        <li>
                          🛡️ Threat protection solution with Microsoft Defender
                          XDR and Sentinel
                        </li>
                        <li>
                          📋 Information protection strategy with Microsoft
                          Purview
                        </li>
                        <li>
                          🚨 Security operations center (SOC) design with
                          incident response playbooks
                        </li>
                        <li>
                          📊 Compliance and governance framework for regulatory
                          requirements
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on security design exercises and case
                        studies:
                      </p>
                      <ul>
                        <li>
                          Module 1: Cybersecurity Architecture Fundamentals
                        </li>
                        <li>Module 2: Zero Trust Security Strategies</li>
                        <li>Module 3: Identity and Access Management</li>
                        <li>Module 4: Cloud Security Posture Management</li>
                        <li>Module 5: Threat Protection Architectures</li>
                        <li>Module 6: Information Protection Solutions</li>
                        <li>
                          Module 7: Security Operations and Incident Response
                        </li>
                        <li>Module 8: Governance, Risk, and Compliance</li>
                        <li>Module 9: Endpoint and Application Security</li>
                        <li>Module 10: Capstone Architecture Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with security architecture case
                        studies and hands-on labs using Microsoft security
                        tools. Includes access to Microsoft security resources
                        for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified:
                        Cybersecurity Architect Expert (SC-100) exam. Includes
                        one free exam attempt voucher and practice tests.
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
                          🔹 <strong>Cybersecurity Architect:</strong> Design
                          comprehensive security solutions for organizations.
                          Average salary: $140,000 - $185,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Security Architect:</strong>{" "}
                          Specialize in securing cloud environments. Average
                          salary: $145,000 - $190,000
                        </li>
                        <li>
                          🔹 <strong>Security Consultant:</strong> Advise
                          organizations on security strategies and
                          implementations. Average salary: $135,000 - $180,000
                        </li>
                        <li>
                          🔹{" "}
                          <strong>
                            Chief Information Security Officer (CISO):
                          </strong>{" "}
                          Lead organizational security programs. Average salary:
                          $160,000 - $220,000
                        </li>
                        <li>
                          🔹 <strong>Security Solutions Engineer:</strong>{" "}
                          Implement advanced security solutions. Average salary:
                          $130,000 - $175,000
                        </li>
                        <li>
                          🔹 <strong>Zero Trust Architect:</strong> Specialize
                          in designing Zero Trust security frameworks. Average
                          salary: $150,000 - $195,000
                        </li>
                      </ul>
                      <p>
                        Cybersecurity architects are among the most sought-after
                        professionals in the industry, with excellent career
                        prospects and compensation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Microsoft Cybersecurity Architect (SC-100)</h1>
                <p>
                  Master the skills to design and implement cutting-edge
                  cybersecurity solutions using Microsoft's security
                  technologies. This expert-level course covers security
                  architecture principles, Zero Trust strategies, threat
                  protection, and compliance frameworks. You'll learn to
                  architect comprehensive security solutions that protect
                  organizations from modern threats while preparing for the
                  SC-100 certification exam.
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
                  This course prepares you for the Microsoft Certified:
                  Cybersecurity Architect Expert certification (SC-100). The
                  certification validates your ability to design and implement
                  security solutions that protect an organization's
                  infrastructure, data, applications, and users. This is the
                  highest-level security certification in Microsoft's portfolio.
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
                  The course is 12 weeks long, with 70 hours of instructor-led
                  training and 90+ hours of security architecture labs and case
                  studies. Includes access to Microsoft security tools and
                  resources.
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
                  Benefits of completing this Cybersecurity Architect course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master Microsoft security architecture principles at
                      expert level
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for SC-100 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand cybersecurity architect roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Microsoft security tools
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
                  Microsoft Defender XDR (Defender for Endpoint, Defender for
                  Identity, Defender for Office 365, Defender for Cloud Apps),
                  Microsoft Sentinel, Azure Active Directory, Microsoft Purview
                  (Information Protection, Data Lifecycle Management, Compliance
                  Manager), Microsoft Intune, Azure Policy, Microsoft Defender
                  for Cloud, Microsoft Cloud App Security, Microsoft 365
                  Defender, and other Microsoft security technologies.
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
                  The course fee is Ghc 9,500. You will be required to pay Ghc
                  3,500 for the first installment and Ghc 3,000 for each
                  additional month.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Course duration:</b> 3 months, with classes held 3 days a
                    week (Monday to Wednesday). Students will work on security
                    architecture projects from Thursday to Sunday.
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
                    <b>Additional Notes:</b> Students will receive access to
                    Microsoft security tools for hands-on labs. Experience with
                    security concepts and Microsoft security technologies is
                    recommended.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Monday to Wednesday (9 hours/week)
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-time">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Class Time:</b> 8:00 AM - 11:00 AM (Morning Batch) or
                    1:00 PM - 4:00 PM (Afternoon Batch)
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
