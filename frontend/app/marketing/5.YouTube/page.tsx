"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import YouTubeImage from "../images/image5.png";
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
          <span>YouTube Marketing Professional</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={YouTubeImage}
                  alt="YouTube Marketing Professional"
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
                      <h3>▶️ YouTube Marketing Professional</h3>
                      <p>
                        This comprehensive course teaches professional YouTube
                        marketing strategies to build successful channels, grow
                        audiences, and monetize content. You'll learn video
                        optimization, advertising, analytics, and growth
                        techniques for the world's second-largest search engine.
                      </p>
                      <div className="data-item">
                        📌 1: YouTube Platform Fundamentals - Algorithm,
                        Features, Content ecosystem
                      </div>
                      <div className="data-item">
                        📌 2: Channel Setup & Optimization - Branding, Channel
                        art, Sections, Trailers
                      </div>
                      <div className="data-item">
                        📌 3: Video Content Strategy - Content planning,
                        Scriptwriting, Production basics
                      </div>
                      <div className="data-item">
                        📌 4: YouTube SEO & Discovery - Keyword research, Tags,
                        Descriptions, Cards
                      </div>
                      <div className="data-item">
                        📌 5: YouTube Advertising - TrueView, Bumper ads,
                        Discovery ads, Campaign optimization
                      </div>
                      <div className="data-item">
                        📌 6: Analytics & Performance Tracking - YouTube
                        Analytics, Audience retention, Traffic sources
                      </div>
                      <div className="data-item">
                        📌 7: Audience Growth Strategies - Engagement tactics,
                        Community building, Collaborations
                      </div>
                      <div className="data-item">
                        📌 8: Monetization & Revenue Streams - Ad revenue,
                        Memberships, Merchandise, Sponsorships
                      </div>
                      <div className="data-item">
                        📌 9: YouTube Shorts Strategy - Short-form content,
                        Viral techniques
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project - Complete YouTube channel
                        growth strategy
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
                          This comprehensive course teaches professional YouTube
                          marketing strategies to build successful channels,
                          grow audiences, and monetize content. You'll learn
                          video optimization, advertising, analytics, and growth
                          techniques for the world's second-largest search
                          engine.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic computer skills and Google account. Video
                          production experience helpful but not required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Set up and optimize YouTube channels for
                          professional branding
                        </li>
                        <li>
                          ✅ Develop effective video content strategies aligned
                          with audience needs
                        </li>
                        <li>
                          ✅ Master YouTube SEO and discovery features to
                          maximize visibility
                        </li>
                        <li>
                          ✅ Run successful YouTube ad campaigns with measurable
                          ROI
                        </li>
                        <li>
                          ✅ Analyze channel performance metrics to inform
                          content decisions
                        </li>
                        <li>
                          ✅ Implement audience growth techniques for
                          sustainable channel growth
                        </li>
                        <li>
                          ✅ Enable multiple monetization methods to generate
                          revenue
                        </li>
                        <li>
                          ✅ Leverage YouTube Shorts for viral short-form
                          content
                        </li>
                        <li>
                          ✅ Build community and foster audience engagement
                        </li>
                        <li>
                          ✅ Prepare for YouTube Certification and Google Ads
                          Video Certification
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Complete YouTube channel strategy with content
                          calendar
                        </li>
                        <li>
                          📈 Optimized channel with professional branding and
                          sections
                        </li>
                        <li>🎯 SEO-optimized video templates and workflows</li>
                        <li>
                          📉 YouTube Analytics dashboard for performance
                          tracking
                        </li>
                        <li>
                          💰 Monetization plan with multiple revenue streams
                        </li>
                        <li>📱 Shorts content strategy for viral growth</li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module intensive program combines theory with
                        practical application:
                      </p>
                      <ul>
                        <li>Module 1: YouTube Platform Mastery</li>
                        <li>Module 2: Channel Optimization</li>
                        <li>Module 3: Content Strategy Development</li>
                        <li>Module 4: SEO & Discovery</li>
                        <li>Module 5: YouTube Advertising</li>
                        <li>Module 6: Analytics & Performance</li>
                        <li>Module 7: Growth Strategies</li>
                        <li>Module 8: Monetization Methods</li>
                        <li>Module 9: YouTube Shorts</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Hands-on training with live demonstrations and practical
                        channel management exercises. Includes access to YouTube
                        Studio and analytics tools.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for YouTube Certification and Google Ads Video
                        Certification. Includes practice tests and exam
                        preparation materials.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities</h3>
                      <p>Graduates qualify for these professional roles:</p>
                      <ul>
                        <li>
                          🔹 <strong>YouTube Channel Manager:</strong> Oversee
                          brand channels and content strategy. Average salary:
                          $50,000 - $75,000
                        </li>
                        <li>
                          🔹 <strong>Video Marketing Specialist:</strong>{" "}
                          Develop video marketing strategies. Average salary:
                          $48,000 - $72,000
                        </li>
                        <li>
                          🔹 <strong>Content Creator:</strong> Produce
                          professional YouTube content. Average income: $45,000
                          - $85,000
                        </li>
                        <li>
                          🔹 <strong>SEO Video Specialist:</strong> Optimize
                          video discoverability. Average salary: $52,000 -
                          $78,000
                        </li>
                        <li>
                          🔹 <strong>Freelance YouTube Consultant:</strong>{" "}
                          Offer channel growth services. Average income: $40,000
                          - $80,000
                        </li>
                        <li>
                          🔹 <strong>YouTube Ads Specialist:</strong> Manage
                          video advertising campaigns. Average salary: $55,000 -
                          $82,000
                        </li>
                      </ul>
                      <p>
                        YouTube marketing expertise is in high demand as video
                        continues to dominate digital content consumption.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>YouTube Marketing Professional</h1>
                <p>
                  Master video marketing on the world's premier video platform.
                  This course teaches strategic YouTube marketing for audience
                  growth, engagement, and monetization through hands-on training
                  with YouTube's creator tools and advertising platform.
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
                  Earn preparation for YouTube Certification and Google Ads
                  Video Certification - industry-recognized credentials that
                  validate your expertise in video marketing and content
                  strategy.
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
                  7-week program with 35 instructor-led hours and 45+ practical
                  exercise hours, including channel development.
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
                  Key benefits of this YouTube Marketing course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with YouTube Studio and Creator Tools
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master video SEO techniques for maximum discoverability
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Develop data-driven audience growth strategies
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn YouTube advertising and campaign optimization
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Build monetizable channels with multiple revenue streams
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
                  YouTube Studio, YouTube Analytics, Google Ads (Video
                  campaigns), TubeBuddy, VidIQ, Canva for thumbnails, Adobe
                  Premiere Rush, and other video optimization and production
                  tools.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 5,800</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  Course fee: Ghc 5,800 payable as Ghc 2,300 initial deposit and
                  Ghc 1,750 monthly installments.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Schedule:</b> 7 weeks, 3 sessions/week (Mon/Wed/Fri)
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
                    <b>Requirements:</b> Google account and basic video
                    recording capability (smartphone acceptable). YouTube
                    channel creation guidance provided.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Monday, Wednesday, Friday
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-time">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Times:</b> 9AM-12PM or 2PM-5PM (choose your preferred
                    batch)
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
