"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import CloudDataImage from "../images/image1.png";
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
            <Link href="/dataAnalytics">Data Analytics</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Cloud Data Analytics Professional Certification</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={CloudDataImage}
                  alt="Cloud Data Analytics Professional Certification"
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
                        ☁️ Cloud Data Analytics Professional Certification
                      </h3>
                      <p>
                        Master cloud-based data analytics using leading
                        platforms like AWS, Azure, and Google Cloud. Learn to
                        design, build, and optimize cloud data pipelines,
                        implement data warehouses, and perform advanced
                        analytics at scale.
                      </p>
                      <div className="data-item">
                        📌 1: Cloud Data Fundamentals - Cloud computing models,
                        Data storage options, Analytics architecture
                      </div>
                      <div className="data-item">
                        📌 2: Big Data Processing in Cloud - AWS EMR, Azure
                        HDInsight, Google Dataproc, Apache Spark
                      </div>
                      <div className="data-item">
                        📌 3: Data Warehousing Solutions - AWS Redshift, Azure
                        Synapse, Google BigQuery, Snowflake
                      </div>
                      <div className="data-item">
                        📌 4: Real-time Analytics Pipelines - AWS Kinesis, Azure
                        Stream Analytics, Google Dataflow
                      </div>
                      <div className="data-item">
                        📌 5: Machine Learning Integration - AWS SageMaker,
                        Azure ML, Google AI Platform
                      </div>
                      <div className="data-item">
                        📌 6: Multi-Cloud Data Strategies - Cross-platform
                        integration, Data federation, Portability
                      </div>
                      <div className="data-item">
                        📌 7: Data Governance & Security - Encryption, Access
                        control, Compliance, Data lineage
                      </div>
                      <div className="data-item">
                        📌 8: Data Visualization - Power BI, Tableau, Looker
                        integration with cloud data
                      </div>
                      <div className="data-item">
                        📌 9: Data Lake Implementation - AWS Lake Formation,
                        Azure Data Lake, Google Cloud Storage
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project & Certification Preparation
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
                          Master cloud-based data analytics using leading
                          platforms like AWS, Azure, and Google Cloud. Learn to
                          design, build, and optimize cloud data pipelines,
                          implement data warehouses, and perform advanced
                          analytics at scale.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic SQL knowledge and understanding of data
                          concepts. No prior cloud experience required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Design and implement cloud data solutions across
                          multiple cloud platforms
                        </li>
                        <li>
                          ✅ Process big data using cloud-native tools like
                          Spark, EMR, and Dataproc
                        </li>
                        <li>
                          ✅ Build real-time analytics pipelines for streaming
                          data
                        </li>
                        <li>
                          ✅ Implement enterprise data warehousing solutions on
                          all major clouds
                        </li>
                        <li>
                          ✅ Integrate machine learning with data pipelines for
                          predictive analytics
                        </li>
                        <li>
                          ✅ Ensure data governance, security, and compliance
                          across cloud environments
                        </li>
                        <li>
                          ✅ Build and manage data lakes for large-scale storage
                        </li>
                        <li>
                          ✅ Create compelling visualizations connecting to
                          cloud data sources
                        </li>
                        <li>
                          ✅ Implement multi-cloud and hybrid cloud data
                          strategies
                        </li>
                        <li>
                          ✅ Prepare for cloud platform certifications (AWS,
                          Azure, Google)
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          ☁️ Complete cloud data pipeline architecture across
                          AWS, Azure, and GCP
                        </li>
                        <li>
                          📊 Enterprise data warehouse implementation on
                          Snowflake or Redshift
                        </li>
                        <li>
                          ⚡ Real-time streaming pipeline with Kinesis and Kafka
                        </li>
                        <li>
                          🤖 ML-integrated analytics solution with SageMaker or
                          Azure ML
                        </li>
                        <li>
                          🔒 Secure data lake implementation with governance
                          controls
                        </li>
                        <li>📈 Multi-cloud data visualization dashboard</li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>This 10-module intensive program covers:</p>
                      <ul>
                        <li>Module 1: Cloud Data Fundamentals</li>
                        <li>Module 2: Big Data Processing</li>
                        <li>Module 3: Data Warehousing</li>
                        <li>Module 4: Real-time Analytics</li>
                        <li>Module 5: Machine Learning Integration</li>
                        <li>Module 6: Multi-Cloud Strategies</li>
                        <li>Module 7: Data Governance</li>
                        <li>Module 8: Data Visualization</li>
                        <li>Module 9: Data Lake Implementation</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Hands-on labs using AWS, Azure, and Google Cloud
                        platforms with real-world datasets and scenarios.
                        Includes cloud credits for hands-on practice.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for AWS Certified Data Analytics, Google
                        Professional Data Engineer, and Microsoft Azure Data
                        Scientist certifications. Includes our institute's
                        professional certification.
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
                          🔹 <strong>Cloud Data Engineer:</strong> Design and
                          implement cloud data solutions. Average salary:
                          $110,000 - $155,000
                        </li>
                        <li>
                          🔹 <strong>Big Data Analyst:</strong> Process and
                          analyze large-scale datasets. Average salary: $95,000
                          - $135,000
                        </li>
                        <li>
                          🔹 <strong>Data Warehouse Specialist:</strong>{" "}
                          Implement cloud data warehouse solutions. Average
                          salary: $105,000 - $150,000
                        </li>
                        <li>
                          🔹 <strong>BI Developer:</strong> Create cloud-based
                          analytics solutions. Average salary: $90,000 -
                          $130,000
                        </li>
                        <li>
                          🔹 <strong>Data Architect:</strong> Design multi-cloud
                          data strategies. Average salary: $125,000 - $170,000
                        </li>
                        <li>
                          🔹 <strong>Machine Learning Engineer:</strong> Deploy
                          ML models on cloud platforms. Average salary: $115,000
                          - $160,000
                        </li>
                      </ul>
                      <p>
                        Cloud data professionals are among the highest-paid in
                        the industry with explosive demand across all sectors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Cloud Data Analytics Professional Certification</h1>
                <p>
                  Become a certified cloud data analytics professional with this
                  comprehensive training covering data engineering, warehousing,
                  and advanced analytics on AWS, Azure, and Google Cloud
                  platforms. Gain hands-on experience with real-world projects.
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
                  Prepares for AWS Certified Data Analytics, Google Professional
                  Data Engineer, and Microsoft Azure Data Scientist
                  certifications plus our institute's professional certification
                  - comprehensive validation of your skills.
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
                  12-week program with 70 instructor-led hours and 100+ lab
                  hours, including multi-cloud projects and certification
                  preparation.
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
                  Key benefits of this cloud data analytics course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with AWS, Azure, and Google Cloud
                      platforms
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master big data processing and real-time analytics
                      techniques
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn multi-cloud implementation and data governance
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Preparation for multiple cloud platform certifications
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Develop portfolio of multi-cloud data projects
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
                  AWS Redshift, AWS EMR, AWS Kinesis, AWS SageMaker, Azure
                  Synapse, Azure HDInsight, Azure Stream Analytics, Azure ML,
                  Google BigQuery, Google Dataproc, Google Dataflow, Google AI
                  Platform, Snowflake, Databricks, Apache Spark, Apache Kafka,
                  Airflow, Tableau, Power BI, Looker, and data governance tools.
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
                  Course fee: Ghc 8,500 payable as Ghc 3,500 initial deposit and
                  Ghc 2,500 monthly installments.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Schedule:</b> 12 weeks, 4 sessions/week (Mon/Wed/Fri/Sat)
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
                    <b>Requirements:</b> Laptop with minimum 8GB RAM. Basic SQL
                    knowledge recommended. All cloud accounts and credits
                    provided.
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
                    <b>Times:</b> Weekdays 6PM-9PM, Saturday 10AM-1PM
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
                  <strong>Minimum enrollment:</strong> 3 students required to
                  commence class.
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
