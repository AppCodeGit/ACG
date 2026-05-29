"use client";

import "../Software/Css/style.css";
import Header from "../components/Header/HeaderPage";
import Navigation from "../components/Navigation/NavPage";
import azure1 from "./images/1.azure-fundamentals.png";
import azure2 from "./images/2.azure-administrator-associate.png";
import azure3 from "./images/3.security-compliance-and-identity-fundamentals.png";
import azure4 from "./images/4.azure-data-engineer-associate.png";
import azure5 from "./images/5.DP-100-Designing-and-Implementing-a-Data-Science-Solution-on-Azure.png";
import azure6 from "./images/6.azure-database-administrator-associate-DP-300.webp";
import azure7 from "./images/7.Developing Solutions for Microsoft Azure AZ-204.webp";
import azure8 from "./images/8.DP-500-Designing-and-Implementing-Enterprise-Scale-Analytics-Solutions-Using-Microsoft-Azure-and-Microsoft-Power-BI.png";
import azure9 from "./images/9.azure-network-engineer-associate AZ 700.png";
import azure10 from "./images/10. azure-security-engineer-associate AZ-500.png";
import azure11 from "./images/11.identity-and-access-administrator-associate-SC-300.png";
import azure12 from "./images/12.Microsoft Security Operations Analyst.SC-200.png";
import azure13 from "./images/13.Administering Windows Server Hybrid Core Infrastructure.AZ-800.webp";
import azure14 from "./images/14.azure-virtual-desktop-specialty.AZ-140.png";
import azure15 from "./images/15.Designing Microsoft Azure Infrastructure Solutions.AZ-305.png";
import azure16 from "./images/16.SC-100-Microsoft-Cybersecurity-Architect.webp";
import azure17 from "./images/17.CERT-Expert-DevOps-Engineer.AZ-400.png";
import { useState, useEffect, useRef } from "react";
// Fixed: Renamed to avoid conflict with Next.js Image component
import AzureImage from "./images/Azure.png";
import Link from "next/link";
import Image from "next/image";
import Footer from "../components/footer/Footer";

