"use client";

import "../Software/Css/style.css";
import Header from "../components/Header/HeaderPage";
import Navigation from "../components/Navigation/NavPage";
import Footer from "../components/footer/Footer";
import image1 from "./images/banner.jpg";
// Fixed: Renamed to avoid conflict with Next.js Image component
import ForexImage from "./images/forexTrading.png";
// Fixed: Changed from NavLink to Next.js Link
import Link from "next/link";
// Added Next.js Image import
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const ForexTrading = () => {
  const [sidebarTop, setSidebarTop] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 1);
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
          <span>Forex Trading</span>
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
                    Forex Trading
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
                <h2 className="course-title">
                  Fullstack Forex Trading Program
                </h2>
                <div className="image-container">
                  {/* Fixed: Changed from <img src={Image} ... /> to <Image src={ForexImage} ... /> */}
                  <Image src={ForexImage} alt="Forex Trading" />
                </div>
                <div className="course-description">
                  <div className="text">
                    Master the skills required to excel in forex trading and
                    manage financial markets effectively. This course includes:
                    <ul>
                      <li>
                        <strong>Forex Basics:</strong> Understand currency
                        pairs, pips, and the fundamentals of forex trading.
                      </li>
                      <li>
                        <strong>Technical Analysis:</strong> Learn how to
                        analyze charts, identify trends, and use technical
                        indicators.
                      </li>
                      <li>
                        <strong>Risk Management:</strong> Master strategies to
                        manage risk, set stop-loss orders, and protect your
                        capital.
                      </li>
                      <li>
                        <strong>Trading Psychology:</strong> Develop the mindset
                        needed for consistent and disciplined trading.
                      </li>
                      <li>
                        <strong>Fundamental Analysis:</strong> Learn to evaluate
                        economic indicators, news, and events that impact
                        currency prices.
                      </li>
                      <li>
                        <strong>Advanced Strategies:</strong> Gain insights into
                        algorithmic trading, hedging techniques, and
                        high-frequency trading.
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
                  <Image src={image1} alt="Forex Trading Banner" />
                </div>
                <div className="text-container">
                  <h2>Forex Trading</h2>
                  <p>
                    The Fullstack Forex Trading Program is designed to teach
                    essential skills for success in the financial markets. It
                    emphasizes practical experience in areas such as currency
                    trading, technical and fundamental analysis, risk
                    management, and trading psychology. The program prepares
                    candidates to analyze market trends, make informed trading
                    decisions, and effectively manage their portfolios. Master
                    trading strategies to thrive in the fast-paced world of
                    forex trading.
                  </p>
                </div>

                <div className="button-container">
                  <p className="amount">Ghc 24,000</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/forexTrading/forex" className="btn">
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

export default ForexTrading;
