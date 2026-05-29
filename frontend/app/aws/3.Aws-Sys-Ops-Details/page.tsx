"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import SysOpsImage from "../images/AWS-Certified-Administrator-Associate.webp";
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
          <span>AWS SysOps Associate</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            <div className="item">
              <div className="image-container">
                <Image
                  src={SysOpsImage}
                  alt="AWS Certified SysOps Administrator Associate"
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
                      <h3>📘 AWS Certified SysOps Administrator Associate</h3>
                      <p>
                        This course prepares you to manage AWS operations and
                        infrastructure:
                      </p>
                      <div className="data-item">
                        📌 1: Monitoring and Reporting
                      </div>
                      <div className="data-item">
                        📌 2: High Availability and Backup Strategies
                      </div>
                      <div className="data-item">
                        📌 3: Deployment and Provisioning
                      </div>
                      <div className="data-item">
                        📌 4: Automation and Optimization
                      </div>
                      <div className="data-item">
                        📌 5: Security and Compliance
                      </div>
                      <div className="data-item">
                        📌 6: Networking and Content Delivery
                      </div>
                      <div className="data-item">
                        📌 7: Troubleshooting and Disaster Recovery
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
                          ✅ Monitor AWS resources and performance metrics
                        </li>
                        <li>✅ Automate tasks using AWS services</li>
                        <li>✅ Implement backup and restore strategies</li>
                        <li>✅ Troubleshoot AWS environments efficiently</li>
                        <li>
                          ✅ Secure AWS infrastructure and manage user access
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <p>Hands-on projects in managing cloud infrastructure:</p>
                      <ul>
                        <li>
                          🔧 Setup of CloudWatch Alarms and Custom Metrics
                        </li>
                        <li>🔁 Automation using AWS Systems Manager</li>
                        <li>
                          💾 Backup/Restore implementation using AWS Backup
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
                        <li>🔹 AWS SysOps Administrator</li>
                        <li>🔹 Cloud Support Engineer</li>
                        <li>🔹 DevOps Support Engineer</li>
                        <li>🔹 Infrastructure Operations Engineer</li>
                      </ul>
                      <p>
                        This certification sets the foundation for operational
                        excellence in managing and maintaining AWS
                        infrastructure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Item */}
            <div className="item">
              <div className="text">
                <h1>AWS Certified SysOps Administrator Associate</h1>
                <p>
                  A certification course focused on monitoring, managing, and
                  operating AWS infrastructure. You'll learn to optimize cloud
                  environments, maintain security, and automate routine
                  operations.
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
                  Validates your ability to manage AWS environments and
                  operational tasks. It also covers automation, security,
                  monitoring, and incident response.
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
                  The course runs for 13 weeks including labs and exercises
                  tailored to SysOps operations.
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
                      Master AWS monitoring and troubleshooting
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Increase employability in cloud operations
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Improve infrastructure efficiency and availability
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Learn to automate tasks with AWS tools
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
                  AWS CloudWatch, EC2, Systems Manager, S3, IAM, Auto Scaling,
                  Elastic Load Balancing, and security best practices.
                </p>
              </div>
            </div>

            {/* Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 5,200</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 5,200. You will be required to pay Ghc
                  1,800 for the first installment and Ghc 1,700 for each
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