const Azure = () => {
  const [sidebarTop, setSidebarTop] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 17);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sidebarLimit = 0;
      const maxOffset = 70;

      if (scrollY > sidebarLimit) {
        setSidebarTop(Math.min(maxOffset, scrollY - sidebarLimit));
      } else {
        setSidebarTop(0);
      }

      // Determine which section is in view
      const scrollPosition = window.scrollY + 100; // Adding some offset

      sectionRefs.current.forEach(
        (section: HTMLElement | null, index: number) => {
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
              scrollPosition >= sectionTop &&
              scrollPosition < sectionTop + sectionHeight
            ) {
              setActiveSection(`section${index + 1}`);
            }
          }
        },
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToSection = (sectionId: string, offset: number = 0) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY;
      const scrollToPosition = sectionPosition + offset;
      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      setActiveSection(sectionId);
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
          <span>Microsoft Azure</span>
        </div>
        <div className="software-page container">
          {/* Sidebar */}
          <div className="sideBar-container">
            <div
              className="Sidebar"
              style={{
                top: `${sidebarTop}px`,
                transition: "top 0.3s ease",
              }}
            >
              <ul>
                <li
                  onClick={() => handleScrollToSection("section1", -75)}
                  className={activeSection === "section1" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    AZ-900
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section2", -75)}
                  className={activeSection === "section2" ? "active" : ""}
                >
                  <div className="items-content">
                    {" "}
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    AZ-104
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section3", -75)}
                  className={activeSection === "section3" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    SC-900
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section4", -75)}
                  className={activeSection === "section4" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    DP-203
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section5", -75)}
                  className={activeSection === "section5" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    DP-100
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section6", -75)}
                  className={activeSection === "section6" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    DP-300
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section7", -75)}
                  className={activeSection === "section7" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    AZ-204
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section8", -75)}
                  className={activeSection === "section8" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    DP-500
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section9", -75)}
                  className={activeSection === "section9" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    AZ-700
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section10", -75)}
                  className={activeSection === "section10" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    AZ-500
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section11", -75)}
                  className={activeSection === "section11" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    SC-300
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section12", -75)}
                  className={activeSection === "section12" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    SC-200
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section13", -75)}
                  className={activeSection === "section13" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    AZ-800
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section14", -75)}
                  className={activeSection === "section14" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    AZ-140
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section15", -75)}
                  className={activeSection === "section15" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    AZ-305
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section16", -75)}
                  className={activeSection === "section16" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    SC-100
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
                <li
                  onClick={() => handleScrollToSection("section17", -75)}
                  className={activeSection === "section17" ? "active" : ""}
                >
                  <div className="items-content">
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    AZ-400
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-Content">
            <div className="Content">
              <div className="course-details">
                <h2 className="course-title">Microsoft Azure</h2>
                <div className="image-container">
                  {/* Fixed: Changed from <img src={Image} ... /> to <Image src={AzureImage} ... /> */}
                  <Image src={AzureImage} alt="Microsoft Azure" />
                </div>
                <div className="course-description">
                  <div className="text">
                    Learn to build robust and scalable applications using
                    Microsoft Azure. This course covers everything from cloud
                    computing fundamentals to advanced Azure services, database
                    integration, and deployment strategies. Gain the skills to
                    become an Azure expert and create secure, scalable cloud
                    solutions. This course includes:
                    <ul>
                      <li>
                        <strong>Azure Cloud Fundamentals:</strong> Understand
                        core Azure services like Virtual Machines, Azure
                        Storage, SQL Database, and Azure App Services to build
                        and deploy applications on the cloud.
                      </li>
                      <li>
                        <strong>Serverless Architectures:</strong> Learn to
                        design and implement serverless applications using Azure
                        Functions, Logic Apps, and Event Grid.
                      </li>
                      <li>
                        <strong>Database Management:</strong> Master Azure
                        database services such as Azure SQL Database, Cosmos DB,
                        and Table Storage for scalable and secure data
                        management.
                      </li>
                      <li>
                        <strong>Security and Identity Management:</strong>{" "}
                        Explore Azure Active Directory, Azure Key Vault, and
                        other tools to ensure secure applications.
                      </li>
                      <li>
                        <strong>Deployment Strategies:</strong> Learn to deploy
                        applications on Azure using Azure DevOps, Resource
                        Manager templates, and Azure CLI.
                      </li>
                      <li>
                        <strong>Monitoring and Optimization:</strong> Utilize
                        Azure Monitor, Application Insights, and Azure Advisor
                        to monitor, troubleshoot, and optimize your
                        applications.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <section
                id="section1"
                className={`section ${activeSection === "section1" ? "section-active" : ""}`}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[0] = el;
                }}
              >
                <div className="image-container">
                  <Image
                    src={azure1}
                    alt="Microsoft Azure Fundamentals Certification"
                  />
                </div>
                <div className="text-container">
                  <h2>Microsoft Azure Fundamentals</h2>
                  <p>
                    This certification introduces core concepts of cloud
                    computing and Azure services. It focuses on foundational
                    knowledge about Azure workloads, security, privacy, pricing,
                    and support, making it ideal for beginners exploring cloud
                    technology.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link href="/azure/9.Azure-Fund-Details" className="btn">
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section2"
                className={`section ${activeSection === "section2" ? "section-active" : ""}`}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[1] = el;
                }}
              >
                <div className="image-container">
                  <Image
                    src={azure2}
                    alt="Microsoft Azure Administrator Certification"
                  />
                </div>
                <div className="text-container">
                  <h2>Microsoft Azure Administrator</h2>
                  <p>
                    Designed for administrators, this certification validates
                    expertise in managing Azure resources, implementing virtual
                    networks, and ensuring seamless integration of Azure
                    services. Ideal for IT professionals who oversee cloud
                    operations.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link href="/azure/10.Azure-A-Details" className="btn">
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section3"
                className={`section ${activeSection === "section3" ? "section-active" : ""}`}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[2] = el;
                }}
              >
                <div className="image-container">
                  <Image
                    src={azure3}
                    alt="Microsoft Security Fundamentals Certification"
                  />
                </div>
                <div className="text-container">
                  <h2>
                    Microsoft Security, Compliance, and Identity Fundamentals
                  </h2>
                  <p>
                    This certification highlights security, compliance, and
                    identity management within Azure. It provides foundational
                    knowledge about access controls, governance, and best
                    practices for maintaining a secure environment.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/11.Azure-Se-Com-Fun-Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section4"
                className={`section ${activeSection === "section4" ? "section-active" : ""}`}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[3] = el;
                }}
              >
                <div className="image-container">
                  <Image
                    src={azure4}
                    alt="Data Engineering on Microsoft Azure"
                  />
                </div>
                <div className="text-container">
                  <h2>Data Engineering on Microsoft Azure</h2>
                  <p>
                    Learn how to design and implement data solutions on Azure
                    using tools like Azure Data Factory, Synapse Analytics, and
                    Databricks. This certification focuses on building secure,
                    scalable data processing systems.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/12.Azure-Data-En-Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section5"
                className={`section ${activeSection === "section5" ? "section-active" : ""}`}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[4] = el;
                }}
              >
                <div className="image-container">
                  <Image
                    src={azure5}
                    alt="Azure Data Science Solution Certification"
                  />
                </div>
                <div className="text-container">
                  <h2>
                    Designing and Implementing a Data Science Solution on Azure
                  </h2>
                  <p>
                    This certification focuses on leveraging Azure Machine
                    Learning and AI-driven services. It validates skills in
                    creating, training, and deploying machine learning models
                    while ensuring data integrity and security.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/13.Azure-Designing-Data-S-S"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section6"
                className={`section ${activeSection === "section6" ? "section-active" : ""}`}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[5] = el;
                }}
              >
                <div className="image-container">
                  <Image
                    src={azure6}
                    alt="Administering Databases on Azure Certification"
                  />
                </div>
                <div className="text-container">
                  <h2>Administering Relational Databases on Microsoft Azure</h2>
                  <p>
                    This certification is tailored for database administrators
                    who manage and optimize Azure SQL databases. Learn to
                    implement security measures, troubleshoot issues, and ensure
                    high availability of data.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/14.Azure-A-R-D-Micro-Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section7"
                className={`section ${activeSection === "section7" ? "section-active" : ""}`}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[6] = el;
                }}
              >
                <div className="image-container">
                  <Image
                    src={azure7}
                    alt="Developing Solutions for Azure Certification"
                  />
                </div>
                <div className="text-container">
                  <h2>Developing Solutions for Microsoft Azure</h2>
                  <p>
                    This certification validates skills in designing, building,
                    and deploying cloud solutions using Azure SDKs, APIs, and
                    tools like Azure DevOps. Perfect for developers working on
                    scalable cloud applications.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/15.Azure-D-S-Micro-Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section8"
                className={`section ${activeSection === "section8" ? "section-active" : ""}`}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[7] = el;
                }}
              >
                <div className="image-container">
                  <Image
                    src={azure8}
                    alt="Enterprise Analytics with Azure Certification"
                  />
                </div>
                <div className="text-container">
                  <h2>
                    Designing and Implementing Enterprise-Scale Analytics
                    Solutions Using Microsoft Azure and Microsoft Power BI
                  </h2>
                  <p>
                    Gain expertise in developing end-to-end analytics solutions
                    with Azure Synapse and Power BI. This certification covers
                    data modeling, reporting, and visualization techniques for
                    decision-making.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/16.Azure-I-E-S-A-S-Power-BI-Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section9"
                className={`section ${activeSection === "section9" ? "section-active" : ""}`}
                ref={(el: HTMLElement | null) => {
                  sectionRefs.current[8] = el;
                }}
              >
                <div className="image-container">
                  <Image
                    src={azure9}
                    alt="Designing and Implementing Microsoft Azure Networking Solutions"
                  />
                </div>
                <div className="text-container">
                  <h2>
                    Designing and Implementing Microsoft Azure Networking
                    Solutions
                  </h2>
                  <p>
                    Learn how to design and implement secure, scalable, and
                    reliable networking solutions on Microsoft Azure. This
                    certification is ideal for networking professionals seeking
                    expertise in Azure-based network architecture.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/17.Des-Imple-Micro-A-N-S.Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section10"
                className={`section ${activeSection === "section10" ? "section-active" : ""}`}
