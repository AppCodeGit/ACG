"use client";

import "../Software/Css/style.css";
import Header from "../components/Header/HeaderPage";
import Navigation from "../components/Navigation/NavPage";
import Footer from "../components/footer/Footer";
import image0 from "./images/fullprogram.png";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";
import image3 from "./images/image3.png";
import image4 from "./images/image4.png";
import image5 from "./images/image5.png";
import image6 from "./images/image6.png";
import image7 from "./images/image7.png";
import image8 from "./images/image8.png";
// Fixed: Renamed to avoid conflict with Next.js Image component
import MarketingImage from "./images/Marketing.png";
import { useState, useEffect, useRef } from "react";
// Fixed: Changed from NavLink to Next.js Link
import Link from "next/link";
// Added Next.js Image import
import Image from "next/image";

const DigitalMarketing = () => {
  const [sidebarTop, setSidebarTop] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, 9);
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
          <span>Digital Marketing</span>
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
                    Full Program
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
                    Facebook
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
                    Instagram
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
                    LinkedIn
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
                    Twitter
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
                    YouTube
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
                    Google Ads
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
                    Pinterest
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
                    TikTok
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
                <h2 className="course-title">Digital Marketing</h2>
                <div className="image-container">
                  {/* Fixed: Changed from <img src={Image} ... /> to <Image src={MarketingImage} ... /> */}
                  <Image src={MarketingImage} alt="Digital Marketing" />
                </div>
                <div className="course-description">
                  <div className="text">
                    Learn to create effective digital marketing strategies to
                    reach and engage audiences. This course includes:
                    <ul>
                      <li>
                        <strong>SEO Optimization:</strong> Master search engine
                        optimization techniques to improve website visibility
                        and rank higher in search engine results.
                      </li>
                      <li>
                        <strong>Social Media Marketing:</strong> Understand how
                        to create impactful campaigns on platforms like
                        Facebook, Instagram, LinkedIn, and Twitter.
                      </li>
                      <li>
                        <strong>Email Marketing:</strong> Learn how to build
                        effective email campaigns that convert leads into
                        customers.
                      </li>
                      <li>
                        <strong>Content Marketing:</strong> Discover how to
                        create and distribute valuable content to attract and
                        retain target audiences.
                      </li>
                      <li>
                        <strong>Analytics and Metrics:</strong> Analyze campaign
                        performance using tools like Google Analytics and
                        measure ROI effectively.
                      </li>
                      <li>
                        <strong>PPC and Advertising:</strong> Gain expertise in
                        Pay-Per-Click campaigns using platforms like Google Ads
                        and social media ads.
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
                  <Image src={image0} alt="Full Digital Marketing Program" />
                </div>
                <div className="text-container">
                  <h2>Full Digital Marketing Program</h2>
                  <p>
                    Dive into the world of digital marketing and learn key
                    strategies to enhance your online presence. This program
                    covers SEO, social media marketing, email campaigns, content
                    creation, and analytics to help you achieve measurable
                    results.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 5,920</p>
                  <div className="btn-container">
                    {/* Fixed: Changed button to Link if it should navigate, or keep as button if not */}
                    <Link href="/marketing/0.full_program" className="btn">
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
                  <Image src={image1} alt="Facebook Marketing" />
                </div>
                <div className="text-container">
                  <h2>Facebook</h2>
                  <p>
                    Facebook is a powerful platform for digital marketing,
                    allowing businesses to reach a wide audience through
                    targeted ads, engaging posts, and interactive content. Learn
                    how to create campaigns, manage business pages, and analyze
                    performance to drive engagement and conversions.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 2,040</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/marketing/1.facebook" className="btn">
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
                  {/* Fixed: Changed img to Image */}
                  <Image src={image2} alt="Instagram Marketing" />
                </div>
                <div className="text-container">
                  <h2>Instagram</h2>
                  <p>
                    Instagram is essential for visual storytelling in digital
                    marketing. Learn how to use reels, stories, and posts to
                    showcase products, engage with followers, and build a strong
                    brand presence. Understand analytics to optimize your
                    strategy and maximize reach.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 2,040</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/marketing/2.Instagram" className="btn">
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
                  {/* Fixed: Changed img to Image */}
                  <Image src={image3} alt="LinkedIn Marketing" />
                </div>
                <div className="text-container">
                  <h2>LinkedIn</h2>
                  <p>
                    LinkedIn is the go-to platform for B2B digital marketing.
                    Learn how to connect with professionals, create impactful
                    content, and run targeted ad campaigns to generate leads and
                    drive business growth.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 2,040</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/marketing/3.LinkedIn" className="btn">
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
                  {/* Fixed: Changed img to Image */}
                  <Image src={image4} alt="Twitter Marketing" />
                </div>
                <div className="text-container">
                  <h2>Twitter</h2>
                  <p>
                    Twitter is ideal for real-time engagement in digital
                    marketing. Learn how to create viral tweets, participate in
                    trending discussions, and use Twitter ads to promote your
                    brand effectively to a global audience.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 2,040</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/marketing/4.Twitter" className="btn">
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
                  {/* Fixed: Changed img to Image */}
                  <Image src={image5} alt="YouTube Marketing" />
                </div>
                <div className="text-container">
                  <h2>YouTube</h2>
                  <p>
                    YouTube is a key platform for video marketing. Learn how to
                    create engaging video content, optimize your channel for
                    SEO, and use YouTube ads to reach your target audience and
                    drive conversions.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 2,040</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/marketing/5.YouTube" className="btn">
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
                  {/* Fixed: Changed img to Image */}
                  <Image src={image6} alt="Google Ads" />
                </div>
                <div className="text-container">
                  <h2>Google Ads</h2>
                  <p>
                    A platform for running ads across Google Search, Display
                    Network, YouTube, and more. Google Ads allows businesses to
                    target specific keywords and demographics, ensuring their
                    content reaches the right audience at the right time.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 2,040</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/marketing/6.Google-Ads" className="btn">
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
                  {/* Fixed: Changed img to Image */}
                  <Image src={image7} alt="Pinterest" />
                </div>
                <div className="text-container">
                  <h2>Pinterest</h2>
                  <p>
                    Ideal for businesses targeting audiences interested in
                    visual inspiration, such as fashion, home décor, and DIY
                    projects. Pinterest is a great platform for showcasing
                    products in a visually appealing manner to drive engagement
                    and sales.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 2,040</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/marketing/7.Pinterest" className="btn">
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
                  {/* Fixed: Changed img to Image */}
                  <Image src={image8} alt="TikTok" />
                </div>
                <div className="text-container">
                  <h2>TikTok</h2>
                  <p>
                    TikTok is a growing platform for video marketing, especially
                    popular among younger audiences. It allows businesses to
                    create engaging short-form videos, leverage trends, and
                    collaborate with influencers to reach a wider audience
                    effectively.
                  </p>
                </div>
                <div className="button-container">
                  <p className="amount">Ghc 2,040</p>
                  <div className="btn-container">
                    {/* Fixed: Changed NavLink to Link */}
                    <Link href="/marketing/8.TikTok" className="btn">
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

export default DigitalMarketing;
