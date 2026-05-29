// app/pages/StudentPortal/PaymentInfo.tsx
"use client";

import { useState, useEffect } from "react";
import "./style/PaymentInfo.css";
import CircularProgressBar from "./CircularProgressBar";
import Image from "next/image";
import PaymentImage from "./images/software-tester-tech-journalist.jpg";

// Types
interface PaymentRecord {
  semester: string;
  installment: string;
  amountPaid: number;
  status: string;
  transactionId: string;
  date: string;
  time?: string; // Added time field
}

interface PaymentDetails {
  paystack?: {
    records?: PaymentRecord[];
  };
}

interface PaymentProgress {
  "First Semester": number;
  "Second Semester": number;
  "Third Semester": number;
}

interface UserData {
  email: string;
  name?: string;
}

interface PaymentInfoProps {
  email?: string;
}

const PaymentInfo = ({ email }: PaymentInfoProps) => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [paymentProgress, setPaymentProgress] = useState<PaymentProgress>({
    "First Semester": 0,
    "Second Semester": 0,
    "Third Semester": 0,
  });
  const [totalPaid, setTotalPaid] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);

  // Get user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser: UserData = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Fetch payment details when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = localStorage.getItem("user");
        let userEmail = email;

        if (!userEmail && userData) {
          try {
            const parsedUser: UserData = JSON.parse(userData);
            userEmail = parsedUser.email;
          } catch (error) {
            console.error("Error parsing user data:", error);
          }
        }

        if (userEmail) {
          const API_URL =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          const token = localStorage.getItem("token");

          const headers: HeadersInit = {};
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }

          // Fetch both payment details and progress in parallel
          const [detailsResponse, progressResponse] = await Promise.all([
            fetch(`${API_URL}/api/payment-info/fees/${userEmail}`, { headers }),
            fetch(`${API_URL}/api/payment-info/payment-progress/${userEmail}`, {
              headers,
            }),
          ]);

          if (!detailsResponse.ok) {
            throw new Error(
              `Failed to fetch payment details: ${detailsResponse.statusText}`,
            );
          }

          if (!progressResponse.ok) {
            throw new Error(
              `Failed to fetch payment progress: ${progressResponse.statusText}`,
            );
          }

          const detailsData = await detailsResponse.json();
          const progressData = await progressResponse.json();

          setPaymentDetails(detailsData.userForm);
          setPaymentProgress(progressData);

          // Calculate totals
          calculateTotals(detailsData.userForm);
        }

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  // Calculate total paid and remaining balance
  const calculateTotals = (paymentData: any) => {
    if (
      !paymentData ||
      !paymentData.paystack ||
      !paymentData.paystack.records
    ) {
      setTotalPaid(0);
      setRemainingBalance(0);
      return;
    }

    const totalAmountPaid = paymentData.paystack.records.reduce(
      (sum: number, record: PaymentRecord) => sum + (record.amountPaid || 0),
      0,
    );

    setTotalPaid(totalAmountPaid);

    // Calculate expected total based on paid records
    // This should be adjusted based on your actual fee structure
    const totalExpected = 5920 * 3; // 5920 per semester * 3 semesters = 17,760
    const remaining = totalExpected - totalAmountPaid;
    setRemainingBalance(remaining > 0 ? remaining : 0);
  };

  // Format date and time helper function
  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return { date: "Date not available", time: "" };

    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { date: formattedDate, time: formattedTime };
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Fetching your payment details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <span className="material-symbols-outlined error-icon">error</span>
        <p className="error-message">Error: {error}</p>
      </div>
    );
  }

  // Group records by semester and then by installments
  const groupRecordsBySemester = () => {
    const semesters = [
      "First Semester",
      "Second Semester",
      "Third Semester",
    ] as const;
    const grouped: Record<
      string,
      {
        First: PaymentRecord[];
        Second: PaymentRecord[];
        Third: PaymentRecord[];
      }
    > = {};

    semesters.forEach((semester) => {
      const semesterRecords =
        paymentDetails?.paystack?.records?.filter(
          (record) => record.semester === semester,
        ) || [];

      grouped[semester] = {
        First: semesterRecords.filter(
          (record) => record.installment === "First Installment",
        ),
        Second: semesterRecords.filter(
          (record) => record.installment === "Second Installment",
        ),
        Third: semesterRecords.filter(
          (record) => record.installment === "Third Installment",
        ),
      };
    });

    return grouped;
  };

  const semesterGroups = groupRecordsBySemester();

  // Helper function to calculate grant total for the current and previous installments within a semester
  const calculateGrantTotal = (
    installmentGroups: {
      First: PaymentRecord[];
      Second: PaymentRecord[];
      Third: PaymentRecord[];
    },
    currentInstallment: string,
    currentIndex: number,
  ): number => {
    let total = 0;
    const installmentOrder = ["First", "Second", "Third"] as const;

    for (const installment of installmentOrder) {
      const records = installmentGroups[installment];
      if (records && records.length > 0) {
        if (installment === currentInstallment) {
          // Add amounts from this group up to the current record
          total += records
            .slice(0, currentIndex + 1)
            .reduce((sum, record) => sum + (record.amountPaid || 0), 0);
          break;
        } else {
          // Add all amounts from this installment group
          total += records.reduce(
            (sum, record) => sum + (record.amountPaid || 0),
            0,
          );
        }
      }
    }

    return total;
  };

  // Calculate overall progress percentage
  const calculateOverallProgress = (): number => {
    const totalPossible = 3 * (2000 + 2000 + 1920); // For all three semesters = 17,760
    const progress = totalPossible > 0 ? (totalPaid / totalPossible) * 100 : 0;
    return Math.round(progress * 100) / 100; // Round to 2 decimal places
  };

  return (
    <div className="Payment-container">
      <div className="Payment-details">
        <div className="payment-summary-card">
          <div className="payment-header">
            <h3>Congratulations, {user?.name || "Student"}!</h3>
            <p>
              You&apos;ve successfully made payments toward your education. Keep
              up the great progress! Your commitment and dedication are truly
              commendable. We are excited to have you on this journey with us,
              and each payment is an important step toward your educational
              goals.
            </p>
          </div>
          <div className="summary-details">
            <div className="detail">
              <span className="icon material-symbols-outlined">payments</span>
              <div className="detail-content">
                <span className="label">Total Amount Paid:</span>
                <span className="value">Ghc {totalPaid.toLocaleString()}</span>
              </div>
            </div>
            <div className="detail">
              <span className="icon material-symbols-outlined">
                account_balance_wallet
              </span>
              <div className="detail-content">
                <span className="label">Remaining Balance:</span>
                <span className="value">
                  Ghc {remainingBalance.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="detail">
              <span className="icon material-symbols-outlined">event</span>
              <div className="detail-content">
                <span className="label">Next Payment Due:</span>
                <span className="value">Upon enrollment</span>
              </div>
            </div>
          </div>
        </div>

        <div className="progress-container">
          <p>Progress History</p>
          <br />
          <div className="progress-history">
            <CircularProgressBar
              percentage={calculateOverallProgress()}
              size={190}
              strokeWidth={17}
              trackColor="#d9d9d9"
              progressColor="#e9691e"
            />
            <div className="progress-label">
              <div className="percentage-display">
                <span className="progress-percentage">
                  {Math.round(calculateOverallProgress())}
                </span>
                <span className="percent-symbol">%</span>
              </div>
              <span className="progress-text">Overall Completion</span>
              <div className="progress-subtext">
                <span className="material-symbols-outlined">trending_up</span>
                Great progress!
              </div>
            </div>
          </div>

          <div className="payment-progress-section">
            <div className="payment-history-details">
              {(
                ["First Semester", "Second Semester", "Third Semester"] as const
              ).map((semester) => (
                <div key={semester} className="history-details">
                  <span className="level">{semester}</span>
                  <div className="progress-text">
                    <span>{paymentProgress[semester] || 0}%</span>
                    <span>100%</span>
                  </div>
                  <div className="parent-div">
                    <div
                      className="child-div"
                      style={{ width: `${paymentProgress[semester] || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="semester-column-layout">
        {Object.entries(semesterGroups).map(([semester, installmentGroups]) => (
          <div key={semester} className="semester-column">
            <h3 className="semester-title">{semester}</h3>
            <div className="installments-row">
              {Object.entries(installmentGroups).map(
                ([installment, records]) => (
                  <div
                    key={`${semester}-${installment}`}
                    className="installment-card"
                  >
                    <div className="installment-header">
                      <h4>{installment} Installment</h4>
                      <span className="material-symbols-outlined">
                        stat_minus_3
                      </span>
                    </div>
                    <div className="installment-content">
                      {records.length > 0 ? (
                        records.map((record: PaymentRecord, index: number) => {
                          const grantTotal = calculateGrantTotal(
                            installmentGroups as any,
                            installment,
                            index,
                          );
                          const { date, time } = formatDateTime(record.date);

                          return (
                            <div key={index} className="payment-record">
                              <div className="payment-row">
                                <span className="label">
                                  <span className="material-symbols-outlined">
                                    event
                                  </span>
                                  Status:
                                </span>
                                <span
                                  className={`status ${record.status?.toLowerCase() || "pending"}`}
                                >
                                  {record.status || "Pending"}
                                </span>
                              </div>
                              <div className="payment-row">
                                <span className="label">
                                  <span className="material-symbols-outlined">
                                    receipt
                                  </span>
                                  Transaction ID:
                                </span>
                                <span className="value">
                                  {record.transactionId || "N/A"}
                                </span>
                              </div>
                              <div className="payment-row">
                                <span className="label">
                                  <span className="material-symbols-outlined">
                                    credit_card
                                  </span>
                                  Amount Paid:
                                </span>
                                <span className="value cash">
                                  Ghc{" "}
                                  {record.amountPaid
                                    ? record.amountPaid.toLocaleString()
                                    : "N/A"}
                                </span>
                              </div>
                              <div className="payment-row">
                                <span className="label">
                                  <span className="material-symbols-outlined">
                                    attach_money
                                  </span>
                                  Cumulative Total:
                                </span>
                                <span className="value cash">
                                  Ghc {grantTotal.toLocaleString()}
                                </span>
                              </div>
                              <div className="payment-row">
                                
                                <span className="date-time chip">
                                  <span className="date-icon">📅</span>
                                  {date}
                                  <span className="time-icon">⏰</span>
                                  {time && `${time}`}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="no-records">
                          <span className="material-symbols-outlined">
                            info
                          </span>
                          <p>No payment records yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentInfo;
