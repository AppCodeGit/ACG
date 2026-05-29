"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import AzureDevImage from "../images/7.Developing Solutions for Microsoft Azure AZ-204.webp";
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
          <span>Developing Solutions for Microsoft Azure</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={AzureDevImage}
                  alt="Developing Solutions for Microsoft Azure"
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
                        💻 Developing Solutions for Microsoft Azure (AZ-204)
                      </h3>
                      <p>
                        This comprehensive course teaches you how to design,
                        build, test, and maintain cloud applications and
                        services on Microsoft Azure. You'll learn to implement
                        Azure compute solutions, work with Azure storage
                        options, integrate Azure security features, and connect
                        to Azure services using APIs.
                      </p>
                      <div className="data-item">
                        📌 1: Azure Development Fundamentals - SDKs, APIs, Azure
                        CLI, development tools
                      </div>
                      <div className="data-item">
                        📌 2: Developing Azure Compute Solutions - App Services,
                        Functions, Containers, AKS
                      </div>
                      <div className="data-item">
                        📌 3: Developing for Azure Storage - Blobs, Tables,
                        Queues, Files, Cosmos DB
                      </div>
                      <div className="data-item">
                        📌 4: Implementing Azure Security - Authentication,
                        Authorization, Key Vault, Managed Identities
                      </div>
                      <div className="data-item">
                        📌 5: Monitoring, Troubleshooting and Optimizing
                        Solutions - Application Insights, Log Analytics
                      </div>
                      <div className="data-item">
                        📌 6: Connecting to and Consuming Azure Services -
                        Service Bus, Event Grid, Event Hubs
                      </div>
                      <div className="data-item">
                        📌 7: Implementing Authentication and Authorization -
                        Azure AD, OAuth2, OpenID Connect, Microsoft Identity
                        Platform
                      </div>
                      <div className="data-item">
                        📌 8: Caching and Content Delivery - Redis Cache, CDN,
                        Front Door
                      </div>
                      <div className="data-item">
                        📌 9: API Management - Creating and managing APIs,
                        Policies, Versioning
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and AZ-204 Certification
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
                          This comprehensive course teaches you how to design,
                          build, test, and maintain cloud applications and
                          services on Microsoft Azure. You'll learn to implement
                          Azure compute solutions, work with Azure storage
                          options, integrate Azure security features, and
                          connect to Azure services using APIs.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of programming concepts and
                          familiarity with C#, Python, or JavaScript. Experience
                          with cloud development is helpful but not required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Develop Azure compute solutions using VMs,
                          containers, and serverless technologies
                        </li>
                        <li>
                          ✅ Implement Azure storage solutions including blobs,
                          files, and Cosmos DB
                        </li>
                        <li>
                          ✅ Secure applications using Azure Active Directory
                          and Key Vault
                        </li>
                        <li>
                          ✅ Monitor and optimize Azure solutions with
                          Application Insights
                        </li>
                        <li>
                          ✅ Connect applications to Azure services using REST
                          APIs and SDKs
                        </li>
                        <li>
                          ✅ Implement authentication and authorization with
                          Microsoft Identity Platform
                        </li>
                        <li>
                          ✅ Create and manage APIs using Azure API Management
                        </li>
                        <li>
                          ✅ Implement caching and content delivery solutions
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's AZ-204 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🌐 Full-stack web application deployed on Azure App
                          Service
                        </li>
                        <li>
                          ⚡ Serverless API using Azure Functions and Cosmos DB
                        </li>
                        <li>
                          🔐 Secure application with Azure AD authentication and
                          Key Vault integration
                        </li>
                        <li>
                          📦 Containerized application deployed to Azure
                          Kubernetes Service
                        </li>
                        <li>
                          📊 Monitoring dashboard with Application Insights
                        </li>
                        <li>
                          🔁 Event-driven application using Service Bus and
                          Event Grid
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on labs using Azure development tools:
                      </p>
                      <ul>
                        <li>Module 1: Azure Development Fundamentals</li>
                        <li>Module 2: Compute Solutions Development</li>
                        <li>Module 3: Storage Solutions Development</li>
                        <li>Module 4: Security Implementation</li>
                        <li>Module 5: Solution Monitoring and Optimization</li>
                        <li>Module 6: Azure Service Integration</li>
                        <li>Module 7: Authentication Implementation</li>
                        <li>Module 8: Caching and Content Delivery</li>
                        <li>Module 9: API Management</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on coding labs in
                        live Azure environment. Includes access to Azure
                        development resources and credits.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: Azure
                        Developer Associate (AZ-204) exam. Includes one free
                        exam attempt voucher and practice tests.
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
                          🔹 <strong>Azure Developer:</strong> Build and
                          maintain cloud-native applications on Azure. Average
                          salary: $95,000 - $140,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Application Developer:</strong>{" "}
                          Design and implement scalable cloud solutions. Average
                          salary: $100,000 - $145,000
                        </li>
                        <li>
                          🔹 <strong>Full Stack Developer (Azure):</strong>{" "}
                          Develop end-to-end solutions using Azure services.
                          Average salary: $90,000 - $135,000
                        </li>
                        <li>
                          🔹 <strong>DevOps Engineer (Azure):</strong> Implement
                          CI/CD pipelines for Azure applications. Average
                          salary: $105,000 - $150,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Solutions Developer:</strong> Create
                          custom solutions leveraging Azure services. Average
                          salary: $98,000 - $142,000
                        </li>
                        <li>
                          🔹 <strong>Serverless Developer:</strong> Specialize
                          in Azure Functions and event-driven architectures.
                          Average salary: $102,000 - $148,000
                        </li>
                      </ul>
                      <p>
                        Azure development skills are in high demand as
                        organizations accelerate their cloud adoption.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Developing Solutions for Microsoft Azure (AZ-204)</h1>
                <p>
                  Master the skills to build cloud-native applications and
                  services on Microsoft Azure. This comprehensive course covers
                  all aspects of Azure development including compute solutions,
                  storage implementations, security features, and service
                  integration. You'll gain hands-on experience with Azure
                  development tools while preparing for the AZ-204 certification
                  exam, one of the most valuable developer certifications in the
                  cloud industry.
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
                  Developer Associate certification (AZ-204). The certification
                  validates your ability to design, build, test, and maintain
                  cloud applications and services on Azure. This certification
                  is essential for developers working with Microsoft cloud
                  technologies.
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
                  Benefits of completing this Azure Development course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Azure development tools and
                      services
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for AZ-204 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand cloud development roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of real-world cloud applications
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
                  Azure App Services, Azure Functions, Azure Kubernetes Service
                  (AKS), Azure Container Instances, Azure Storage (Blobs,
                  Tables, Queues, Files), Cosmos DB, Azure SQL Database, Azure
                  Active Directory, Azure Key Vault, Azure Monitor, Application
                  Insights, Azure API Management, Azure Service Bus, Event Grid,
                  Event Hubs, Azure Redis Cache, Azure CDN, Front Door, and
                  other Azure development services.
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
                    Azure development resources for hands-on labs. Basic
                    programming knowledge in C#, Python, or JavaScript is
                    recommended.
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
