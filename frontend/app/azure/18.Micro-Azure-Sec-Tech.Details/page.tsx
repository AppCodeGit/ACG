"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import SecurityImage from "../images/10. azure-security-engineer-associate AZ-500.png";
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
          <span>Microsoft Azure Security Technologies</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={SecurityImage}
                  alt="Microsoft Azure Security Technologies"
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
                      <h3>🛡️ Microsoft Azure Security Technologies (AZ-500)</h3>
                      <p>
                        This comprehensive course teaches you to implement
                        security controls, maintain security posture, and
                        identify and remediate vulnerabilities using Azure
                        security technologies. You'll learn to manage identity
                        and access, protect data and networks, and leverage
                        Azure security tools.
                      </p>
                      <div className="data-item">
                        📌 1: Azure Security Fundamentals - Security concepts,
                        Shared responsibility model, Defense in depth
                      </div>
                      <div className="data-item">
                        📌 2: Identity and Access Management - Azure AD,
                        Conditional Access, MFA, Identity Protection
                      </div>
                      <div className="data-item">
                        📌 3: Platform Protection - Network security, NSGs,
                        Azure Firewall, DDoS Protection
                      </div>
                      <div className="data-item">
                        📌 4: Security Operations - Microsoft Defender for
                        Cloud, Security alerts, Incident response
                      </div>
                      <div className="data-item">
                        📌 5: Data and Application Security - Key Vault, Storage
                        security, SQL security, App Security
                      </div>
                      <div className="data-item">
                        📌 6: Security Governance and Compliance - Azure Policy,
                        RBAC, Security benchmarks
                      </div>
                      <div className="data-item">
                        📌 7: Advanced Threat Protection - Microsoft Sentinel,
                        Threat intelligence, SIEM/SOAR
                      </div>
                      <div className="data-item">
                        📌 8: Container and Kubernetes Security - AKS security,
                        Container registry, Defender for containers
                      </div>
                      <div className="data-item">
                        📌 9: Compliance and Privacy - Azure compliance, Privacy
                        standards, Regulatory requirements
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and AZ-500 Certification
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
                          This comprehensive course teaches you to implement
                          security controls, maintain security posture, and
                          identify and remediate vulnerabilities using Azure
                          security technologies. You'll learn to manage identity
                          and access, protect data and networks, and leverage
                          Azure security tools.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of security concepts and
                          familiarity with Azure services. Experience with IT
                          security is helpful but not required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Implement Azure Active Directory security controls
                          including Conditional Access and Identity Protection
                        </li>
                        <li>
                          ✅ Configure network security with NSGs, ASGs, Azure
                          Firewall, and DDoS Protection
                        </li>
                        <li>
                          ✅ Manage security operations with Microsoft Defender
                          for Cloud and security alerts
                        </li>
                        <li>
                          ✅ Implement data security with Azure Key Vault,
                          encryption, and SQL security features
                        </li>
                        <li>
                          ✅ Configure security policies and governance using
                          Azure Policy and RBAC
                        </li>
                        <li>
                          ✅ Implement threat protection solutions with
                          Microsoft Sentinel
                        </li>
                        <li>
                          ✅ Monitor and respond to security incidents with
                          SIEM/SOAR capabilities
                        </li>
                        <li>
                          ✅ Secure container and Kubernetes workloads in AKS
                        </li>
                        <li>
                          ✅ Ensure compliance with Azure compliance and privacy
                          standards
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's AZ-500 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🔐 Complete identity security framework with Azure AD
                          and Conditional Access
                        </li>
                        <li>
                          🛡️ Network security architecture with Azure Firewall
                          and DDoS Protection
                        </li>
                        <li>
                          📊 Security monitoring solution with Microsoft
                          Sentinel
                        </li>
                        <li>
                          🔑 Key management system with Azure Key Vault and HSM
                        </li>
                        <li>
                          📋 Security governance framework with Azure Policy and
                          initiatives
                        </li>
                        <li>
                          ⚡ Container security implementation for AKS workloads
                        </li>
                        <li>
                          🚨 Incident response playbook with security alerts and
                          automation
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on security implementations:
                      </p>
                      <ul>
                        <li>Module 1: Azure Security Fundamentals</li>
                        <li>Module 2: Identity and Access Management</li>
                        <li>Module 3: Platform Protection</li>
                        <li>Module 4: Security Operations</li>
                        <li>Module 5: Data and Application Security</li>
                        <li>Module 6: Governance and Compliance</li>
                        <li>Module 7: Advanced Threat Protection</li>
                        <li>Module 8: Container and Kubernetes Security</li>
                        <li>Module 9: Compliance and Privacy</li>
                        <li>Module 10: Security Implementation Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on security labs in
                        live Azure environment. Includes access to security
                        resources for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: Azure
                        Security Engineer Associate (AZ-500) exam. Includes one
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
                          🔹 <strong>Azure Security Engineer:</strong> Implement
                          security controls and threat protection. Average
                          salary: $105,000 - $150,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Security Architect:</strong> Design
                          secure cloud solutions. Average salary: $125,000 -
                          $170,000
                        </li>
                        <li>
                          🔹 <strong>Security Operations Analyst:</strong>{" "}
                          Monitor and respond to security incidents. Average
                          salary: $95,000 - $135,000
                        </li>
                        <li>
                          🔹 <strong>Identity and Access Administrator:</strong>{" "}
                          Manage secure access to resources. Average salary:
                          $90,000 - $130,000
                        </li>
                        <li>
                          🔹 <strong>Compliance Specialist:</strong> Implement
                          governance and compliance policies. Average salary:
                          $88,000 - $125,000
                        </li>
                        <li>
                          🔹 <strong>DevSecOps Engineer:</strong> Integrate
                          security into DevOps pipelines. Average salary:
                          $110,000 - $155,000
                        </li>
                      </ul>
                      <p>
                        Cloud security professionals are in extremely high
                        demand as organizations prioritize protecting their
                        cloud assets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Microsoft Azure Security Technologies (AZ-500)</h1>
                <p>
                  Master the skills to secure Microsoft Azure environments and
                  protect against modern threats. This comprehensive course
                  covers all aspects of Azure security including identity
                  protection, network security, data protection, and security
                  monitoring while preparing for the AZ-500 certification exam.
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
                  This course prepares you for the Microsoft Certified: Azure
                  Security Engineer Associate certification (AZ-500), validating
                  your ability to implement security controls, maintain security
                  posture, and identify and remediate vulnerabilities. This
                  certification is essential for security professionals working
                  with Azure.
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
                  access to Azure credits for practice.
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
                  Benefits of completing this Azure Security course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Azure security tools and services
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for AZ-500 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand cloud security roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of real-world security implementations
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
                  Azure Active Directory, Conditional Access, Multi-Factor
                  Authentication (MFA), Azure AD Identity Protection, Microsoft
                  Defender for Cloud, Azure Security Center, Azure Sentinel,
                  Azure Firewall, Network Security Groups (NSG), DDoS
                  Protection, Azure Key Vault, Azure Policy, Role-Based Access
                  Control (RBAC), Microsoft Defender for Identity, Microsoft
                  Defender for Office 365, Microsoft Defender for Endpoint,
                  Azure Information Protection, and other Azure security
                  services.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 8,000</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 8,000. You will be required to pay Ghc
                  3,000 for the first installment and Ghc 2,500 for each
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
                    Azure security resources. Basic security concepts
                    understanding recommended. Includes Azure credits for
                    hands-on practice.
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
