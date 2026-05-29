// app/components/forms/ProgramApplyingFor.tsx
"use client";

import { useState, useEffect } from "react";
import { Form, Container, Alert } from "react-bootstrap";
import "../style/forms.css";

interface ProgramApplyingForProps {
  onComplete?: (data: any) => void;
  handleShowNext?: () => void;
  studentEmail?: string;
  formData?: any;
}

interface FormData {
  programName: string;
  courseDetails: string;
}

interface FormErrors {
  programName?: string;
  courseDetails?: string;
}

function ProgramApplyingFor({ onComplete, handleShowNext, studentEmail, formData: parentFormData }: ProgramApplyingForProps) {
  const [loading, setLoading] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const [formData, setLocalFormData] = useState<FormData>({
    programName: "",
    courseDetails: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('programApplyingFor');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setLocalFormData(parsed);
        if (parsed.programName) {
          setFormSubmitted(true);
          setShowNextButton(true);
        }
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // Load saved data from props or API
  useEffect(() => {
    const loadSavedData = async () => {
      // First check if data exists in parent props
      if (parentFormData?.programDetails) {
        setLocalFormData(prev => ({
          ...prev,
          ...parentFormData.programDetails
        }));
        if (parentFormData.programDetails?.programName) {
          setFormSubmitted(true);
          setShowNextButton(true);
        }
        return;
      }

      // Get email from props or localStorage
      const email = studentEmail || getEmailFromLocalStorage();
      
      if (email) {
        try {
          const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          setLoadingSaved(true);
          const response = await fetch(`${API_URL}/api/forms/programApplyingFor?email=${email}`);
          
          if (response.ok) {
            const data = await response.json();
            if (data.programName || data.courseDetails) {
              setLocalFormData({
                programName: data.programName || "",
                courseDetails: data.courseDetails || "",
              });
              
              // If both fields have data, mark as submitted
              if (data.programName && data.courseDetails) {
                setFormSubmitted(true);
                setShowNextButton(true);
              }
            }
          }
        } catch (error) {
          console.error('Error loading saved data:', error);
        } finally {
          setLoadingSaved(false);
        }
      }
    };

    loadSavedData();
  }, [studentEmail, parentFormData]);

  // Helper to get email from localStorage
  const getEmailFromLocalStorage = (): string => {
    try {
      const personalDetails = localStorage.getItem('personalDetails');
      if (personalDetails) {
        const parsed = JSON.parse(personalDetails);
        return parsed.email || "";
      }
    } catch (error) {
      console.error('Error getting email from localStorage:', error);
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.programName) {
      newErrors.programName = "Please select a program.";
      isValid = false;
    }

    if (!formData.courseDetails?.trim()) {
      newErrors.courseDetails = "Please provide details about your choice.";
      isValid = false;
    } else if (formData.courseDetails.trim().length < 10) {
      newErrors.courseDetails = "Please provide at least 10 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Save to localStorage
  const saveToLocalStorage = (data: FormData) => {
    try {
      localStorage.setItem('programApplyingFor', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const handleSub = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        // Get email from props or localStorage
        const email = studentEmail || getEmailFromLocalStorage();
        
        if (!email) {
          throw new Error('No email found. Please complete personal details first.');
        }

        // Prepare data with email for backend
        const submissionData = {
          ...formData,
          email, // Include email to identify the student
        };

        const response = await fetch(`${API_URL}/api/forms/programApplyingFor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to submit form');
        }

        // Success case
        setSuccessMessage("Program application submitted successfully!");
        setSubmitError("");
        setShowNextButton(true);
        setFormSubmitted(true);
        
        // Save to localStorage
        saveToLocalStorage(formData);
        
        // Call onComplete to notify parent component
        if (onComplete) {
          onComplete({ ...formData, completed: true });
        }
        
      } catch (error) {
        console.error("Error:", error);
        setSubmitError(error instanceof Error ? error.message : "An error occurred during form submission.");
      } finally {
        setLoading(false);
      }
    } else {
      setSubmitError("Please correct the errors above.");
    }
  };

  const handleNextClick = () => {
    if (onComplete) {
      onComplete({ ...formData, completed: true });
    } else if (handleShowNext) {
      handleShowNext();
    }
  };

   if (loadingSaved) {
    return (
      <div className="loading-container1">
        <Container className="loeader">
          <div className="text-center">
            <div className="loading-spinner"></div>
            <p>Loading saved data...</p>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="layout">
      <Container className="form-container">

        <h3>Program Applying For (Step 2 of 4)</h3>

        {/* Show success or error message */}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {submitError && <Alert variant="danger">{submitError}</Alert>}

        <Form onSubmit={handleSub}>
          <Form.Group controlId="formProgram" className="form-group">
            <Form.Label>Select Program <span className="text-danger">*</span></Form.Label>
            <Form.Select
              name="programName"
              onChange={handleChange}
              isInvalid={!!errors.programName}
              value={formData.programName}
              disabled={loading || formSubmitted}
            >
              <option value="">Choose a program</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Cloud Engineering">Cloud Engineering</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Forex Trading">Forex Trading</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.programName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formCourseDetails" className="form-group">
            <Form.Label>Why do you want to join this program? <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="courseDetails"
              placeholder="Tell us briefly why you chose this program"
              onChange={handleChange}
              isInvalid={!!errors.courseDetails}
              value={formData.courseDetails}
              disabled={loading || formSubmitted}
            />
            <Form.Control.Feedback type="invalid">
              {errors.courseDetails}
            </Form.Control.Feedback>
            {formData.courseDetails && (
              <Form.Text className="text-muted">
                {formData.courseDetails.length} characters (minimum 10)
              </Form.Text>
            )}
          </Form.Group>
          
          <div className="btn-container">
            {!formSubmitted ? (
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Saving..." : "Save"}
                <span className="material-symbols-outlined">east</span>
              </button>
            ) : (
              <button onClick={handleNextClick} className="btn">
                Next
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            )}
          </div>
        </Form>
      </Container>
      
      {/* Conditional loading spinner */}
        {loading && (
        <div className="loading-container2">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default ProgramApplyingFor;