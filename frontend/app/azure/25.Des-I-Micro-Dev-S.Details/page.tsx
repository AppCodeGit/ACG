"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import DevOpsImage from "../images/17.CERT-Expert-DevOps-Engineer.AZ-400.png";
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
    <div className="page-wrapper">
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
          <span>Designing and Implementing Microsoft DevOps Solutions</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={DevOpsImage}
                  alt="Designing and Implementing Microsoft DevOps Solutions"
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
                        ⚙️ Designing and Implementing Microsoft DevOps Solutions
                        (AZ-400)
                      </h3>
                      <p>
                        This comprehensive course teaches you how to design and
                        implement DevOps practices using Microsoft tools and
                        services. You'll learn to implement continuous
                        integration, continuous delivery, infrastructure as
                        code, and application monitoring using Azure DevOps,
                        GitHub Actions, and related technologies.
                      </p>
                      <div className="data-item">
                        📌 1: DevOps Principles and Practices - Culture,
                        Collaboration, Automation, Measurement
                      </div>
                      <div className="data-item">
                        📌 2: Azure DevOps and GitHub Ecosystem - Boards, Repos,
                        Pipelines, Actions, Packages
                      </div>
                      <div className="data-item">
                        📌 3: Source Control with Git - Branching strategies,
                        Pull requests, Code reviews
                      </div>
                      <div className="data-item">
                        📌 4: CI/CD Pipelines Implementation - Build pipelines,
                        Release pipelines, Multi-stage YAML
                      </div>
                      <div className="data-item">
                        📌 5: Infrastructure as Code (IaC) - ARM templates,
                        Bicep, Terraform
                      </div>
                      <div className="data-item">
                        📌 6: Configuration Management - Ansible, PowerShell
                        DSC, Azure Automation
                      </div>
                      <div className="data-item">
                        📌 7: Monitoring and Feedback Systems - Azure Monitor,
                        Application Insights, Dashboards
                      </div>
                      <div className="data-item">
                        📌 8: Security and Compliance in DevOps - DevSecOps,
                        Secret management, Policy as Code
                      </div>
                      <div className="data-item">
                        📌 9: Containerization and Orchestration - Docker,
                        Kubernetes, AKS
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and AZ-400 Certification
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
                          This comprehensive course teaches you how to design
                          and implement DevOps practices using Microsoft tools
                          and services. You'll learn to implement continuous
                          integration, continuous delivery, infrastructure as
                          code, and application monitoring using Azure DevOps,
                          GitHub Actions, and related technologies.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of software development and IT
                          operations. Familiarity with Azure and version control
                          concepts is helpful but not required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Implement DevOps development processes with Azure
                          Boards and GitHub Projects
                        </li>
                        <li>
                          ✅ Design and implement CI/CD pipelines using Azure
                          Pipelines and GitHub Actions
                        </li>
                        <li>
                          ✅ Manage source control with Git including branching
                          strategies and pull requests
                        </li>
                        <li>
                          ✅ Implement infrastructure as code (IaC) using ARM,
                          Bicep, and Terraform
                        </li>
                        <li>
                          ✅ Design and implement dependency management with
                          Azure Artifacts
                        </li>
                        <li>
                          ✅ Implement continuous feedback systems with Azure
                          Monitor and Application Insights
                        </li>
                        <li>
                          ✅ Integrate security and compliance into DevOps
                          workflows (DevSecOps)
                        </li>
                        <li>
                          ✅ Implement containerization strategies with Docker
                          and Kubernetes
                        </li>
                        <li>
                          ✅ Automate configuration management using various
                          tools
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's AZ-400 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🔄 Complete CI/CD pipeline with Azure Pipelines and
                          multi-stage YAML
                        </li>
                        <li>
                          🏗️ Infrastructure as Code deployment using Bicep and
                          Terraform
                        </li>
                        <li>
                          📊 Monitoring solution with Application Insights and
                          dashboards
                        </li>
                        <li>🐳 Containerized application deployment to AKS</li>
                        <li>
                          🔐 DevSecOps pipeline with integrated security
                          scanning
                        </li>
                        <li>
                          📋 Automated configuration management with PowerShell
                          DSC
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on labs using Azure DevOps and GitHub:
                      </p>
                      <ul>
                        <li>Module 1: DevOps Principles and Practices</li>
                        <li>Module 2: Azure DevOps and GitHub Ecosystem</li>
                        <li>Module 3: Source Control with Git</li>
                        <li>Module 4: CI/CD Pipelines Implementation</li>
                        <li>Module 5: Infrastructure as Code (IaC)</li>
                        <li>Module 6: Configuration Management</li>
                        <li>Module 7: Monitoring and Feedback Systems</li>
                        <li>Module 8: Security and Compliance in DevOps</li>
                        <li>Module 9: Containerization and Orchestration</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on labs using Azure
                        DevOps and GitHub. Includes access to Azure resources
                        for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: DevOps
                        Engineer Expert (AZ-400) exam. Includes one free exam
                        attempt voucher and practice tests.
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
                          🔹 <strong>DevOps Engineer:</strong> Implement and
                          manage CI/CD pipelines and infrastructure. Average
                          salary: $110,000 - $155,000
                        </li>
                        <li>
                          🔹 <strong>Cloud DevOps Specialist:</strong> Automate
                          cloud deployments and operations. Average salary:
                          $115,000 - $160,000
                        </li>
                        <li>
                          🔹 <strong>Release Manager:</strong> Oversee software
                          releases and deployment processes. Average salary:
                          $105,000 - $145,000
                        </li>
                        <li>
                          🔹 <strong>Site Reliability Engineer (SRE):</strong>{" "}
                          Ensure system reliability and performance. Average
                          salary: $120,000 - $165,000
                        </li>
                        <li>
                          🔹 <strong>Automation Architect:</strong> Design
                          automation solutions for development workflows.
                          Average salary: $125,000 - $170,000
                        </li>
                        <li>
                          🔹 <strong>DevSecOps Engineer:</strong> Integrate
                          security into DevOps pipelines. Average salary:
                          $118,000 - $162,000
                        </li>
                      </ul>
                      <p>
                        DevOps professionals are in extremely high demand as
                        organizations accelerate their software delivery
                        capabilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>
                  Designing and Implementing Microsoft DevOps Solutions (AZ-400)
                </h1>
                <p>
                  Master the skills to design and implement comprehensive DevOps
                  solutions using Microsoft technologies. This expert-level
                  course covers all aspects of DevOps implementation including
                  CI/CD pipelines, infrastructure as code, configuration
                  management, and monitoring. You'll gain hands-on experience
                  with Azure DevOps and GitHub while preparing for the AZ-400
                  certification exam.
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
                  This course prepares you for the Microsoft Certified: DevOps
                  Engineer Expert certification (AZ-400). The certification
                  validates your ability to combine people, processes, and
                  technologies to continuously deliver valuable products and
                  services. This is a highly respected certification in the
                  DevOps community.
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
                  The course is 10 weeks long, with 60 hours of instructor-led
                  training and 80+ hours of hands-on labs and projects. Includes
                  access to Azure DevOps and GitHub resources.
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
                  Benefits of completing this DevOps Solutions course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Azure DevOps and GitHub
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for AZ-400 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand DevOps engineering roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of real-world DevOps implementations
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
                  Azure DevOps (Boards, Repos, Pipelines, Test Plans,
                  Artifacts), GitHub (Actions, Projects, Advanced Security), Git
                  (Branching, Merging, Pull Requests), Azure Pipelines (YAML,
                  Classic), Infrastructure as Code (ARM templates, Bicep,
                  Terraform), Configuration Management (Ansible, PowerShell DSC,
                  Azure Automation), Containerization (Docker, AKS), Monitoring
                  (Azure Monitor, Application Insights), and Security (Azure
                  Security Center, Key Vault).
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 7,800</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 7,800. You will be required to pay Ghc
                  2,800 for the first installment and Ghc 2,500 for each
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
                    week (Monday to Wednesday). Students will work on DevOps
                    projects from Thursday to Sunday.
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
                    Azure DevOps and GitHub for hands-on labs. Basic programming
                    knowledge is recommended. Includes Azure credits for
                    practice.
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
    </div>
  );
};

export default Details;
