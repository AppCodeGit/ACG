"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import NetworkImage from "../images/9.azure-network-engineer-associate AZ 700.png";
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
          <span>Azure Networking Solutions</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image src={NetworkImage} alt="Azure Networking Solutions" />
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
                      <h3>🌐 Azure Networking Solutions (AZ-700)</h3>
                      <p>
                        This comprehensive course teaches you to design,
                        implement, and manage networking solutions in Microsoft
                        Azure. You'll learn to build secure, high-performance
                        network architectures using Azure Virtual Networks,
                        hybrid connections, security services, and traffic
                        management solutions.
                      </p>
                      <div className="data-item">
                        📌 1: Azure Virtual Networks Fundamentals - VNet design,
                        Subnetting, IP addressing, VNet peering
                      </div>
                      <div className="data-item">
                        📌 2: Hybrid Networking with VPN and ExpressRoute -
                        Site-to-site VPN, Point-to-site VPN, ExpressRoute
                        circuits
                      </div>
                      <div className="data-item">
                        📌 3: Network Security Groups and Firewalls - NSG rules,
                        Application Security Groups, Azure Firewall, Firewall
                        policies
                      </div>
                      <div className="data-item">
                        📌 4: Load Balancing and Traffic Management - Load
                        Balancer, Application Gateway, Traffic Manager, Front
                        Door
                      </div>
                      <div className="data-item">
                        📌 5: Azure DNS and Private Link - DNS zones, Private
                        DNS, Private Link, Private Endpoints
                      </div>
                      <div className="data-item">
                        📌 6: Network Monitoring and Troubleshooting - Network
                        Watcher, NSG flow logs, Connection Monitor
                      </div>
                      <div className="data-item">
                        📌 7: Network Automation with ARM and Bicep -
                        Infrastructure as Code, Template deployment
                      </div>
                      <div className="data-item">
                        📌 8: Virtual WAN and Hub-Spoke Architectures - Azure
                        Virtual WAN, Hub-spoke topology
                      </div>
                      <div className="data-item">
                        📌 9: Advanced Networking - Service endpoints, VNet
                        integration, Private Link services
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and AZ-700 Certification
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
                          This comprehensive course teaches you to design,
                          implement, and manage networking solutions in
                          Microsoft Azure. You'll learn to build secure,
                          high-performance network architectures using Azure
                          Virtual Networks, hybrid connections, security
                          services, and traffic management solutions.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of networking concepts (TCP/IP,
                          DNS, VPN) and familiarity with cloud services.
                          Experience with Azure fundamentals is helpful but not
                          required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Design and implement Azure Virtual Networks with
                          proper segmentation
                        </li>
                        <li>
                          ✅ Configure hybrid connections using VPN Gateway and
                          ExpressRoute
                        </li>
                        <li>
                          ✅ Implement network security with NSGs, ASGs, and
                          Azure Firewall
                        </li>
                        <li>
                          ✅ Configure load balancing and traffic routing across
                          global and regional solutions
                        </li>
                        <li>
                          ✅ Implement private and public DNS solutions with
                          custom domains
                        </li>
                        <li>
                          ✅ Monitor and troubleshoot network performance with
                          Network Watcher
                        </li>
                        <li>
                          ✅ Automate network deployments with Infrastructure as
                          Code (ARM/Bicep)
                        </li>
                        <li>
                          ✅ Design hub-spoke architectures with Virtual WAN
                        </li>
                        <li>
                          ✅ Implement private connectivity with Private Link
                          and Private Endpoints
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's AZ-700 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🏗️ Complete hub-spoke network architecture with
                          Virtual WAN
                        </li>
                        <li>
                          🔒 Secure hybrid connection with VPN Gateway and
                          ExpressRoute
                        </li>
                        <li>
                          🛡️ Network security implementation with Azure Firewall
                          and NSGs
                        </li>
                        <li>
                          ⚡ Global load balancing with Traffic Manager and
                          Front Door
                        </li>
                        <li>
                          📡 Private connectivity solution with Private Link and
                          Private Endpoints
                        </li>
                        <li>
                          📊 Network monitoring dashboard with Network Watcher
                        </li>
                        <li>
                          🔄 Automated network deployment using Bicep templates
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on labs using Azure networking services:
                      </p>
                      <ul>
                        <li>Module 1: Azure Networking Fundamentals</li>
                        <li>Module 2: Hybrid Networking</li>
                        <li>Module 3: Network Security</li>
                        <li>Module 4: Traffic Management</li>
                        <li>Module 5: DNS and Private Connectivity</li>
                        <li>Module 6: Monitoring and Troubleshooting</li>
                        <li>Module 7: Network Automation</li>
                        <li>Module 8: Virtual WAN and Hub-Spoke</li>
                        <li>Module 9: Advanced Networking</li>
                        <li>Module 10: Implementation Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on labs in live Azure
                        environment. Includes access to networking resources for
                        practical configuration exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: Azure
                        Network Engineer Associate (AZ-700) exam. Includes one
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
                          🔹 <strong>Azure Network Engineer:</strong> Design and
                          implement Azure networking solutions. Average salary:
                          $95,000 - $140,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Network Architect:</strong> Plan and
                          optimize cloud network infrastructure. Average salary:
                          $115,000 - $160,000
                        </li>
                        <li>
                          🔹 <strong>Network Security Specialist:</strong>{" "}
                          Secure cloud network environments. Average salary:
                          $105,000 - $150,000
                        </li>
                        <li>
                          🔹 <strong>Cloud Infrastructure Engineer:</strong>{" "}
                          Implement and manage cloud networking components.
                          Average salary: $90,000 - $135,000
                        </li>
                        <li>
                          🔹 <strong>DevOps Engineer (Networking):</strong>{" "}
                          Automate network deployments. Average salary: $100,000
                          - $145,000
                        </li>
                        <li>
                          🔹 <strong>Hybrid Cloud Specialist:</strong> Design
                          and implement hybrid connectivity. Average salary:
                          $98,000 - $142,000
                        </li>
                      </ul>
                      <p>
                        Networking professionals with Azure expertise are in
                        high demand as organizations migrate to the cloud.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Azure Networking Solutions (AZ-700)</h1>
                <p>
                  Master the skills to design and implement comprehensive
                  networking solutions in Microsoft Azure. This course covers
                  all aspects of cloud networking including virtual networks,
                  hybrid connectivity, security implementations, and traffic
                  management while preparing for the AZ-700 certification exam.
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
                  Network Engineer Associate certification (AZ-700), validating
                  your ability to design, implement, and maintain Azure
                  networking solutions. This certification is essential for
                  network professionals working with Azure.
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
                  Benefits of completing this Azure Networking course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Azure networking services
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for AZ-700 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand cloud networking roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of real-world networking projects
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
                  Azure Virtual Networks (VNet), VNet Peering, VPN Gateway,
                  ExpressRoute, Network Security Groups (NSG), Application
                  Security Groups (ASG), Azure Firewall, Azure Firewall Manager,
                  Load Balancer, Application Gateway, Traffic Manager, Front
                  Door, Azure DNS, Private DNS, Private Link, Private Endpoint,
                  Network Watcher, NSG Flow Logs, Virtual WAN, Bicep, ARM
                  Templates, and other Azure networking services.
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
                    Azure networking resources for hands-on labs. Basic
                    networking knowledge (TCP/IP, DNS, routing) is recommended.
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
