"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
// Fixed: Changed from NavLink to Next.js Link
import Link from "next/link";
// Fixed: Renamed to avoid conflict with Next.js Image component
import AWSImage from "../images/AWS-Certified-Architect-Professional.png";
// Added Next.js Image import
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
            {/* Fixed: Changed NavLink to Link */}
            <Link href="/">Home</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <div className="items">
            {/* Fixed: Changed NavLink to Link */}
            <Link href="/aws">Aws</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>AWS SA-Pro</span>
        </div>
        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                {/* Fixed: Changed img to Image */}
                <Image
                  src={AWSImage}
                  alt="AWS Certified Solutions Architect Professional"
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
                      <h3>🚀 AWS Certified Solutions Architect Professional</h3>
                      <p>
                        This course is designed to help you master advanced
                        cloud architecture principles on AWS:
                      </p>
                      <div className="data-item">
                        📌 1: AWS Well-Architected Framework
                      </div>
                      <div className="data-item">
                        📌 2: Designing Multi-Tier Architectures
                      </div>
                      <div className="data-item">
                        📌 3: Advanced Networking & Hybrid Cloud Strategies
                      </div>
                      <div className="data-item">
                        📌 4: Security Best Practices in AWS
                      </div>
                      <div className="data-item">
                        📌 5: Cost Optimization Strategies
                      </div>
                      <div className="data-item">
                        📌 6: High Availability and Fault Tolerance
                      </div>
                      <div className="data-item">
                        📌 7: Disaster Recovery Planning
                      </div>
                      <div className="data-item">
                        📌 8: Automation & Infrastructure as Code (IaC)
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
                        <li>
                          ✅ Design highly available and scalable architectures
                        </li>
                        <li>
                          ✅ Implement security controls following AWS best
                          practices
                        </li>
                        <li>✅ Optimize cost using AWS pricing models</li>
                        <li>
                          ✅ Leverage AWS services for disaster recovery
                          solutions
                        </li>
                        <li>✅ Automate infrastructure deployment using IaC</li>
                        <li>
                          ✅ Gain hands-on experience with real-world AWS case
                          studies
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <p>Real-world AWS architecture solutions, such as:</p>
                      <ul>
                        <li>
                          🌐 Designing a Multi-Account AWS Strategy using AWS
                          Organizations and Control Tower
                        </li>
                        <li>
                          📦 Implementing a Secure and Scalable Data Lake using
                          Amazon S3, Glue, and Athena
                        </li>
                        <li>
                          ⚡ Building a Serverless Event-Driven Architecture
                          with AWS Lambda, EventBridge, and Step Functions
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Career Paths */}
                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities in AWS Cloud Architecture</h3>
                      <p>
                        After completing this certification, you'll be qualified
                        for roles like:
                      </p>
                      <ul>
                        <li>
                          🔹 <strong>Cloud Solutions Architect</strong> - Design
                          and implement AWS cloud solutions.
                        </li>
                        <li>
                          🔹 <strong>DevOps Engineer</strong> - Automate
                          infrastructure with AWS services.
                        </li>
                        <li>
                          🔹 <strong>Cloud Security Engineer</strong> -
                          Implement security best practices in AWS.
                        </li>
                        <li>
                          🔹 <strong>Site Reliability Engineer (SRE)</strong> -
                          Maintain high availability and scalability.
                        </li>
                        <li>
                          🔹 <strong>Cloud Consultant</strong> - Advise
                          organizations on AWS cloud adoption.
                        </li>
                      </ul>

                      <h4>🚀 Advance Your Cloud Career</h4>
                      <p>
                        By the end of this course, you'll have the expertise to
                        design resilient and scalable cloud architectures on
                        AWS!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>AWS Certified Solutions Architect Professional</h1>
                <p>
                  A comprehensive certification course covering advanced AWS
                  architecture principles, security, cost optimization, high
                  availability, and disaster recovery. You'll learn to design
                  and implement scalable, fault-tolerant solutions using AWS
                  best practices.
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
                  The AWS Certified Solutions Architect Professional
                  certification validates your ability to design and implement
                  complex AWS architectures. It demonstrates expertise in cloud
                  security, cost optimization, and infrastructure automation.
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
                  The course spans 13 weeks with in-depth video lessons,
                  hands-on labs, and real-world case studies to prepare you for
                  the certification exam.
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
                  Completing the AWS Solutions Architect Professional
                  certification will:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Boost your cloud architecture expertise.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Increase job opportunities in cloud computing.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Validate your ability to design scalable AWS
                      architectures.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Improve your skills in security, networking, and
                      automation.
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
                  The course covers AWS core services, security best practices,
                  cost optimization strategies, high availability, and
                  automation using Infrastructure as Code (IaC) with AWS
                  CloudFormation and Terraform.
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
