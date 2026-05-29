"use client";

import "./ApplyPage.css";
import Image from "next/image";
import Link from "next/link";

import Paymentimage from "./Payment.png";
import Header from "../../components/Header/HeaderPage";
import Navigation from "../../components/Navigation/NavPage";
import Footer from "../../components/footer/Footer";

export default function ApplyPage(){
  // Redirect user to Paystack payment page
  const handlePaystackPayment = (): void => {
    window.location.href = "https://paystack.shop/pay/t0lgdwrl6s";
  };

  return (
    <>
      <Header />
      <Navigation />

      {/* Breadcrumb */}
      <div className="container navigate">
        <div className="items">
          <Link href="/">Home</Link>
          <span className="material-symbols-outlined">arrow_forward</span>
        </div>
        <span>Apply Now</span>
      </div>

      {/* Payment Section */}
      <div className="payment-page container">
        <div className="image-container">
          <Image
            src={Paymentimage}
            alt="ACG Logo"
            className="logo-image"
            width={400}
            height={400}
            priority
          />
        </div>

        <div className="payment-container">
          <h1 className="payment-title">💳 Pay for Form Access</h1>

          <p className="payment-description">
            💳 <strong>Payment Required:</strong> Please complete your payment
            to access the application form and continue with your registration
            process.
          </p>

          <p className="payment-info">
            📝 <strong>Full Access:</strong> This one-time payment grants you
            access to the complete form required to apply for your desired
            program at <strong>AppCode Academy</strong>.
          </p>

          <p className="payment-info">
            🔐 <strong>Secure Submission:</strong> Your information will be
            securely submitted and reviewed by our admissions team. Once your
            payment is confirmed, the form will be unlocked automatically.
          </p>

          <p className="payment-note">
            ⚠️ <strong>Note:</strong> All transactions are encrypted and
            processed securely through{" "}
            <span className="highlight-paystack">Paystack</span>.
          </p>

          <div className="btn-container">
            <button
              className="btn"
              onClick={handlePaystackPayment}
              type="button"
            >
              Pay Now
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
