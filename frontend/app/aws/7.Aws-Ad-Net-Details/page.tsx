"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import NetworkingImage from "../images/AWS-Certified-Advanced-Networking-Specialty.png";
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
          <span>AWS Advanced Networking Specialty</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            <div className="item">
              <div className="image-container">
                <Image
                  src={NetworkingImage}
                  alt="AWS Certified Advanced Networking Specialty"
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
                      <h3>🌐 AWS Certified Advanced Networking Specialty</h3>
                      <p>
                        This course equips professionals with advanced network
                        design and implementation skills on AWS.
                      </p>
                      <div className="data-item">
                        📌 1: Hybrid IT Network Architectures - Direct Connect,
                        VPN, Transit Gateway
                      </div>
                      <div className="data-item">
                        📌 2: AWS Direct Connect & VPN - Public/Private VIF, BGP
                        Routing, VPN CloudHub
                      </div>
                      <div className="data-item">
                        📌 3: Advanced VPC Designs - Multi-VPC, VPC Peering,
                        Transit Gateway, VPC Endpoints
                      </div>
                      <div className="data-item">
                        📌 4: Network Monitoring & Troubleshooting - VPC Flow
                        Logs, Reachability Analyzer, CloudWatch Metrics
                      </div>
                      <div className="data-item">
                        📌 5: Automation using AWS CLI & SDKs - Infrastructure
                        as Code, Network Automation
                      </div>
                      <div className="data-item">
                        📌 6: DNS & Content Delivery - Route 53, CloudFront,
                        Global Accelerator
                      </div>
                      <div className="data-item">
                        📌 7: Network Security - Network ACLs, Security Groups,
                        AWS WAF, Shield, Firewall Manager
                      </div>
                      <div className="data-item">
                        📌 8: Load Balancing & Traffic Management - ALB, NLB,
                        Gateway Load Balancer, Target Groups
                      </div>
                      <div className="data-item">
                        📌 9: IP Addressing & Routing - CIDR, Subnetting, Route
                        Tables, BGP Communities
                      </div>
                      <div className="data-item">
                        📌 10: High Availability & Failover - Multi-AZ,
                        Multi-Region, Route 53 Routing Policies
                      </div>
                      <div className="data-item">
                        📌 11: Network Cost Optimization - Data Transfer Costs,
                        NAT Gateway vs Instance, VPC Endpoints
                      </div>
                      <div className="data-item">
                        📌 12: Network Compliance & Governance - Network
                        Segmentation, Audit Logs, AWS Config Rules
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
                          ✅ Design and implement scalable hybrid networks
                        </li>
                        <li>✅ Configure secure and efficient connectivity</li>
                        <li>✅ Monitor and troubleshoot network performance</li>
                        <li>✅ Automate network operations with AWS tools</li>
                        <li>
                          ✅ Implement advanced routing and traffic management
                        </li>
                        <li>✅ Optimize network costs and performance</li>
                        <li>
                          ✅ Design disaster recovery and high availability
                          networks
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🌐 Multi-VPC architecture with centralized egress and
                          Transit Gateway
                        </li>
                        <li>
                          🔒 Secure hybrid network using Direct Connect & VPN
                          with BGP routing
                        </li>
                        <li>
                          📡 Automated network monitoring using CloudWatch, Flow
                          Logs, and Dashboards
                        </li>
                        <li>
                          ⚡ Global content delivery setup with CloudFront and
                          Global Accelerator
                        </li>
                        <li>
                          🛡️ Network security architecture with WAF, Shield, and
                          Network Firewall
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
                        <li>🔹 Senior Network Engineer (Cloud)</li>
                        <li>🔹 Cloud Infrastructure Architect</li>
                        <li>🔹 Cloud Network Consultant</li>
                        <li>🔹 AWS Network Specialist</li>
                        <li>🔹 Hybrid Cloud Architect</li>
                        <li>🔹 Network Security Engineer</li>
                        <li>🔹 Site Reliability Engineer (Network Focus)</li>
                      </ul>
                      <p>
                        Ideal for professionals responsible for designing,
                        implementing, and securing complex AWS and hybrid
                        network infrastructures.
                      </p>
                      <h4>💰 Average Salary (Global):</h4>
                      <p>$120,000 - $160,000 per year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="item">
              <div className="text">
                <h1>AWS Certified Advanced Networking Specialty</h1>
                <p>
                  Gain in-depth skills in designing and managing complex AWS and
                  hybrid networking architectures, ideal for IT professionals
                  focused on network engineering in the cloud. This
                  certification validates advanced networking knowledge and the
                  ability to design, implement, and optimize AWS network
                  solutions.
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
                  Validates expertise in complex networking tasks, including
                  hybrid connectivity, advanced routing, network automation, and
                  security in AWS environments. This certification is recognized
                  globally as a standard for advanced cloud networking
                  professionals.
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
                  12 weeks of expert-level networking sessions with real-world
                  AWS lab practices, including 100+ hours of hands-on exercises
                  and 5 comprehensive projects.
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
                      Master hybrid and cloud networking at an expert level
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Get hands-on experience with advanced AWS network tools
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Prepare for high-paying cloud network roles globally
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Design enterprise-grade network architectures
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Implement network automation and Infrastructure as Code
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>{" "}
                      Optimize network performance and costs effectively
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
                  AWS VPC, Direct Connect, Transit Gateway, Route 53,
                  CloudFront, Global Accelerator, CloudWatch, VPC Flow Logs,
                  Reachability Analyzer, IAM, Network Load Balancer, Application
                  Load Balancer, Gateway Load Balancer, AWS WAF, Shield, Network
                  Firewall, VPN, BGP, AWS CLI, SDKs, CloudFormation, and
                  automation scripts.
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
                    laptop. AWS free tier account recommended for hands-on
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
