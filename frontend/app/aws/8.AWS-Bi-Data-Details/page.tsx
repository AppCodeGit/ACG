"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import BigDataImage from "../images/AWS-Big-Data-Logo.png";
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
          <span>AWS Big Data Specialty</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            <div className="item">
              <div className="image-container">
                <Image
                  src={BigDataImage}
                  alt="AWS Certified Big Data Specialty"
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
                      <h3>📊 AWS Certified Big Data Specialty</h3>
                      <p>
                        Master data analytics and big data tools on AWS cloud.
                        This comprehensive course covers the entire data
                        lifecycle from ingestion to visualization.
                      </p>
                      <div className="data-item">
                        📌 1: Data Collection & Ingestion - Kinesis Data
                        Streams, Kinesis Firehose, Kafka, IoT Core
                      </div>
                      <div className="data-item">
                        📌 2: Storage & Lifecycle Policies - S3, S3 Glacier, S3
                        Lifecycle Policies, Data Lakes
                      </div>
                      <div className="data-item">
                        📌 3: AWS Data Analytics Tools - Athena, Redshift,
                        Kinesis Analytics, EMR, Glue, QuickSight
                      </div>
                      <div className="data-item">
                        📌 4: Data Processing & Transformation - AWS Glue ETL,
                        EMR (Spark, Hive, Presto), Lambda
                      </div>
                      <div className="data-item">
                        📌 5: Machine Learning on AWS - SageMaker, Rekognition,
                        Comprehend, Forecast, Personalize
                      </div>
                      <div className="data-item">
                        📌 6: Security and Compliance - IAM Policies, KMS
                        Encryption, VPC Endpoints, CloudTrail
                      </div>
                      <div className="data-item">
                        📌 7: Data Warehousing - Redshift Architecture,
                        Distribution Styles, Sort Keys, Workload Management
                      </div>
                      <div className="data-item">
                        📌 8: Real-time Analytics - Kinesis Data Analytics,
                        Spark Streaming, Flink on EMR
                      </div>
                      <div className="data-item">
                        📌 9: Data Visualization - QuickSight Dashboards, SPICE
                        Engine, ML Insights
                      </div>
                      <div className="data-item">
                        📌 10: Big Data Frameworks - Hadoop Ecosystem, Spark,
                        Hive, HBase, Presto on EMR
                      </div>
                      <div className="data-item">
                        📌 11: Data Migration - DMS, Snowball, Snowmobile,
                        DataSync
                      </div>
                      <div className="data-item">
                        📌 12: Data Governance & Cataloging - AWS Glue Data
                        Catalog, Lake Formation, Data Zones
                      </div>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 2 ? "show" : ""}`}
                  >
                    <div className="course-data">
                      <h3>🎯 Learning Goals</h3>
                      <ul>
                        <li>
                          ✅ Design and manage scalable big data solutions on
                          AWS
                        </li>
                        <li>
                          ✅ Build real-time and batch data processing pipelines
                        </li>
                        <li>
                          ✅ Integrate data pipelines with AWS analytics
                          services
                        </li>
                        <li>
                          ✅ Query and visualize large datasets efficiently
                        </li>
                        <li>
                          ✅ Apply ML models and analyze results using AWS AI
                          services
                        </li>
                        <li>
                          ✅ Implement data security, governance, and compliance
                        </li>
                        <li>✅ Optimize data storage and query performance</li>
                        <li>✅ Migrate on-premises data workloads to AWS</li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📈 Enterprise Data Lake with S3, Glue, and Athena for
                          ad-hoc querying
                        </li>
                        <li>
                          📡 Real-time analytics pipeline using Kinesis, Lambda,
                          and Redshift
                        </li>
                        <li>
                          🤖 ML workflow using SageMaker for predictive
                          analytics
                        </li>
                        <li>
                          📊 Interactive Dashboards with QuickSight for business
                          intelligence
                        </li>
                        <li>
                          🔄 Batch processing ETL jobs with AWS Glue and EMR
                        </li>
                        <li>
                          🔒 Secure data platform with encryption and
                          fine-grained access control
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
                        <li>
                          🔹 Big Data Engineer - Design and maintain big data
                          pipelines
                        </li>
                        <li>
                          🔹 Data Architect - Architect enterprise data
                          solutions on AWS
                        </li>
                        <li>
                          🔹 Data Scientist (AWS Ecosystem) - Build ML models
                          using AWS AI services
                        </li>
                        <li>
                          🔹 AWS Data Analytics Specialist - Specialize in AWS
                          analytics services
                        </li>
                        <li>
                          🔹 Machine Learning Engineer (Cloud) - Deploy ML
                          models at scale
                        </li>
                        <li>
                          🔹 Business Intelligence Engineer - Create dashboards
                          and reports
                        </li>
                        <li>
                          🔹 Data Platform Engineer - Build and maintain data
                          platforms
                        </li>
                      </ul>
                      <p>
                        Prepare for high-demand careers in cloud-powered data
                        solutions. This certification is consistently ranked
                        among the top-paying cloud certifications globally.
                      </p>
                      <h4>💰 Average Salary (Global):</h4>
                      <p>$130,000 - $180,000 per year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="text">
                <h1>AWS Certified Big Data Specialty</h1>
                <p>
                  Learn how to build secure, scalable data pipelines and
                  analytical platforms using AWS tools and services. This
                  comprehensive program covers the entire big data lifecycle
                  from ingestion to visualization, preparing you for one of the
                  most in-demand cloud certifications.
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
                  Validates expertise in data analytics, visualization, and
                  machine learning using AWS. This certification demonstrates
                  your ability to design and implement big data solutions,
                  making you a valuable asset to any organization leveraging AWS
                  for data processing.
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
                  14 weeks with weekly labs, hands-on projects, and real-world
                  case studies. Includes 120+ hours of guided learning and 6
                  comprehensive portfolio projects.
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
                      End-to-end AWS data project skills for your portfolio
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Portfolio-ready projects in data analytics and machine
                      learning
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Job-ready certification recognized by top employers
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Master real-time and batch data processing
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Learn cost optimization for big data workloads
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Build production-ready data pipelines
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
                  AWS S3, Glue, Glue ETL, Athena, Kinesis Data Streams, Kinesis
                  Analytics, Redshift, Redshift Spectrum, EMR (Spark, Hive,
                  HBase), QuickSight, SageMaker, Rekognition, Comprehend,
                  Forecast, Lake Formation, DMS, DataSync, IAM, KMS, CloudTrail,
                  and more.
                </p>
              </div>
            </div>

            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 6,200</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 6,200. You will be required to pay Ghc
                  2,200 for the first installment and Ghc 2,000 for each
                  additional month.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Course duration:</b> 3.5 months, with classes held 3 days
                    a week (Monday, Wednesday, Friday). Includes 14 weeks of
                    intensive training.
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
                    laptop. AWS account required for hands-on labs (free tier
                    eligible).
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Monday, Wednesday, Friday (9 hours/week)
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
                    <b>Location:</b> Accra, Mallam-Gbawe or Online via Zoom
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
