"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import AzureAdminImage from "../images/2.azure-administrator-associate.png";
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
          <span>Azure Administrator Associate</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            <div className="item">
              <div className="image-container">
                <Image
                  src={AzureAdminImage}
                  alt="Azure Administrator Associate"
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
                      <h3>🛠️ Microsoft Azure Administrator (AZ-104)</h3>
                      <p>
                        Learn how to manage Azure cloud services including
                        storage, networking, and compute cloud capabilities.
                        This comprehensive course prepares you for the AZ-104
                        certification exam.
                      </p>
                      <div className="data-item">
                        📌 1: Managing Azure subscriptions and resources -
                        Resource Groups, Tags, Policies
                      </div>
                      <div className="data-item">
                        📌 2: Implementing storage solutions - Blob, Files,
                        Disks, Storage Accounts
                      </div>
                      <div className="data-item">
                        📌 3: Configuring virtual networking - VNets, Peering,
                        DNS, Load Balancers
                      </div>
                      <div className="data-item">
                        📌 4: Managing Azure identities - Azure AD, RBAC,
                        Conditional Access
                      </div>
                      <div className="data-item">
                        📌 5: Deploying and managing virtual machines - VM
                        Sizes, Availability Sets, Scale Sets
                      </div>
                      <div className="data-item">
                        📌 6: Implementing backup and recovery - Azure Backup,
                        Site Recovery
                      </div>
                      <div className="data-item">
                        📌 7: Monitoring and troubleshooting - Azure Monitor,
                        Alerts, Log Analytics
                      </div>
                      <div className="data-item">
                        📌 8: Network security - NSGs, ASGs, Firewall, VPN
                        Gateway
                      </div>
                      <div className="data-item">
                        📌 9: Governance and compliance - Azure Policy,
                        Blueprints, Management Groups
                      </div>
                      <div className="data-item">
                        📌 10: Automation - ARM Templates, PowerShell, CLI,
                        Runbooks
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
                          ✅ Administer Azure subscriptions and manage resources
                          effectively
                        </li>
                        <li>
                          ✅ Secure identities and manage access with Azure AD
                          and RBAC
                        </li>
                        <li>
                          ✅ Deploy and manage virtual machines with high
                          availability
                        </li>
                        <li>
                          ✅ Configure virtual networks, peering, and network
                          security
                        </li>
                        <li>
                          ✅ Implement storage solutions including blobs, files,
                          and disks
                        </li>
                        <li>
                          ✅ Monitor Azure resources with Azure Monitor and
                          alerts
                        </li>
                        <li>
                          ✅ Automate deployments using ARM templates and
                          PowerShell
                        </li>
                        <li>
                          ✅ Implement backup and disaster recovery strategies
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🌐 Multi-tier virtual networks with subnets and
                          peering
                        </li>
                        <li>🧰 Automated VM deployments using ARM templates</li>
                        <li>
                          🔐 Role-based access control and conditional access
                          policies
                        </li>
                        <li>
                          📊 Monitoring dashboards with Azure Monitor and Log
                          Analytics
                        </li>
                        <li>
                          💾 Backup and disaster recovery solutions with Azure
                          Backup
                        </li>
                        <li>
                          🏗️ Highly available infrastructure with Availability
                          Sets and Load Balancers
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
                          🔹 Azure Administrator - Manage Azure infrastructure
                          and services
                        </li>
                        <li>
                          🔹 Cloud Support Engineer - Provide technical support
                          for Azure customers
                        </li>
                        <li>
                          🔹 Infrastructure Engineer (Azure) - Design and
                          implement Azure solutions
                        </li>
                        <li>
                          🔹 Cloud Operations Analyst - Monitor and optimize
                          Azure environments
                        </li>
                        <li>
                          🔹 DevOps Engineer (Entry) - Support CI/CD pipelines
                          in Azure
                        </li>
                        <li>
                          🔹 System Administrator (Cloud) - Manage hybrid cloud
                          environments
                        </li>
                      </ul>
                      <p>
                        This certification is ideal for professionals managing
                        cloud services that span storage, networking, and
                        compute. It's one of the most sought-after Azure
                        certifications in the job market.
                      </p>
                      <h4>💰 Average Salary (Global):</h4>
                      <p>
                        $75,000 - $110,000 per year depending on experience and
                        location
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="text">
                <h1>Microsoft Azure Administrator Associate (AZ-104)</h1>
                <p>
                  Learn the foundational skills required to manage Azure
                  infrastructure, including network configuration, identity
                  management, and monitoring solutions. This hands-on course
                  prepares you for one of the most popular Azure certifications.
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
                  Validates your skills to implement, monitor, and maintain
                  Microsoft Azure solutions. The AZ-104 certification is a
                  prerequisite for many advanced Azure role-based certifications
                  and is highly valued by employers.
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
                  12 weeks of instructor-led training with hands-on labs and
                  mock assessments. Includes 80+ hours of content and real-world
                  scenarios.
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
                      Understand cloud concepts and Azure services in depth
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Gain hands-on skills for real Azure environments
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Boost job opportunities in Microsoft cloud ecosystem
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Prepare for AZ-104 certification exam with practice tests
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Learn to manage hybrid cloud infrastructure
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Automate Azure tasks with PowerShell and CLI
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
                  Azure Virtual Machines, Availability Sets, Scale Sets, Blob
                  Storage, Azure Files, Azure AD, RBAC, Conditional Access,
                  Azure Monitor, Log Analytics, Virtual Networks, VNet Peering,
                  Load Balancers, NSGs, Azure Firewall, VPN Gateway, Azure
                  Backup, Site Recovery, ARM Templates, PowerShell, Azure CLI,
                  Azure Policy, Management Groups.
                </p>
              </div>
            </div>

            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 5,650</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 5,650. You will be required to pay Ghc
                  2,000 for the first installment and Ghc 1,825 for each
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
                    week (Monday to Wednesday). Includes 12 weeks of intensive
                    training.
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
                    laptop. Azure subscription required for hands-on labs (free
                    trial available).
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
