"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import DatabaseImage from "../images/6.azure-database-administrator-associate-DP-300.webp";
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
          <span>Administering Relational Databases on Microsoft Azure</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={DatabaseImage}
                  alt="Administering Relational Databases on Microsoft Azure"
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
                        🗄️ Administering Relational Databases on Microsoft Azure
                        (DP-300)
                      </h3>
                      <p>
                        This comprehensive course teaches you how to administer
                        and optimize relational databases on Microsoft Azure.
                        You'll learn to deploy, configure, secure, monitor, and
                        troubleshoot Azure SQL Database, Azure Database for
                        MySQL, and Azure Database for PostgreSQL solutions.
                      </p>
                      <div className="data-item">
                        📌 1: Azure SQL Database Fundamentals - Deployment
                        models, Service tiers, DTU/vCore purchasing models
                      </div>
                      <div className="data-item">
                        📌 2: Provisioning and Configuring Azure SQL Databases -
                        Single databases, Elastic pools, Managed instances
                      </div>
                      <div className="data-item">
                        📌 3: Security and Compliance Management -
                        Authentication, Authorization, Azure AD integration,
                        TDE, Always Encrypted
                      </div>
                      <div className="data-item">
                        📌 4: Performance Monitoring and Tuning - Query
                        Performance Insight, Intelligent Insights, Index tuning
                      </div>
                      <div className="data-item">
                        📌 5: High Availability and Disaster Recovery - Active
                        geo-replication, Auto-failover groups, Backups
                      </div>
                      <div className="data-item">
                        📌 6: Database Migration to Azure - Azure Database
                        Migration Service, Offline/online migrations
                      </div>
                      <div className="data-item">
                        📌 7: Automation and Scripting - PowerShell, Azure CLI,
                        ARM templates for database deployment
                      </div>
                      <div className="data-item">
                        📌 8: Azure Database for MySQL and PostgreSQL -
                        Deployment, Configuration, Management
                      </div>
                      <div className="data-item">
                        📌 9: Monitoring and Alerting - Azure Monitor, Database
                        Watcher, Alerts
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and DP-300 Certification
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
                          administer and optimize relational databases on
                          Microsoft Azure. You'll learn to deploy, configure,
                          secure, monitor, and troubleshoot Azure SQL Database,
                          Azure Database for MySQL, and Azure Database for
                          PostgreSQL solutions.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of relational databases and SQL.
                          Familiarity with cloud concepts is helpful but not
                          required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Plan and implement Azure SQL Database deployments
                          with appropriate service tiers
                        </li>
                        <li>
                          ✅ Configure database security including Azure AD
                          authentication and encryption
                        </li>
                        <li>
                          ✅ Monitor and optimize database performance using
                          Azure tools
                        </li>
                        <li>
                          ✅ Implement high availability and disaster recovery
                          solutions
                        </li>
                        <li>
                          ✅ Migrate on-premises databases to Azure with minimal
                          downtime
                        </li>
                        <li>
                          ✅ Automate administrative tasks with PowerShell and
                          Azure CLI
                        </li>
                        <li>
                          ✅ Manage Azure Database for MySQL and PostgreSQL
                          instances
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's DP-300 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🏗️ High-availability Azure SQL Database configuration
                          with failover groups
                        </li>
                        <li>
                          🔒 Secure database implementation with Always
                          Encrypted and Azure AD authentication
                        </li>
                        <li>
                          📊 Performance monitoring dashboard with Query
                          Performance Insight
                        </li>
                        <li>
                          🔄 Automated database migration from on-premises SQL
                          Server to Azure
                        </li>
                        <li>
                          ⚡ Automated deployment scripts using PowerShell and
                          ARM templates
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on labs using Azure database services:
                      </p>
                      <ul>
                        <li>
                          Module 1: Azure Relational Database Fundamentals
                        </li>
                        <li>Module 2: Deployment and Configuration</li>
                        <li>Module 3: Security and Compliance</li>
                        <li>Module 4: Performance Optimization</li>
                        <li>Module 5: High Availability Solutions</li>
                        <li>Module 6: Database Migration Techniques</li>
                        <li>Module 7: Automation and Scripting</li>
                        <li>Module 8: MySQL and PostgreSQL on Azure</li>
                        <li>Module 9: Monitoring and Alerting</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on labs in live Azure
                        environment. Includes access to Azure database resources
                        for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: Azure
                        Database Administrator Associate (DP-300) exam. Includes
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
                          🔹 <strong>Azure Database Administrator:</strong>{" "}
                          Manage and optimize Azure SQL databases and other
                          relational database services. Average salary: $85,000
                          - $125,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Database Engineer:</strong> Design
                          and implement cloud-based database solutions. Average
                          salary: $95,000 - $135,000
                        </li>
                        <li>
                          🔹 <strong>Database Migration Specialist:</strong>{" "}
                          Plan and execute migrations to Azure database
                          services. Average salary: $90,000 - $130,000
                        </li>
                        <li>
                          🔹 <strong>Database Performance Analyst:</strong>{" "}
                          Monitor and tune database performance in Azure.
                          Average salary: $88,000 - $128,000
                        </li>
                        <li>
                          🔹 <strong>Data Platform Administrator:</strong>{" "}
                          Manage the entire data platform including relational
                          databases. Average salary: $92,000 - $132,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Database Architect:</strong> Design
                          enterprise-scale database solutions on Azure. Average
                          salary: $115,000 - $160,000
                        </li>
                      </ul>
                      <p>
                        Database administration in the cloud is a critical role
                        with strong demand across all industries.
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
                  Administering Relational Databases on Microsoft Azure (DP-300)
                </h1>
                <p>
                  Master the skills to deploy, configure, and manage relational
                  databases in Microsoft Azure. This comprehensive course covers
                  all aspects of Azure database administration including Azure
                  SQL Database, Azure Database for MySQL, and Azure Database for
                  PostgreSQL. You'll gain hands-on experience with provisioning,
                  securing, monitoring, and optimizing databases while preparing
                  for the DP-300 certification exam.
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
                  Database Administrator Associate certification (DP-300). The
                  certification validates your ability to implement and manage
                  cloud-native and hybrid database solutions built with Azure
                  SQL Database and SQL Server. This certification is essential
                  for database professionals working with Azure.
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
                  Benefits of completing this Azure Database Administration
                  course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Azure SQL Database and other
                      relational services
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for DP-300 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand cloud database administration roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of real-world database projects
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
                  Azure SQL Database, Azure SQL Managed Instance, Azure Database
                  for MySQL, Azure Database for PostgreSQL, Azure Database
                  Migration Service, Azure Monitor, Query Performance Insight,
                  Intelligent Insights, Azure PowerShell, Azure CLI, ARM
                  Templates, Azure Security Center, TDE, Always Encrypted, Azure
                  AD Authentication, and other Azure database services.
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
                    Azure database resources for hands-on labs. Basic
                    understanding of SQL and relational databases is
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
