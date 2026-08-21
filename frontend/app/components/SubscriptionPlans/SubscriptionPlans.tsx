// app/components/SubscriptionPlans/SubscriptionPlans.tsx - UPDATED

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./SubscriptionPlans.css";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  interval: string;
  programName: string;
  isActive: boolean;
}

interface SubscriptionData {
  hasActiveSubscription: boolean;
  subscription: {
    id: number;
    planName: string;
    status: string;
    amount: number;
    currentPeriodEnd: string;
    lastPayment: {
      amount: number;
      status: string;
      paymentDate: string;
      invoiceUrl: string;
    } | null;
  } | null;
}

const SubscriptionPlans = () => {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [studentEmail, setStudentEmail] = useState("");
  const [studentName, setStudentName] = useState("");
  const [programName, setProgramName] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Get user from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsed = JSON.parse(userData);
        setStudentEmail(parsed.email || "");
        setStudentName(parsed.name || "");
        setProgramName(parsed.programName || "Software Engineering");
      }
    } catch (err) {
      console.error("Error reading user:", err);
    }
  }, []);

  const isValidEmail = studentEmail && studentEmail.includes('@');

  // Fetch plans and subscription status
  useEffect(() => {
    if (isValidEmail) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [studentEmail]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch plans
      const plansRes = await fetch(`${API_URL}/api/subscription/plans`);
      const plansData = await plansRes.json();
      
      if (plansData.success) {
        setPlans(plansData.data);
      }

      // Fetch subscription status
      const subRes = await fetch(`${API_URL}/api/subscription/check/${encodeURIComponent(studentEmail)}`);
      const subData = await subRes.json();
      
      if (subData.success) {
        setSubscriptionData(subData.data);
      }
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: number) => {
    if (!isValidEmail) {
      setError("Please log in to subscribe");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/subscription/create-checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          studentEmail,
          studentName: studentName || "Student",
          programName: programName || "Unknown",
          successUrl: `${window.location.origin}/pages/StudentPortal?subscription=success`,
          cancelUrl: `${window.location.origin}/pages/feeSelection/?canceled=true`,
        }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        setError(data.message || "Failed to create checkout session");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setProcessing(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login?redirect=/student-portal');
  };

  // Check if user has active subscription
  const hasActiveSubscription = subscriptionData?.hasActiveSubscription || false;

  if (loading) {
    return (
      <div className="subscription-loading">
        <div className="spinner"></div>
        <p>Loading subscription plans...</p>
      </div>
    );
  }

  if (!isValidEmail) {
    return (
      <div className="subscription-login-required">
        <div className="login-required-content">
          <span className="login-required-icon">🔒</span>
          <h3>Login Required</h3>
          <p>Please log in to view and subscribe to our plans.</p>
          <button className="login-required-btn" onClick={handleLoginRedirect}>
            Log In Now
          </button>
        </div>
      </div>
    );
  }

  // Show subscription details if already subscribed
  if (hasActiveSubscription && subscriptionData?.subscription) {
    const sub = subscriptionData.subscription;
    return (
      <div className="subscription-plans-wrapper">
        <div className="subscription-plans-header">
          <span className="header-icon">✅</span>
          <h2>You're Subscribed!</h2>
          <p>You have an active subscription to {sub.planName}</p>
        </div>

        <div className="subscription-status-card">
          <div className="status-item">
            <span className="status-label">Plan</span>
            <span className="status-value">{sub.planName}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Status</span>
            <span className="status-value status-active">✅ Active</span>
          </div>
          <div className="status-item">
            <span className="status-label">Amount</span>
            <span className="status-value">GH¢ {sub.amount}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Renewal Date</span>
            <span className="status-value">
              {new Date(sub.currentPeriodEnd).toLocaleDateString('en-GH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          {sub.lastPayment && (
            <div className="status-item">
              <span className="status-label">Last Payment</span>
              <span className="status-value">
                GH¢ {sub.lastPayment.amount} - {sub.lastPayment.status}
                {sub.lastPayment.invoiceUrl && (
                  <a href={sub.lastPayment.invoiceUrl} target="_blank" rel="noopener noreferrer" className="invoice-link">
                    📄 View Invoice
                  </a>
                )}
              </span>
            </div>
          )}
        </div>

        <div className="subscription-footer">
          <p>🔒 Managed securely via Stripe</p>
        </div>
      </div>
    );
  }

  return (
    <div className="subscription-plans-wrapper">
      <div className="subscription-plans-header">
        <span className="header-icon">📅</span>
        <h2>Choose Your Subscription Plan</h2>
        <p>Get access to all course materials, videos, and assignments</p>
      </div>

      {error && (
        <div className="subscription-error">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <button className="error-dismiss" onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <div className="plans-grid">
        {plans.length === 0 ? (
          <div className="no-plans">
            <span className="no-plans-icon">📭</span>
            <p>No subscription plans available at the moment.</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <div className="plan-card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-program">📚 {plan.programName}</p>
              </div>

              <div className="plan-card-price">
                <span className="price-amount">GH¢ {plan.price}</span>
                <span className="price-interval">/{plan.interval}</span>
              </div>

              <p className="plan-card-description">
                {plan.description || "Access to all course materials"}
              </p>

              <ul className="plan-card-features">
                <li>✅ Full course access</li>
                <li>✅ Video lessons</li>
                <li>✅ Assignments & quizzes</li>
                <li>✅ Course certification</li>
                <li>✅ 24/7 support</li>
              </ul>

              <button
                className="btn-subscription btn-subscribe"
                onClick={() => handleSubscribe(plan.id)}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <span className="spinner-small"></span>
                    Processing...
                  </>
                ) : (
                  "🚀 Subscribe Now"
                )}
              </button>
            </div>
          ))
        )}
      </div>

      <div className="subscription-footer">
        <p>
          <span className="lock-icon">🔒</span>
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPlans;