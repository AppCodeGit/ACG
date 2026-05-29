"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import GoogleAdsImage from "../images/image6.png";
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
          <span>Google Ads Professional Certification</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={GoogleAdsImage}
                  alt="Google Ads Professional Certification"
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
                      <h3>📊 Google Ads Professional Certification</h3>
                      <p>
                        This comprehensive certification program covers all
                        aspects of Google Ads including Search, Display, Video,
                        Shopping, and App campaigns. Master campaign setup,
                        optimization, and performance analysis to become a
                        Google Ads expert.
                      </p>
                      <div className="data-item">
                        📌 1: Google Ads Fundamentals - Account structure,
                        Bidding strategies, Quality Score
                      </div>
                      <div className="data-item">
                        📌 2: Search Advertising Certification - Keyword
                        research, Ad copy, Extensions, Match types
                      </div>
                      <div className="data-item">
                        📌 3: Display Advertising Certification - Audience
                        targeting, Remarketing, Responsive ads
                      </div>
                      <div className="data-item">
                        📌 4: Video Advertising Certification - YouTube ads,
                        TrueView, Bumper ads, Discovery ads
                      </div>
                      <div className="data-item">
                        📌 5: Shopping Advertising Certification - Product
                        feeds, Merchant Center, Shopping campaigns
                      </div>
                      <div className="data-item">
                        📌 6: App Advertising Certification - App installs, App
                        engagement, App campaigns
                      </div>
                      <div className="data-item">
                        📌 7: Measurement & Analytics - Conversion tracking,
                        Attribution, Google Analytics integration
                      </div>
                      <div className="data-item">
                        📌 8: Smart Campaign Strategies - Smart Bidding,
                        Automation, Performance Max
                      </div>
                      <div className="data-item">
                        📌 9: Advanced Optimization Techniques - A/B testing,
                        Bid adjustments, ROI optimization
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project - Multi-channel campaign
                        strategy and optimization
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
                          This comprehensive certification program covers all
                          aspects of Google Ads including Search, Display,
                          Video, Shopping, and App campaigns. Master campaign
                          setup, optimization, and performance analysis to
                          become a Google Ads expert.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic digital marketing knowledge. Google account
                          required for practical exercises.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Set up and optimize Google Ads campaigns across all
                          formats
                        </li>
                        <li>
                          ✅ Master all Google Ads certification tracks (Search,
                          Display, Video, Shopping, Apps)
                        </li>
                        <li>
                          ✅ Implement advanced bidding strategies including
                          Smart Bidding
                        </li>
                        <li>
                          ✅ Create high-performing ad creatives for different
                          platforms
                        </li>
                        <li>
                          ✅ Analyze campaign performance metrics and optimize
                          for ROI
                        </li>
                        <li>
                          ✅ Utilize Google Analytics for comprehensive campaign
                          tracking
                        </li>
                        <li>
                          ✅ Implement conversion tracking and attribution
                          modeling
                        </li>
                        <li>
                          ✅ Master Performance Max campaigns and automation
                        </li>
                        <li>✅ Develop multi-channel advertising strategies</li>
                        <li>
                          ✅ Prepare for all Google Ads certifications with
                          confidence
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Complete Search campaign with keyword strategy and
                          ad extensions
                        </li>
                        <li>
                          🎯 Display remarketing campaign for audience
                          retargeting
                        </li>
                        <li>▶️ YouTube video campaign for brand awareness</li>
                        <li>🛒 Shopping campaign for e-commerce products</li>
                        <li>📱 App install campaign for mobile applications</li>
                        <li>📈 Performance Max campaign across all channels</li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module intensive program covers all Google Ads
                        certification tracks:
                      </p>
                      <ul>
                        <li>Module 1: Google Ads Fundamentals</li>
                        <li>Module 2: Search Advertising</li>
                        <li>Module 3: Display Advertising</li>
                        <li>Module 4: Video Advertising</li>
                        <li>Module 5: Shopping Advertising</li>
                        <li>Module 6: App Advertising</li>
                        <li>Module 7: Measurement & Analytics</li>
                        <li>Module 8: Smart Campaign Strategies</li>
                        <li>Module 9: Advanced Optimization</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Hands-on training with live Google Ads account
                        demonstrations and real campaign management. Includes
                        access to Google Ads interface for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for all Google Ads certifications (Search,
                        Display, Video, Shopping, Apps, Measurement). Includes
                        practice tests and exam preparation materials for each
                        certification.
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
                          🔹 <strong>PPC Specialist:</strong> Manage paid search
                          and display campaigns. Average salary: $55,000 -
                          $82,000
                        </li>
                        <li>
                          🔹 <strong>Digital Advertising Manager:</strong>{" "}
                          Oversee multi-channel ad campaigns. Average salary:
                          $65,000 - $95,000
                        </li>
                        <li>
                          🔹 <strong>SEM Manager:</strong> Lead search engine
                          marketing strategies. Average salary: $70,000 -
                          $100,000
                        </li>
                        <li>
                          🔹 <strong>Media Buyer:</strong> Optimize advertising
                          spend across platforms. Average salary: $58,000 -
                          $85,000
                        </li>
                        <li>
                          🔹 <strong>Freelance Google Ads Consultant:</strong>{" "}
                          Offer expert services to multiple clients. Average
                          income: $50,000 - $90,000
                        </li>
                        <li>
                          🔹 <strong>Performance Marketing Manager:</strong>{" "}
                          Drive ROI through paid channels. Average salary:
                          $68,000 - $98,000
                        </li>
                      </ul>
                      <p>
                        Google Ads certified professionals are in high demand as
                        businesses invest heavily in search and display
                        advertising.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Google Ads Professional Certification</h1>
                <p>
                  Become a certified Google Ads professional with this
                  comprehensive training covering all campaign types and
                  advanced strategies. Learn to create, manage, and optimize
                  high-performing ad campaigns across Google's advertising
                  network, from Search and Display to Video and Shopping.
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
                  Earn official Google Ads certifications in Search, Display,
                  Video, Shopping, Apps, and Measurement - industry-recognized
                  credentials that validate your expertise in paid advertising
                  across Google's platforms.
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
                  9-week program with 45 instructor-led hours and 60+ practical
                  hours, including live campaign management.
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
                  Key benefits of this Google Ads course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Google Ads interface and tools
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master all Google Ads formats and campaign types
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn advanced bidding strategies and automation
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive certification exam preparation
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Develop portfolio-worthy multi-channel campaigns
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
                  Google Ads (Search, Display, Video, Shopping, App campaigns),
                  Google Analytics, Google Tag Manager, Google Data Studio,
                  Google Merchant Center, Google Optimize, and third-party
                  optimization tools.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 6,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  Course fee: Ghc 6,500 payable as Ghc 2,500 initial deposit and
                  Ghc 2,000 monthly installments.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Schedule:</b> 9 weeks, 3 sessions/week (Tue/Thu/Sat)
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
                    <b>Requirements:</b> Google account and basic understanding
                    of digital marketing concepts. Ad credits included for
                    practical campaigns.
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
