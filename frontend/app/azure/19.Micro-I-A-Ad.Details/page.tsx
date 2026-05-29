"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import IdentityImage from "../images/11.identity-and-access-administrator-associate-SC-300.png";
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
          <span>Microsoft Identity and Access Administrator</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={IdentityImage}
                  alt="Microsoft Identity and Access Administrator"
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
                        🔑 Microsoft Identity and Access Administrator (SC-300)
                      </h3>
                      <p>
                        This comprehensive course teaches you to design,
                        implement, and manage identity and access solutions
                        using Microsoft Azure Active Directory. You'll learn to
                        secure identities, implement authentication methods,
                        configure access policies, and manage identity
                        governance.
                      </p>
                      <div className="data-item">
                        📌 1: Azure AD Fundamentals - Tenant configuration,
                        Identity models, Licensing
                      </div>
                      <div className="data-item">
                        📌 2: User and Group Management - User provisioning,
                        Group management, Administrative units
                      </div>
                      <div className="data-item">
                        📌 3: Authentication Methods - Password protection, MFA,
                        Self-service password reset
                      </div>
                      <div className="data-item">
                        📌 4: Conditional Access Policies - Policy design,
                        Conditions, Grant controls, Session controls
                      </div>
                      <div className="data-item">
                        📌 5: Identity Protection - Risk detection, Risk
                        policies, Investigation, Remediation
                      </div>
                      <div className="data-item">
                        📌 6: Privileged Identity Management - Just-in-time
                        access, Time-bound access, Approval workflows
                      </div>
                      <div className="data-item">
                        📌 7: Access Reviews and Governance - Entitlement
                        management, Access certifications, Compliance
                      </div>
                      <div className="data-item">
                        📌 8: External Identities - B2B collaboration, B2C
                        tenants, Identity providers
                      </div>
                      <div className="data-item">
                        📌 9: Enterprise Application Management - App
                        registration, SSO configuration, App provisioning
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and SC-300 Certification
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
                          This comprehensive course teaches you to design,
                          implement, and manage identity and access solutions
                          using Microsoft Azure Active Directory. You'll learn
                          to secure identities, implement authentication
                          methods, configure access policies, and manage
                          identity governance.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of security concepts and
                          familiarity with cloud services. Experience with
                          identity systems is helpful but not required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Implement Azure AD identity solutions including
                          tenants and directories
                        </li>
                        <li>
                          ✅ Manage users, groups, and external identities with
                          proper governance
                        </li>
                        <li>
                          ✅ Configure authentication methods including MFA and
                          passwordless
                        </li>
                        <li>
                          ✅ Implement Conditional Access policies for granular
                          access control
                        </li>
                        <li>
                          ✅ Manage identity protection with risk-based policies
                          and remediation
                        </li>
                        <li>
                          ✅ Configure privileged identity management for
                          just-in-time access
                        </li>
                        <li>
                          ✅ Set up access reviews and entitlement management
                          for compliance
                        </li>
                        <li>
                          ✅ Manage enterprise applications with SSO and
                          provisioning
                        </li>
                        <li>✅ Implement B2B and B2C identity solutions</li>
                        <li>
                          ✅ Prepare for Microsoft's SC-300 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🔐 Complete identity security framework with Azure AD
                          and Conditional Access
                        </li>
                        <li>
                          🔄 User provisioning and lifecycle management solution
                        </li>
                        <li>
                          ⚡ Privileged access management with PIM and access
                          reviews
                        </li>
                        <li>
                          🌐 External collaboration solution with B2B and B2C
                        </li>
                        <li>
                          📋 Enterprise application SSO implementation with
                          provisioning
                        </li>
                        <li>
                          🚨 Identity protection and risk remediation workflow
                        </li>
                        <li>📊 Access governance and compliance dashboard</li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on identity management implementations:
                      </p>
                      <ul>
                        <li>Module 1: Azure AD Fundamentals</li>
                        <li>Module 2: Identity Management</li>
                        <li>Module 3: Authentication Methods</li>
                        <li>Module 4: Access Policies</li>
                        <li>Module 5: Identity Protection</li>
                        <li>Module 6: Privileged Access</li>
                        <li>Module 7: Identity Governance</li>
                        <li>Module 8: External Identities</li>
                        <li>Module 9: Enterprise Applications</li>
                        <li>Module 10: Implementation Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on labs in live Azure
                        AD environment. Includes access to identity resources
                        for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: Identity
                        and Access Administrator Associate (SC-300) exam.
                        Includes one free exam attempt voucher and practice
                        tests.
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
                          🔹 <strong>Identity Administrator:</strong> Manage
                          identity solutions in Azure AD. Average salary:
                          $90,000 - $130,000
                        </li>
                        <li>
                          🔹 <strong>Access Management Specialist:</strong>{" "}
                          Implement access control policies. Average salary:
                          $88,000 - $125,000
                        </li>
                        <li>
                          🔹 <strong>Security Engineer (Identity):</strong>{" "}
                          Secure identity infrastructure. Average salary:
                          $100,000 - $145,000
                        </li>
                        <li>
                          🔹 <strong>IAM Consultant:</strong> Design identity
                          solutions for organizations. Average salary: $105,000
                          - $150,000
                        </li>
                        <li>
                          🔹 <strong>Identity Governance Analyst:</strong>{" "}
                          Manage access reviews and compliance. Average salary:
                          $85,000 - $120,000
                        </li>
                        <li>
                          🔹 <strong>Privileged Access Specialist:</strong>{" "}
                          Implement PIM and JIT access. Average salary: $95,000
                          - $135,000
                        </li>
                      </ul>
                      <p>
                        Identity and access management professionals are
                        essential as organizations move to zero-trust security
                        models.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Microsoft Identity and Access Administrator (SC-300)</h1>
                <p>
                  Master the skills to design, implement, and manage identity
                  and access solutions using Microsoft Azure Active Directory.
                  This comprehensive course covers all aspects of modern
                  identity management including authentication, authorization,
                  conditional access, and identity governance while preparing
                  for the SC-300 certification exam.
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
                  This course prepares you for the Microsoft Certified: Identity
                  and Access Administrator Associate certification (SC-300),
                  validating your ability to implement identity management
                  solutions. This certification is essential for identity
                  professionals working with Microsoft cloud services.
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
                  The course is 10 weeks long, with 50 hours of instructor-led
                  training and 70+ hours of hands-on labs and projects. Includes
                  access to Azure AD premium features for practice.
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
                  Benefits of completing this Identity Administrator course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Azure AD and identity solutions
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for SC-300 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand identity management roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of real-world identity implementations
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
                  Azure Active Directory (Azure AD), Conditional Access,
                  Multi-Factor Authentication (MFA), Passwordless
                  Authentication, Identity Protection, Privileged Identity
                  Management (PIM), Entitlement Management, Access Reviews, B2B
                  Collaboration, B2C Identity, Application Registration,
                  Enterprise Applications, Single Sign-On (SSO), Application
                  Provisioning, Identity Governance, and Microsoft Identity
                  Platform.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 7,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 7,500. You will be required to pay Ghc
                  2,500 for the first installment and Ghc 2,500 for each
                  additional month.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Course duration:</b> 2.5 months intensive program, with
                    classes 3 days a week (Monday to Wednesday). Identity
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
                    Azure AD resources including premium features. Basic
                    security concepts understanding recommended.
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
