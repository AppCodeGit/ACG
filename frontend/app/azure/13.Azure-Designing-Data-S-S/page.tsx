"use client";

import "../../Software/Css/details.css";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";
import Link from "next/link";
import DataScienceImage from "../images/5.DP-100-Designing-and-Implementing-a-Data-Science-Solution-on-Azure.png";
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
            <Link href="/azure">Azure</Link>
            <span className="material-symbols-outlined">arrow_and_edge</span>
          </div>
          <span>
            Designing and Implementing a Data Science Solution on Azure
          </span>
        </div>

        <div className="details-page container">
          <div className="details-items">
            {/* == First Item == */}
            <div className="item">
              <div className="image-container">
                <Image
                  src={DataScienceImage}
                  alt="Designing and Implementing a Data Science Solution on Azure"
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
                      <h3>
                        🤖 Designing and Implementing a Data Science Solution on
                        Azure (DP-100)
                      </h3>
                      <p>
                        This comprehensive course teaches you how to design and
                        implement data science solutions using Microsoft Azure.
                        You'll learn to use Azure Machine Learning service to
                        build, train, and deploy machine learning models, as
                        well as implement responsible AI practices and MLOps
                        principles.
                      </p>
                      <div className="data-item">
                        📌 1: Introduction to Azure Machine Learning - Workspace
                        setup, Compute targets, Datastores
                      </div>
                      <div className="data-item">
                        📌 2: Data Preparation and Feature Engineering - Data
                        ingestion, Transformation, Feature extraction
                      </div>
                      <div className="data-item">
                        📌 3: Model Training and Evaluation - Algorithms,
                        Hyperparameter tuning, Metrics
                      </div>
                      <div className="data-item">
                        📌 4: Automated Machine Learning (AutoML) - ML
                        pipelines, Model selection, Ensemble methods
                      </div>
                      <div className="data-item">
                        📌 5: Deep Learning with Azure - TensorFlow, PyTorch,
                        GPU compute, Distributed training
                      </div>
                      <div className="data-item">
                        📌 6: Model Deployment and Management - Real-time
                        endpoints, Batch inference, AKS, Container instances
                      </div>
                      <div className="data-item">
                        📌 7: Responsible AI and Model Monitoring -
                        Interpretability, Fairness, Drift detection
                      </div>
                      <div className="data-item">
                        📌 8: MLOps and CI/CD for ML - Azure DevOps, GitHub
                        Actions, Model versioning
                      </div>
                      <div className="data-item">
                        📌 9: Azure Cognitive Services Integration - Vision,
                        Speech, Language, Decision APIs
                      </div>
                      <div className="data-item">
                        📌 10: Capstone Project and DP-100 Certification
                        Preparation
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
                          This comprehensive course teaches you how to design
                          and implement data science solutions using Microsoft
                          Azure. You'll learn to use Azure Machine Learning
                          service to build, train, and deploy machine learning
                          models, as well as implement responsible AI practices
                          and MLOps principles.
                        </p>

                        <p>
                          <strong>
                            <i className="fas fa-user-graduate"></i> Course
                            Prerequisites:
                          </strong>{" "}
                          Basic understanding of machine learning concepts and
                          Python programming. Familiarity with cloud concepts is
                          helpful but not required.
                        </p>
                      </div>

                      <h4>🎯 Learning Objectives:</h4>
                      <ul>
                        <li>
                          ✅ Set up and configure an Azure Machine Learning
                          workspace
                        </li>
                        <li>
                          ✅ Prepare data for machine learning tasks at scale
                        </li>
                        <li>
                          ✅ Train, evaluate, and optimize machine learning
                          models
                        </li>
                        <li>
                          ✅ Implement automated machine learning (AutoML)
                          solutions
                        </li>
                        <li>
                          ✅ Deploy and consume machine learning models as web
                          services
                        </li>
                        <li>
                          ✅ Apply responsible AI principles and monitor models
                          in production
                        </li>
                        <li>
                          ✅ Build deep learning models using TensorFlow and
                          PyTorch
                        </li>
                        <li>
                          ✅ Implement MLOps practices for continuous
                          integration and delivery
                        </li>
                        <li>
                          ✅ Prepare for Microsoft's DP-100 certification exam
                        </li>
                      </ul>

                      <h4>🔥 What You'll Build:</h4>
                      <ul>
                        <li>
                          🤖 End-to-end ML pipeline with Azure Machine Learning
                          and AutoML
                        </li>
                        <li>
                          📊 Image classification model using deep learning on
                          GPU clusters
                        </li>
                        <li>
                          🔮 Real-time prediction API deployed to Kubernetes
                        </li>
                        <li>
                          📈 Model monitoring dashboard with Responsible AI
                          tools
                        </li>
                        <li>
                          🔄 CI/CD pipeline for automated model retraining and
                          deployment
                        </li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This 10-module course combines theoretical knowledge
                        with hands-on labs using Azure Machine Learning service:
                      </p>
                      <ul>
                        <li>Module 1: Azure Machine Learning Fundamentals</li>
                        <li>
                          Module 2: Data Preparation and Feature Engineering
                        </li>
                        <li>Module 3: Model Training and Evaluation</li>
                        <li>Module 4: Automated Machine Learning</li>
                        <li>Module 5: Deep Learning with Azure</li>
                        <li>Module 6: Model Deployment and Management</li>
                        <li>Module 7: Responsible AI and Monitoring</li>
                        <li>Module 8: MLOps and CI/CD</li>
                        <li>Module 9: Cognitive Services Integration</li>
                        <li>Module 10: Capstone Project</li>
                      </ul>

                      <h4>Course Delivery:</h4>
                      <p>
                        Instructor-led training with hands-on labs in Azure
                        Machine Learning service. Includes access to Azure
                        resources for practical exercises.
                      </p>

                      <h4>Certification:</h4>
                      <p>
                        Course prepares you for Microsoft Certified: Azure Data
                        Scientist Associate (DP-100) exam. Includes one free
                        exam attempt voucher and practice tests.
                      </p>
                    </div>
                  </div>

                  <div
                    className={`content ${activeContent === 3 ? "show" : ""}`}
                  >
                    <div className="Roles-container">
                      <h3>💼 Career Opportunities</h3>
                      <p>
                        Graduates of this course will be prepared for these
                        in-demand roles:
                      </p>
                      <ul>
                        <li>
                          🔹 <strong>Azure Data Scientist:</strong> Design and
                          implement data science solutions using Azure ML
                          services. Average salary: $110,000 - $155,000
                        </li>
                        <li>
                          🔹 <strong>Machine Learning Engineer:</strong> Build,
                          train, and deploy machine learning models at scale.
                          Average salary: $115,000 - $160,000
                        </li>
                        <li>
                          🔹 <strong>AI Developer:</strong> Create AI solutions
                          using Azure cognitive services and custom models.
                          Average salary: $105,000 - $150,000
                        </li>
                        <li>
                          🔹 <strong>Data Science Consultant:</strong> Help
                          organizations implement ML solutions on Azure. Average
                          salary: $120,000 - $165,000
                        </li>
                        <li>
                          🔹 <strong>MLOps Engineer:</strong> Implement CI/CD
                          pipelines for machine learning models. Average salary:
                          $125,000 - $170,000
                        </li>
                        <li>
                          🔹 <strong>Research Scientist:</strong> Develop novel
                          ML algorithms and solutions. Average salary: $130,000
                          - $180,000
                        </li>
                      </ul>
                      <p>
                        Data science and AI roles are among the fastest-growing
                        and highest-paying positions in the tech industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* == Second Item */}
            <div className="item">
              <div className="text">
                <h1>
                  Designing and Implementing a Data Science Solution on Azure
                  (DP-100)
                </h1>
                <p>
                  Master the skills to design and implement end-to-end data
                  science solutions on Microsoft Azure. This comprehensive
                  course covers all aspects of the machine learning lifecycle
                  using Azure Machine Learning service, from data preparation to
                  model deployment and monitoring. You'll gain hands-on
                  experience with Azure's powerful data science tools while
                  preparing for the DP-100 certification exam.
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
                  This course prepares you for the Microsoft Certified: Azure
                  Data Scientist Associate certification (DP-100). The
                  certification validates your ability to design and implement
                  data science solutions using Azure Machine Learning and Azure
                  Databricks. This is a highly valued certification for data
                  professionals.
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
                  The course is 12 weeks long, with 60 hours of instructor-led
                  training and 80+ hours of hands-on labs and projects. Includes
                  access to Azure credits for practice.
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
                  Benefits of completing this Azure Data Science course:
                  <ul>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Hands-on experience with Azure Machine Learning service
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Comprehensive preparation for DP-100 certification exam
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Skills for high-demand AI and machine learning roles
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Portfolio of real-world data science projects
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        done_all
                      </span>
                      Career guidance and job placement assistance
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
                  Azure Machine Learning service, Azure Databricks, Azure
                  Cognitive Services, Python SDK for Azure ML, MLflow, ONNX,
                  AutoML, Responsible AI Dashboard, Azure DevOps, GitHub
                  Actions, TensorFlow, PyTorch, scikit-learn, and other Azure AI
                  services.
                </p>
              </div>
            </div>
            {/* == Third Item */}
            <div className="item">
              <div className="payment-details">
                <div className="info">Fee:</div>
                <div className="info">Ghc 7,500</div>
              </div>

              <div className="course-info">
                <h4>Course Information</h4>
                <p>
                  The course fee is Ghc 7,500. You will be required to pay Ghc
                  2,500 for the first installment and Ghc 2,500 for each
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
                    week (Monday to Wednesday). Students will work on projects
                    and labs from Thursday to Sunday.
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
                    <b>Additional Notes:</b> Students will receive access to
                    Azure Machine Learning resources for hands-on labs. Basic
                    knowledge of Python and statistics is recommended.
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
                    1:00 PM - 4:00 PM (Afternoon Batch)
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
                <h4>Course Cancellation/Reschedule Policy</h4>
                <p>
                  Once payment is made, it is <strong>non-refundable</strong>.
                  Students are expected to carefully review the course details
                  before making a payment.
                </p>
                <p>
                  In the event of unforeseen circumstances, we reserve the right
                  to reschedule the course. However, the course will still be
                  conducted at a later date, and enrolled students will be
                  notified in advance.
                </p>
                <p>A minimum of 5 students is required to start a class.</p>
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
