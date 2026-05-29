"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import SecurityImage from "../images/AWS-Security-Specialty.webp";
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
            <Link href="/aws">Aws</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>AWS Security Specialty</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            <div className="item">
              <div className="image-container">
                <Image
                  src={SecurityImage}
                  alt="AWS Certified Security Specialty"
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
                      <h3>🔐 AWS Certified Security Specialty</h3>
                      <p>
                        This course provides deep knowledge on securing AWS
                        environments, covering identity management, data
                        protection, monitoring, and incident response.
                      </p>
                      <div className="data-item">
                        📌 1: Identity and Access Management (IAM) - Users,
                        Groups, Roles, Policies, MFA, Federation
                      </div>
                      <div className="data-item">
                        📌 2: Data Protection & Encryption - KMS, CloudHSM, S3
                        Encryption, SSL/TLS, Secrets Manager
                      </div>
                      <div className="data-item">
                        📌 3: Security Logging & Monitoring - CloudTrail,
                        CloudWatch, GuardDuty, Security Hub, AWS Config
                      </div>
                      <div className="data-item">
                        📌 4: Infrastructure Security - VPC Security, Security
                        Groups, NACLs, WAF, Shield, Firewall Manager
                      </div>
                      <div className="data-item">
                        📌 5: Incident Response & Compliance - Detective,
                        Forensics, Compliance Frameworks, AWS Artifact
                      </div>
                      <div className="data-item">
                        📌 6: Network Security - PrivateLink, VPC Endpoints,
                        VPN, Direct Connect, Network Firewall
                      </div>
                      <div className="data-item">
                        📌 7: Application Security - WAF, AWS Shield Advanced,
                        Cognito, API Gateway Security
                      </div>
                      <div className="data-item">
                        📌 8: Security Automation - AWS Lambda Security, Config
                        Rules, EventBridge, Security Hub Automations
                      </div>
                      <div className="data-item">
                        📌 9: Compliance & Governance - AWS Organizations, SCPs,
                        Control Tower, Audit Manager, Artifact
                      </div>
                      <div className="data-item">
                        📌 10: Threat Detection & Analysis - Amazon Detective,
                        GuardDuty Findings, Macie for PII Data
                      </div>
                      <div className="data-item">
                        📌 11: Penetration Testing & Vulnerability Management -
                        Amazon Inspector, Third-party Tools
                      </div>
                      <div className="data-item">
                        📌 12: Disaster Recovery & Business Continuity - Backup,
                        Disaster Recovery Planning, RPO/RTO
                      </div>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 2 ? "show" : ""}`}
                  >
                    <div className="course-data">
                      <h3>🎯 Learning Goals</h3>
                      <ul>
                        <li>✅ Configure secure access controls</li>
                        <li>✅ Implement logging and threat detection</li>
                        <li>
                          ✅ Use encryption to protect data at rest and in
                          transit
                        </li>
                        <li>
                          ✅ Manage incidents and perform risk assessments
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🛡️ Secure AWS account structures using Organizations
                        </li>
                        <li>🔍 Implement GuardDuty, Macie, and CloudTrail</li>
                        <li>
                          💾 Encrypt data with KMS and enforce least privilege
                          with IAM
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
                        <li>🔹 Cloud Security Engineer</li>
                        <li>🔹 Security Architect (Cloud)</li>
                        <li>🔹 Compliance Officer (Cloud Systems)</li>
                        <li>🔹 DevSecOps Engineer</li>
                      </ul>
                      <p>
                        Ideal for professionals aiming to ensure secure
                        operations within AWS infrastructure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="text">
                <h1>AWS Certified Security Specialty</h1>
                <p>
                  Learn to secure AWS services, implement encryption, monitor
                  cloud systems, and enforce compliance policies.
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
                  Proves your ability to secure AWS environments and apply best
                  practices in cloud security.
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
                  10 weeks of training including labs and hands-on security
                  exercises
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
                      Learn cloud security fundamentals
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Apply practical encryption and compliance techniques
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Prepare for AWS security exams and real-world roles
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
                  AWS IAM, CloudTrail, GuardDuty, Macie, Shield, WAF, KMS, VPC
                  security, compliance tools.
                </p>
              </div>
            </div>

            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 5,850</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 5,850. You will be required to pay Ghc
                  2,000 for the first installment and Ghc 1,925 for each
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
                    week (Monday to Wednesday).
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
                    laptop.
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
                    12:00 PM - 3:00 PM (Afternoon Batch)
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
