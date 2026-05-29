"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import WindowsServerImage from "../images/13.Administering Windows Server Hybrid Core Infrastructure.AZ-800.webp";
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
            <Link href="/Azure">Azure</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Administering Windows Server Hybrid Core Infrastructure</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={WindowsServerImage}
                  alt="Administering Windows Server Hybrid Core Infrastructure"
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
                        🖥️ Administering Windows Server Hybrid Core
                        Infrastructure (AZ-800)
                      </h3>
                      <p>
                        This comprehensive course teaches you how to administer
                        core Windows Server workloads using hybrid technologies.
                        You'll learn to deploy and manage Windows Server
                        on-premises and in Azure, implement hybrid networking,
                        secure hybrid identities, and maintain hybrid server
                        environments.
                      </p>
                      <div className="data-item">
                        📌 1: Windows Server Hybrid Administration Fundamentals
                        - Hybrid architecture, Azure integration, Management
                        tools
                      </div>
                      <div className="data-item">
                        📌 2: Deploying and Configuring Hybrid Services - Azure
                        Arc, Windows Admin Center, Azure Migrate
                      </div>
                      <div className="data-item">
                        📌 3: Managing Windows Server in Hybrid Environments -
                        Server management, Update management, Compliance
                      </div>
                      <div className="data-item">
                        📌 4: Implementing Hybrid Network Infrastructure - VPN
                        connectivity, Azure Network Adapter, DNS integration
                      </div>
                      <div className="data-item">
                        📌 5: Hybrid Identity and Access Management - Azure AD
                        Connect, Active Directory synchronization, SSO
                      </div>
                      <div className="data-item">
                        📌 6: Monitoring and Maintaining Hybrid Systems - Azure
                        Monitor, Azure Log Analytics, Performance monitoring
                      </div>
                      <div className="data-item">
                        📌 7: Disaster Recovery in Hybrid Environments - Azure
                        Site Recovery, Backup strategies, Failover planning
                      </div>
                      <div className="data-item">
                        📌 8: File Services and Storage Migration - Azure File
                        Sync, Storage migration, Data deduplication
                      </div>
                      <div className="data-item">
                        📌 9: Automation and Scripting - PowerShell, Desired
                        State Configuration, Runbooks
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and AZ-800 Certification
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
                          This comprehensive course teaches you how to
                          administer core Windows Server workloads using hybrid
                          technologies. You'll learn to deploy and manage
                          Windows Server on-premises and in Azure, implement
                          hybrid networking, secure hybrid identities, and
                          maintain hybrid server environments.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of Windows Server administration
                          and networking concepts. Familiarity with Azure is
                          helpful but not required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Deploy and configure Windows Server in hybrid
                          environments using Azure Arc and Azure Migrate
                        </li>
                        <li>
                          ✅ Implement hybrid networking solutions including VPN
                          connectivity and DNS integration
                        </li>
                        <li>
                          ✅ Manage hybrid identities using Azure AD Connect and
                          Active Directory synchronization
                        </li>
                        <li>
                          ✅ Monitor and maintain hybrid server infrastructure
                          with Azure Monitor and Log Analytics
                        </li>
                        <li>
                          ✅ Implement disaster recovery for hybrid systems
                          using Azure Site Recovery and Backup
                        </li>
                        <li>
                          ✅ Configure file services and storage migration with
                          Azure File Sync
                        </li>
                        <li>
                          ✅ Automate administrative tasks in hybrid
                          environments using PowerShell and DSC
                        </li>
                        <li>
                          ✅ Manage updates and compliance across hybrid
                          environments
                        </li>
                        <li>
                          ✅ Implement security and access control in hybrid
                          configurations
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's AZ-800 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🌐 Complete hybrid infrastructure with on-premises
                          servers and Azure integration
                        </li>
                        <li>
                          🔗 Hybrid network connectivity with VPN and Azure
                          Network Adapter
                        </li>
                        <li>
                          🔄 Identity synchronization with Azure AD Connect and
                          SSO
                        </li>
                        <li>
                          📊 Monitoring solution with Azure Monitor and Log
                          Analytics
                        </li>
                        <li>
                          💾 Disaster recovery plan with Azure Site Recovery and
                          Backup
                        </li>
                        <li>📁 Hybrid file services with Azure File Sync</li>
                        <li>⚡ Automated management scripts with PowerShell</li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on labs using Windows Server and Azure:
                      </p>
                      <ul>
                        <li>Module 1: Hybrid Administration Fundamentals</li>
                        <li>Module 2: Hybrid Service Deployment</li>
                        <li>Module 3: Windows Server Management</li>
                        <li>Module 4: Hybrid Networking</li>
                        <li>Module 5: Identity and Access Management</li>
                        <li>Module 6: System Monitoring</li>
                        <li>Module 7: Disaster Recovery</li>
                        <li>Module 8: File Services and Storage</li>
                        <li>Module 9: Automation and Scripting</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on labs in hybrid
                        environments. Includes access to Azure and on-premises
                        resources for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: Windows
                        Server Hybrid Administrator Associate (AZ-800) exam.
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
                          🔹{" "}
                          <strong>Windows Server Hybrid Administrator:</strong>{" "}
                          Manage and maintain hybrid Windows Server
                          environments. Average salary: $85,000 - $125,000
                        </li>
                        <li>
                          🔹{" "}
                          <strong>Cloud Infrastructure Administrator:</strong>{" "}
                          Administer hybrid cloud infrastructure. Average
                          salary: $90,000 - $130,000
                        </li>
                        <li>
                          🔹 <strong>Systems Administrator (Hybrid):</strong>{" "}
                          Support hybrid IT environments. Average salary:
                          $80,000 - $115,000
                        </li>
                        <li>
                          🔹 <strong>Network Administrator (Hybrid):</strong>{" "}
                          Implement and maintain hybrid networking solutions.
                          Average salary: $88,000 - $128,000
                        </li>
                        <li>
                          🔹 <strong>IT Infrastructure Specialist:</strong>{" "}
                          Design and implement hybrid infrastructure solutions.
                          Average salary: $95,000 - $135,000
                        </li>
                        <li>
                          🔹 <strong>Hybrid Cloud Engineer:</strong> Manage
                          hybrid server workloads across on-premises and Azure.
                          Average salary: $92,000 - $140,000
                        </li>
                      </ul>
                      <p>
                        Hybrid infrastructure professionals are essential as
                        organizations maintain both on-premises and cloud
                        environments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>
                  Administering Windows Server Hybrid Core Infrastructure
                  (AZ-800)
                </h1>
                <p>
                  Master the skills to deploy, configure, and manage Windows
                  Server in hybrid environments. This comprehensive course
                  covers all aspects of hybrid administration including identity
                  management, networking, monitoring, and disaster recovery.
                  You'll gain hands-on experience with both on-premises and
                  cloud-based Windows Server administration while preparing for
                  the AZ-800 certification exam.
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
                  This course prepares you for the Microsoft Certified: Windows
                  Server Hybrid Administrator Associate certification (AZ-800).
                  The certification validates your ability to administer Windows
                  Server in hybrid environments, including both on-premises and
                  Azure-integrated services. This certification is essential for
                  IT professionals managing modern Windows Server environments.
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
                  training and 70+ hours of hands-on labs and projects. Includes
                  access to Azure credits for hybrid practice.
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
                  Benefits of completing this Windows Server Hybrid
                  Administration course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with hybrid Windows Server
                      environments
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for AZ-800 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand hybrid administration roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Access to Azure and on-premises resources for practical
                      learning
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
                  Windows Server 2022, Windows Server 2019, Azure Arc, Azure AD
                  Connect, Azure Network Adapter, Azure Monitor, Azure Log
                  Analytics, Azure Site Recovery, Azure Backup, Azure File Sync,
                  Windows Admin Center, PowerShell, Desired State Configuration
                  (DSC), Azure Migrate, DNS integration, and other hybrid
                  administration tools.
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
                    <b>Course duration:</b> 3 months, with classes held 3 days a
                    week (Monday to Wednesday). Students will work on projects
                    and labs from Thursday to Sunday.
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
                    hybrid environment resources for hands-on labs. Basic
                    Windows Server knowledge is recommended. Includes Azure
                    credits for practice.
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
