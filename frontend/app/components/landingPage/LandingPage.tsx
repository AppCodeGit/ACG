"use client";

import "./LandingPage.css";
import Carousel from "../Home/MyCarousel";
import Image from "next/image";
import Link from "next/link";
import cloudimage from "../Home/image/pngegg.png";
import forexImage from "../Home/image/forex-icon-0.jpg";
import exploreImage from "../../assets/explore.png";
import quickImage from "../../assets/quick.png";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="grid-container container">
        {/* == Container One - Navigation Links */}
        <div className="grid-nav">
          {/* == Quick Links == */}
          <div className="nav-section navOne">
            <h3>
              <Image
                src={exploreImage}
                alt="Explore icon"
              
                className="icon"
              />
              Quick Links
            </h3>
            <br />
            <ul>
              <li>
                <Link href="#">
                  <div className="link">
                    <span className="nav-icon material-symbols-outlined">
                      info
                    </span>
                    About
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <div className="link">
                    <span className="nav-icon material-symbols-outlined">
                      handshake
                    </span>
                    Service
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <div className="link">
                    <span className="nav-icon material-symbols-outlined">
                      article
                    </span>
                    Blog
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <div className="link">
                    <span className="nav-icon material-symbols-outlined">
                      contact_mail
                    </span>
                    Contact
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* == Explore Opportunities == */}
          <div className="nav-section navTwo">
            <br />
            <h3>
              <Image src={quickImage} alt="Quick icon" className="icon" />
              Explore Opportunities
            </h3>
            <br />
            <ul>
              <li>
                <Link href="#">
                  <div className="link">
                    <span className="material-symbols-outlined nav-icon">
                      school
                    </span>
                    Bootcamps
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <div className="link">
                    <span className="material-symbols-outlined nav-icon">
                      event
                    </span>
                    Events
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <div className="link">
                    <span className="material-symbols-outlined nav-icon">
                      timer
                    </span>
                    Pre-Session
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <div className="link">
                    <span className="material-symbols-outlined nav-icon">
                      psychology
                    </span>
                    Workshops
                  </div>
                  <span className="material-symbols-outlined arrow-icon">
                    south_east
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* == Container Two - Main Content == */}
        <main className="grid-main">
          {/* Welcome Icons */}
          <div className="welcome-section">
            <div className="icons">
              <div className="icon-item">
                <span className="material-symbols-outlined school-icon">
                  school
                </span>
                <p>Education</p>
              </div>
              <div className="icon-item">
                <span className="material-symbols-outlined code-icon">
                  code
                </span>
                <p>Programming</p>
              </div>
              <div className="icon-item">
                <span className="material-symbols-outlined lightbulb-icon">
                  lightbulb
                </span>
                <p>Ideas</p>
              </div>
            </div>
          </div>

          {/* Carousel Component */}
          <Carousel />

          {/* Forex Trading Section */}
          <div className="section-item item-three">
            <div className="text-container">
              <h3>Enhance Your Skills in Forex Trading</h3>
              <p>
                Learn the art of trading in the Forex market and master
                strategies to maximize your profits.
              </p>
            </div>
            <div className="item">
              <div className="image-item">
                <Image
                  src={forexImage}
                  alt="Forex Trading Training"
                  className="image" // Add this
                />
                Program in Forex Trading
              </div>
              <p>
                <span className="material-symbols-outlined">check_circle</span>
                Forex trading courses provide you with the knowledge to analyze
                currency markets and execute profitable trades.
              </p>
              <p>
                <span className="material-symbols-outlined">check_circle</span>
                Master trading strategies, risk management, and market analysis
                to stay ahead in the dynamic Forex market.
              </p>
              <div className="btn-container">
                <Link href="#" className="btn">
                  Learn More
                  <span className="material-symbols-outlined">east</span>
                </Link>
                <span className="material-symbols-outlined icons">
                  radio_button_checked
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* == Container Three - Cloud Computing & Video == */}
        <section className="grid-section">
          {/* Cloud Computing Section */}
          <div className="section-item">
            <div className="text-container">
              <h3>Advance Your Skills in Cloud Computing</h3>
              <p>
                Learn industry-leading cloud technologies and enhance your
                professional skills.
              </p>
            </div>
            <div className="item">
              <div className="image-item">
                <Image
                  src={cloudimage}
                  alt="Cloud Computing Training"
                  className="image" // Add this
                />
                Program in Cloud Computing
              </div>
              <p>
                <span className="material-symbols-outlined">check_circle</span>
                Cloud computing certifications validate your ability to design,
                deploy, and manage cloud-based solutions.
              </p>
              <p>
                <span className="material-symbols-outlined">check_circle</span>
                Master platforms like AWS, Azure, or Google Cloud and unlock
                global career opportunities.
              </p>
              <div className="btn-container">
                <Link href="#" className="btn">
                  Learn More
                  <span className="material-symbols-outlined">east</span>
                </Link>
                <span className="material-symbols-outlined icons">
                  radio_button_checked
                </span>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="video-container">
            <iframe
              className="video-frame"
              src="https://www.youtube.com/embed/vlqE1f76y-Y?si=5pS3Nmr93NNfJlIV"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
