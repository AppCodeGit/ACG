"use client";

import "../Software/Css/style.css";
import Header from "../components/Header/HeaderPage";
import Navigation from "../components/Navigation/NavPage";
import AWS1 from "./images/AWS-Certified-Architect-Professional.png";
import AWS2 from "./images/AWS-Certified-Architect-Associate.png";
import AWS3 from "./images/AWS-Certified-Administrator-Associate.webp";
import AWS4 from "./images/AWS-Certified-DevOps-Engineer-Professional.png";
import AWS5 from "./images/AWS-Developer-Associate.png";
import AWS6 from "./images/AWS-Security-Specialty.webp";
import AWS7 from "./images/AWS-Certified-Advanced-Networking-Specialty.png";
import AWS8 from "./images/AWS-Big-Data-Logo.png";
import { useState, useEffect, useRef } from "react";
// Fixed: Changed from "./images/Cloud/Cloud.png" to a proper import name
import CloudImage from "./images/Cloud.png";
import Link from "next/link";
import Footer from "../components/footer/Footer";
// Add Next.js Image import
import Image from "next/image";

const Aws = () => {
  const [sidebarTop, setSidebarTop] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 8);
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
            {/* Fixed: Changed NavLink to Link */}
            <Link href="/">Home</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Aws</span>
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
                    AWS CSAP
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
                    <span className="material-symbols-outlined format">
                      format_indent_increase
                    </span>
                    AWS CSAA
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
                    AWS CSAA
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
                    AWS CDEP
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
                    AWS CDA
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
                    AWS CSS
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
                    AWS CANS
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
                    AWS CBDS
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
                <h2 className="course-title">Amazon Web Services</h2>
                <div className="image-container">
                  {/* Fixed: Changed from <img src={Image} ... /> to <Image src={CloudImage} ... /> */}
                  <Image src={CloudImage} alt="AWS Cloud" />
                </div>
                <div className="course-description">
                  <div className="text">
                    Learn to build robust and scalable applications using Amazon
                    Web Services (AWS). This course covers everything from cloud
                    computing fundamentals to advanced AWS services, database
                    integration, and deployment strategies. Gain the skills to
                    become an AWS expert and create secure, scalable cloud
                    solutions. This course includes:
                    <ul>
                      <li>
                        <strong>AWS Cloud Fundamentals:</strong> Understand core
                        AWS services like EC2, S3, RDS, and Lambda to build and
                        deploy applications on the cloud.
                      </li>
                      <li>
                        <strong>Serverless Architectures:</strong> Learn to
                        design and implement serverless applications using AWS
                        Lambda, API Gateway, and DynamoDB.
                      </li>
                      <li>
                        <strong>Database Management:</strong> Master AWS
                        database services such as RDS, DynamoDB, and Aurora for
                        scalable and secure data management.
                      </li>
                      <li>
                        <strong>Security and Identity Management:</strong>{" "}
                        Explore IAM (Identity and Access Management), AWS WAF,
                        and other tools to ensure secure applications.
                      </li>
                      <li>
                        <strong>Deployment Strategies:</strong> Learn to deploy
                        applications on AWS using Elastic Beanstalk,
                        CloudFormation, and AWS CLI.
                      </li>
                      <li>
                        <strong>Monitoring and Optimization:</strong> Utilize
                        AWS CloudWatch and Trusted Advisor to monitor,
                        troubleshoot, and optimize your applications.
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
                    src={AWS1}
                    alt="AWS Certified Solutions Architect Professional"
                  />
                </div>
                <div className="text-container">
                  <h2>AWS Certified Solutions Architect Professional</h2>
                  <p>
                    The AWS Certified Solutions Architect Professional
                    certification validates advanced skills in designing and
                    deploying cloud architecture on AWS. It focuses on building
                    secure, scalable, and cost-optimized solutions for various
                    use cases, ensuring high performance and reliability. This
                    certification is ideal for professionals who architect
                    advanced cloud-based solutions and manage end-to-end
                    projects.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/aws/1.AWS-SA-Pro-Details" className="btn">
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
                    src={AWS2}
                    alt="AWS Certified Solutions Architect Associate"
                  />
                </div>
                <div className="text-container">
                  <h2>AWS Certified Solutions Architect Associate</h2>
                  <p>
                    The AWS Certified Solutions Architect Associate
                    certification is designed for individuals who design
                    distributed systems on AWS. It focuses on the fundamentals
                    of cloud architecture, covering topics such as networking,
                    storage, and compute services, as well as best practices for
                    security and scalability.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link
                      href="/aws/2.AWS-SA-Associate-Details"
                      className="btn"
                    >
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
                    src={AWS3}
                    alt="AWS Certified SysOps Administrator Associate"
                  />
                </div>
                <div className="text-container">
                  <h2>AWS Certified SysOps Administrator Associate</h2>
                  <p>
                    The AWS Certified SysOps Administrator Associate
                    certification focuses on the deployment, management, and
                    operations of AWS solutions. It validates expertise in
                    monitoring systems, managing costs, and optimizing resource
                    utilization, making it ideal for system administrators and
                    operations professionals.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/aws/3.Aws-Sys-Ops-Details" className="btn">
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
                    src={AWS4}
                    alt="AWS Certified DevOps Engineer Professional"
                  />
                </div>
                <div className="text-container">
                  <h2>AWS Certified DevOps Engineer Professional</h2>
                  <p>
                    The AWS Certified DevOps Engineer Professional certification
                    focuses on automating the deployment of applications and
                    infrastructure on AWS. It covers key DevOps practices like
                    CI/CD, infrastructure as code, and monitoring, enabling
                    professionals to manage complex cloud environments.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/aws/4.AWS-Dev-En-Pro-Details" className="btn">
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
                  <Image src={AWS5} alt="AWS Certified Developer Associate" />
                </div>
                <div className="text-container">
                  <h2>AWS Certified Developer Associate</h2>
                  <p>
                    The AWS Certified Developer Associate certification is ideal
                    for developers who build and maintain applications on AWS.
                    It emphasizes core AWS services, application development,
                    and debugging tools, empowering professionals to design
                    secure and scalable cloud applications.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link
                      href="/aws/5.AWS-Dev-Associate-Details"
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
                  <Image src={AWS6} alt="AWS Certified Security Specialty" />
                </div>
                <div className="text-container">
                  <h2>AWS Certified Security Specialty</h2>
                  <p>
                    The AWS Certified Security Specialty certification focuses
                    on advanced security practices for protecting cloud
                    environments. It covers topics such as data encryption,
                    secure network architecture, and compliance management,
                    ensuring professionals can secure sensitive data and
                    applications on AWS.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 7,020</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/aws/6.AWS-SS-Details" className="btn">
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
                    src={AWS7}
                    alt="AWS Certified Advanced Networking Specialty"
                  />
                </div>
                <div className="text-container">
                  <h2>AWS Certified Advanced Networking Specialty</h2>
                  <p>
                    The AWS Certified Advanced Networking Specialty
                    certification validates expertise in designing and
                    implementing AWS and hybrid IT network architectures. It
                    covers topics like secure connectivity, routing, and
                    advanced troubleshooting, making it ideal for network
                    engineers and architects.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 7,020</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/aws/7.Aws-Ad-Net-Details" className="btn">
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
                  <Image src={AWS8} alt="AWS Certified Big Data Specialty" />
                </div>
                <div className="text-container">
                  <h2>AWS Certified Big Data Specialty</h2>
                  <p>
                    The AWS Certified Big Data Specialty certification focuses
                    on data analytics and architecture on AWS. It covers
                    services like Redshift, EMR, and Kinesis, validating skills
                    in data collection, processing, and visualization for
                    scalable and efficient big data solutions.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 7,020</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/aws/8.AWS-Bi-Data-Details" className="btn">
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

export default Aws;
