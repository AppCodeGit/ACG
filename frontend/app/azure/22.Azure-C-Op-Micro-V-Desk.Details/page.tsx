"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import AVDSpecialtyImage from "../images/14.azure-virtual-desktop-specialty.AZ-140.png";
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
          <span>Configuring and Operating Microsoft Azure Virtual Desktop</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={AVDSpecialtyImage}
                  alt="Configuring and Operating Microsoft Azure Virtual Desktop"
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
                        🖥️ Configuring and Operating Microsoft Azure Virtual
                        Desktop (AZ-140)
                      </h3>
                      <p>
                        This comprehensive course teaches you how to configure,
                        deploy, and manage Microsoft Azure Virtual Desktop (AVD)
                        environments. You'll learn to plan AVD architectures,
                        implement and configure host pools, manage access and
                        security, optimize user experiences, and automate
                        administrative tasks.
                      </p>
                      <div className="data-item">
                        📌 1: Introduction to Azure Virtual Desktop (AVD) -
                        Architecture, Components, Licensing
                      </div>
                      <div className="data-item">
                        📌 2: Planning and Designing AVD Architecture - Capacity
                        planning, Network design, Identity integration
                      </div>
                      <div className="data-item">
                        📌 3: Implementing AVD Infrastructure - Host pools,
                        Workspaces, Session hosts
                      </div>
                      <div className="data-item">
                        📌 4: Managing Access and Security - Azure AD
                        integration, RBAC, Conditional Access
                      </div>
                      <div className="data-item">
                        📌 5: Configuring User Environments and Applications -
                        FSLogix, MSIX app attach, Application delivery
                      </div>
                      <div className="data-item">
                        📌 6: Monitoring and Maintaining AVD - Azure Monitor,
                        Log Analytics, Performance optimization
                      </div>
                      <div className="data-item">
                        📌 7: Automating AVD Management - PowerShell, ARM
                        templates, Azure Automation
                      </div>
                      <div className="data-item">
                        📌 8: Troubleshooting and Optimization - Connection
                        issues, Performance bottlenecks, User experience
                      </div>
                      <div className="data-item">
                        📌 9: Networking and Storage - Network configuration,
                        Storage accounts, Profile management
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and AZ-140 Certification
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
                          configure, deploy, and manage Microsoft Azure Virtual
                          Desktop (AVD) environments. You'll learn to plan AVD
                          architectures, implement and configure host pools,
                          manage access and security, optimize user experiences,
                          and automate administrative tasks.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of Azure administration and
                          virtualization concepts. Familiarity with Windows
                          Server and Active Directory is recommended.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Plan and design Azure Virtual Desktop architectures
                          for various scenarios
                        </li>
                        <li>
                          ✅ Implement and configure AVD host pools, session
                          hosts, and workspaces
                        </li>
                        <li>
                          ✅ Manage access and security for AVD deployments
                          using Azure AD and RBAC
                        </li>
                        <li>
                          ✅ Configure user environments and application
                          delivery with FSLogix and MSIX
                        </li>
                        <li>
                          ✅ Monitor, maintain, and troubleshoot AVD
                          environments
                        </li>
                        <li>
                          ✅ Automate AVD management tasks using PowerShell and
                          ARM templates
                        </li>
                        <li>
                          ✅ Optimize network and storage configurations for AVD
                        </li>
                        <li>
                          ✅ Implement profile management solutions with FSLogix
                        </li>
                        <li>
                          ✅ Configure and manage Windows 10/11 Enterprise
                          multi-session environments
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's AZ-140 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🏗️ Complete Azure Virtual Desktop environment with
                          host pools and workspaces
                        </li>
                        <li>
                          🔐 Secure AVD deployment with Azure AD integration and
                          Conditional Access
                        </li>
                        <li>
                          📁 FSLogix profile container solution for persistent
                          user profiles
                        </li>
                        <li>📦 Application delivery with MSIX app attach</li>
                        <li>
                          📊 Monitoring solution with Azure Monitor and Log
                          Analytics
                        </li>
                        <li>
                          ⚡ Automated deployment scripts using PowerShell and
                          ARM templates
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on labs using Azure Virtual Desktop:
                      </p>
                      <ul>
                        <li>Module 1: AVD Fundamentals</li>
                        <li>Module 2: Planning AVD Architecture</li>
                        <li>Module 3: Implementing AVD Infrastructure</li>
                        <li>Module 4: Access and Security Management</li>
                        <li>Module 5: User Environments and Applications</li>
                        <li>Module 6: Monitoring and Maintenance</li>
                        <li>Module 7: Automation</li>
                        <li>Module 8: Troubleshooting and Optimization</li>
                        <li>Module 9: Networking and Storage</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on labs in live Azure
                        environment. Includes access to Azure resources for
                        practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: Azure
                        Virtual Desktop Specialty (AZ-140) exam. Includes one
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
                          🔹{" "}
                          <strong>Azure Virtual Desktop Administrator:</strong>{" "}
                          Design, implement, and manage AVD environments.
                          Average salary: $85,000 - $125,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Desktop Engineer:</strong> Specialize
                          in virtual desktop infrastructure in cloud
                          environments. Average salary: $90,000 - $130,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Administrator:</strong> Manage and
                          optimize cloud-based desktop solutions. Average
                          salary: $82,000 - $120,000
                        </li>
                        <li>
                          🔹 <strong>VDI Specialist:</strong> Implement and
                          maintain virtual desktop infrastructure. Average
                          salary: $88,000 - $128,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Solutions Architect:</strong> Design
                          comprehensive cloud workspace solutions. Average
                          salary: $110,000 - $155,000
                        </li>
                        <li>
                          🔹 <strong>Remote Work Solutions Specialist:</strong>{" "}
                          Implement and manage remote work technologies. Average
                          salary: $86,000 - $124,000
                        </li>
                      </ul>
                      <p>
                        Azure Virtual Desktop specialists are in high demand as
                        organizations adopt remote and hybrid work models.
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
                  Configuring and Operating Microsoft Azure Virtual Desktop
                  (AZ-140)
                </h1>
                <p>
                  Master the skills to deploy, configure, and manage Microsoft
                  Azure Virtual Desktop (AVD) environments. This comprehensive
                  course covers all aspects of AVD implementation including
                  architecture planning, host pool configuration, security
                  management, user experience optimization, and automation.
                  You'll gain hands-on experience with Azure's virtual desktop
                  solutions while preparing for the AZ-140 certification exam.
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
                  Virtual Desktop Specialty certification (AZ-140). The
                  certification validates your ability to plan, deliver, and
                  manage virtual desktop experiences and remote apps for any
                  device on Azure.
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
                  Benefits of completing this Azure Virtual Desktop course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Azure Virtual Desktop
                      implementation
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for AZ-140 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand cloud desktop administration roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of real-world AVD deployments
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
                  Azure Virtual Desktop (AVD), Azure Active Directory, Azure
                  Monitor, Azure Storage, Azure Networking (VPN, ExpressRoute),
                  Windows 10/11 Enterprise Multi-session, Windows Server,
                  FSLogix, MSIX app attach, Azure Files, Azure NetApp Files,
                  PowerShell, ARM templates, Azure Automation, and other related
                  Azure services.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 6,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 6,500. You will be required to pay Ghc
                  2,500 for the first installment and Ghc 2,000 for each
                  additional month.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Course duration:</b> 2.5 months, with classes held 3 days
                    a week (Monday to Wednesday). Students will work on projects
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
                    Azure Virtual Desktop resources for hands-on labs. Basic
                    knowledge of Azure administration is recommended.
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
