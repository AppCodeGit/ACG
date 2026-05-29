"use client";

import "../Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
// Fixed: Changed from NavLink to Next.js Link
import Link from "next/link";
// Fixed: Renamed to avoid conflict with Next.js Image component
import NextJSImage from "../images/next js.webp";
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
          <span>Next JS</span>
        </div>
        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                {/* Fixed: Changed img to Image */}
                <Image src={NextJSImage} alt="Next.js Development Course" />
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
                      <h3>🚀 Full-Stack Web Development with Next.js</h3>
                      <p>
                        This course is designed to equip you with the skills
                        needed to build scalable and high-performance web
                        applications using Next.js:
                      </p>
                      <div className="data-item">
                        📌 1: Introduction to Next.js
                      </div>
                      <div className="data-item">
                        📌 2: React.js Fundamentals for Next.js
                      </div>
                      <div className="data-item">
                        📌 3: Server-Side Rendering (SSR) and Static Site
                        Generation (SSG)
                      </div>
                      <div className="data-item">
                        📌 4: Next.js Routing and Dynamic Pages
                      </div>
                      <div className="data-item">
                        📌 5: Data Fetching in Next.js
                      </div>
                      <div className="data-item">
                        📌 6: API Routes and Serverless Functions
                      </div>
                      <div className="data-item">
                        📌 7: Optimizing Performance in Next.js
                      </div>
                      <div className="data-item">
                        📌 8: Deployment & Hosting Next.js Apps
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
                          ✅ Build full-stack applications with Next.js and
                          React.js
                        </li>
                        <li>
                          ✅ Leverage Server-Side Rendering (SSR) and Static
                          Site Generation (SSG)
                        </li>
                        <li>
                          ✅ Implement data fetching strategies using Next.js
                          (getServerSideProps, getStaticProps)
                        </li>
                        <li>✅ Master routing and dynamic pages in Next.js</li>
                        <li>
                          ✅ Integrate API routes and serverless functions in
                          Next.js
                        </li>
                        <li>
                          ✅ Deploy applications with Next.js on Vercel,
                          Netlify, or other platforms
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <p>This course includes hands-on projects, such as:</p>
                      <ul>
                        <li>
                          🌍 A Blog Website with Server-Side Rendering (SSR)
                        </li>
                        <li>
                          🛍️ An E-Commerce Platform with Static Site Generation
                          (SSG)
                        </li>
                        <li>📊 A Dashboard with Real-Time Data Fetching</li>
                      </ul>
                    </div>
                  </div>

                  {/* Career Paths */}
                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities in Next.js</h3>
                      <p>
                        After completing this course, you'll be ready to work in
                        the following roles:
                      </p>
                      <ul>
                        <li>
                          🔹 <strong>Full-Stack Developer</strong> - Build and
                          manage full-stack web applications using Next.js.
                        </li>
                        <li>
                          🔹 <strong>Frontend Developer</strong> - Specialize in
                          React.js and Next.js for optimized performance and
                          SEO.
                        </li>
                        <li>
                          🔹 <strong>Backend Developer</strong> - Develop
                          serverless API routes and manage database operations.
                        </li>
                        <li>
                          🔹 <strong>Freelance Developer</strong> - Build
                          scalable, SEO-friendly applications for clients.
                        </li>
                        <li>
                          🔹 <strong>Startup Founder</strong> - Launch your own
                          scalable web-based business using Next.js.
                        </li>
                      </ul>

                      <h4>🚀 Take Your Skills to the Next Level</h4>
                      <p>
                        By the end of this course, you'll have a portfolio of
                        real-world projects and the confidence to build
                        production-ready web applications with Next.js!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Next.js Development Course</h1>
                <p>
                  A comprehensive course on full-stack development using the
                  Next.js framework, which is built on top of React.js. It
                  covers both frontend and backend development, teaching you how
                  to build highly optimized and SEO-friendly web applications.
                  The course includes hands-on projects, dynamic routing, data
                  fetching methods (SSR, SSG), API routes, and deployment
                  strategies to make you a proficient Next.js developer.
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
                  The Next.js Developer Certification validates your expertise
                  in building fast, scalable web applications using Next.js. It
                  covers frontend and backend development, routing, data
                  fetching, and deployment. This certification helps demonstrate
                  your skills to potential employers and clients.
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
                  Benefits of completing the Next.js Development Certification
                  include:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn to build SEO-friendly, optimized web applications.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master frontend development with Next.js and React.js.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Gain real-world project experience in building dynamic
                      applications.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Receive a certification to showcase your Next.js skills.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Improve your job prospects as a Next.js developer.
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
                  The course covers Next.js, React.js, Server-Side Rendering
                  (SSR), Static Site Generation (SSG), and API routes.
                  Additional topics include authentication, deployment
                  strategies, and optimizing performance for Next.js
                  applications.
                </p>
              </div>
            </div>

            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 3,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 3,500. You will be required to pay Ghc
                  2,000 for the first installment and Ghc 750 for each
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
