"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import AzSecurityImage from "../images/azure-security-engineer-associate.png";
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
            <Link href="/microsoftAz500">Cybersecurity</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Microsoft AZ-500: Azure Security Engineer</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={AzSecurityImage}
                  alt="Microsoft AZ-500: Azure Security Engineer"
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
                      <h3>🛡️ Microsoft AZ-500: Azure Security Engineer</h3>
                      <p>
                        This intensive training prepares you for the Microsoft
                        AZ-500 certification exam, equipping you with skills to
                        implement security controls, maintain security posture,
                        and protect data, applications, and networks in cloud
                        and hybrid environments.
                      </p>
                      <div className="data-item">
                        📌 1: Azure Security Fundamentals - Security concepts,
                        Shared responsibility, Defense in depth
                      </div>
                      <div className="data-item">
                        📌 2: Identity and Access Management - Azure AD,
                        Conditional Access, MFA, Identity Protection
                      </div>
                      <div className="data-item">
                        📌 3: Platform Protection - Network security, NSGs,
                        Azure Firewall, DDoS Protection, WAF
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
                        📌 6: Hybrid Security - Hybrid identity, Azure Arc,
                        Hybrid networking security
                      </div>
                      <div className="data-item">
                        📌 7: Security Monitoring and Threat Protection - Azure
                        Sentinel, Threat intelligence, SIEM/SOAR
                      </div>
                      <div className="data-item">
                        📌 8: Security Governance and Compliance - Azure Policy,
                        RBAC, Security benchmarks, Compliance controls
                      </div>
                      <div className="data-item">
                        📌 9: Container and Kubernetes Security - AKS security,
                        Container registry, Defender for containers
                      </div>
                      <div className="data-item">
                        📌 10: AZ-500 Certification Preparation - Exam
                        strategies, Practice tests, Study resources
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
                          This intensive training prepares you for the Microsoft
                          AZ-500 certification exam, equipping you with skills
                          to implement security controls, maintain security
                          posture, and protect data, applications, and networks
                          in cloud and hybrid environments.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of Microsoft Azure and security
                          concepts. Experience with cloud services recommended.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Implement Azure security controls across identity,
                          network, and data layers
                        </li>
                        <li>
                          ✅ Configure and manage identity and access with Azure
                          AD, Conditional Access, and MFA
                        </li>
                        <li>
                          ✅ Secure data and applications using Azure Key Vault,
                          encryption, and security best practices
                        </li>
                        <li>
                          ✅ Manage security operations with Microsoft Defender
                          for Cloud and security incident response
                        </li>
                        <li>
                          ✅ Implement platform protection including network
                          security, firewalls, and DDoS protection
                        </li>
                        <li>
                          ✅ Configure security policies and governance with
                          Azure Policy and RBAC
                        </li>
                        <li>
                          ✅ Deploy hybrid security solutions using Azure Arc
                          and hybrid identity
                        </li>
                        <li>
                          ✅ Implement threat protection with Azure Sentinel and
                          SIEM/SOAR capabilities
                        </li>
                        <li>
                          ✅ Secure container and Kubernetes workloads in AKS
                        </li>
                        <li>
                          ✅ Prepare for and pass the AZ-500 certification exam
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
                          Defender for Cloud
                        </li>
                        <li>
                          ⚡ Security incident response plan with Azure Sentinel
                        </li>
                        <li>
                          🔑 Key management system with Azure Key Vault and
                          encryption
                        </li>
                        <li>
                          📋 Security governance framework with Azure Policy and
                          initiatives
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>This comprehensive 10-module program covers:</p>
                      <ul>
                        <li>Module 1: Azure Security Fundamentals</li>
                        <li>Module 2: Identity and Access</li>
                        <li>Module 3: Platform Protection</li>
                        <li>Module 4: Security Operations</li>
                        <li>Module 5: Data/App Security</li>
                        <li>Module 6: Hybrid Security</li>
                        <li>Module 7: Threat Protection</li>
                        <li>Module 8: Governance & Compliance</li>
                        <li>Module 9: Container Security</li>
                        <li>Module 10: Exam Preparation</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Hands-on labs using Azure Portal with real-world
                        security scenarios and attack simulations. Includes
                        access to Azure resources for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for Microsoft Certified: Azure Security
                        Engineer Associate (AZ-500) certification. Includes
                        practice tests and exam preparation materials.
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
                          🔹 <strong>Azure Security Engineer:</strong> Implement
                          security controls and threat protection. Average
                          salary: $105,000 - $150,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Security Specialist:</strong> Protect
                          cloud environments and data. Average salary: $110,000
                          - $155,000
                        </li>
                        <li>
                          🔹 <strong>Security Operations Analyst:</strong>{" "}
                          Monitor and respond to security threats. Average
                          salary: $95,000 - $135,000
                        </li>
                        <li>
                          🔹 <strong>Identity and Access Administrator:</strong>{" "}
                          Manage secure access to resources. Average salary:
                          $90,000 - $130,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Security Architect:</strong> Design
                          secure cloud solutions. Average salary: $125,000 -
                          $170,000
                        </li>
                        <li>
                          🔹 <strong>DevSecOps Engineer:</strong> Integrate
                          security into DevOps pipelines. Average salary:
                          $115,000 - $160,000
                        </li>
                      </ul>
                      <p>
                        Azure security professionals are in extremely high
                        demand as organizations prioritize cloud security and
                        compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Microsoft AZ-500: Azure Security Engineer</h1>
                <p>
                  Become a certified Azure Security Engineer with this
                  comprehensive training covering all aspects of Microsoft Azure
                  security. Learn to implement security controls, threat
                  protection, and governance in cloud environments while
                  preparing for the AZ-500 certification exam.
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
                  Prepares for Microsoft Certified: Azure Security Engineer
                  Associate (AZ-500) certification - validates your ability to
                  implement security controls, maintain security posture, and
                  protect data, applications, and networks in Azure.
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
                  8-week intensive program with 50 instructor-led hours and 70+
                  lab hours, including real-world security scenarios and attack
                  simulations.
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
                  Key benefits of this AZ-500 training:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on Azure security labs with real-world scenarios
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master identity and access management with Azure AD
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn threat protection implementation with Defender and
                      Sentinel
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Gain comprehensive certification exam preparation
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Develop real-world security solutions for production
                      environments
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
                  Microsoft Defender for Cloud, Azure Sentinel, Azure Active
                  Directory, Conditional Access, Multi-Factor Authentication,
                  Azure Key Vault, Azure Policy, Azure Firewall, Network
                  Security Groups, DDoS Protection, Azure WAF, Azure Arc,
                  Microsoft Defender for Identity, and other Azure security
                  tools.
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
                  Course fee: Ghc 7,500 payable as Ghc 3,000 initial deposit and
                  Ghc 2,250 monthly installments.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Schedule:</b> 8 weeks, 4 sessions/week (Mon/Wed/Fri/Sat)
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
                    <b>Requirements:</b> Laptop with internet access. Azure
                    subscription recommended (free tier available). Basic Azure
                    experience helpful but not required.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Monday, Wednesday, Friday, Saturday
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-time">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Times:</b> Weekdays 6PM-9PM, Saturday 10AM-1PM (choose
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
                  <strong>Exam voucher:</strong> Includes discount voucher for
                  AZ-500 certification exam and free practice tests.
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
