"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import LinkedInImage from "../images/image3.png";
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
          <span>LinkedIn Marketing Professional</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={LinkedInImage}
                  alt="LinkedIn Marketing Professional"
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
                      <h3>💼 LinkedIn Marketing Professional</h3>
                      <p>
                        This professional course teaches advanced LinkedIn
                        marketing strategies for business growth, lead
                        generation, and professional branding. You'll learn to
                        leverage LinkedIn's unique professional network for
                        maximum business impact.
                      </p>
                      <div className="data-item">
                        📌 1: LinkedIn Platform Fundamentals - Algorithm,
                        Features, Best Practices
                      </div>
                      <div className="data-item">
                        📌 2: Profile Optimization for Business - Personal
                        branding, Company pages, SEO optimization
                      </div>
                      <div className="data-item">
                        📌 3: Content Strategy for Professionals - Long-form
                        posts, Articles, Video content, Carousels
                      </div>
                      <div className="data-item">
                        📌 4: LinkedIn Advertising & Sponsored Content -
                        Campaign setup, Audience targeting, Budget optimization
                      </div>
                      <div className="data-item">
                        📌 5: B2B Lead Generation Techniques - InMail
                        strategies, Lead Gen Forms, Conversation ads
                      </div>
                      <div className="data-item">
                        📌 6: LinkedIn Analytics & Performance Tracking -
                        Campaign metrics, Audience insights, ROI measurement
                      </div>
                      <div className="data-item">
                        📌 7: Networking & Relationship Building - Strategic
                        connections, Engagement tactics, Group management
                      </div>
                      <div className="data-item">
                        📌 8: Sales Navigator Mastery - Advanced search, Lead
                        recommendations, Account targeting
                      </div>
                      <div className="data-item">
                        📌 9: Company Page Management - Showcase pages, Employee
                        advocacy, Content calendar
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project - Complete LinkedIn marketing
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
                          This professional course teaches advanced LinkedIn
                          marketing strategies for business growth, lead
                          generation, and professional branding. You'll learn to
                          leverage LinkedIn's unique professional network for
                          maximum business impact.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic computer skills and LinkedIn account.
                          Business/professional background recommended.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Optimize personal and company LinkedIn profiles for
                          maximum visibility
                        </li>
                        <li>
                          ✅ Develop high-impact content strategies that
                          establish thought leadership
                        </li>
                        <li>
                          ✅ Run effective LinkedIn ad campaigns with precise
                          B2B targeting
                        </li>
                        <li>
                          ✅ Generate quality B2B leads using advanced LinkedIn
                          tools
                        </li>
                        <li>
                          ✅ Utilize Sales Navigator for strategic business
                          development
                        </li>
                        <li>
                          ✅ Build professional networks strategically for
                          long-term growth
                        </li>
                        <li>
                          ✅ Measure and optimize campaign performance with
                          analytics
                        </li>
                        <li>
                          ✅ Master company page management and employee
                          advocacy
                        </li>
                        <li>
                          ✅ Implement InMail and conversation ad strategies
                        </li>
                        <li>
                          ✅ Prepare for LinkedIn Marketing Labs Certification
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Complete LinkedIn content strategy and editorial
                          calendar
                        </li>
                        <li>📈 Optimized company page with showcase pages</li>
                        <li>
                          🎯 Targeted ad campaign structure for B2B lead
                          generation
                        </li>
                        <li>
                          📉 Sales Navigator saved searches and lead lists
                        </li>
                        <li>
                          🤝 Strategic networking plan for industry influence
                        </li>
                        <li>
                          💰 Lead generation funnel with conversion tracking
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module intensive program combines theory with
                        practical application:
                      </p>
                      <ul>
                        <li>Module 1: LinkedIn Platform Mastery</li>
                        <li>Module 2: Profile Optimization</li>
                        <li>Module 3: Content Marketing Strategy</li>
                        <li>Module 4: LinkedIn Advertising</li>
                        <li>Module 5: Lead Generation Techniques</li>
                        <li>Module 6: Analytics & Performance</li>
                        <li>Module 7: Professional Networking</li>
                        <li>Module 8: Sales Navigator Deep Dive</li>
                        <li>Module 9: Company Page Management</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with live demonstrations and
                        hands-on LinkedIn campaign management. Includes access
                        to LinkedIn marketing tools and resources.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for LinkedIn Marketing Labs Certification and
                        Hootsuite Social Marketing Certification. Includes
                        practice tests and exam preparation materials.
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
                          🔹 <strong>LinkedIn Marketing Specialist:</strong>{" "}
                          Manage corporate LinkedIn presence. Average salary:
                          $55,000 - $80,000
                        </li>
                        <li>
                          🔹 <strong>B2B Digital Marketer:</strong> Specialize
                          in professional platform marketing. Average salary:
                          $58,000 - $85,000
                        </li>
                        <li>
                          🔹 <strong>Corporate Communications Manager:</strong>{" "}
                          Handle professional branding. Average salary: $65,000
                          - $95,000
                        </li>
                        <li>
                          🔹 <strong>Lead Generation Expert:</strong> Focus on
                          LinkedIn lead gen strategies. Average salary: $52,000
                          - $78,000
                        </li>
                        <li>
                          🔹 <strong>Freelance LinkedIn Consultant:</strong>{" "}
                          Offer services to multiple clients. Average income:
                          $45,000 - $90,000
                        </li>
                        <li>
                          🔹{" "}
                          <strong>
                            Sales Development Representative (SDR):
                          </strong>{" "}
                          Use LinkedIn for prospecting. Average salary: $50,000
                          - $75,000
                        </li>
                      </ul>
                      <p>
                        LinkedIn marketing expertise is highly valued in B2B
                        organizations and professional services firms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>LinkedIn Marketing Professional</h1>
                <p>
                  Master professional networking and B2B marketing on the
                  world's premier business platform. This course teaches
                  strategic LinkedIn marketing for lead generation, brand
                  authority building, and professional growth through hands-on
                  training with LinkedIn's marketing tools.
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
                  Earn preparation for LinkedIn Marketing Labs Certification and
                  Hootsuite Social Marketing Certification - industry-recognized
                  credentials that validate your expertise in professional
                  platform marketing.
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
                  8-week program with 40 instructor-led hours and 50+ practical
                  exercise hours, including real campaign management.
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
                  Key benefits of this LinkedIn Marketing course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with LinkedIn Campaign Manager
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master Sales Navigator for strategic lead generation
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Develop professional content strategies that build
                      authority
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn advanced B2B advertising techniques
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Build measurable professional networks for business growth
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
                  LinkedIn Campaign Manager, Sales Navigator, LinkedIn
                  Analytics, Content Suggestions, Lead Gen Forms, InMail,
                  Matched Audiences, Website Demographics, and third-party
                  LinkedIn management tools like Hootsuite and Buffer.
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
                  Course fee: Ghc 5,500 payable as Ghc 2,200 initial deposit and
                  Ghc 1,650 monthly installments.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Schedule:</b> 8 weeks, 3 sessions/week (Mon/Wed/Fri)
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
                    <b>Requirements:</b> LinkedIn profile, business email, and
                    basic digital literacy. Sales Navigator access provided
                    during training.
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
