// app/components/StudentForm.jsx
"use client";

import { useState, useEffect } from "react";
import PersonalDetails from "../forms/PersonalDetails/page";
import EducationalBackground from "../forms/EducationalBackground/page";
import ProgramApplyingFor from "../forms/ProgramApplyingFor/page";
import GuardianDetails from "../forms/GuardianDetails/page";
import "../forms/style/forms.css";

// Define TypeScript interfaces
interface FormData {
  personalDetails: any;
  programDetails: any;
  educationDetails: any;
  guardianDetails: any;
}

interface StepKeys {
  [key: number]: string;
}

interface StepLabels {
  [key: number]: string;
}

export default function StudentForm() {
  // Track current step (1-4)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Central state for all form data
  const [formData, setFormData] = useState<FormData>({
    personalDetails: {},
    programDetails: {},
    educationDetails: {},
    guardianDetails: {},
  });

  // Track submission states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("studentFormData");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);

        // Determine current step based on saved data
        if (parsed.personalDetails?.fullName) setCurrentStep(2);
        if (parsed.programDetails?.programName) setCurrentStep(3);
        if (parsed.educationDetails?.qualification) setCurrentStep(4);
        if (parsed.guardianDetails?.guardianFullName) {
          setCurrentStep(4);
        }
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    try {
      localStorage.setItem("studentFormData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [formData]);

  // Handle completion of each step
  const handleStepComplete = (stepData: any) => {
    const stepKeys: StepKeys = {
      1: "personalDetails",
      2: "programDetails",
      3: "educationDetails",
      4: "guardianDetails",
    };

    console.log(`Step ${currentStep} completed with data:`, stepData);

    // Update form data with the completed step
    setFormData((prev) => ({
      ...prev,
      [stepKeys[currentStep]]: stepData,
    }));

    // Move to next step or submit if last step
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // All steps completed, ready to submit
      console.log("🎯 All steps completed, submitting to database...");
      submitAllForms();
    }
  };

  // Submit all forms to backend
  const submitAllForms = async () => {
    setIsSubmitting(true);
    setSubmitMessage("Submitting your application...");

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      console.log("Submitting form data:", formData);

      const response = await fetch(`${API_URL}/api/forms/submitApplication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Database save successful:", data.message);
        setSubmitMessage("Application submitted successfully!");
        setShowSuccess(true);

        // Show countdown message
        setSubmitMessage(
          "Application submitted! Clearing local data in 15 seconds...",
        );

        // ⭐ CLEAR LOCAL STORAGE IMMEDIATELY
        localStorage.clear();
        console.log("🧹 LocalStorage cleared instantly");

        // optional short delay just for UX animation
        setTimeout(() => {
          window.location.href = "/fees-payment";
        }, 1500);
      } else {
        setSubmitMessage(`Error: ${data.message}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("❌ Submission failed:", error);
      setSubmitMessage(
        "Network error. Please check if backend server is running.",
      );
      setIsSubmitting(false);
    }
  };

  // Render current step
  const renderStep = () => {
    const commonProps = {
      onComplete: handleStepComplete,
      studentEmail: formData.personalDetails?.email || "",
    };

    switch (currentStep) {
      case 1:
        return <PersonalDetails {...commonProps} />;
      case 2:
        return <ProgramApplyingFor {...commonProps} />;
      case 3:
        return <EducationalBackground {...commonProps} />;
      case 4:
        return <GuardianDetails {...commonProps} />;
      default:
        return <PersonalDetails {...commonProps} />;
    }
  };

  return (
    <div className="student-form">
      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-steps">
          {[1, 2, 3, 4].map((step: number) => (
            <div
              key={step}
              className={`step ${currentStep >= step ? "active" : ""} ${getStepCompleted(step, formData) ? "completed" : ""}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">{getStepLabel(step)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Render */}
      {renderStep()}

      {/* Submission Status Overlay */}
      {isSubmitting && (
        <div className="submission-overlay">
          <div className="submission-modal">
            <div className="spinner"></div>
            <p>{submitMessage}</p>
            {!showSuccess && (
              <p className="timer-note">Please do not close this window</p>
            )}
            {showSuccess && (
              <div className="success-check">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to check if a step is completed
function getStepCompleted(step: number, formData: FormData): boolean {
  const stepKeys: StepKeys = {
    1: "personalDetails",
    2: "programDetails",
    3: "educationDetails",
    4: "guardianDetails",
  };

  const stepData = formData[stepKeys[step] as keyof FormData];

  switch (step) {
    case 1:
      return !!stepData?.fullName;
    case 2:
      return !!stepData?.programName;
    case 3:
      return !!stepData?.qualification;
    case 4:
      return !!stepData?.guardianFullName;
    default:
      return false;
  }
}

// Helper function to get step label
function getStepLabel(step: number): string {
  const labels: StepLabels = {
    1: "Personal Details",
    2: "Program Details",
    3: "Education",
    4: "Guardian",
  };
  return labels[step];
}
