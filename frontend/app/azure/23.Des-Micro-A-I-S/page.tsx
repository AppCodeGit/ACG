"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import ArchitectImage from "../images/15.Designing Microsoft Azure Infrastructure Solutions.AZ-305.png";
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
          <span>Designing Microsoft Azure Infrastructure Solutions</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={ArchitectImage}
                  alt="Designing Microsoft Azure Infrastructure Solutions"
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
                        🏗️ Designing Microsoft Azure Infrastructure Solutions
                        (AZ-305)
                      </h3>
                      <p>
                        This comprehensive course teaches you how to design
                        complete Azure infrastructure solutions that meet
                        business requirements. You'll learn to design compute,
                        storage, networking, security, and identity solutions
                        while considering scalability, reliability, and cost
                        optimization.
                      </p>
                      <div className="data-item">
                        📌 1: Azure Architecture Fundamentals - Well-architected
                        framework, Design principles, Governance
                      </div>
                      <div className="data-item">
                        📌 2: Designing Compute Infrastructure - VMs,
                        Containers, App Services, Serverless
                      </div>
                      <div className="data-item">
                        📌 3: Designing Storage Solutions - Blob storage, Files,
                        Disks, Data lakes
                      </div>
                      <div className="data-item">
                        📌 4: Designing Networking Solutions - VNet design,
                        Connectivity, Load balancing, DNS
                      </div>
                      <div className="data-item">
                        📌 5: Designing Security and Identity Solutions -
                        Identity management, Access control, Security monitoring
                      </div>
                      <div className="data-item">
                        📌 6: Designing Business Continuity Strategies - Backup,
                        Disaster recovery, High availability
                      </div>
                      <div className="data-item">
                        📌 7: Designing for Deployment and Migration - Migration
                        strategies, DevOps, Infrastructure as Code
                      </div>
                      <div className="data-item">
                        📌 8: Cost Optimization and Governance - Cost
                        management, Azure Policy, Resource organization
                      </div>
                      <div className="data-item">
                        📌 9: Database and Analytics Solutions - SQL databases,
                        NoSQL, Data warehousing
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and AZ-305 Certification
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
                          complete Azure infrastructure solutions that meet
                          business requirements. You'll learn to design compute,
                          storage, networking, security, and identity solutions
                          while considering scalability, reliability, and cost
                          optimization.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Experience with Azure administration and basic
                          understanding of cloud concepts. Familiarity with
                          networking and security principles is recommended.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Design Azure compute and web application solutions
                          using best practices
                        </li>
                        <li>
                          ✅ Architect storage and data solutions for different
                          workload requirements
                        </li>
                        <li>
                          ✅ Design networking and hybrid connectivity solutions
                          for enterprise environments
                        </li>
                        <li>
                          ✅ Implement security and identity solutions following
                          zero-trust principles
                        </li>
                        <li>
                          ✅ Design for business continuity and disaster
                          recovery across regions
                        </li>
                        <li>
                          ✅ Optimize infrastructure costs while maintaining
                          governance and compliance
                        </li>
                        <li>
                          ✅ Design database solutions including SQL, NoSQL, and
                          analytics platforms
                        </li>
                        <li>
                          ✅ Plan and execute migration strategies for
                          on-premises workloads
                        </li>
                        <li>
                          ✅ Implement DevOps practices and infrastructure as
                          code
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's AZ-305 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Design:</h4>
                      <ul>
                        <li>
                          🏛️ Complete enterprise-scale Azure architecture with
                          multiple regions
                        </li>
                        <li>
                          🔗 Hybrid connectivity solution with ExpressRoute and
                          VPN
                        </li>
                        <li>
                          🔄 Highly available application architecture with load
                          balancing
                        </li>
                        <li>
                          💾 Disaster recovery strategy with Azure Site Recovery
                        </li>
                        <li>
                          🔐 Zero-trust security architecture with Azure AD and
                          Defender
                        </li>
                        <li>
                          📊 Cost-optimized solution with governance policies
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on design exercises and case studies:
                      </p>
                      <ul>
                        <li>Module 1: Azure Architecture Fundamentals</li>
                        <li>Module 2: Compute Infrastructure Design</li>
                        <li>Module 3: Storage Solutions Design</li>
                        <li>Module 4: Networking Solutions Design</li>
                        <li>Module 5: Security and Identity Design</li>
                        <li>Module 6: Business Continuity Design</li>
                        <li>Module 7: Deployment and Migration Strategies</li>
                        <li>Module 8: Cost Optimization and Governance</li>
                        <li>Module 9: Database and Analytics Design</li>
                        <li>Module 10: Capstone Architecture Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with case studies and design
                        workshops. Includes access to Azure architecture
                        templates and best practice patterns.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: Azure
                        Solutions Architect Expert (AZ-305) exam. Includes one
                        free exam attempt voucher and practice tests.
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
                          🔹 <strong>Azure Solutions Architect:</strong> Design
                          complete Azure solutions that meet business
                          requirements. Average salary: $130,000 - $175,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Infrastructure Architect:</strong>{" "}
                          Plan and implement cloud infrastructure at scale.
                          Average salary: $125,000 - $170,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Consultant:</strong> Advise
                          organizations on Azure infrastructure design. Average
                          salary: $120,000 - $165,000
                        </li>
                        <li>
                          🔹 <strong>DevOps Architect:</strong> Design
                          infrastructure for CI/CD pipelines. Average salary:
                          $128,000 - $172,000
                        </li>
                        <li>
                          🔹 <strong>Enterprise Architect:</strong> Design cloud
                          strategies for large organizations. Average salary:
                          $140,000 - $185,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Migration Architect:</strong> Plan
                          and execute large-scale migrations to Azure. Average
                          salary: $135,000 - $180,000
                        </li>
                      </ul>
                      <p>
                        Solutions architects are among the highest-paid
                        professionals in cloud computing, with expertise in high
                        demand globally.
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
                  Designing Microsoft Azure Infrastructure Solutions (AZ-305)
                </h1>
                <p>
                  Master the skills to design comprehensive Microsoft Azure
                  infrastructure solutions that meet business requirements. This
                  expert-level course covers all aspects of Azure infrastructure
                  design including compute, storage, networking, security, and
                  business continuity. You'll learn to create solutions that are
                  secure, scalable, and cost-effective while preparing for the
                  AZ-305 certification exam.
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
                  Solutions Architect Expert certification (AZ-305). The
                  certification validates your ability to design cloud and
                  hybrid solutions that run on Microsoft Azure. This is one of
                  the most prestigious Azure certifications for architects.
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
                  training and 80+ hours of design workshops and case studies.
                  Includes access to Azure architecture resources.
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
                  Benefits of completing this Azure Infrastructure Solutions
                  course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master Azure infrastructure design principles at expert
                      level
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for AZ-305 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand cloud architect roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of enterprise architecture designs
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
                  Azure Compute (VMs, VM Scale Sets, Containers, AKS, App
                  Services, Azure Functions), Azure Storage (Blob, Files, Disks,
                  Archive), Azure Networking (VNets, VNet Peering, VPN Gateway,
                  ExpressRoute, Load Balancer, Application Gateway, Traffic
                  Manager, Front Door, Azure DNS), Azure Active Directory, Azure
                  Security Center, Azure Defender, Azure Policy, Azure
                  Blueprints, Azure Monitor, Azure Log Analytics, Azure Site
                  Recovery, Azure Backup, Azure Cost Management, and Azure
                  Migrate.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 8,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 8,500. You will be required to pay Ghc
                  3,000 for the first installment and Ghc 2,750 for each
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
                    week (Monday to Wednesday). Students will work on case
                    studies and design projects from Thursday to Sunday.
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
                    Azure architecture templates and design patterns. Experience
                    with Azure administration is recommended.
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