ref={(el: HTMLElement | null) => {
                  sectionRefs.current[9] = el;
                }}              >
                <div className="image-container">
                  <Image
                    src={azure10}
                    alt="Microsoft Azure Security Technologies"
                  />
                </div>
                <div className="text-container">
                  <h2>Microsoft Azure Security Technologies</h2>
                  <p>
                    Master the skills needed to secure Microsoft Azure
                    environments, including threat management, identity
                    protection, and compliance. This certification is perfect
                    for professionals focused on Azure security.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/18.Micro-Azure-Sec-Tech.Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section11"
                className={`section ${activeSection === "section11" ? "section-active" : ""}`}
ref={(el: HTMLElement | null) => {
                  sectionRefs.current[10] = el;
                }}              >
                <div className="image-container">
                  <Image
                    src={azure11}
                    alt="Microsoft Identity and Access Administrator"
                  />
                </div>
                <div className="text-container">
                  <h2>Microsoft Identity and Access Administrator</h2>
                  <p>
                    Gain expertise in managing Azure identity and access
                    solutions, including secure authentication, identity
                    management, and governance.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link href="/azure/19.Micro-I-A-Ad.Details" className="btn">
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section12"
                className={`section ${activeSection === "section12" ? "section-active" : ""}`}
ref={(el: HTMLElement | null) => {
                  sectionRefs.current[11] = el;
                }}              >
                <div className="image-container">
                  <Image
                    src={azure12}
                    alt="Microsoft Security Operations Analyst"
                  />
                </div>
                <div className="text-container">
                  <h2>Microsoft Security Operations Analyst</h2>
                  <p>
                    Enhance your skills in monitoring and securing Azure
                    environments. This certification is ideal for security
                    analysts and professionals managing threat detection and
                    response on Azure.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/20.Azure-Micro-Sec-Op-A.Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section13"
                className={`section ${activeSection === "section13" ? "section-active" : ""}`}
