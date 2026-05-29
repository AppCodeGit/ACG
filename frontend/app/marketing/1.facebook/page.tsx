"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import FacebookImage from "../images/image1.png";
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
          <span>Facebook Marketing Professional</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={FacebookImage}
                  alt="Facebook Marketing Professional"
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
                      <h3>📱 Facebook Marketing Professional</h3>
                      <p>
                        This comprehensive course teaches you professional
                        Facebook marketing strategies to grow businesses. You'll
                        learn to create high-converting ad campaigns, target the
                        right audiences, analyze performance metrics, and
                        optimize for maximum ROI using Facebook's advertising
                        platform.
                      </p>
                      <div className="data-item">
                        📌 1: Facebook Marketing Fundamentals - Platform
                        overview, Algorithm understanding, Marketing objectives
                      </div>
                      <div className="data-item">
                        📌 2: Business Manager & Ad Account Setup - Account
                        structure, Team management, Payment methods
                      </div>
                      <div className="data-item">
                        📌 3: Audience Research & Targeting - Custom audiences,
                        Lookalike audiences, Interest targeting
                      </div>
                      <div className="data-item">
                        📌 4: Ad Creative & Copywriting - Visual design
                        principles, Compelling copy, Video content strategy
                      </div>
                      <div className="data-item">
                        📌 5: Campaign Structures & Strategies - Campaign
                        objectives, Ad sets, Ad optimization
                      </div>
                      <div className="data-item">
                        📌 6: Facebook Pixel & Tracking - Pixel installation,
                        Event tracking, Conversion tracking
                      </div>
                      <div className="data-item">
                        📌 7: Analytics & Optimization - Performance metrics,
                        A/B testing, ROAS calculation
                      </div>
                      <div className="data-item">
                        📌 8: Scaling & Advanced Strategies - Budget
                        optimization, Retargeting, Funnel strategies
                      </div>
                      <div className="data-item">
                        📌 9: Instagram Integration - Cross-platform
                        advertising, Instagram Stories, Shopping ads
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project - Live campaign creation and
                        management
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
                          This comprehensive course teaches you professional
                          Facebook marketing strategies to grow businesses.
                          You'll learn to create high-converting ad campaigns,
                          target the right audiences, analyze performance
                          metrics, and optimize for maximum ROI using Facebook's
                          advertising platform.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic computer skills and Facebook account. No prior
                          marketing experience required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Set up and optimize Facebook Business Manager for
                          business use
                        </li>
                        <li>
                          ✅ Create effective ad campaigns for different
                          marketing objectives
                        </li>
                        <li>
                          ✅ Master audience targeting and segmentation
                          strategies
                        </li>
                        <li>
                          ✅ Design high-converting ad creatives and compelling
                          copy
                        </li>
                        <li>
                          ✅ Implement Facebook Pixel for accurate conversion
                          tracking
                        </li>
                        <li>
                          ✅ Analyze campaign performance and optimize for
                          better results
                        </li>
                        <li>
                          ✅ Scale successful campaigns profitably using
                          data-driven decisions
                        </li>
                        <li>
                          ✅ Integrate Instagram advertising for cross-platform
                          reach
                        </li>
                        <li>
                          ✅ Calculate and improve Return on Ad Spend (ROAS)
                        </li>
                        <li>✅ Prepare for Facebook Blueprint Certification</li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Complete Facebook Business Manager setup with team
                          access
                        </li>
                        <li>
                          📈 Multi-campaign funnel strategy for lead generation
                        </li>
                        <li>
                          🔄 Retargeting campaign to convert website visitors
                        </li>
                        <li>
                          🎯 Custom and lookalike audiences for precision
                          targeting
                        </li>
                        <li>📉 Analytics dashboard for performance tracking</li>
                        <li>
                          💰 Scaled campaign strategy with optimized budgets
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on practical exercises:
                      </p>
                      <ul>
                        <li>Module 1: Facebook Marketing Fundamentals</li>
                        <li>Module 2: Business Manager Setup</li>
                        <li>Module 3: Audience Research</li>
                        <li>Module 4: Ad Creative Development</li>
                        <li>Module 5: Campaign Strategies</li>
                        <li>Module 6: Tracking Implementation</li>
                        <li>Module 7: Performance Analysis</li>
                        <li>Module 8: Advanced Scaling Techniques</li>
                        <li>Module 9: Instagram Integration</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with live demonstrations and
                        hands-on campaign creation. Includes access to Facebook
                        ad account for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Facebook Blueprint
                        Certification. Includes one free exam attempt voucher
                        and practice tests.
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
                          🔹 <strong>Facebook Ads Specialist:</strong> Manage
                          Facebook ad campaigns for businesses. Average salary:
                          $45,000 - $70,000
                        </li>
                        <li>
                          🔹 <strong>Digital Marketing Executive:</strong>{" "}
                          Handle social media advertising strategies. Average
                          salary: $40,000 - $65,000
                        </li>
                        <li>
                          🔹 <strong>Media Buyer:</strong> Purchase and optimize
                          ad space across platforms. Average salary: $50,000 -
                          $75,000
                        </li>
                        <li>
                          🔹 <strong>Social Media Manager:</strong> Oversee
                          brand presence on social platforms. Average salary:
                          $42,000 - $68,000
                        </li>
                        <li>
                          🔹 <strong>Freelance Facebook Marketer:</strong> Offer
                          services to multiple clients. Average income: $35,000
                          - $80,000
                        </li>
                        <li>
                          🔹 <strong>Performance Marketing Manager:</strong>{" "}
                          Drive measurable results through paid social. Average
                          salary: $55,000 - $85,000
                        </li>
                      </ul>
                      <p>
                        Digital marketing professionals with Facebook expertise
                        are in high demand as businesses shift more budget to
                        social media advertising.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Facebook Marketing Professional</h1>
                <p>
                  Master the art of Facebook marketing to drive business growth.
                  This comprehensive course covers everything from setting up
                  your Business Manager to creating high-converting ad
                  campaigns, targeting the right audiences, and analyzing
                  performance metrics. Gain practical skills that businesses
                  desperately need in today's digital landscape.
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
                  This course prepares you for Facebook Blueprint Certification,
                  validating your expertise in Facebook marketing and
                  advertising. The certification is recognized globally by
                  employers and clients as proof of your professional
                  capabilities.
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
                  The course is 8 weeks long, with 40 hours of instructor-led
                  training and 50+ hours of practical exercises and campaign
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
                  Benefits of completing this Facebook Marketing course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Facebook Ads Manager and Business
                      Manager
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for Facebook Blueprint
                      Certification
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand digital marketing roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Practical campaign creation with real ad spend
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
                  Facebook Business Manager, Ads Manager, Audience Insights,
                  Facebook Pixel, Events Manager, Creator Studio, Commerce
                  Manager, Ads Reporting, Analytics, and third-party tools like
                  Canva for creative design and Google Analytics for
                  comprehensive tracking.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 4,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 4,500. You will be required to pay Ghc
                  1,800 for the first installment and Ghc 1,350 for each
                  additional month.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Course duration:</b> 2 months (8 weeks), with classes
                    held 3 days a week (Monday, Wednesday, Friday). Students
                    will work on practical assignments between sessions.
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
                    <b>Additional Notes:</b> Students will need access to a
                    Facebook account. Business Manager access will be provided
                    for training purposes. Ad credits included for practical
                    campaigns.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Monday, Wednesday, Friday (6 hours/week)
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-time">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Class Time:</b> 9:00 AM - 11:00 AM (Morning Batch) or
                    4:00 PM - 6:00 PM (Evening Batch)
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
