"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import DevOpsImage from "../images/AWS-Certified-DevOps-Engineer-Professional.png";
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
          <span>AWS DevOps Pro</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            <div className="item">
              <div className="image-container">
                <Image
                  src={DevOpsImage}
                  alt="AWS Certified DevOps Engineer Professional"
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
                      <h3>🛠️ AWS Certified DevOps Engineer Professional</h3>
                      <p>
                        This course focuses on DevOps principles and AWS tools
                        for CI/CD and automation:
                      </p>
                      <div className="data-item">
                        📌 1: CI/CD Pipelines with AWS CodePipeline & CodeBuild
                      </div>
                      <div className="data-item">
                        📌 2: Infrastructure as Code with CloudFormation and
                        Terraform
                      </div>
                      <div className="data-item">
                        📌 3: Monitoring and Logging with CloudWatch
                      </div>
                      <div className="data-item">
                        📌 4: Automation using Lambda and Systems Manager
                      </div>
                      <div className="data-item">
                        📌 5: High Availability and Disaster Recovery
                      </div>
                      <div className="data-item">📌 6: Security Automation</div>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 2 ? "show" : ""}`}
                  >
                    <div className="course-data">
                      <h3>🎯 Learning Goals</h3>
                      <ul>
                        <li>✅ Automate infrastructure and deployments</li>
                        <li>✅ Implement monitoring and logging solutions</li>
                        <li>✅ Build resilient and secure pipelines</li>
                        <li>✅ Design and maintain CI/CD environments</li>
                        <li>✅ Troubleshoot and optimize DevOps workflows</li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>🔁 End-to-end CI/CD pipelines with CodeDeploy</li>
                        <li>🧰 IaC templates to automate cloud provisioning</li>
                        <li>
                          📊 Real-time monitoring dashboards with CloudWatch and
                          SNS
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
                        <li>🔹 DevOps Engineer</li>
                        <li>🔹 Site Reliability Engineer</li>
                        <li>🔹 Automation Engineer</li>
                        <li>🔹 CI/CD Pipeline Specialist</li>
                      </ul>
                      <p>
                        This certification validates your ability to automate,
                        monitor, and secure cloud-based applications using
                        DevOps practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="text">
                <h1>AWS Certified DevOps Engineer Professional</h1>
                <p>
                  A high-level course that teaches how to build, deploy, and
                  manage distributed applications using AWS DevOps tools and
                  services.
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
                  Demonstrates your expertise in implementing DevOps best
                  practices like automation, continuous integration, and
                  delivery in AWS.
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
                  13-week program including labs, real-world projects, and
                  pipeline implementation.
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
                      Boost your DevOps and automation skills
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Master CI/CD, monitoring, and IaC tools
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Increase demand in cloud-native roles
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
                  AWS CodePipeline, CodeBuild, CloudFormation, Terraform,
                  CloudWatch, SNS, Systems Manager, Lambda, and more.
                </p>
              </div>
            </div>

            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 6,100</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 6,100. You will be required to pay Ghc
                  2,100 for the first installment and Ghc 2,000 for each
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
                    week (Monday to Wednesday).
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
                    <b>Location:</b> Accra, Mallam-Gbawe or Online
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
