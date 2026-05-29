"use client";

import "../Software/Css/style.css";
import Header from "../components/Header/HeaderPage";
import Navigation from "../components/Navigation/NavPage";
import Footer from "../components/footer/Footer";
import image1 from "./images/image1.png";
import image2 from "./images/image3.png";
// Fixed: Renamed to avoid conflict with Next.js Image component
import DataImage from "./images/Data.png";

// Fixed: Changed from NavLink to Next.js Link
import Link from "next/link";
// Added Next.js Image import
import Image from "next/image";

import { useState, useEffect, useRef } from "react";

const DataAnalytics = () => {
  const [sidebarTop, setSidebarTop] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 2);
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
          <span>Data Analytics</span>
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
                    Cloud Data Analytics
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
                    Traditional Data Analytics
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
                <h2 className="course-title">Data Analytics</h2>
                <div className="image-container">
                  {/* Fixed: Changed from <img src={Image} ... /> to <Image src={DataImage} ... /> */}
                  <Image src={DataImage} alt="Data Analytics" />
                </div>
                <div className="course-description">
                  <div className="text">
                    Learn how to analyze data and extract actionable insights to
                    drive decisions. This course includes:
                    <ul>
                      <li>
                        <strong>Data Collection:</strong> Understand how to
                        collect data from various sources, including databases
                        and APIs.
                      </li>
                      <li>
                        <strong>Data Cleaning:</strong> Learn techniques to
                        clean, preprocess, and organize raw data for analysis.
                      </li>
                      <li>
                        <strong>Data Visualization:</strong> Master tools like
                        Tableau, Power BI, or Python libraries to create visual
                        representations of data.
                      </li>
                      <li>
                        <strong>Statistical Analysis:</strong> Explore
                        statistical methods and techniques to interpret data
                        patterns and trends.
                      </li>
                      <li>
                        <strong>Machine Learning Basics:</strong> Get introduced
                        to predictive modeling and machine learning algorithms
                        to analyze complex datasets.
                      </li>
                      <li>
                        <strong>Data Interpretation:</strong> Learn how to draw
                        insights and communicate findings to stakeholders
                        effectively.
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
                  {/* Fixed: Changed img to Image */}
                  <Image src={image1} alt="Cloud Data Analytics" />
                </div>
                <div className="text-container">
                  <h2>Cloud Data Analytics</h2>
                  <p>
                    Cloud Data Analytics allows organizations to process and
                    analyze large-scale data efficiently using cloud platforms.
                    Learn how to leverage tools like Google BigQuery, AWS
                    Redshift, and Microsoft Azure for scalable data storage,
                    real-time analysis, and visualization to drive data-driven
                    decisions.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link
                      href="/dataAnalytics/1.CloudDataAnalytics"
                      className="btn"
                    >
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
                  {/* Fixed: Changed img to Image */}
                  <Image src={image2} alt="Traditional Data Analytics" />
                </div>
                <div className="text-container">
                  <h2>Traditional Data Analytics</h2>
                  <p>
                    Traditional Data Analytics involves using on-premise systems
                    and methods to analyze data. Learn about fundamental
                    techniques such as descriptive statistics, data mining, and
                    reporting using tools like Excel, SQL, and SAS to uncover
                    actionable insights.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link
                      href="/dataAnalytics/2.TraditionalDataAnalytics"
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

export default DataAnalytics;
