"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import ForexImage from "../images/banner.jpg";
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
            <Link href="/forexTrading">Finance</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>Professional Forex Trading Certification</span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={ForexImage}
                  alt="Professional Forex Trading Certification"
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
                    Career Path
                  </p>
                </div>

                {/* Content Section */}
                <div className="content-wrapper">
                  <div
                    className={`content ${activeContent === 1 ? "show" : ""}`}
                  >
                    <div className="concept-data">
                      <h3>💹 Professional Forex Trading Certification</h3>
                      <p>
                        This comprehensive forex trading course covers
                        everything from basic concepts to advanced trading
                        strategies. Learn to analyze currency pairs, manage
                        risk, and execute trades like a professional in the
                        world's largest financial market.
                      </p>
                      <div className="data-item">
                        📌 1: Forex Market Fundamentals - Currency pairs, Market
                        participants, Trading sessions
                      </div>
                      <div className="data-item">
                        📌 2: Technical Analysis Mastery - Chart patterns,
                        Indicators, Support/resistance, Trend analysis
                      </div>
                      <div className="data-item">
                        📌 3: Fundamental Analysis - Economic indicators,
                        Central bank policies, News trading
                      </div>
                      <div className="data-item">
                        📌 4: Risk Management Strategies - Position sizing,
                        Stop-loss placement, Risk-reward ratios
                      </div>
                      <div className="data-item">
                        📌 5: Trading Psychology - Emotional control,
                        Discipline, Overcoming fear and greed
                      </div>
                      <div className="data-item">
                        📌 6: Trading Platforms & Tools - MetaTrader,
                        TradingView, Order execution, Charting tools
                      </div>
                      <div className="data-item">
                        📌 7: Algorithmic Trading Basics - Trading algorithms,
                        Automated strategies, Backtesting
                      </div>
                      <div className="data-item">
                        📌 8: Advanced Trading Strategies - Scalping, Day
                        trading, Swing trading, Position trading
                      </div>
                      <div className="data-item">
                        📌 9: Portfolio Management - Multi-currency strategies,
                        Diversification, Hedging
                      </div>
                      <div className="data-item">
                        📌 10: Live Trading Sessions - Real-time analysis, Trade
                        execution, Performance review
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
                          This comprehensive forex trading course covers
                          everything from basic concepts to advanced trading
                          strategies. Learn to analyze currency pairs, manage
                          risk, and execute trades like a professional in the
                          world's largest financial market.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          No prior trading experience required. Basic computer
                          skills and internet access needed.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Understand forex market structure, participants,
                          and trading sessions
                        </li>
                        <li>
                          ✅ Master technical analysis tools, indicators, and
                          chart patterns
                        </li>
                        <li>
                          ✅ Analyze economic factors affecting currency values
                          and central bank policies
                        </li>
                        <li>
                          ✅ Develop effective risk management strategies to
                          protect capital
                        </li>
                        <li>
                          ✅ Control emotions and maintain trading discipline
                          for consistent results
                        </li>
                        <li>
                          ✅ Use trading platforms effectively for analysis and
                          execution
                        </li>
                        <li>
                          ✅ Create and backtest trading strategies for
                          different market conditions
                        </li>
                        <li>
                          ✅ Implement advanced trading approaches including
                          algorithmic trading
                        </li>
                        <li>
                          ✅ Build and manage a diversified forex portfolio
                        </li>
                        <li>
                          ✅ Execute trades with confidence during live market
                          sessions
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          📊 Complete trading plan with entry/exit rules and
                          risk parameters
                        </li>
                        <li>
                          📈 Technical analysis toolkit with custom indicators
                        </li>
                        <li>
                          💰 Risk management system with position sizing
                          calculator
                        </li>
                        <li>
                          📉 Trading journal for performance tracking and
                          improvement
                        </li>
                        <li>
                          🤖 Basic algorithmic trading strategy for automation
                        </li>
                        <li>
                          📋 Portfolio management framework for multiple
                          currency pairs
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>This practical 10-module program covers:</p>
                      <ul>
                        <li>Module 1: Forex Market Basics</li>
                        <li>Module 2: Technical Analysis</li>
                        <li>Module 3: Fundamental Analysis</li>
                        <li>Module 4: Risk Management</li>
                        <li>Module 5: Trading Psychology</li>
                        <li>Module 6: Trading Platforms</li>
                        <li>Module 7: Algorithmic Trading</li>
                        <li>Module 8: Advanced Strategies</li>
                        <li>Module 9: Portfolio Management</li>
                        <li>Module 10: Live Trading</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Interactive sessions with live market analysis,
                        simulated trading exercises, and real-time chart
                        reading. Includes demo trading account with virtual
                        funds.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Earn our Professional Forex Trader certification upon
                        successful completion, recognized by financial
                        institutions and trading firms.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities</h3>
                      <p>Graduates can pursue these exciting paths:</p>
                      <ul>
                        <li>
                          🔹 <strong>Retail Forex Trader:</strong> Trade your
                          own capital independently. Average income: Variable
                          based on performance
                        </li>
                        <li>
                          🔹 <strong>Fund Manager:</strong> Manage investment
                          portfolios for clients. Average salary: $75,000 -
                          $150,000
                        </li>
                        <li>
                          🔹 <strong>Trading Analyst:</strong> Provide market
                          insights and analysis. Average salary: $55,000 -
                          $85,000
                        </li>
                        <li>
                          🔹 <strong>Brokerage Associate:</strong> Work with
                          trading firms and brokerages. Average salary: $45,000
                          - $70,000
                        </li>
                        <li>
                          🔹 <strong>Trading Educator:</strong> Teach others to
                          trade successfully. Average income: $50,000 - $90,000
                        </li>
                        <li>
                          🔹 <strong>Proprietary Trader:</strong> Trade firm
                          capital with profit sharing. Average income: $60,000 -
                          $200,000
                        </li>
                        <li>
                          🔹 <strong>Quantitative Trader:</strong> Develop
                          algorithmic trading strategies. Average salary:
                          $100,000 - $180,000
                        </li>
                      </ul>
                      <p>
                        Forex trading offers flexible career paths from
                        independent trading to institutional roles in financial
                        markets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>Professional Forex Trading Certification</h1>
                <p>
                  Master the art of currency trading with our professional forex
                  course. Learn proven strategies from experienced traders and
                  gain the skills to navigate the $6.6 trillion daily forex
                  market with confidence. Whether you aspire to trade
                  independently or work with financial institutions, this
                  comprehensive program provides the foundation for success.
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
                  Professional Forex Trader Certification recognized by
                  financial institutions and trading firms. Includes a
                  verifiable digital credential for your professional profile.
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
                  8-week program with 48 instructor-led hours and 100+ practical
                  trading hours, including live market sessions and strategy
                  development.
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
                  Key benefits of this forex trading course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Learn from professional traders with real market
                      experience
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Access to demo trading platform with virtual funds
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Master professional risk management techniques
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Develop and backtest profitable trading strategies
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Join our alumni trading community for ongoing support
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
                  MetaTrader 4 (MT4), MetaTrader 5 (MT5), TradingView, economic
                  calendars (Forex Factory, DailyFX), correlation matrices,
                  pivot point calculators, position size calculators, and
                  various technical analysis tools including Fibonacci, moving
                  averages, RSI, MACD, Bollinger Bands, and Ichimoku Kinko Hyo.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 4,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  Course fee: Ghc 4,500 payable as Ghc 1,500 initial deposit and
                  Ghc 1,500 monthly installments.
                </p>

                <div className="info-text">
                  <div className="icons">
                    <span className="material-symbols-outlined icon-schedule">
                      schedule
                    </span>
                  </div>
                  <p>
                    <b>Schedule:</b> 8 weeks, 3 sessions/week (Tue/Thu/Sat)
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
                    <b>Requirements:</b> Laptop with internet access. Demo
                    trading account will be provided. No financial commitment to
                    live trading required.
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
                    <b>Times:</b> Weekdays 6PM-9PM, Saturday 10AM-1PM (choose
                    your preferred batch)
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
                <p>
                  <strong>Trading risks:</strong> Past performance doesn't
                  guarantee future results. Trading involves significant risk of
                  loss. This educational program focuses on skill development,
                  not guaranteed returns.
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