ref={(el: HTMLElement | null) => {
                  sectionRefs.current[12] = el;
                }}              >
                <div className="image-container">
                  <Image
                    src={azure13}
                    alt="Administering Windows Server Hybrid Core Infrastructure"
                  />
                </div>
                <div className="text-container">
                  <h2>
                    Administering Windows Server Hybrid Core Infrastructure
                  </h2>
                  <p>
                    Learn how to administer and manage hybrid cloud
                    infrastructure using Windows Server and Azure, ensuring
                    seamless operations across on-premises and cloud
                    environments.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/21.Azure-Ad-W-Se-Hy-Co-Inf.Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section14"
                className={`section ${activeSection === "section14" ? "section-active" : ""}`}
ref={(el: HTMLElement | null) => {
                  sectionRefs.current[13] = el;
                }}              >
                <div className="image-container">
                  <Image
                    src={azure14}
                    alt="Configuring and Operating Microsoft Azure Virtual Desktop"
                  />
                </div>
                <div className="text-container">
                  <h2>
                    Configuring and Operating Microsoft Azure Virtual Desktop
                  </h2>
                  <p>
                    Master the skills to configure and operate virtual desktops
                    on Azure, enabling seamless remote work experiences while
                    maintaining security and compliance.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/22.Azure-C-Op-Micro-V-Desk.Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section15"
                className={`section ${activeSection === "section15" ? "section-active" : ""}`}
ref={(el: HTMLElement | null) => {
                  sectionRefs.current[14] = el;
                }}              >
                <div className="image-container">
                  <Image
                    src={azure15}
                    alt="Designing Microsoft Azure Infrastructure Solutions"
                  />
                </div>
                <div className="text-container">
                  <h2>Designing Microsoft Azure Infrastructure Solutions</h2>
                  <p>
                    Learn to design and implement comprehensive infrastructure
                    solutions on Azure, leveraging scalability, security, and
                    cost optimization for cloud environments.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link href="/azure/23.Des-Micro-A-I-S" className="btn">
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section16"
                className={`section ${activeSection === "section16" ? "section-active" : ""}`}
ref={(el: HTMLElement | null) => {
                  sectionRefs.current[15] = el;
                }}              >
                <div className="image-container">
                  <Image
                    src={azure16}
                    alt="Microsoft Cybersecurity Architect"
                  />
                </div>
                <div className="text-container">
                  <h2>Microsoft Cybersecurity Architect</h2>
                  <p>
                    Develop advanced skills in architecting secure Azure
                    environments, with a focus on threat protection, compliance,
                    and data governance.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/24.Azure-Micro-Cyber-Arch.Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>

              <section
                id="section17"
                className={`section ${activeSection === "section17" ? "section-active" : ""}`}
ref={(el: HTMLElement | null) => {
                  sectionRefs.current[16] = el;
                }}              >
                <div className="image-container">
                  <Image
                    src={azure17}
                    alt="Designing and Implementing Microsoft DevOps Solutions"
                  />
                </div>
                <div className="text-container">
                  <h2>Designing and Implementing Microsoft DevOps Solutions</h2>
                  <p>
                    Gain expertise in implementing DevOps solutions on Azure,
                    focusing on CI/CD, infrastructure automation, and monitoring
                    for efficient and scalable deployments.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    <Link
                      href="/azure/25.Des-I-Micro-Dev-S.Details"
                      className="btn"
                    >
                      Learn More
                      <span className="material-symbols-outlined">east</span>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Back to Top Button */}
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

export default Azure;
