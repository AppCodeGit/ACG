"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import InstagramImage from "../images/image2.png";
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
          <span>Instagram Marketing Professional</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={InstagramImage}
                  alt="Instagram Marketing Professional"
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
                      <h3>📸 Instagram Marketing Professional</h3>
                      <p>
                        This comprehensive course teaches professional Instagram
                        marketing strategies to grow businesses and personal
                        brands. You'll learn content creation, audience growth,
                        advertising, analytics, and monetization techniques
                        specifically for Instagram's unique platform.
                      </p>
                      <div className="data-item">
                        📌 1: Instagram Platform Fundamentals - Algorithm
                        understanding, Features overview, Platform updates
                      </div>
                      <div className="data-item">
                        📌 2: Business Profile Optimization - Bio optimization,
                        Link strategies, Call-to-action setup
                      </div>
                      <div className="data-item">
                        📌 3: Content Strategy & Planning - Feed posts, Stories,
                        Reels, IGTV, Carousels
                      </div>
                      <div className="data-item">
                        📌 4: Instagram Ads & Shopping - Campaign setup,
                        Shopping tags, Product catalog
                      </div>
                      <div className="data-item">
                        📌 5: Growth & Engagement Strategies - Hashtag strategy,
                        Engagement pods, Community building
                      </div>
                      <div className="data-item">
                        📌 6: Instagram Analytics & Insights - Performance
                        metrics, Audience insights, Content analysis
                      </div>
                      <div className="data-item">
                        📌 7: Influencer Collaborations - Finding influencers,
                        Partnership strategies, Campaign management
                      </div>
                      <div className="data-item">
                        📌 8: Monetization Strategies - Brand deals, Affiliate
                        marketing, Product sales
                      </div>
                      <div className="data-item">
                        📌 9: Visual Branding - Aesthetic consistency, Photo
                        editing, Video production
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project - Complete Instagram marketing
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
                          This comprehensive course teaches professional
                          Instagram marketing strategies to grow businesses and
                          personal brands. You'll learn content creation,
                          audience growth, advertising, analytics, and
                          monetization techniques specifically for Instagram's
                          unique platform.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic smartphone skills and Instagram account. No
                          prior marketing experience required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Set up and optimize Instagram Business profiles for
                          maximum visibility
                        </li>
                        <li>
                          ✅ Create high-performing content strategies across
                          all Instagram formats
                        </li>
                        <li>
                          ✅ Run effective Instagram ad campaigns and shopping
                          features
                        </li>
                        <li>
                          ✅ Implement growth hacking techniques for organic
                          audience growth
                        </li>
                        <li>
                          ✅ Analyze performance metrics and optimize content
                          strategy
                        </li>
                        <li>
                          ✅ Develop influencer partnerships and collaboration
                          strategies
                        </li>
                        <li>
                          ✅ Monetize Instagram presence through multiple
                          revenue streams
                        </li>
                        <li>
                          ✅ Master visual branding for consistent aesthetic
                          appeal
                        </li>
                        <li>
                          ✅ Understand Instagram algorithm and leverage
                          platform updates
                        </li>
                        <li>
                          ✅ Prepare for Meta certification with Instagram
                          specialization
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Complete Instagram content calendar and strategy
                        </li>
                        <li>
                          📈 Optimized business profile with conversion-focused
                          bio
                        </li>
                        <li>🎨 Brand aesthetic guide and content templates</li>
                        <li>📉 Analytics dashboard for performance tracking</li>
                        <li>
                          💰 Monetization plan with multiple revenue streams
                        </li>
                        <li>
                          🤝 Influencer outreach and collaboration framework
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on practical exercises:
                      </p>
                      <ul>
                        <li>Module 1: Instagram Platform Fundamentals</li>
                        <li>Module 2: Business Profile Optimization</li>
                        <li>Module 3: Content Strategy Development</li>
                        <li>Module 4: Instagram Advertising</li>
                        <li>Module 5: Growth Strategies</li>
                        <li>Module 6: Analytics & Performance Tracking</li>
                        <li>Module 7: Influencer Marketing</li>
                        <li>Module 8: Monetization Methods</li>
                        <li>Module 9: Visual Branding</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with live demonstrations and
                        hands-on content creation. Includes access to Instagram
                        analytics tools and resources.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Meta Certified Digital Marketing
                        Associate certification with Instagram specialization.
                        Includes practice tests and exam preparation materials.
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
                          🔹 <strong>Instagram Manager:</strong> Manage brand
                          presence on Instagram. Average salary: $42,000 -
                          $65,000
                        </li>
                        <li>
                          🔹 <strong>Social Media Specialist:</strong> Focus on
                          Instagram marketing strategies. Average salary:
                          $40,000 - $60,000
                        </li>
                        <li>
                          🔹 <strong>Content Creator:</strong> Develop
                          Instagram-first content for brands. Average salary:
                          $38,000 - $70,000
                        </li>
                        <li>
                          🔹 <strong>Influencer Marketer:</strong> Manage
                          influencer partnerships and campaigns. Average salary:
                          $45,000 - $68,000
                        </li>
                        <li>
                          🔹 <strong>Freelance Instagram Consultant:</strong>{" "}
                          Offer services to multiple clients. Average income:
                          $35,000 - $75,000
                        </li>
                        <li>
                          🔹 <strong>Community Manager:</strong> Build and
                          engage Instagram communities. Average salary: $40,000
                          - $62,000
                        </li>
                      </ul>
                      <p>
                        Instagram marketing expertise is highly valued as brands
                        prioritize visual content and influencer partnerships.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Instagram Marketing Professional</h1>
                <p>
                  Master the art of Instagram marketing to build powerful brands
                  and drive business growth. This comprehensive course covers
                  everything from profile optimization to content strategy,
                  advertising, analytics, and monetization. Gain practical
                  skills that businesses need to succeed on one of the world's
                  most influential social platforms.
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
                  This course prepares you for Meta Certified Digital Marketing
                  Associate certification with Instagram specialization,
                  validating your expertise in Instagram marketing and
                  advertising strategies.
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
                  The course is 6 weeks long, with 30 hours of instructor-led
                  training and 40+ hours of practical exercises and content
                  creation.
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
                  Benefits of completing this Instagram Marketing course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Instagram Business Tools and
                      Creator Studio
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for Meta certification
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand social media roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Practical content creation and campaign management
                      experience
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Career guidance and portfolio development with real
                      projects
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
                  Instagram Business Suite, Creator Studio, Instagram Insights,
                  Ads Manager, Shopping Manager, Reels tools, Stories features,
                  Canva for design, Later for scheduling, and third-party
                  analytics platforms for comprehensive performance tracking.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 4,200</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 4,200. You will be required to pay Ghc
                  1,600 for the first installment and Ghc 1,300 for each
                  additional month.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Course duration:</b> 6 weeks, with classes held 3 days a
                    week (Tuesday, Thursday, Saturday). Practical assignments
                    between sessions.
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
                    <b>Additional Notes:</b> Students will need access to an
                    Instagram account. Business tools access will be
                    demonstrated during training. Content creation tools
                    provided.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Tuesday, Thursday, Saturday (6
                    hours/week)
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-time">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Class Time:</b> 9:00 AM - 12:00 PM (Morning Batch) or
                    2:00 PM - 5:00 PM (Afternoon Batch)
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
