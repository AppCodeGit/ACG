"use client";

import "./style/FeesPayment.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "./images/cybersecurity-analyst-ecommerce.avif";

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

const FeesDetailsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");
  const [installment, setInstallment] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({});

  // Payment links mapping (same as your working code)
  const paymentLinks: Record<number, string> = {
    2000: "https://paystack.shop/pay/7faz2q19tm",
    1920: "https://paystack.shop/pay/7faz2q19tm",
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
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/api/fees/payment-status/${userEmail}`,
        {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch payment status');
      }
      
      const data = await response.json();
      console.log("Payment status received:", data);
      setPaymentStatus(data);
    } catch (error) {
      console.error("Error fetching payment status:", error);
    }
  };

  const handlePayment = (amount: number, semester: string, installment: string) => {
    setAmount(amount);
    setSemester(semester);
    setInstallment(installment);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");

      // 1️⃣ Save pending payment in DB FIRST (same as your working code)
      const response = await fetch(`${API_URL}/api/fees/SaveFormData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ email, semester, installment, amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to save form data");
      }

      // 2️⃣ Get the payment link (same approach as your working React code)
      const paymentLink = paymentLinks[amount];
      if (!paymentLink) {
        console.error(`No payment link for amount: ${amount}`);
        setIsLoading(false);
        return;
      }

      // 3️⃣ Redirect with metadata as URL parameter (THIS IS THE KEY!)
      const metadata = { email, semester, installment, amount };
      const redirectUrl = `${paymentLink}?metadata=${encodeURIComponent(
        JSON.stringify(metadata)
      )}`;
      
      window.location.href = redirectUrl;
      
    } catch (error) {
      console.error("Payment initialization error:", error);
      setIsLoading(false);
    }
  };

  // Check if installment is paid
  const isInstallmentPaid = (semester: string, installment: string): boolean => {
    return paymentStatus[semester] && 
           (paymentStatus[semester][installment] === "paid" || 
            paymentStatus[semester][installment] === "success");
  };

  // Check if ALL installments in a semester are paid
  const isSemesterCompleted = (semester: string): boolean => {
    const installments = ["First Installment", "Second Installment", "Third Installment"];
    return installments.every(installment => isInstallmentPaid(semester, installment));
  };

  // Check if previous installment is paid (to enable next one)
  const isInstallmentAvailable = (semester: string, installment: string): boolean => {
    const installments = ["First Installment", "Second Installment", "Third Installment"];
    const currentIndex = installments.indexOf(installment);
    
    if (currentIndex === 0) {
      // For first installment of Semester 1, always available
      if (semester === "First Semester") return true;
      
      // For first installment of other semesters, check if previous semester is completed
      const previousSemester = semester === "Second Semester" ? "First Semester" : "Second Semester";
      return isSemesterCompleted(previousSemester);
    }
    
    // For subsequent installments, check if previous installment is paid
    const previousInstallment = installments[currentIndex - 1];
    return isInstallmentPaid(semester, previousInstallment);
  };

  // Render payment button with appropriate status
  const renderPaymentButton = (amount: number, semester: string, installmentName: string) => {
    const isPaid = isInstallmentPaid(semester, installmentName);
    const isAvailable = isInstallmentAvailable(semester, installmentName);
    
    return (
      <button 
        className={`btn ${isPaid ? "btn-paid" : !isAvailable ? "btn-disabled" : ""}`}
        onClick={() => handlePayment(amount, semester, installmentName)}
        disabled={isPaid || !isAvailable}
      >
        {isPaid ? "Paid" : "Pay Now"}
        <span className="material-symbols-outlined">east</span>
      </button>
    );
  };

  return (
    <div className="fees-page">
      <main className="fees-content">
        <section className="fees-overview">
          <div className="overview-cards">
            <div className="header-container">
              <div className="header-text">
                <h2>Hey there, Welcome to Our Installment Fees Structure</h2>
                <p>
                  This initial payment includes admission processing fees,
                  administrative costs, and other essential onboarding
                  services. AppCode academic year consists of three semesters.
                </p>
              </div>
              <Image 
                src={logo} 
                alt="Cybersecurity Analyst" 
                width={400} 
                height={300}
                priority
              />
            </div>

            {/* Semester 1 */}
            <div className="overview-card">
              <div className="card-header">
                <div className="line"></div>
                <p className="header">Semester One</p>
                <div className="text">
                  <p>First Semester</p>
                  <span className="material-symbols-outlined">bolt</span>
                </div>
              </div>
              <div className="installment-container">
                <div className="installment">
                  <div className="text-container">
                    <span className="material-symbols-outlined icon-text">dialpad</span>
                    <div className="text">
                      <p>First Installment</p>
                      <span>Ghc 2,000.00</span>
                    </div>
                  </div>
                  <div className="btn-container">
                    {renderPaymentButton(2000, "First Semester", "First Installment")}
                  </div>
                </div>
                <div className="installment">
                  <div className="text-container">
                    <span className="material-symbols-outlined icon-text">dialpad</span>
                    <div className="text">
                      <p>Second Installment</p>
                      <span>Ghc 2,000.00</span>
                    </div>
                  </div>
                  <div className="btn-container">
                    {renderPaymentButton(2000, "First Semester", "Second Installment")}
                  </div>
                </div>
                <div className="installment">
                  <div className="text-container">
                    <span className="material-symbols-outlined icon-text">dialpad</span>
                    <div className="text">
                      <p>Third Installment</p>
                      <span>Ghc 1,920.00</span>
                    </div>
                  </div>
                  <div className="btn-container">
                    {renderPaymentButton(1920, "First Semester", "Third Installment")}
                  </div>
                </div>
              </div>
            </div>

            {/* Semester 2 */}
            <div className="overview-card">
              <div className="card-header">
                <div className="line"></div>
                <p className="header">Semester Two</p>
                <div className="text">
                  <p>Second Semester</p>
                  <span className="material-symbols-outlined">bolt</span>
                </div>
              </div>
              <div className="installment-container">
                <div className="installment">
                  <div className="text-container">
                    <span className="material-symbols-outlined icon-text">dialpad</span>
                    <div className="text">
                      <p>First Installment</p>
                      <span>Ghc 2,000.00</span>
                    </div>
                  </div>
                  <div className="btn-container">
                    {renderPaymentButton(2000, "Second Semester", "First Installment")}
                  </div>
                </div>
                <div className="installment">
                  <div className="text-container">
                    <span className="material-symbols-outlined icon-text">dialpad</span>
                    <div className="text">
                      <p>Second Installment</p>
                      <span>Ghc 2,000.00</span>
                    </div>
                  </div>
                  <div className="btn-container">
                    {renderPaymentButton(2000, "Second Semester", "Second Installment")}
                  </div>
                </div>
                <div className="installment">
                  <div className="text-container">
                    <span className="material-symbols-outlined icon-text">dialpad</span>
                    <div className="text">
                      <p>Third Installment</p>
                      <span>Ghc 1,920.00</span>
                    </div>
                  </div>
                  <div className="btn-container">
                    {renderPaymentButton(1920, "Second Semester", "Third Installment")}
                  </div>
                </div>
              </div>
            </div>

            {/* Semester 3 */}
            <div className="overview-card">
              <div className="card-header">
                <div className="line"></div>
                <p className="header">Semester Three</p>
                <div className="text">
                  <p>Third Semester</p>
                  <span className="material-symbols-outlined">bolt</span>
                </div>
              </div>
              <div className="installment-container">
                <div className="installment">
                  <div className="text-container">
                    <span className="material-symbols-outlined icon-text">dialpad</span>
                    <div className="text">
                      <p>First Installment</p>
                      <span>Ghc 2,000.00</span>
                    </div>
                  </div>
                  <div className="btn-container">
                    {renderPaymentButton(2000, "Third Semester", "First Installment")}
                  </div>
                </div>
                <div className="installment">
                  <div className="text-container">
                    <span className="material-symbols-outlined icon-text">dialpad</span>
                    <div className="text">
                      <p>Second Installment</p>
                      <span>Ghc 2,000.00</span>
                    </div>
                  </div>
                  <div className="btn-container">
                    {renderPaymentButton(2000, "Third Semester", "Second Installment")}
                  </div>
                </div>
                <div className="installment">
                  <div className="text-container">
                    <span className="material-symbols-outlined icon-text">dialpad</span>
                    <div className="text">
                      <p>Third Installment</p>
                      <span>Ghc 1,920.00</span>
                    </div>
                  </div>
                  <div className="btn-container">
                    {renderPaymentButton(1920, "Third Semester", "Third Installment")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Payment Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="payment-summary">
              <div className="summary-header">
                <div className="summary-icon">
                  <span className="material-symbols-outlined">receipt_long</span>
                </div>
                <h3>Payment Summary</h3>
              </div>
              
              <div className="summary-content">
                <div className="summary-item">
                  <div className="item-icon">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <div className="item-details">
                    <span className="item-label">Semester</span>
                    <span className="item-value">{semester}</span>
                  </div>
                </div>
                
                <div className="summary-item">
                  <div className="item-icon">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div className="item-details">
                    <span className="item-label">Installment Plan</span>
                    <span className="item-value">{installment}</span>
                  </div>
                </div>
                
                <div className="summary-total">
                  <div className="total-icon">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div className="total-details">
                    <span className="total-label">Total Amount Due</span>
                    <span className="total-amount">Ghc {amount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="summary-footer">
                <div className="secure-notice">
                  <span className="material-symbols-outlined">lock</span>
                  <span>Secure payment process</span>
                </div>
              </div>
            </div>
            <div className="btn-container">
              <button
                onClick={handleSubmit}
                className="btn "
                disabled={isLoading || !email}
              >
                {isLoading ? "Processing..." : "Payment"}
                <span className="material-symbols-outlined">east</span>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn "
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesDetailsPage;