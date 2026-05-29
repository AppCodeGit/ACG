"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import SecurityImage from "../images/3.security-compliance-and-identity-fundamentals.png";
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
          <span>Microsoft Security, Compliance, and Identity Fundamentals</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            <div className="item">
              <div className="image-container">
                <Image
                  src={SecurityImage}
                  alt="Microsoft Security, Compliance, and Identity Fundamentals"
                />
              </div>
              <div className="concept-container">
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

                <div className="content-wrapper">
                  <div
                    className={`content ${activeContent === 1 ? "show" : ""}`}
                  >
                    <div className="concept-data">
                      <h3>
                        🛡️ Microsoft Security, Compliance, and Identity
                        Fundamentals (SC-900)
                      </h3>
                      <p>
                        This course introduces core security, compliance, and
                        identity principles and Microsoft services. It provides
                        a foundational understanding of how Microsoft solutions
                        can help protect data, manage compliance, and secure
                        identities.
                      </p>
                      <div className="data-item">
                        📌 1: Core Microsoft security capabilities - Microsoft
                        Defender suite, security best practices
                      </div>
                      <div className="data-item">
                        📌 2: Compliance and trust in Microsoft - Microsoft
                        Purview, compliance manager, compliance center
                      </div>
                      <div className="data-item">
                        📌 3: Identity concepts and solutions - Microsoft Entra
                        ID, authentication, authorization, conditional access
                      </div>
                      <div className="data-item">
                        📌 4: Microsoft Entra ID - Identity management,
                        application integration, identity protection
                      </div>
                      <div className="data-item">
                        📌 5: Microsoft Defender XDR - Defender for Endpoint,
                        Office 365, Identity, Cloud Apps
                      </div>
                      <div className="data-item">
                        📌 6: Microsoft Purview - Data governance, information
                        protection, data lifecycle management
                      </div>
                      <div className="data-item">
                        📌 7: Microsoft Priva - Privacy risk management, subject
                        rights requests
                      </div>
                      <div className="data-item">
                        📌 8: Zero Trust security model - Principles and
                        implementation in Microsoft
                      </div>
                      <div className="data-item">
                        📌 9: Regulatory compliance - GDPR, ISO, NIST,
                        compliance score
                      </div>
                      <div className="data-item">
                        📌 10: Security operations - SIEM, SOAR, Microsoft
                        Sentinel basics
                      </div>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 2 ? "show" : ""}`}
                  >
                    <div className="course-data">
                      <h3>🎯 Learning Goals</h3>
                      <ul>
                        <li>
                          ✅ Understand security, compliance, and identity (SCI)
                          concepts and their importance
                        </li>
                        <li>
                          ✅ Describe Microsoft Entra ID and identity governance
                          solutions
                        </li>
                        <li>
                          ✅ Explore compliance management with Microsoft
                          Purview and compliance tools
                        </li>
                        <li>
                          ✅ Identify Microsoft Defender solutions and their use
                          cases for threat protection
                        </li>
                        <li>
                          ✅ Learn about Zero Trust security model and its
                          implementation in Microsoft
                        </li>
                        <li>
                          ✅ Understand data protection and information
                          governance with Microsoft Priva
                        </li>
                        <li>
                          ✅ Prepare for SC-900 certification exam with
                          confidence
                        </li>
                        <li>
                          ✅ Navigate Microsoft 365 compliance and security
                          centers
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🔐 Identity management strategies with Microsoft Entra
                          ID
                        </li>
                        <li>
                          🛡️ Security policies and conditional access
                          configurations
                        </li>
                        <li>
                          📋 Compliance assessments using Microsoft Compliance
                          Manager
                        </li>
                        <li>
                          📊 Data classification and labeling with Microsoft
                          Purview
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities</h3>
                      <ul>
                        <li>
                          🔹 Security Analyst (Cloud) - Monitor and respond to
                          security threats
                        </li>
                        <li>
                          🔹 Compliance Officer (Microsoft 365) - Ensure
                          regulatory compliance
                        </li>
                        <li>
                          🔹 Identity Administrator - Manage user identities and
                          access
                        </li>
                        <li>
                          🔹 Information Protection Specialist - Implement data
                          protection strategies
                        </li>
                        <li>
                          🔹 Security Operations Center (SOC) Analyst -
                          Investigate security incidents
                        </li>
                        <li>
                          🔹 IT Security Administrator - Maintain security
                          infrastructure
                        </li>
                      </ul>
                      <p>
                        This certification is ideal for professionals starting
                        their career in cloud security, compliance, or identity
                        management. It serves as a foundation for more advanced
                        security certifications.
                      </p>
                      <h4>💰 Average Salary (Entry Level):</h4>
                      <p>
                        $65,000 - $90,000 per year depending on role and
                        location
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="text">
                <h1>
                  Microsoft Security, Compliance, and Identity Fundamentals
                  (SC-900)
                </h1>
                <p>
                  Master the fundamentals of security, compliance, and identity
                  using Microsoft solutions like Entra, Defender, and Purview.
                  This course provides a comprehensive introduction to
                  Microsoft's security ecosystem and prepares you for the SC-900
                  certification exam.
                </p>
              </div>
              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>{" "}
                  Certification
                </h4>
                <p>
                  This certification proves your ability to explain and apply
                  SCI principles in Microsoft cloud environments. It validates
                  your understanding of Microsoft security, compliance, and
                  identity solutions and their implementation in real-world
                  scenarios.
                </p>
              </div>
              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>{" "}
                  Duration
                </h4>
                <p>
                  5 weeks of guided learning with practical labs and hands-on
                  exercises. Includes 35+ hours of content and real-world
                  scenarios.
                </p>
              </div>
              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>{" "}
                  Benefits
                </h4>
                <div>
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Understand Microsoft SCI ecosystem and solutions
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Prepare for SC-900 certification exam with confidence
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Gain industry-recognized certification valued by employers
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Learn Zero Trust principles and implementation
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Understand data governance and privacy compliance
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Foundation for advanced security certifications
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>{" "}
                  Technologies Covered
                </h4>
                <p>
                  Microsoft Entra ID, Entra Identity Governance, Microsoft
                  Defender XDR, Defender for Cloud, Microsoft Purview
                  Information Protection, Purview Data Lifecycle Management,
                  Microsoft Priva, Microsoft 365 Compliance Center, Microsoft
                  365 Security Center, Conditional Access, Multi-Factor
                  Authentication, Compliance Manager, and Microsoft Sentinel
                  basics.
                </p>
              </div>
            </div>

            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 3,850</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 3,850. You will be required to pay Ghc
                  1,500 for the first installment and Ghc 1,175 for each
                  additional month.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Course duration:</b> 1.5 months (5 weeks), with classes
                    held 2 days a week (Fridays and Saturdays).
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
                    <b>Additional Notes:</b> Students need to bring their own
                    laptop. Microsoft 365 trial account recommended for hands-on
                    practice.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Fridays and Saturdays (6 hours/week)
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-time">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Class Time:</b> 9:00 AM - 12:00 PM (Morning Batch) or
                    2:00 PM - 5:00 PM (Afternoon Batch)
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
                  Once payment is made, it is **non-refundable**. Students are
                  expected to carefully review the course details before making
                  a payment.
                </p>
                <p>
                  In the event of unforeseen circumstances, we reserve the right
                  to reschedule the course. However, the course will still be
                  conducted at a later date, and enrolled students will be
                  notified in advance.
                </p>
                <p>A minimum of 3 students is required to start a class.</p>
              </div>
            </div>
          </div>

          <button
            className="back-to-top"
            onClick={() => handleScrollToSection("content")}
          >
            ↑ <br /> Top
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Details;
