"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import DevImage from "../images/AWS-Developer-Associate.png";
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
          <span>AWS Dev Associate</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            <div className="item">
              <div className="image-container">
                <Image src={DevImage} alt="AWS Certified Developer Associate" />
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
                      <h3>👨‍💻 AWS Certified Developer Associate</h3>
                      <p>
                        This course teaches how to develop and maintain
                        applications on AWS.
                      </p>
                      <div className="data-item">
                        📌 1: AWS SDKs and CLI for Development
                      </div>
                      <div className="data-item">
                        📌 2: Serverless Architecture using Lambda
                      </div>
                      <div className="data-item">
                        📌 3: API Gateway & DynamoDB Integration
                      </div>
                      <div className="data-item">
                        📌 4: Deploying Applications to AWS
                      </div>
                      <div className="data-item">
                        📌 5: CI/CD Best Practices for Developers
                      </div>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 2 ? "show" : ""}`}
                  >
                    <div className="course-data">
                      <h3>🎯 Learning Goals</h3>
                      <ul>
                        <li>✅ Develop serverless applications</li>
                        <li>✅ Interact with AWS services using SDK</li>
                        <li>✅ Integrate APIs and databases</li>
                        <li>✅ Handle authentication and error tracking</li>
                        <li>✅ Test and deploy applications using CI/CD</li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📱 Serverless RESTful API using Lambda and API Gateway
                        </li>
                        <li>📦 Full-stack app with React and AWS backend</li>
                        <li>
                          🚀 Continuous delivery pipeline using CodePipeline
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
                        <li>🔹 Cloud Application Developer</li>
                        <li>🔹 Backend Developer (AWS)</li>
                        <li>🔹 Full-Stack Developer with AWS</li>
                        <li>🔹 Junior Cloud Engineer</li>
                      </ul>
                      <p>
                        This course prepares developers to build secure,
                        scalable, and cloud-native applications on AWS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="text">
                <h1>AWS Certified Developer Associate</h1>
                <p>
                  A practical course teaching how to build, deploy, and maintain
                  applications on AWS using modern cloud-native practices.
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
                  Validates your ability to develop and deploy applications
                  using AWS services.
                </p>
              </div>
              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>{" "}
                  Duration
                </h4>
                <p>12-week program including labs and project work</p>
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
                      Master application development on AWS
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Build secure and scalable APIs
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Strengthen your cloud development skills
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
                  AWS Lambda, API Gateway, DynamoDB, IAM, CloudFormation,
                  CodePipeline, and more.
                </p>
              </div>
            </div>

            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 5,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 5,500. You will be required to pay Ghc
                  1,900 for the first installment and Ghc 1,800 for each
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
