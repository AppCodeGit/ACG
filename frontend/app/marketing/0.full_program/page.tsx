"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import FullMarketingImage from "../images/fullprogram.png";
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
            <Link href="/marketing">Digital Marketing</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Full Digital Marketing Program</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={FullMarketingImage}
                  alt="Full Digital Marketing Program"
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
                      <h3>📱 Full Digital Marketing Program</h3>
                      <p>
                        Dive into the world of digital marketing and learn key
                        strategies to enhance your online presence. This
                        comprehensive program covers all essential aspects of
                        digital marketing to help you achieve measurable
                        results.
                      </p>
                      <div className="data-item">
                        📌 1: Digital Marketing Fundamentals - Strategy
                        development, Customer journey, Marketing funnel
                      </div>
                      <div className="data-item">
                        📌 2: Search Engine Optimization (SEO) - Keyword
                        research, On-page optimization, Link building, Technical
                        SEO
                      </div>
                      <div className="data-item">
                        📌 3: Search Engine Marketing (SEM) - Google Ads,
                        Keyword bidding, Quality score, Campaign optimization
                      </div>
                      <div className="data-item">
                        📌 4: Social Media Marketing - Facebook, Instagram,
                        LinkedIn, Twitter, TikTok strategies
                      </div>
                      <div className="data-item">
                        📌 5: Content Marketing - Blog posts, Videos,
                        Infographics, Content calendars, Storytelling
                      </div>
                      <div className="data-item">
                        📌 6: Email Marketing - List building, Campaign
                        creation, Automation, Newsletter strategies
                      </div>
                      <div className="data-item">
                        📌 7: Analytics & Performance Tracking - Google
                        Analytics, KPIs, ROI measurement, Data-driven decisions
                      </div>
                      <div className="data-item">
                        📌 8: Display Advertising - Banner ads, Remarketing,
                        Programmatic advertising
                      </div>
                      <div className="data-item">
                        📌 9: Influencer Marketing - Partnership strategies,
                        Campaign management, ROI tracking
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project - Complete digital marketing
                        strategy development
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
                          Dive into the world of digital marketing and learn key
                          strategies to enhance your online presence. This
                          program covers SEO, social media marketing, email
                          campaigns, content creation, and analytics to help you
                          achieve measurable results.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic computer skills and interest in digital
                          marketing. No prior marketing experience required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Develop comprehensive digital marketing strategies
                          aligned with business goals
                        </li>
                        <li>
                          ✅ Master SEO techniques to improve organic search
                          visibility and traffic
                        </li>
                        <li>
                          ✅ Create and optimize paid search campaigns across
                          Google and social platforms
                        </li>
                        <li>
                          ✅ Build engaging social media presence across major
                          platforms
                        </li>
                        <li>
                          ✅ Develop content marketing strategies that attract
                          and convert audiences
                        </li>
                        <li>
                          ✅ Implement effective email marketing campaigns and
                          automation
                        </li>
                        <li>
                          ✅ Analyze marketing performance metrics and make
                          data-driven decisions
                        </li>
                        <li>
                          ✅ Execute display advertising and remarketing
                          campaigns
                        </li>
                        <li>
                          ✅ Manage influencer partnerships for brand
                          amplification
                        </li>
                        <li>
                          ✅ Measure and improve ROI across all marketing
                          channels
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Complete digital marketing strategy document for a
                          real business
                        </li>
                        <li>
                          📈 SEO-optimized website content and keyword strategy
                        </li>
                        <li>
                          🎯 Google Ads campaign structure with keyword
                          targeting
                        </li>
                        <li>📱 Social media content calendar for 30 days</li>
                        <li>
                          📧 Email marketing sequence with automation workflow
                        </li>
                        <li>📉 Analytics dashboard for performance tracking</li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>This comprehensive 10-module program covers:</p>
                      <ul>
                        <li>Module 1: Digital Marketing Fundamentals</li>
                        <li>Module 2: Search Engine Optimization (SEO)</li>
                        <li>Module 3: Search Engine Marketing (SEM)</li>
                        <li>Module 4: Social Media Marketing</li>
                        <li>Module 5: Content Marketing</li>
                        <li>Module 6: Email Marketing</li>
                        <li>Module 7: Analytics & Performance Tracking</li>
                        <li>Module 8: Display Advertising</li>
                        <li>Module 9: Influencer Marketing</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with live demonstrations, case
                        studies, and hands-on projects. Includes access to
                        industry tools and resources for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Upon completion, receive our Full Digital Marketing
                        Certification. Prepares for industry certifications
                        including Google, Facebook, and HubSpot certifications.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities</h3>
                      <p>Graduates qualify for these in-demand roles:</p>
                      <ul>
                        <li>
                          🔹 <strong>Digital Marketing Manager:</strong> Oversee
                          comprehensive marketing strategies. Average salary:
                          $65,000 - $95,000
                        </li>
                        <li>
                          🔹 <strong>SEO Specialist:</strong> Optimize websites
                          for search engines. Average salary: $52,000 - $78,000
                        </li>
                        <li>
                          🔹 <strong>Social Media Manager:</strong> Manage brand
                          presence across platforms. Average salary: $48,000 -
                          $72,000
                        </li>
                        <li>
                          🔹 <strong>Content Marketing Strategist:</strong>{" "}
                          Develop content that drives engagement. Average
                          salary: $55,000 - $82,000
                        </li>
                        <li>
                          🔹 <strong>Email Marketing Specialist:</strong> Create
                          and optimize email campaigns. Average salary: $50,000
                          - $75,000
                        </li>
                        <li>
                          🔹 <strong>PPC Specialist:</strong> Manage paid
                          advertising campaigns. Average salary: $54,000 -
                          $80,000
                        </li>
                        <li>
                          🔹 <strong>Marketing Analytics Specialist:</strong>{" "}
                          Analyze data to drive decisions. Average salary:
                          $60,000 - $88,000
                        </li>
                        <li>
                          🔹{" "}
                          <strong>
                            Freelance Digital Marketing Consultant:
                          </strong>{" "}
                          Offer expert services to multiple clients. Average
                          income: $50,000 - $95,000
                        </li>
                      </ul>
                      <p>
                        Digital marketing skills are universally in demand
                        across all industries, making this one of the most
                        versatile career paths.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Full Digital Marketing Program</h1>
                <p>
                  Dive into the world of digital marketing and learn key
                  strategies to enhance your online presence. This comprehensive
                  program covers SEO, social media marketing, email campaigns,
                  content creation, and analytics to help you achieve measurable
                  results. Gain hands-on experience with industry tools and
                  develop a complete marketing strategy.
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
                  Earn our Full Digital Marketing Certification upon completion.
                  This program also prepares you for Google, Facebook, and
                  HubSpot certifications - industry-recognized credentials that
                  validate your expertise.
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
                  12-week comprehensive program with 60 instructor-led hours and
                  80+ practical exercise hours, including real campaign creation
                  and portfolio development.
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
                  Key benefits of this Full Digital Marketing Program:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive coverage of all digital marketing channels
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with industry tools and platforms
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Real-world capstone project for your portfolio
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Preparation for multiple industry certifications
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
                  Tools Covered
                </h4>
                <p>
                  Google Analytics, Google Ads, Google Search Console, Facebook
                  Business Suite, Instagram Business, LinkedIn Campaign Manager,
                  Twitter Ads, TikTok Ads, Mailchimp, HubSpot, SEMrush, Ahrefs,
                  Canva, Hootsuite, Buffer, and other essential marketing tools.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 5,920</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  Course fee: Ghc 5,920 payable as Ghc 2,000 initial deposit and
                  Ghc 1,960 monthly installments.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Schedule:</b> 12 weeks, 3 sessions/week (Mon/Tue/Wed)
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-language">
                      language
                    </span>
                  </div>
                  <p>
                    <b>Language:</b> English
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-info">
                      info
                    </span>
                  </div>
                  <p>
                    <b>Requirements:</b> Basic computer skills and access to a
                    computer with internet connection. All tools accounts
                    provided for training purposes.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Monday, Tuesday, Wednesday
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-time">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Times:</b> 9AM-12PM or 2PM-5PM or 6PM-9PM (choose your
                    preferred time)
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
                <h4>Course Policies</h4>
                <p>
                  <strong>Non-refundable policy:</strong> Payments are final
                  once made. Students are expected to review course details
                  carefully before enrollment.
                </p>
                <p>
                  <strong>Rescheduling:</strong> We may reschedule with advance
                  notice to participants in case of unforeseen circumstances.
                </p>
                <p>
                  <strong>Minimum enrollment:</strong> 5 students required to
                  commence class.
                </p>
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
