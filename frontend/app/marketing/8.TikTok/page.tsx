"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import TikTokImage from "../images/image8.png";
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
          <span>TikTok Marketing Certification</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image src={TikTokImage} alt="TikTok Marketing Certification" />
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
                      <h3>🎵 TikTok Marketing Certification</h3>
                      <p>
                        Master TikTok marketing from content creation to paid
                        advertising. Learn to leverage TikTok's unique
                        algorithm, create viral content, and run successful ad
                        campaigns. Become a certified TikTok marketing
                        professional.
                      </p>
                      <div className="data-item">
                        📌 1: TikTok Marketing Fundamentals - Algorithm,
                        Platform features, Trends analysis
                      </div>
                      <div className="data-item">
                        📌 2: TikTok Business Account Setup - Profile
                        optimization, Business tools, Creator accounts
                      </div>
                      <div className="data-item">
                        📌 3: TikTok Content Strategy & Viral Trends - Content
                        planning, Trend participation, Hashtag strategy
                      </div>
                      <div className="data-item">
                        📌 4: TikTok Advertising (Spark Ads) - Campaign setup,
                        Audience targeting, Ad formats
                      </div>
                      <div className="data-item">
                        📌 5: TikTok Analytics & Performance Tracking - Creator
                        tools, Business analytics, ROI measurement
                      </div>
                      <div className="data-item">
                        📌 6: TikTok Shopping & E-commerce Integration - Product
                        showcase, Live shopping, Checkout integration
                      </div>
                      <div className="data-item">
                        📌 7: Influencer Collaborations & UGC - Creator
                        partnerships, User-generated content, Campaign
                        management
                      </div>
                      <div className="data-item">
                        📌 8: TikTok for Business Certification - Exam
                        preparation, Study resources, Practice tests
                      </div>
                      <div className="data-item">
                        📌 9: Advanced Growth Strategies - Follower growth,
                        Engagement tactics, Community building
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project - Complete TikTok marketing
                        campaign strategy
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
                          Master TikTok marketing from content creation to paid
                          advertising. Learn to leverage TikTok's unique
                          algorithm, create viral content, and run successful ad
                          campaigns. Become a certified TikTok marketing
                          professional.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of social media. TikTok account
                          required for practical exercises.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Set up and optimize TikTok business accounts for
                          maximum reach
                        </li>
                        <li>
                          ✅ Master TikTok content strategy and identify viral
                          trends
                        </li>
                        <li>
                          ✅ Create effective TikTok ad campaigns using Spark
                          Ads
                        </li>
                        <li>
                          ✅ Implement TikTok shopping features for e-commerce
                          success
                        </li>
                        <li>
                          ✅ Analyze TikTok analytics for content and campaign
                          optimization
                        </li>
                        <li>
                          ✅ Develop influencer collaboration and UGC strategies
                        </li>
                        <li>
                          ✅ Build engaged communities and grow follower base
                        </li>
                        <li>
                          ✅ Measure ROI and optimize campaign performance
                        </li>
                        <li>✅ Master TikTok's algorithm for organic reach</li>
                        <li>
                          ✅ Prepare for TikTok for Business certification exams
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Optimized TikTok business profile with content
                          strategy
                        </li>
                        <li>🎯 Complete Spark Ads campaign structure</li>
                        <li>📈 Analytics dashboard for performance tracking</li>
                        <li>🛍️ TikTok Shopping setup with product catalog</li>
                        <li>🤝 Influencer collaboration framework</li>
                        <li>📱 Viral content calendar and trend strategy</li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>This 10-module comprehensive program covers:</p>
                      <ul>
                        <li>Module 1: TikTok Marketing Fundamentals</li>
                        <li>Module 2: Business Account Setup</li>
                        <li>Module 3: Content Strategy & Trends</li>
                        <li>Module 4: TikTok Advertising</li>
                        <li>Module 5: Analytics & Performance</li>
                        <li>Module 6: Shopping & E-commerce</li>
                        <li>Module 7: Influencer Collaborations</li>
                        <li>Module 8: Certification Preparation</li>
                        <li>Module 9: Advanced Growth Strategies</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Hands-on training with live TikTok account
                        demonstrations and real campaign management. Includes
                        access to TikTok Business tools for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for official TikTok for Business certification
                        and provides our institute's certification. Includes
                        practice tests and exam preparation materials.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities</h3>
                      <p>Graduates qualify for these high-demand positions:</p>
                      <ul>
                        <li>
                          🔹 <strong>TikTok Marketing Specialist:</strong>{" "}
                          Manage brand presence on TikTok. Average salary:
                          $48,000 - $72,000
                        </li>
                        <li>
                          🔹 <strong>Social Media Manager:</strong> Oversee
                          TikTok strategy. Average salary: $52,000 - $78,000
                        </li>
                        <li>
                          🔹 <strong>Content Creator Strategist:</strong>{" "}
                          Develop viral content plans. Average income: $45,000 -
                          $75,000
                        </li>
                        <li>
                          🔹 <strong>Influencer Relations Manager:</strong>{" "}
                          Coordinate with TikTok creators. Average salary:
                          $50,000 - $74,000
                        </li>
                        <li>
                          🔹 <strong>Freelance TikTok Consultant:</strong> Offer
                          expert services to businesses. Average income: $42,000
                          - $80,000
                        </li>
                        <li>
                          🔹 <strong>TikTok Ads Specialist:</strong> Manage paid
                          campaigns. Average salary: $55,000 - $82,000
                        </li>
                      </ul>
                      <p>
                        TikTok marketing expertise is increasingly in demand as
                        the platform continues explosive growth in user
                        engagement and advertising.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>TikTok Marketing Certification</h1>
                <p>
                  Become a certified TikTok marketing professional with this
                  comprehensive training covering organic growth and paid
                  advertising strategies. Learn to create viral content, manage
                  campaigns, and leverage TikTok's unique algorithm for business
                  success.
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
                  Earn our official TikTok Marketing Certification and prepare
                  for TikTok's own certification programs. Demonstrate your
                  expertise in one of the fastest-growing social media
                  platforms.
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
                  6-week intensive program with 30 instructor-led hours and 40+
                  practical hours, including live campaign creation.
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
                  Key benefits of this TikTok marketing course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with TikTok Business Suite and Ads
                      Manager
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master viral content creation and trend identification
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn TikTok advertising with Spark Ads and In-Feed Ads
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive certification preparation
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Develop portfolio-worthy TikTok campaigns
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
                  TikTok Business Suite, TikTok Ads Manager, TikTok Analytics,
                  Creative Center, TikTok Shopping, Spark Ads platform,
                  Influencer Marketplace, and third-party analytics and content
                  creation tools.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 6,000</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  Course fee: Ghc 6,000 payable as Ghc 2,500 initial deposit and
                  Ghc 1,750 monthly installments.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Schedule:</b> 6 weeks, 3 sessions/week (Tue/Thu/Sat)
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
                    <b>Requirements:</b> TikTok account (personal or business)
                    and smartphone with TikTok app installed. Ad credits
                    provided for practical campaigns.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Tuesday, Thursday, Saturday
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
