"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import TwitterImage from "../images/image4.png";
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
          <span>Twitter (X) Marketing Professional</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={TwitterImage}
                  alt="Twitter (X) Marketing Professional"
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
                      <h3>🐦 Twitter (X) Marketing Professional</h3>
                      <p>
                        This professional course teaches strategic Twitter (X)
                        marketing for real-time engagement, brand awareness, and
                        customer conversion. Learn to leverage Twitter's unique
                        conversational platform for maximum business impact.
                      </p>
                      <div className="data-item">
                        📌 1: Twitter/X Platform Fundamentals - Algorithm,
                        Features, Platform updates
                      </div>
                      <div className="data-item">
                        📌 2: Profile Optimization & Branding - Bio
                        optimization, Visual identity, Verification
                      </div>
                      <div className="data-item">
                        📌 3: Content Strategy for Twitter - Tweet types,
                        Threads, Media, Spaces
                      </div>
                      <div className="data-item">
                        📌 4: Twitter Ads & Promoted Content - Campaign setup,
                        Audience targeting, Budget optimization
                      </div>
                      <div className="data-item">
                        📌 5: Hashtag & Viral Strategies - Trending topics,
                        Hashtag research, Viral campaigns
                      </div>
                      <div className="data-item">
                        📌 6: Analytics & Performance Measurement - Tweet
                        analytics, Campaign metrics, ROI tracking
                      </div>
                      <div className="data-item">
                        📌 7: Community Building & Engagement - Follower growth,
                        Engagement tactics, Customer service
                      </div>
                      <div className="data-item">
                        📌 8: Crisis Management & PR - Reputation management,
                        Crisis communication, Brand safety
                      </div>
                      <div className="data-item">
                        📌 9: Influencer Partnerships - Identifying influencers,
                        Collaboration strategies
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project - Complete Twitter marketing
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
                          This professional course teaches strategic Twitter (X)
                          marketing for real-time engagement, brand awareness,
                          and customer conversion. Learn to leverage Twitter's
                          unique conversational platform for maximum business
                          impact.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic digital literacy and Twitter account.
                          Marketing/social media experience helpful but not
                          required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Optimize Twitter profiles for business objectives
                          and brand visibility
                        </li>
                        <li>
                          ✅ Develop engaging content strategies across
                          different tweet formats
                        </li>
                        <li>
                          ✅ Run effective Twitter ad campaigns with precise
                          targeting
                        </li>
                        <li>
                          ✅ Implement viral growth techniques using hashtags
                          and trends
                        </li>
                        <li>
                          ✅ Analyze and improve performance metrics using
                          Twitter Analytics
                        </li>
                        <li>
                          ✅ Build active brand communities through strategic
                          engagement
                        </li>
                        <li>
                          ✅ Handle PR and crisis situations effectively on
                          social media
                        </li>
                        <li>✅ Leverage Twitter Spaces for audio engagement</li>
                        <li>✅ Develop influencer partnership strategies</li>
                        <li>
                          ✅ Prepare for Twitter Flight School Certification
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Complete Twitter content calendar and posting
                          strategy
                        </li>
                        <li>
                          📈 Optimized profile with brand-consistent visual
                          identity
                        </li>
                        <li>
                          🎯 Targeted ad campaign structure for specific
                          objectives
                        </li>
                        <li>📉 Hashtag strategy for increased visibility</li>
                        <li>
                          🤝 Community engagement plan for follower growth
                        </li>
                        <li>
                          🚨 Crisis communication framework for brand protection
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module intensive program combines theory with
                        hands-on application:
                      </p>
                      <ul>
                        <li>Module 1: Twitter Platform Mastery</li>
                        <li>Module 2: Profile Optimization</li>
                        <li>Module 3: Content Strategy Development</li>
                        <li>Module 4: Twitter Advertising</li>
                        <li>Module 5: Viral Marketing Techniques</li>
                        <li>Module 6: Analytics & Reporting</li>
                        <li>Module 7: Community Management</li>
                        <li>Module 8: Crisis Communication</li>
                        <li>Module 9: Influencer Partnerships</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with live Twitter demonstrations
                        and real campaign management exercises. Includes access
                        to Twitter marketing tools and resources.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Prepares for Twitter Flight School Certification and
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
                          🔹 <strong>Twitter Community Manager:</strong> Manage
                          brand presence on Twitter. Average salary: $45,000 -
                          $68,000
                        </li>
                        <li>
                          🔹 <strong>Social Media Strategist:</strong>{" "}
                          Specialize in Twitter marketing. Average salary:
                          $50,000 - $75,000
                        </li>
                        <li>
                          🔹 <strong>Digital PR Specialist:</strong> Handle
                          public communications. Average salary: $48,000 -
                          $72,000
                        </li>
                        <li>
                          🔹 <strong>Content Creator:</strong> Develop
                          Twitter-first content strategies. Average salary:
                          $42,000 - $65,000
                        </li>
                        <li>
                          🔹 <strong>Freelance Twitter Consultant:</strong>{" "}
                          Offer specialized services. Average income: $40,000 -
                          $70,000
                        </li>
                        <li>
                          🔹 <strong>Crisis Communications Manager:</strong>{" "}
                          Handle brand reputation. Average salary: $55,000 -
                          $82,000
                        </li>
                      </ul>
                      <p>
                        Twitter marketing expertise is valuable for brands
                        needing real-time customer engagement and crisis
                        management capabilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Twitter (X) Marketing Professional</h1>
                <p>
                  Master real-time marketing on one of the world's most
                  influential social platforms. This course teaches strategic
                  Twitter marketing for brand awareness, customer engagement,
                  and business growth through hands-on training with Twitter's
                  tools and features.
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
                  Earn preparation for Twitter Flight School Certification and
                  Hootsuite Social Marketing Certification - industry-recognized
                  credentials that validate your expertise in real-time social
                  media marketing.
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
                  6-week program with 30 instructor-led hours and 40+ practical
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
                  Key benefits of this Twitter Marketing course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Twitter Ads Manager
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master viral content creation and trend participation
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Develop real-time engagement and customer service
                      strategies
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn Twitter analytics interpretation and optimization
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Build measurable Twitter communities for brand loyalty
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
                  Twitter Ads Manager, Twitter Analytics, TweetDeck, Twitter
                  Spaces, Twitter Lists, Promoted Tweets, Promoted Trends, and
                  third-party management tools like Hootsuite, Buffer, and
                  Sprout Social.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 4,800</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  Course fee: Ghc 4,800 payable as Ghc 1,900 initial deposit and
                  Ghc 1,450 monthly installments.
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
                    <b>Requirements:</b> Active Twitter account and basic
                    understanding of social media. Ad credits included for
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
