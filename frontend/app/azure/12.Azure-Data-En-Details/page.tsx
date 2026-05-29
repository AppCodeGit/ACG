"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import DataEngineerImage from "../images/4.azure-data-engineer-associate.png";
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
          <span>Data Engineering on Microsoft Azure</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={DataEngineerImage}
                  alt="Data Engineering on Microsoft Azure"
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
                        📊 Microsoft Azure Data Engineer Associate (DP-203)
                      </h3>
                      <p>
                        This comprehensive course prepares you for a career in
                        cloud-based data engineering using Microsoft Azure.
                        You'll learn to design and implement data storage, data
                        processing, and data security solutions using Azure
                        services.
                      </p>
                      <div className="data-item">
                        📌 1: Introduction to Azure Data Engineering - Data
                        platforms, Modern Data Warehouse, Data Lakes
                      </div>
                      <div className="data-item">
                        📌 2: Azure Data Storage Solutions - Blob Storage, Data
                        Lake Storage, Cosmos DB
                      </div>
                      <div className="data-item">
                        📌 3: Azure Data Factory and Data Pipelines - ETL/ELT,
                        Integration Runtime, Data Flows
                      </div>
                      <div className="data-item">
                        📌 4: Azure Databricks for Big Data Processing - Spark,
                        Notebooks, Delta Lake
                      </div>
                      <div className="data-item">
                        📌 5: Azure Synapse Analytics - Dedicated SQL Pools,
                        Serverless SQL, Data Integration
                      </div>
                      <div className="data-item">
                        📌 6: Data Security and Compliance in Azure -
                        Encryption, RBAC, Private Links, Purview
                      </div>
                      <div className="data-item">
                        📌 7: Monitoring and Optimizing Data Solutions -
                        Performance Tuning, Cost Management
                      </div>
                      <div className="data-item">
                        📌 8: Real-time Data Processing - Stream Analytics,
                        Event Hubs, IoT Hub
                      </div>
                      <div className="data-item">
                        📌 9: Data Orchestration and Scheduling - Azure Data
                        Factory Triggers, Logic Apps
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and DP-203 Certification
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
                          This comprehensive course prepares you for a career in
                          cloud-based data engineering using Microsoft Azure.
                          You'll learn to design and implement data storage,
                          data processing, and data security solutions using
                          Azure services like Azure Data Factory, Azure
                          Databricks, Azure Synapse Analytics, and more.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of databases and data processing
                          concepts. Familiarity with cloud concepts is helpful
                          but not required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Design and implement data storage solutions on
                          Azure
                        </li>
                        <li>
                          ✅ Create and manage data pipelines using Azure Data
                          Factory
                        </li>
                        <li>
                          ✅ Process big data using Azure Databricks and Spark
                        </li>
                        <li>
                          ✅ Implement data warehousing with Azure Synapse
                          Analytics
                        </li>
                        <li>
                          ✅ Apply data security, compliance, and privacy
                          protections
                        </li>
                        <li>
                          ✅ Monitor and optimize data storage and processing
                        </li>
                        <li>✅ Build real-time data processing solutions</li>
                        <li>
                          ✅ Prepare for Microsoft's DP-203 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📦 End-to-end data pipeline with Azure Data Factory
                          and Databricks
                        </li>
                        <li>
                          🏗️ Modern Data Warehouse architecture using Azure
                          Synapse
                        </li>
                        <li>
                          ⚡ Real-time streaming solution with Event Hubs and
                          Stream Analytics
                        </li>
                        <li>
                          🔒 Secure data lake implementation with proper access
                          controls
                        </li>
                        <li>
                          📊 Data transformation and processing with Delta Lake
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on labs using real Azure services:
                      </p>
                      <ul>
                        <li>Module 1: Azure Data Engineering Fundamentals</li>
                        <li>Module 2: Azure Data Storage Solutions</li>
                        <li>
                          Module 3: Data Integration with Azure Data Factory
                        </li>
                        <li>
                          Module 4: Big Data Processing with Azure Databricks
                        </li>
                        <li>Module 5: Data Warehousing with Azure Synapse</li>
                        <li>Module 6: Data Security and Compliance</li>
                        <li>Module 7: Monitoring and Optimization</li>
                        <li>Module 8: Real-time Data Processing</li>
                        <li>Module 9: Data Orchestration</li>
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
                        Course prepares you for Microsoft Certified: Azure Data
                        Engineer Associate (DP-203) exam. Includes one free exam
                        attempt voucher and practice tests.
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
                          🔹 <strong>Azure Data Engineer:</strong> Design and
                          implement data solutions using Azure data services.
                          Average salary: $95,000 - $135,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Data Architect:</strong> Plan and
                          optimize cloud-based data infrastructure. Average
                          salary: $120,000 - $160,000
                        </li>
                        <li>
                          🔹 <strong>Big Data Engineer:</strong> Process and
                          analyze large datasets using Azure Databricks and
                          Synapse. Average salary: $100,000 - $145,000
                        </li>
                        <li>
                          🔹 <strong>Data Integration Specialist:</strong> Build
                          and maintain ETL/ELT pipelines with Azure Data
                          Factory. Average salary: $85,000 - $120,000
                        </li>
                        <li>
                          🔹 <strong>BI Developer:</strong> Create analytics
                          solutions using Azure data services. Average salary:
                          $80,000 - $115,000
                        </li>
                        <li>
                          🔹 <strong>Analytics Engineer:</strong> Transform and
                          model data for analytics. Average salary: $90,000 -
                          $130,000
                        </li>
                      </ul>
                      <p>
                        Data engineering is one of the fastest-growing roles in
                        cloud computing with excellent career prospects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Data Engineering on Microsoft Azure (DP-203)</h1>
                <p>
                  Master the skills to design and implement data solutions on
                  Microsoft Azure. This comprehensive course covers all aspects
                  of Azure data engineering including storage, processing,
                  security, and analytics. You'll gain hands-on experience with
                  Azure Data Factory, Azure Databricks, Azure Synapse Analytics,
                  and other key services while preparing for the DP-203
                  certification exam.
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
                  Data Engineer Associate certification (DP-203). The
                  certification validates your ability to integrate, transform,
                  and consolidate data from various structured and unstructured
                  data systems into structures suitable for building analytics
                  solutions. This is one of the most valuable certifications for
                  data professionals.
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
                  Benefits of completing this Azure Data Engineering course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with real Azure services and credits
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for DP-203 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand cloud data engineering roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of real-world data engineering projects
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
                  Azure Data Factory, Azure Databricks, Azure Synapse Analytics,
                  Azure Storage (Blob, Data Lake Gen2), Azure SQL Database,
                  Cosmos DB, Azure Stream Analytics, Event Hubs, Azure Purview,
                  Delta Lake, Apache Spark, and other Azure data services.
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
                    Azure resources for hands-on labs. Basic understanding of
                    databases and SQL is recommended.
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
