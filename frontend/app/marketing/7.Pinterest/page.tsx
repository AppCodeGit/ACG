"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import PinterestImage from "../images/image7.png";
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
          <span>Pinterest Marketing Certification</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={PinterestImage}
                  alt="Pinterest Marketing Certification"
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
                      <h3>📌 Pinterest Marketing Certification</h3>
                      <p>
                        Master Pinterest marketing from basics to advanced
                        strategies. Learn to leverage Pinterest for business
                        growth, drive traffic, and generate leads through
                        organic and paid strategies. Become a certified
                        Pinterest marketing professional.
                      </p>
                      <div className="data-item">
                        📌 1: Pinterest Marketing Fundamentals - Platform
                        overview, Algorithm, User behavior
                      </div>
                      <div className="data-item">
                        📌 2: Pinterest Business Account Setup - Profile
                        optimization, Rich pins, Verification
                      </div>
                      <div className="data-item">
                        📌 3: Pinterest SEO & Content Strategy - Keyword
                        research, Board optimization, Pin creation
                      </div>
                      <div className="data-item">
                        📌 4: Pinterest Advertising (PPC) - Campaign setup,
                        Audience targeting, Ad formats
                      </div>
                      <div className="data-item">
                        📌 5: Pinterest Analytics & Reporting - Metrics
                        tracking, Performance analysis, ROI measurement
                      </div>
                      <div className="data-item">
                        📌 6: Pinterest Shopping & E-commerce Integration -
                        Product catalogs, Shopping ads, Catalogs
                      </div>
                      <div className="data-item">
                        📌 7: Advanced Pinterest Strategies - Promoted pins,
                        Audience expansion, Seasonal campaigns
                      </div>
                      <div className="data-item">
                        📌 8: Content Ideation & Visual Strategy - Graphic
                        design, Pin templates, Video pins
                      </div>
                      <div className="data-item">
                        📌 9: Community Growth & Engagement - Follower
                        strategies, Group boards, Collaboration
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project & Certification Preparation
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
                          Master Pinterest marketing from basics to advanced
                          strategies. Learn to leverage Pinterest for business
                          growth, drive traffic, and generate leads through
                          organic and paid strategies. Become a certified
                          Pinterest marketing professional.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of social media marketing.
                          Pinterest business account required for practical
                          exercises.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Set up and optimize Pinterest business accounts for
                          maximum visibility
                        </li>
                        <li>
                          ✅ Master Pinterest SEO and content strategy for
                          organic reach
                        </li>
                        <li>
                          ✅ Create effective Pinterest ad campaigns for
                          targeted audiences
                        </li>
                        <li>
                          ✅ Implement Pinterest shopping features for
                          e-commerce success
                        </li>
                        <li>
                          ✅ Analyze Pinterest analytics for campaign
                          optimization
                        </li>
                        <li>
                          ✅ Develop advanced Pinterest marketing strategies for
                          growth
                        </li>
                        <li>
                          ✅ Create visually compelling pins that drive
                          engagement
                        </li>
                        <li>✅ Build and nurture Pinterest communities</li>
                        <li>
                          ✅ Measure and improve ROI on Pinterest campaigns
                        </li>
                        <li>✅ Prepare for Pinterest certification exams</li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Optimized Pinterest business profile with rich pins
                        </li>
                        <li>
                          🎯 Complete Pinterest advertising campaign structure
                        </li>
                        <li>📈 Analytics dashboard for performance tracking</li>
                        <li>
                          🛍️ Pinterest Shopping setup with product catalog
                        </li>
                        <li>📌 Content calendar with SEO-optimized pins</li>
                        <li>📱 Community engagement strategy for growth</li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>This 10-module comprehensive program covers:</p>
                      <ul>
                        <li>Module 1: Pinterest Marketing Fundamentals</li>
                        <li>Module 2: Business Account Setup</li>
                        <li>Module 3: SEO & Content Strategy</li>
                        <li>Module 4: Pinterest Advertising</li>
                        <li>Module 5: Analytics & Reporting</li>
                        <li>Module 6: Shopping & E-commerce</li>
                        <li>Module 7: Advanced Strategies</li>
                        <li>Module 8: Content Ideation</li>
                        <li>Module 9: Community Growth</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Hands-on training with live Pinterest account
                        demonstrations and real campaign management. Includes
                        access to Pinterest Business tools for practical
                        exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for official Pinterest marketing certifications
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
                          🔹 <strong>Pinterest Marketing Specialist:</strong>{" "}
                          Manage Pinterest accounts and campaigns. Average
                          salary: $48,000 - $72,000
                        </li>
                        <li>
                          🔹 <strong>Social Media Manager:</strong> Oversee
                          Pinterest strategy. Average salary: $52,000 - $78,000
                        </li>
                        <li>
                          🔹 <strong>E-commerce Pinterest Strategist:</strong>{" "}
                          Optimize product pins and shopping. Average salary:
                          $55,000 - $82,000
                        </li>
                        <li>
                          🔹 <strong>Content Marketer:</strong> Create
                          Pinterest-optimized content. Average salary: $45,000 -
                          $68,000
                        </li>
                        <li>
                          🔹 <strong>Freelance Pinterest Consultant:</strong>{" "}
                          Offer expert services to businesses. Average income:
                          $42,000 - $75,000
                        </li>
                        <li>
                          🔹 <strong>Visual Content Strategist:</strong> Develop
                          Pinterest-first visual content. Average salary:
                          $50,000 - $74,000
                        </li>
                      </ul>
                      <p>
                        Pinterest marketing expertise is especially valuable for
                        e-commerce, lifestyle, and visual brands.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Pinterest Marketing Certification</h1>
                <p>
                  Become a certified Pinterest marketing professional with this
                  comprehensive training covering organic and paid strategies.
                  Learn to create, manage, and optimize high-performing
                  Pinterest campaigns for business growth.
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
                  Earn our official Pinterest Marketing Certification and
                  prepare for Pinterest's own certification programs.
                  Demonstrate your expertise in visual discovery and social
                  commerce.
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
                  hours, including live campaign creation.
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
                  Key benefits of this Pinterest marketing course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Pinterest Business tools
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master Pinterest SEO and content strategy
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn Pinterest advertising (PPC) and promoted pins
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
                      Develop portfolio-worthy Pinterest campaigns
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
                  Pinterest Business, Pinterest Ads Manager, Pinterest
                  Analytics, Pinterest Shopping, Rich Pins, Catalogs, Tag
                  Manager, and third-party analytics and content creation tools
                  for Pinterest optimization.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 5,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  Course fee: Ghc 5,500 payable as Ghc 2,000 initial deposit and
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
                    <b>Requirements:</b> Pinterest business account and basic
                    understanding of social media marketing. Ad credits provided
                    for practical campaigns.
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
