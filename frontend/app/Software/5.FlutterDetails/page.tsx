"use client";

import "../Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
// Fixed: Changed from NavLink to Next.js Link
import Link from "next/link";
// Fixed: Renamed to avoid conflict with Next.js Image component
import FlutterImage from "../images/unnamed.webp";
// Added Next.js Image import
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
            {/* Fixed: Changed NavLink to Link */}
            <Link href="/">Home</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <div className="items">
            {/* Fixed: Changed NavLink to Link */}
            <Link href="/Software">Software</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Flutter</span>
        </div>
        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                {/* Fixed: Changed img to Image */}
                <Image src={FlutterImage} alt="Flutter Development Course" />
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
                  {/* Course Overview */}
                  <div
                    className={`content ${activeContent === 1 ? "show" : ""}`}
                  >
                    <div className="concept-data">
                      <h3>🚀 Full-Stack Mobile App Development with Flutter</h3>
                      <p>
                        This course is designed to equip you with the skills
                        needed to build scalable and high-performance mobile
                        applications using Flutter:
                      </p>
                      <div className="data-item">
                        📌 1: Introduction to Flutter
                      </div>
                      <div className="data-item">
                        📌 2: Dart Programming Language Fundamentals
                      </div>
                      <div className="data-item">
                        📌 3: Widgets and State Management in Flutter
                      </div>
                      <div className="data-item">
                        📌 4: Flutter Navigation and Routing
                      </div>
                      <div className="data-item">
                        📌 5: Integrating APIs with Flutter
                      </div>
                      <div className="data-item">
                        📌 6: Managing Databases with Flutter
                      </div>
                      <div className="data-item">
                        📌 7: Optimizing Performance in Flutter
                      </div>
                      <div className="data-item">
                        📌 8: Deployment & Publishing Flutter Apps
                      </div>
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  <div
                    className={`content ${activeContent === 2 ? "show" : ""}`}
                  >
                    <div className="course-data">
                      <h3>🎯 Learning Goals</h3>
                      <ul>
                        <li>
                          ✅ Build cross-platform mobile applications with
                          Flutter and Dart
                        </li>
                        <li>
                          ✅ Master Flutter widgets and state management
                          techniques
                        </li>
                        <li>✅ Integrate APIs and databases in Flutter apps</li>
                        <li>✅ Implement navigation and routing in Flutter</li>
                        <li>
                          ✅ Optimize app performance and UI responsiveness in
                          Flutter
                        </li>
                        <li>
                          ✅ Deploy and publish Flutter apps on both iOS and
                          Android platforms
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <p>This course includes hands-on projects, such as:</p>
                      <ul>
                        <li>🌍 A Blog App with Real-time Data Fetching</li>
                        <li>
                          🛒 An E-Commerce Mobile App with Product Listings
                        </li>
                        <li>📊 A Dashboard with User Authentication</li>
                      </ul>
                    </div>
                  </div>

                  {/* Career Paths */}
                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities in Flutter</h3>
                      <p>
                        After completing this course, you'll be ready to work in
                        the following roles:
                      </p>
                      <ul>
                        <li>
                          🔹 <strong>Mobile App Developer</strong> - Build
                          cross-platform mobile apps using Flutter and Dart.
                        </li>
                        <li>
                          🔹 <strong>Flutter Developer</strong> - Specialize in
                          creating optimized, performant mobile applications.
                        </li>
                        <li>
                          🔹 <strong>Backend Developer</strong> - Manage APIs,
                          databases, and backend services for Flutter apps.
                        </li>
                        <li>
                          🔹 <strong>Freelance Developer</strong> - Build custom
                          mobile applications for clients using Flutter.
                        </li>
                        <li>
                          🔹 <strong>Startup Founder</strong> - Launch your own
                          mobile app-based business using Flutter.
                        </li>
                      </ul>

                      <h4>🚀 Take Your Skills to the Next Level</h4>
                      <p>
                        By the end of this course, you'll have a portfolio of
                        real-world projects and the confidence to build
                        production-ready mobile apps with Flutter!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Flutter Development Course</h1>
                <p>
                  A comprehensive course on mobile app development using
                  Flutter, which is an open-source framework built with Dart.
                  This course covers both frontend and backend development,
                  teaching you how to build highly optimized and responsive
                  cross-platform apps. You'll learn about widgets, state
                  management, API integration, databases, and app deployment to
                  both iOS and Android platforms.
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
                  The Flutter Developer Certification validates your expertise
                  in building high-performance mobile applications using
                  Flutter. It covers frontend and backend development, state
                  management, API routes, and deployment strategies. This
                  certification helps demonstrate your skills to potential
                  employers and clients.
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
                  The course is 13 weeks long, including hours of video lessons
                  and hands-on coding exercises. It also includes real-world
                  project assignments and a final capstone project.
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
                  Benefits of completing the Flutter Development Certification
                  include:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn to build high-performance mobile apps for iOS and
                      Android using Flutter.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master mobile app development with Flutter and Dart.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Gain real-world project experience in building
                      cross-platform applications.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Receive a certification to showcase your Flutter skills.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Improve your job prospects as a Flutter developer.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text">
                <h4>
                  <span className="material-symbols-outlined">
                    bottom_right_click
                  </span>
                  Technologies Covered
                </h4>
                <p>
                  The course covers Flutter, Dart programming, state management,
                  API integration, mobile databases, and app deployment
                  strategies. You'll also explore performance optimization and
                  app publishing techniques.
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
                  The course fee is Ghc 5,920. You will be required to pay Ghc
                  2,000 for the first installment and Ghc 1,960 for each
                  additional month.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Course duration:</b> 3 months, with classes held 3 days a
                    week (Monday to Wednesday). Students will work on a project
                    from Thursday to Sunday and submit it the following Monday.
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
                    <b>Additional Notes:</b> Students need to bring their own
                    laptop.
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-calendar">
                      calendar_today
                    </span>
                  </div>
                  <p>
                    <b>Class Days:</b> Monday to Wednesday (9 hours/week)
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-time">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Class Time:</b> 8:00 AM - 11:00 AM (Morning Batch) or
                    12:00 PM - 3:00 PM (Afternoon Batch)
                  </p>
                </div>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-location">
                      location_on
                    </span>
                  </div>
                  <p>
                    <b>Location:</b> Accra, Mallam-Gbawe
                  </p>
                </div>
              </div>

              <div className="course-info">
                <h4>Course Cancellation/Reschedule Policy</h4>
                <p>
                  Once payment is made, it is **non-refundable**. Students are
                  expected to carefully review the course details before making
                  a payment.
                </p>
                <p>
                  In the event of unforeseen circumstances, we reserve the right
                  to reschedule the course. However, the course will still be
                  conducted at a later date, and enrolled students will be
                  notified in advance.
                </p>
                <p>A minimum of 3 students is required to start a class.</p>
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
