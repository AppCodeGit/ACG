"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import TraditionalDataImage from "../images/image3.png";
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
          <span>Traditional Data Analytics Professional Certification</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={TraditionalDataImage}
                  alt="Traditional Data Analytics Professional Certification"
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
                        📊 Traditional Data Analytics Professional Certification
                      </h3>
                      <p>
                        Master traditional data analytics techniques using
                        industry-standard tools like Excel, SQL, and BI
                        platforms. Learn to transform raw data into actionable
                        insights through comprehensive analysis and
                        visualization.
                      </p>
                      <div className="data-item">
                        📌 1: Data Analysis Fundamentals - Data types, Data
                        sources, Data quality, Analysis methodologies
                      </div>
                      <div className="data-item">
                        📌 2: SQL for Data Analysis - Queries, Joins,
                        Subqueries, Window functions, Optimization
                      </div>
                      <div className="data-item">
                        📌 3: Excel Advanced Analytics - PivotTables, Power
                        Query, DAX, Advanced formulas, What-if analysis
                      </div>
                      <div className="data-item">
                        📌 4: Statistical Analysis - Descriptive statistics,
                        Probability, Hypothesis testing, Regression
                      </div>
                      <div className="data-item">
                        📌 5: Data Visualization - Chart types, Design
                        principles, Storytelling with data
                      </div>
                      <div className="data-item">
                        📌 6: Business Intelligence Tools - Power BI, Tableau,
                        QlikView fundamentals
                      </div>
                      <div className="data-item">
                        📌 7: Dashboard Development - KPI selection, Interactive
                        dashboards, Performance monitoring
                      </div>
                      <div className="data-item">
                        📌 8: Data Cleaning & Preparation - Data transformation,
                        Handling missing data, Outlier detection
                      </div>
                      <div className="data-item">
                        📌 9: Business Communication - Data-driven
                        presentations, Report writing, Stakeholder management
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
                          Master traditional data analytics techniques using
                          industry-standard tools like Excel, SQL, and BI
                          platforms. Learn to transform raw data into actionable
                          insights through comprehensive analysis and
                          visualization.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic computer literacy. No prior data experience
                          required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Perform advanced data analysis in Excel including
                          Power Query and DAX
                        </li>
                        <li>
                          ✅ Write complex SQL queries for data extraction and
                          manipulation
                        </li>
                        <li>
                          ✅ Apply statistical methods to business data for
                          informed decision-making
                        </li>
                        <li>
                          ✅ Create compelling data visualizations that tell a
                          story
                        </li>
                        <li>
                          ✅ Develop interactive dashboards for business
                          monitoring
                        </li>
                        <li>
                          ✅ Clean and prepare data for analysis using industry
                          best practices
                        </li>
                        <li>
                          ✅ Translate data insights into actionable business
                          recommendations
                        </li>
                        <li>
                          ✅ Master data cleaning and preparation techniques
                        </li>
                        <li>
                          ✅ Communicate findings effectively to stakeholders
                        </li>
                        <li>
                          ✅ Prepare for industry-recognized certifications
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Complete sales analysis dashboard in Excel with
                          Power Query
                        </li>
                        <li>
                          📈 SQL database queries for business performance
                          metrics
                        </li>
                        <li>
                          📉 Statistical analysis report with hypothesis testing
                        </li>
                        <li>
                          📋 Interactive Power BI dashboard for executive
                          reporting
                        </li>
                        <li>
                          📊 Data visualization portfolio with various chart
                          types
                        </li>
                        <li>
                          📑 Business presentation with data-driven insights
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>This 10-module comprehensive program covers:</p>
                      <ul>
                        <li>Module 1: Data Analysis Fundamentals</li>
                        <li>Module 2: SQL for Data Analysis</li>
                        <li>Module 3: Excel Advanced Analytics</li>
                        <li>Module 4: Statistical Analysis</li>
                        <li>Module 5: Data Visualization</li>
                        <li>Module 6: Business Intelligence Tools</li>
                        <li>Module 7: Dashboard Development</li>
                        <li>Module 8: Data Cleaning & Preparation</li>
                        <li>Module 9: Business Communication</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Hands-on training with real-world datasets and case
                        studies across various industries including retail,
                        finance, and healthcare.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for Microsoft Certified: Data Analyst
                        Associate, Excel Expert certification, and other
                        industry certifications. Includes our institute's
                        professional certification.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities</h3>
                      <p>Graduates qualify for these in-demand positions:</p>
                      <ul>
                        <li>
                          🔹 <strong>Data Analyst:</strong> Transform data into
                          business insights. Average salary: $65,000 - $95,000
                        </li>
                        <li>
                          🔹 <strong>Business Analyst:</strong> Drive
                          data-driven decisions. Average salary: $70,000 -
                          $100,000
                        </li>
                        <li>
                          🔹 <strong>Reporting Analyst:</strong> Create business
                          reports and dashboards. Average salary: $60,000 -
                          $85,000
                        </li>
                        <li>
                          🔹 <strong>BI Analyst:</strong> Develop business
                          intelligence solutions. Average salary: $68,000 -
                          $98,000
                        </li>
                        <li>
                          🔹 <strong>Operations Analyst:</strong> Optimize
                          business processes. Average salary: $62,000 - $88,000
                        </li>
                        <li>
                          🔹 <strong>Financial Analyst:</strong> Analyze
                          financial data for insights. Average salary: $65,000 -
                          $92,000
                        </li>
                        <li>
                          🔹 <strong>Marketing Analyst:</strong> Analyze
                          campaign performance data. Average salary: $63,000 -
                          $89,000
                        </li>
                      </ul>
                      <p>
                        Data analytics skills are essential across all
                        industries, making this a versatile and rewarding career
                        path.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Traditional Data Analytics Professional Certification</h1>
                <p>
                  Become a certified data analytics professional with this
                  comprehensive training in traditional data analysis techniques
                  using Excel, SQL, and BI tools. Perfect for beginners entering
                  the data field or professionals looking to add analytics to
                  their skillset.
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
                  Earn our professional certification and prepare for Microsoft
                  Data Analyst Associate and Excel Expert certifications -
                  industry-recognized credentials that validate your analytics
                  expertise.
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
                  10-week program with 50 instructor-led hours and 70+ practical
                  hours, including real-world projects and case studies.
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
                  Key benefits of this traditional data analytics course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master Excel for advanced analytics and data modeling
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Become proficient in SQL for database querying
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn professional data visualization techniques
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Gain comprehensive certification preparation
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Build portfolio with real business projects
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
                  Microsoft Excel (Power Query, Power Pivot, DAX), SQL Server,
                  T-SQL, Power BI Desktop, Power BI Service, Tableau, and other
                  traditional analytics tools for comprehensive data analysis.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 5,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  Course fee: Ghc 5,500 payable as Ghc 2,000 initial deposit and
                  Ghc 1,750 monthly installments.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Schedule:</b> 10 weeks, 3 sessions/week (Tue/Thu/Sat)
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
                    <b>Requirements:</b> Laptop with Microsoft Office installed.
                    No prior experience needed. All software provided for
                    classroom use.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Tuesday, Thursday, Saturday
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
                  <strong>Software:</strong> Includes licensed software for
                  classroom use and access to datasets for practice.
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
