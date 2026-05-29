"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import AnalyticsImage from "../images/8.DP-500-Designing-and-Implementing-Enterprise-Scale-Analytics-Solutions-Using-Microsoft-Azure-and-Microsoft-Power-BI.png";
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
          <span>Enterprise Analytics with Azure and Power BI</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={AnalyticsImage}
                  alt="Enterprise Analytics with Azure and Power BI"
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
                        📊 Enterprise Analytics with Azure and Power BI (DP-500)
                      </h3>
                      <p>
                        This comprehensive course teaches you to design and
                        implement end-to-end analytics solutions at enterprise
                        scale using Microsoft Azure and Power BI. You'll learn
                        to build modern data warehouses, create powerful data
                        models, and develop interactive dashboards that drive
                        business decisions.
                      </p>
                      <div className="data-item">
                        📌 1: Enterprise Analytics Architecture - Modern data
                        warehouse, Data lakehouse, Medallion architecture
                      </div>
                      <div className="data-item">
                        📌 2: Azure Data Lake and Data Factory - Data ingestion,
                        Transformation, Orchestration
                      </div>
                      <div className="data-item">
                        📌 3: Azure Synapse Analytics - Dedicated SQL pools,
                        Serverless SQL, Data integration pipelines
                      </div>
                      <div className="data-item">
                        📌 4: Power BI Data Modeling - Star schema,
                        Relationships, DAX calculations, Row-level security
                      </div>
                      <div className="data-item">
                        📌 5: Advanced Power BI Visualizations - Custom visuals,
                        Power BI Embedded, Paginated reports
                      </div>
                      <div className="data-item">
                        📌 6: Data Security and Governance - Row-level security,
                        Azure Purview, Data lineage
                      </div>
                      <div className="data-item">
                        📌 7: Performance Optimization - Query optimization,
                        Aggregations, Incremental refresh
                      </div>
                      <div className="data-item">
                        📌 8: Enterprise Deployment and Management - Workspaces,
                        Apps, Deployment pipelines, Capacity management
                      </div>
                      <div className="data-item">
                        📌 9: Advanced Analytics - Azure Machine Learning
                        integration, AI visuals, Cognitive Services
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and Certification Preparation
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
                          This comprehensive course teaches you to design and
                          implement end-to-end analytics solutions at enterprise
                          scale using Microsoft Azure and Power BI. You'll learn
                          to build modern data warehouses, create powerful data
                          models, and develop interactive dashboards that drive
                          business decisions.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of data concepts and familiarity
                          with cloud services. Experience with SQL is helpful
                          but not required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Design enterprise-scale analytics architectures
                          using modern data patterns
                        </li>
                        <li>
                          ✅ Implement data pipelines with Azure Data Factory
                          and Synapse pipelines
                        </li>
                        <li>
                          ✅ Build modern data warehouses with Azure Synapse
                          Analytics
                        </li>
                        <li>
                          ✅ Create sophisticated data models in Power BI using
                          DAX and star schemas
                        </li>
                        <li>
                          ✅ Develop interactive dashboards and enterprise
                          reports
                        </li>
                        <li>
                          ✅ Implement security and governance policies across
                          the analytics platform
                        </li>
                        <li>
                          ✅ Optimize performance of analytics solutions at
                          scale
                        </li>
                        <li>
                          ✅ Integrate advanced analytics and machine learning
                          capabilities
                        </li>
                        <li>
                          ✅ Prepare for Microsoft PL-300 and DP-500
                          certifications
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🏗️ Complete modern data warehouse on Azure Synapse
                          Analytics
                        </li>
                        <li>
                          🔄 End-to-end data pipeline with Data Factory and
                          Azure Data Lake
                        </li>
                        <li>
                          📊 Enterprise Power BI dashboard with advanced DAX
                          calculations
                        </li>
                        <li>
                          🔒 Secure analytics platform with row-level security
                          and Purview governance
                        </li>
                        <li>
                          ⚡ Optimized data model with performance tuning and
                          aggregations
                        </li>
                        <li>
                          🤖 ML-powered analytics with Azure Machine Learning
                          integration
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module program combines theory with hands-on
                        labs:
                      </p>
                      <ul>
                        <li>Module 1: Analytics Architecture Fundamentals</li>
                        <li>Module 2: Data Ingestion and Processing</li>
                        <li>Module 3: Modern Data Warehousing</li>
                        <li>Module 4: Power BI Data Modeling</li>
                        <li>Module 5: Advanced Visualization Techniques</li>
                        <li>Module 6: Security and Governance</li>
                        <li>Module 7: Performance Tuning</li>
                        <li>Module 8: Enterprise Deployment</li>
                        <li>Module 9: Advanced Analytics</li>
                        <li>Module 10: Real-world Implementation Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on labs using real
                        Azure and Power BI environments. Includes access to
                        cloud resources for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for Microsoft Certified: Power BI Data Analyst
                        (PL-300) and Azure Enterprise Data Analyst (DP-500)
                        exams. Includes one free exam attempt voucher and
                        practice tests.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities</h3>
                      <p>
                        Graduates will be prepared for these high-demand roles:
                      </p>
                      <ul>
                        <li>
                          🔹 <strong>Enterprise Data Analyst:</strong> Design
                          and implement analytics solutions at scale. Average
                          salary: $90,000 - $135,000
                        </li>
                        <li>
                          🔹 <strong>Power BI Architect:</strong> Develop
                          complex reporting solutions. Average salary: $100,000
                          - $145,000
                        </li>
                        <li>
                          🔹 <strong>Azure Data Engineer:</strong> Build and
                          optimize data pipelines. Average salary: $95,000 -
                          $140,000
                        </li>
                        <li>
                          🔹 <strong>Business Intelligence Developer:</strong>{" "}
                          Create dashboards and visualizations. Average salary:
                          $85,000 - $125,000
                        </li>
                        <li>
                          🔹 <strong>Data Solutions Architect:</strong> Design
                          end-to-end analytics platforms. Average salary:
                          $120,000 - $165,000
                        </li>
                        <li>
                          🔹 <strong>Analytics Engineer:</strong> Transform and
                          model data for analytics. Average salary: $92,000 -
                          $138,000
                        </li>
                      </ul>
                      <p>
                        Enterprise analytics professionals are in high demand as
                        organizations invest in data-driven decision making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Enterprise Analytics with Azure and Power BI (DP-500)</h1>
                <p>
                  Master the complete analytics stack from data ingestion to
                  visualization. This course teaches you to design and implement
                  enterprise-scale analytics solutions using Microsoft Azure
                  services and Power BI. You'll gain hands-on experience with
                  data lakes, warehouses, pipelines, and interactive dashboards
                  while preparing for industry-recognized certifications.
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
                  This course prepares you for both Microsoft Power BI Data
                  Analyst (PL-300) and Azure Enterprise Data Analyst (DP-500)
                  certifications, validating your ability to deliver complete
                  analytics solutions. These certifications are highly valued in
                  the data analytics industry.
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
                  training and 90+ hours of hands-on labs and projects. Includes
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
                  Benefits of this comprehensive analytics course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      End-to-end coverage of enterprise analytics stack
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Preparation for two Microsoft certifications (PL-300 &
                      DP-500)
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Azure and Power BI services
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Real-world capstone project for portfolio
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Career coaching and placement support
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
                  Azure Data Lake Storage Gen2, Azure Data Factory, Azure
                  Synapse Analytics, Power BI Service, Power BI Desktop, DAX
                  (Data Analysis Expressions), Power Query M Language, Azure
                  Purview, Azure Active Directory, Azure Machine Learning, Power
                  BI Embedded, Paginated Reports, and other Microsoft analytics
                  technologies.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 8,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 8,500. You will be required to pay Ghc
                  3,000 for the first installment and Ghc 2,750 for each
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
                    classes 3 days a week (Monday to Wednesday). Project work
                    continues through weekends.
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
                    Azure and Power BI resources. Basic data concepts
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
