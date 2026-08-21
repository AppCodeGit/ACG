"use client";

import "./FeeSelectionPage.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import feeimage1 from "../../assets/feeimage1.jpeg";
import feeimage2 from "../../assets/feeimage2.jpeg";
import feeimage3 from "../../assets/feeimage3.jpeg";
import feeimage4 from "../../assets/feeimage4.jpeg";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Subscription from "../../components/SubscriptionPlans/SubscriptionPlans";

// Types
interface PaymentStatus {
  [semester: string]: {
    [installment: string]: string;
  };
}

interface UserData {
  email: string;
  name?: string;
}

function FeeSelectionPage() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");
  const [installment, setInstallment] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({});

  const paymentLinks: Record<number, string> = {
    2000: "https://paystack.shop/pay/1kcg01rayo",
    1920: "https://paystack.shop/pay/1kcg01rayo",
  };

  // Get user email and payment status
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user: UserData = JSON.parse(userData);
        if (user.email) {
          setEmail(user.email);
          fetchPaymentStatus(user.email);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const fetchPaymentStatus = async (userEmail: string) => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/fees/payment-status/${userEmail}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch payment status");
      }

      const data = await response.json();
      console.log("Payment status received:", data);
      setPaymentStatus(data);
    } catch (error) {
      console.error("Error fetching payment status:", error);
      setPaymentStatus({});
    }
  };

  const handlePayment = (
    amount: number,
    semester: string,
    installment: string
  ) => {
    console.log("Button clicked!", { amount, semester, installment });
    setAmount(amount);
    setSemester(semester);
    setInstallment(installment);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");

      // Save payment data
      const saveResponse = await fetch(`${API_URL}/api/fees/SaveFormData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          semester,
          installment,
          amount,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save payment data");
      }

      const saveResult = await saveResponse.json();
      console.log("Payment data saved:", saveResult);

      // Redirect to Paystack
      const paymentLink = paymentLinks[amount];
      if (!paymentLink) {
        console.error(`No payment link for amount: ${amount}`);
        setIsLoading(false);
        return;
      }

      const metadata = {
        semester,
        installment,
        amount,
        paymentId: saveResult.paymentId,
        sessionId: saveResult.sessionId,
      };

      const redirectUrl = `${paymentLink}?metadata=${encodeURIComponent(
        JSON.stringify(metadata)
      )}`;

      console.log("Redirecting to Paystack:", redirectUrl);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Payment initialization error:", error);
      setIsLoading(false);
    }
  };

  // Check if installment is paid
  const isInstallmentPaid = (semester: string, installment: string): boolean => {
    if (!paymentStatus || Object.keys(paymentStatus).length === 0) {
      return false;
    }

    return (
      paymentStatus[semester] &&
      (paymentStatus[semester][installment] === "paid" ||
        paymentStatus[semester][installment] === "success")
    );
  };

  // Check if ALL installments in a semester are paid
  const isSemesterCompleted = (semester: string): boolean => {
    const installments = [
      "First Installment",
      "Second Installment",
      "Third Installment",
    ];
    return installments.every((installment) =>
      isInstallmentPaid(semester, installment)
    );
  };

  // Check if previous installment is paid
  const isInstallmentAvailable = (
    semester: string,
    installment: string
  ): boolean => {
    if (semester === "First Semester" && installment === "First Installment") {
      return true;
    }

    const installments = [
      "First Installment",
      "Second Installment",
      "Third Installment",
    ];
    const currentIndex = installments.indexOf(installment);

    if (!paymentStatus[semester]) {
      return currentIndex === 0;
    }

    if (currentIndex === 0) {
      const previousSemester =
        semester === "Second Semester" ? "First Semester" : "Second Semester";
      return isSemesterCompleted(previousSemester);
    }

    const previousInstallment = installments[currentIndex - 1];
    return isInstallmentPaid(semester, previousInstallment);
  };

  // Render payment button
  const renderPaymentButton = (
    amount: number,
    semester: string,
    installmentName: string
  ) => {
    const isPaid = isInstallmentPaid(semester, installmentName);
    const isAvailable = isInstallmentAvailable(semester, installmentName);

    return (
      <button
        className={`fee-btn ${isPaid ? "fee-btn-paid" : !isAvailable ? "fee-btn-disabled" : ""}`}
        onClick={() => handlePayment(amount, semester, installmentName)}
        disabled={isPaid || !isAvailable}
      >
        {isPaid ? (
          <>
            <span className="fee-btn-icon">✅</span> Paid
          </>
        ) : (
          <>
            Pay Now <span className="fee-btn-arrow">→</span>
          </>
        )}
      </button>
    );
  };

  return (
    <>
      <Header />
      <Navigation />

      <div className="fee-page">
        <div className="fee-container container">

          {/* ============================================
          HERO SECTION
          ============================================ */}
          <div className="fee-hero">
            <div className="fee-hero-content">
              <div className="fee-hero-icon">💰</div>
              <h1 className="fee-hero-title">Fee Structure</h1>
              <p className="fee-hero-subtitle">
                Manage your tuition payments easily. Select your semester and
                installment plan below.
              </p>
            </div>
          </div>

          {/* ============================================
          LAYOUT SECTION
          ============================================ */}
          <div className="fee-layout">
            {/* Left: Image Grid */}
            <div className="fee-image-grid">
              <div className="fee-image-item">
                <Image src={feeimage1} alt="Campus" fill className="fee-image" />
              </div>
              <div className="fee-image-item">
                <Image src={feeimage2} alt="Learning" fill className="fee-image" />
              </div>
              <div className="fee-image-item">
                <Image src={feeimage3} alt="Students" fill className="fee-image" />
              </div>
              <div className="fee-image-item">
                <Image src={feeimage4} alt="Graduation" fill className="fee-image" />
              </div>
            </div>

            {/* Right: Content */}
            <div className="fee-content">
              <h2 className="fee-content-title">
                Welcome to Our Fee Structure
              </h2>
              <p className="fee-content-desc">
                Fees cover internet services, learning materials, activities,
                and support services. AppCode&apos;s academic year consists of
                three semesters.
              </p>

              {/* Semester Cards */}
              <div className="fee-semester-grid">
                <div className="fee-semester-card">
                  <div className="fee-semester-icon">📘</div>
                  <h4>Semester One</h4>
                  <p>Foundational concepts and basic skills development.</p>
                </div>
                <div className="fee-semester-card">
                  <div className="fee-semester-icon">📗</div>
                  <h4>Semester Two</h4>
                  <p>Intermediate topics and projects to build on your knowledge.</p>
                </div>
                <div className="fee-semester-card">
                  <div className="fee-semester-icon">📕</div>
                  <h4>Semester Three</h4>
                  <p>Advanced subjects and capstone projects.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================
          PRICE SECTION
          ============================================ */}
          <div className="fee-price-section">
            <div className="fee-price-left">
              <h3>First Installment</h3>
              <p>
                This initial payment includes admission processing fees,
                administrative costs, and other essential onboarding services.
              </p>
            </div>

            <div className="fee-price-right">
              <ul className="fee-price-benefits">
                <li>✅ Access to student portal</li>
                <li>✅ Campus development and maintenance fee</li>
                <li>✅ Library and ICT services subscription</li>
                <li>✅ Learning resources</li>
              </ul>

              <div className="fee-price-amount">
                <span className="fee-price-currency">GH¢</span>
                <span className="fee-price-number">3,000.00</span>
              </div>

              <div className="fee-price-btn">
                {renderPaymentButton(2000, "First Semester", "First Installment")}
              </div>
            </div>
          </div>

          {/* ============================================
          SUBSCRIPTION SECTION
          ============================================ */}
          <div className="fee-subscription-section">
            <Subscription />
          </div>

        </div>
      </div>

      {/* ============================================
      PAYMENT SUMMARY MODAL
      ============================================ */}
      {showModal && (
        <div className="fee-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="fee-modal" onClick={(e) => e.stopPropagation()}>
            <div className="fee-modal-header">
              <div className="fee-modal-header-icon">📋</div>
              <h3>Payment Summary</h3>
              <button
                className="fee-modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="fee-modal-body">
              <div className="fee-modal-item">
                <span className="fee-modal-item-icon">🏫</span>
                <div className="fee-modal-item-content">
                  <span className="fee-modal-item-label">Semester</span>
                  <span className="fee-modal-item-value">{semester}</span>
                </div>
              </div>

              <div className="fee-modal-item">
                <span className="fee-modal-item-icon">📋</span>
                <div className="fee-modal-item-content">
                  <span className="fee-modal-item-label">Installment Plan</span>
                  <span className="fee-modal-item-value">{installment}</span>
                </div>
              </div>

              <div className="fee-modal-total">
                <span className="fee-modal-total-icon">💰</span>
                <div className="fee-modal-total-content">
                  <span className="fee-modal-total-label">Total Amount Due</span>
                  <span className="fee-modal-total-value">
                    GH¢ {amount?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="fee-modal-footer">
              <div className="fee-modal-secure">
                <span>🔒</span> Secure Payment
              </div>
              <div className="fee-modal-actions">
                <button
                  className="fee-modal-btn fee-modal-btn-cancel"
                  onClick={() => setShowModal(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  className="fee-modal-btn fee-modal-btn-submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="fee-spinner"></span> Processing...
                    </>
                  ) : (
                    <>
                      Proceed <span className="fee-btn-arrow">→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default FeeSelectionPage;