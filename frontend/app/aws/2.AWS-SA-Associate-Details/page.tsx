"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import AWSImage from "../images/AWS-Certified-Architect-Associate.png";
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
          <span>AWS SA-Associate</span>
        </div>
        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={AWSImage}
                  alt="AWS Certified Solutions Architect Associate"
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
                  {/* Course Overview */}
                  <div
                    className={`content ${activeContent === 1 ? "show" : ""}`}
                  >
                    <div className="concept-data">
                      <h3>🚀 AWS Certified Solutions Architect Associate</h3>
                      <p>
                        This course prepares you to design and deploy scalable
                        AWS solutions:
                      </p>
                      <div className="data-item">
                        📌 1: AWS Global Infrastructure & Core Services
                      </div>
                      <div className="data-item">
                        📌 2: Designing Highly Available Architectures
                      </div>
                      <div className="data-item">
                        📌 3: AWS Security Best Practices
                      </div>
                      <div className="data-item">
                        📌 4: Cost-Optimized Cloud Solutions
                      </div>
                      <div className="data-item">
                        📌 5: Storage and Database Services
                      </div>
                      <div className="data-item">
                        📌 6: Networking and Content Delivery
                      </div>
                      <div className="data-item">
                        📌 7: Monitoring, Logging, and Optimization
                      </div>
                      <div className="data-item">
                        📌 8: Disaster Recovery and Business Continuity
                      </div>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  <div
                    className={`content ${activeContent === 2 ? "show" : ""}`}
                  >
                    <div className="course-data">
                      <h3>🎯 Learning Goals</h3>
                      <ul>
                        <li>✅ Design resilient AWS architectures</li>
                        <li>
                          ✅ Implement security and compliance best practices
                        </li>
                        <li>
                          ✅ Optimize AWS solutions for cost-effectiveness
                        </li>
                        <li>✅ Understand networking fundamentals in AWS</li>
                        <li>
                          ✅ Gain hands-on experience with AWS management tools
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <p>Real-world AWS projects, such as:</p>
                      <ul>
                        <li>
                          🌐 Building a Secure and Scalable VPC Architecture
                        </li>
                        <li>
                          📦 Deploying a Serverless Application with AWS Lambda
                        </li>
                        <li>
                          ⚡ Designing a Scalable Web App with Load Balancing &
                          Auto Scaling
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Career Paths */}
                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities in AWS Cloud</h3>
                      <p>This certification qualifies you for roles like:</p>
                      <ul>
                        <li>
                          🔹 <strong>Cloud Solutions Architect</strong> - Design
                          AWS-based solutions.
                        </li>
                        <li>
                          🔹 <strong>Cloud Engineer</strong> - Implement and
                          maintain AWS infrastructures.
                        </li>
                        <li>
                          🔹 <strong>Systems Administrator</strong> - Manage AWS
                          services and resources.
                        </li>
                        <li>
                          🔹 <strong>DevOps Engineer</strong> - Automate and
                          optimize AWS deployments.
                        </li>
                      </ul>

                      <h4>🚀 Advance Your AWS Career</h4>
                      <p>
                        By completing this course, you'll be equipped with the
                        skills to architect AWS solutions efficiently!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>AWS Certified Solutions Architect Associate</h1>
                <p>
                  A foundational certification that covers AWS core services,
                  architecture best practices, security, and cost optimization.
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
                  The AWS Certified Solutions Architect Associate certification
                  demonstrates expertise in designing secure and cost-effective
                  cloud solutions.
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
                  The course spans 10 weeks, including hands-on labs and case
                  studies to prepare for the certification exam.
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
                  Completing this certification will:
                  <ul>
                    <li>🔹 Enhance your cloud computing knowledge</li>
                    <li>🔹 Open doors to AWS-related job roles</li>
                    <li>🔹 Validate your expertise in AWS solutions</li>
                    <li>
                      🔹 Improve your skills in security, networking, and
                      automation
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
                  The course covers AWS Compute, Storage, Databases, Security,
                  Networking, and Automation with Infrastructure as Code (IaC).
                </p>
              </div>
            </div>

            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 5,920</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 5,920. You will be required to pay Ghc
                  2,000 for the first installment and Ghc 1,960 for each
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
                    week (Monday to Wednesday). Students will work on a project
                    from Thursday to Sunday and submit it the following Monday.
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
                    laptop.
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
                    <b>Location:</b> Accra, Mallam-Gbawe
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
