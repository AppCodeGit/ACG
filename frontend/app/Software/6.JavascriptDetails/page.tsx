"use client";

import "../Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
// Fixed: Changed from NavLink to Next.js Link
import Link from "next/link";
// Fixed: Renamed to avoid conflict with Next.js Image component
import JavascriptImage from "../images/Javascript.png";
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
          <span>JavaScript</span>
        </div>
        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                {/* Fixed: Changed img to Image */}
                <Image
                  src={JavascriptImage}
                  alt="JavaScript Development Course"
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
                  {/* Course Overview */}
                  <div
                    className={`content ${activeContent === 1 ? "show" : ""}`}
                  >
                    <div className="concept-data">
                      <h3>🚀 JavaScript Development Mastery</h3>
                      <p>
                        This course is designed to equip you with the skills
                        needed to master JavaScript:
                      </p>
                      <div className="data-item">
                        📌 1: Introduction to JavaScript
                      </div>
                      <div className="data-item">
                        📌 2: Understanding JavaScript Variables and Data Types
                      </div>
                      <div className="data-item">
                        📌 3: Functions and Scope in JavaScript
                      </div>
                      <div className="data-item">
                        📌 4: Asynchronous JavaScript with Promises and
                        Async/Await
                      </div>
                      <div className="data-item">
                        📌 5: JavaScript DOM Manipulation
                      </div>
                      <div className="data-item">
                        📌 6: Working with JavaScript Events
                      </div>
                      <div className="data-item">
                        📌 7: JavaScript Error Handling and Debugging
                      </div>
                      <div className="data-item">
                        📌 8: Modern JavaScript Features (ES6 and beyond)
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
                          ✅ Master the fundamentals of JavaScript and its
                          syntax.
                        </li>
                        <li>
                          ✅ Understand how JavaScript variables, data types,
                          and operators work.
                        </li>
                        <li>
                          ✅ Learn how to handle asynchronous operations using
                          promises and async/await.
                        </li>
                        <li>
                          ✅ Gain proficiency in manipulating the DOM with
                          JavaScript.
                        </li>
                        <li>
                          ✅ Implement JavaScript error handling and debugging
                          techniques.
                        </li>
                        <li>
                          ✅ Keep up with modern JavaScript features, including
                          ES6 and newer updates.
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <p>This course includes hands-on projects, such as:</p>
                      <ul>
                        <li>🌍 A JavaScript-based To-Do List Application</li>
                        <li>🛍️ A Shopping Cart with Dynamic Item Additions</li>
                        <li>
                          📊 A Weather Dashboard that fetches real-time data
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Career Paths */}
                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities in JavaScript</h3>
                      <p>
                        After completing this course, you'll be ready to work in
                        the following roles:
                      </p>
                      <ul>
                        <li>
                          🔹 <strong>Frontend Developer</strong> - Build
                          interactive websites using JavaScript.
                        </li>
                        <li>
                          🔹 <strong>JavaScript Developer</strong> - Specialize
                          in JavaScript to create efficient web applications.
                        </li>
                        <li>
                          🔹 <strong>Full-Stack Developer</strong> - Use
                          JavaScript in both the frontend and backend of web
                          applications.
                        </li>
                        <li>
                          🔹 <strong>Freelance Developer</strong> - Offer
                          JavaScript-based development services for various
                          clients.
                        </li>
                        <li>
                          🔹 <strong>Software Engineer</strong> - Create
                          scalable and high-performance JavaScript applications.
                        </li>
                      </ul>

                      <h4>🚀 Take Your Skills to the Next Level</h4>
                      <p>
                        By the end of this course, you'll have a portfolio of
                        JavaScript projects and the confidence to build
                        production-ready applications!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>JavaScript Development Course</h1>
                <p>
                  A comprehensive course on mastering JavaScript, covering both
                  the fundamentals and advanced concepts. It includes topics
                  like asynchronous programming, DOM manipulation, error
                  handling, and modern JavaScript features (ES6+). Through
                  hands-on projects and real-world examples, you'll gain the
                  skills necessary to become a proficient JavaScript developer.
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
                  The JavaScript Developer Certification validates your
                  expertise in mastering JavaScript. It covers both the basics
                  and advanced techniques, and demonstrates your ability to
                  build scalable, dynamic applications. This certification will
                  boost your resume and attract potential employers or clients.
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
                  The course is 13 weeks long, with video lessons, interactive
                  coding exercises, and project-based assignments to help you
                  practice what you've learned.
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
                  Benefits of completing the JavaScript Development
                  Certification include:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Build interactive, dynamic websites with JavaScript.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master modern JavaScript features and techniques.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Gain real-world experience with JavaScript projects.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Receive a certification to showcase your JavaScript
                      skills.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Improve your job prospects and marketability as a
                      JavaScript developer.
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
                  The course covers JavaScript, asynchronous programming
                  (Promises, async/await), DOM manipulation, error handling,
                  modern JavaScript features (ES6+), and debugging techniques.
                </p>
              </div>
            </div>

            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 3,000</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 3,000. You will be required to pay Ghc
                  1,500 for the first installment and Ghc 750 for each
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
