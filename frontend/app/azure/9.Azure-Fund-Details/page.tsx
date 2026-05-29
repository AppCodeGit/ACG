"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import AzureFundamentalsImage from "../images/1.azure-fundamentals.png";
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
          <span>Azure Fundamentals</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            <div className="item">
              <div className="image-container">
                <Image
                  src={AzureFundamentalsImage}
                  alt="Microsoft Azure Fundamentals"
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
                      <h3>🌐 Microsoft Azure Fundamentals (AZ-900)</h3>
                      <p>
                        Understand the basics of Azure services, workloads,
                        security, and pricing models. This foundational course
                        is your first step toward becoming an Azure
                        professional.
                      </p>
                      <div className="data-item">
                        📌 1: Cloud Concepts - Benefits, Models, and Cloud
                        Economics
                      </div>
                      <div className="data-item">
                        📌 2: Core Azure Services - Compute, Storage,
                        Networking, Databases
                      </div>
                      <div className="data-item">
                        📌 3: Azure Compute - Virtual Machines, App Services,
                        Containers, Functions
                      </div>
                      <div className="data-item">
                        📌 4: Azure Storage - Blob, Disk, File, Archive Storage
                        Tiers
                      </div>
                      <div className="data-item">
                        📌 5: Azure Networking - Virtual Networks, Load
                        Balancers, VPN Gateway
                      </div>
                      <div className="data-item">
                        📌 6: Identity, Governance & Compliance - Azure AD,
                        RBAC, Policy, Blueprints
                      </div>
                      <div className="data-item">
                        📌 7: Security & Monitoring - Security Center, Sentinel,
                        Monitor, Alerts
                      </div>
                      <div className="data-item">
                        📌 8: Pricing, SLAs & Lifecycle - Subscriptions, Cost
                        Management, Service Level Agreements
                      </div>
                      <div className="data-item">
                        📌 9: Azure Management Tools - Portal, CLI, PowerShell,
                        ARM Templates
                      </div>
                      <div className="data-item">
                        📌 10: Azure Marketplace & Support Plans
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
                          ✅ Understand core cloud principles with Microsoft
                          Azure
                        </li>
                        <li>
                          ✅ Navigate and use the Azure portal effectively
                        </li>
                        <li>
                          ✅ Learn Azure pricing, SLAs, and lifecycle management
                        </li>
                        <li>
                          ✅ Explore governance and compliance tools in Azure
                        </li>
                        <li>
                          ✅ Differentiate between IaaS, PaaS, and SaaS in Azure
                        </li>
                        <li>
                          ✅ Understand Azure security best practices and
                          monitoring
                        </li>
                        <li>✅ Prepare for the AZ-900 certification exam</li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🧰 Resource groups, VMs, and storage accounts in Azure
                          portal
                        </li>
                        <li>
                          🔒 Basic identity and access configurations with Azure
                          AD
                        </li>
                        <li>
                          📊 Azure Monitor dashboards and budgeting alerts
                        </li>
                        <li>
                          🌐 Virtual networks and basic networking
                          configurations
                        </li>
                        <li>
                          💰 Cost management and pricing calculator estimates
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
                          🔹 Azure Cloud Administrator - Manage and maintain
                          Azure resources
                        </li>
                        <li>
                          🔹 Junior Cloud Support Engineer - Provide technical
                          support for Azure services
                        </li>
                        <li>
                          🔹 Cloud Sales Specialist - Technical sales for
                          Microsoft Azure solutions
                        </li>
                        <li>🔹 IT Professional transitioning to cloud roles</li>
                        <li>
                          🔹 Solutions Architect (entry-level) - Design basic
                          cloud solutions
                        </li>
                        <li>
                          🔹 DevOps Assistant - Support CI/CD pipelines in Azure
                        </li>
                      </ul>
                      <p>
                        Ideal for beginners starting their journey into cloud
                        computing with Microsoft Azure. This certification is
                        the foundation for all other Azure role-based
                        certifications.
                      </p>
                      <h4>💰 Average Salary (Entry Level):</h4>
                      <p>
                        $60,000 - $85,000 per year (varies by role and location)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="text">
                <h1>Microsoft Azure Fundamentals (AZ-900)</h1>
                <p>
                  Master the foundational concepts of Microsoft Azure cloud
                  services, governance, and identity. This comprehensive course
                  prepares you for the AZ-900 certification exam and provides
                  hands-on experience with Azure's core services.
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
                  Validates your understanding of Azure fundamentals for cloud
                  computing roles. The AZ-900 certification is a prerequisite
                  for many advanced Azure certifications and demonstrates your
                  commitment to cloud technology.
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
                  6 weeks with instructor-led training and guided labs. Includes
                  40+ hours of content, hands-on exercises, and practice exams
                  to ensure you're ready for certification.
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
                      Build a solid foundation in Azure cloud computing
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Prepare for AZ-900 certification exam with confidence
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Learn cloud concepts, service models, and deployment
                      models
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Hands-on experience with Azure portal and core services
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Understand Azure pricing, SLAs, and support options
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Foundation for advanced Azure certifications
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
                  Azure Resource Manager, Azure AD, Azure Monitor, Storage
                  Accounts, Virtual Machines, App Services, Virtual Networks,
                  Load Balancers, Azure Policy, Subscriptions, Cost Management,
                  Azure CLI, PowerShell, and ARM Templates.
                </p>
              </div>
            </div>

            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 3,800</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 3,800. You will be required to pay Ghc
                  1,500 for the first installment and Ghc 1,150 for each
                  additional month.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Course duration:</b> 1.5 months (6 weeks), with classes
                    held 3 days a week (Monday to Wednesday).
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
                    laptop. Free Azure account recommended for hands-on
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
