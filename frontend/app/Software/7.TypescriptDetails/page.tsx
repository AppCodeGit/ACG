"use client";

import "../Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
// Fixed: Changed from NavLink to Next.js Link
import Link from "next/link";
// Fixed: Renamed to avoid conflict with Next.js Image component
import TypescriptImage from "../images/Typescript_logo.png";
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
          <span>TypeScript</span>
        </div>
        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                {/* Fixed: Changed img to Image */}
                <Image
                  src={TypescriptImage}
                  alt="TypeScript Development Course"
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
                      <h3>🚀 Web Development with TypeScript</h3>
                      <p>
                        This course is designed to equip you with the skills
                        needed to build scalable and high-performance web
                        applications using TypeScript:
                      </p>
                      <div className="data-item">
                        📌 1: Introduction to TypeScript
                      </div>
                      <div className="data-item">
                        📌 2: TypeScript Basics and Syntax
                      </div>
                      <div className="data-item">
                        📌 3: Working with Types in TypeScript
                      </div>
                      <div className="data-item">
                        📌 4: Advanced TypeScript Features (Generics,
                        Interfaces, etc.)
                      </div>
                      <div className="data-item">
                        📌 5: TypeScript with React.js
                      </div>
                      <div className="data-item">
                        📌 6: Error Handling and Debugging in TypeScript
                      </div>
                      <div className="data-item">
                        📌 7: TypeScript and Node.js
                      </div>
                      <div className="data-item">
                        📌 8: TypeScript Best Practices and Code Organization
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
                          ✅ Master TypeScript fundamentals and its integration
                          with JavaScript
                        </li>
                        <li>
                          ✅ Utilize TypeScript's type system to enhance code
                          quality and reduce errors
                        </li>
                        <li>
                          ✅ Implement advanced features like interfaces,
                          generics, and type aliases
                        </li>
                        <li>
                          ✅ Learn to use TypeScript effectively with React.js
                        </li>
                        <li>
                          ✅ Write clean, maintainable, and scalable TypeScript
                          code for both front-end and back-end
                        </li>
                        <li>
                          ✅ Build real-world projects using TypeScript and
                          integrate it with frameworks like React and Node.js
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <p>This course includes hands-on projects, such as:</p>
                      <ul>
                        <li>
                          🌍 A TypeScript-based React Application with Type
                          Safety
                        </li>
                        <li>
                          🛍️ An E-Commerce Platform with Backend Integration
                          using TypeScript
                        </li>
                        <li>
                          📊 A Dashboard with Real-Time Data Fetching and Type
                          Safety
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Career Paths */}
                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities in TypeScript</h3>
                      <p>
                        After completing this course, you'll be ready to work in
                        the following roles:
                      </p>
                      <ul>
                        <li>
                          🔹 <strong>Full-Stack Developer</strong> - Build and
                          manage full-stack applications using TypeScript.
                        </li>
                        <li>
                          🔹 <strong>Frontend Developer</strong> - Specialize in
                          TypeScript with React.js to build optimized,
                          maintainable applications.
                        </li>
                        <li>
                          🔹 <strong>Backend Developer</strong> - Develop APIs
                          and server-side applications with TypeScript and
                          Node.js.
                        </li>
                        <li>
                          🔹 <strong>Freelance Developer</strong> - Build
                          scalable, maintainable applications for clients using
                          TypeScript.
                        </li>
                        <li>
                          🔹 <strong>Startup Founder</strong> - Build a scalable
                          business using TypeScript for both client-side and
                          server-side code.
                        </li>
                      </ul>

                      <h4>🚀 Take Your Skills to the Next Level</h4>
                      <p>
                        By the end of this course, you'll have a portfolio of
                        real-world projects and the confidence to build
                        production-ready applications using TypeScript!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>TypeScript Development Course</h1>
                <p>
                  A comprehensive course on full-stack development using
                  TypeScript, which is a statically typed superset of
                  JavaScript. It covers both frontend and backend development,
                  teaching you how to build highly optimized, type-safe web
                  applications. The course includes hands-on projects, advanced
                  TypeScript features like generics and interfaces, as well as
                  integrating TypeScript with frameworks like React.js and
                  Node.js.
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
                  The TypeScript Developer Certification validates your
                  expertise in building type-safe, scalable web applications
                  using TypeScript. It covers frontend and backend development,
                  working with types, and integrating TypeScript with popular
                  frameworks like React.js and Node.js. This certification helps
                  demonstrate your skills to potential employers and clients.
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
                  Benefits of completing the TypeScript Development
                  Certification include:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn to write type-safe, scalable code with TypeScript.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master frontend development with React.js and TypeScript.
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
                      Receive a certification to showcase your TypeScript
                      skills.
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Improve your job prospects as a TypeScript developer.
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
                  The course covers TypeScript, React.js, Node.js, working with
                  types, interfaces, and generics. Additional topics include
                  error handling, debugging, and best practices for TypeScript
                  applications.
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
