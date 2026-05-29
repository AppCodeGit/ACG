// app/components/forms/EducationalBackground.tsx
"use client";

import { useState, useEffect } from "react";
import { Form, Container, Alert, Row, Col } from "react-bootstrap";
import "../style/forms.css";

interface EducationalBackgroundProps {
  onComplete?: (data: any) => void;
  handleShowNext?: () => void;
  studentEmail?: string;
  formData?: any;
}

interface FormData {
  qualification: string;
  institution: string;
  graduationYear: string;
  studyArea: string;
  certifications: string;
}

interface FormErrors {
  qualification?: string;
  institution?: string;
  graduationYear?: string;
  studyArea?: string;
  certifications?: string;
}

function EducationalBackground({
  onComplete,
  handleShowNext,
  studentEmail,
  formData: parentFormData,
}: EducationalBackgroundProps) {
  const [loading, setLoading] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const [formData, setLocalFormData] = useState<FormData>({
    qualification: "",
    institution: "",
    graduationYear: "",
    studyArea: "",
    certifications: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("educationalBackground");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setLocalFormData(parsed);
        if (parsed.qualification) {
          setFormSubmitted(true);
          setShowNextButton(true);
        }
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);

  // Load saved data from props or API
  useEffect(() => {
    const loadSavedData = async () => {
      // First check if data exists in parent props
      if (parentFormData?.educationDetails) {
        setLocalFormData((prev) => ({
          ...prev,
          ...parentFormData.educationDetails,
        }));
        if (parentFormData.educationDetails?.qualification) {
          setFormSubmitted(true);
          setShowNextButton(true);
        }
        return;
      }

      // Otherwise try to load from API
      const email = studentEmail || getEmailFromLocalStorage();

      if (email) {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          setLoadingSaved(true);
          const response = await fetch(
            `${API_URL}/api/forms/educationalBackground?email=${email}`,
          );

          if (response.ok) {
            const data = await response.json();
            setLocalFormData({
              qualification: data.qualification || "",
              institution: data.institution || "",
              graduationYear: data.graduationYear?.toString() || "",
              studyArea: data.studyArea || "",
              certifications: data.certifications || "",
            });

            // If data exists, mark as submitted
            if (data.qualification) {
              setFormSubmitted(true);
              setShowNextButton(true);
            }
          }
        } catch (error) {
          console.error("Error loading saved data:", error);
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
      const personalDetails = localStorage.getItem("personalDetails");
      if (personalDetails) {
        const parsed = JSON.parse(personalDetails);
        return parsed.email || "";
      }
    } catch (error) {
      console.error("Error getting email from localStorage:", error);
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.qualification?.trim()) {
      newErrors.qualification = "Please enter your highest qualification.";
      isValid = false;
    }
    if (!formData.institution?.trim()) {
      newErrors.institution = "Please enter the institution name.";
      isValid = false;
    }
    if (!formData.graduationYear) {
      newErrors.graduationYear = "Please enter your year of graduation.";
      isValid = false;
    } else {
      const year = parseInt(formData.graduationYear);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear) {
        newErrors.graduationYear = `Please enter a valid year between 1900 and ${currentYear}.`;
        isValid = false;
      }
    }
    if (!formData.studyArea?.trim()) {
      newErrors.studyArea = "Please enter your area of study.";
      isValid = false;
    }
    if (!formData.certifications?.trim()) {
      newErrors.certifications =
        "Please list any additional courses or certifications.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Save to localStorage
  const saveToLocalStorage = (data: FormData) => {
    try {
      localStorage.setItem("educationalBackground", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const handleSub = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        // Get email
        const email = studentEmail || getEmailFromLocalStorage();

        if (!email) {
          throw new Error(
            "No email found. Please complete personal details first.",
          );
        }

        // Prepare data with email
        const submissionData = {
          ...formData,
          graduationYear: parseInt(formData.graduationYear),
          email,
        };

        const response = await fetch(
          `${API_URL}/api/forms/educationalBackground`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData),
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to submit form");
        }

        // Success case
        setSuccessMessage("Educational background saved successfully!");
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
        setSubmitError(
          error instanceof Error
            ? error.message
            : "An error occurred during form submission.",
        );
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
        <h3>Educational Background (Step 3 of 4)</h3>

        {/* Show success or error message */}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {submitError && <Alert variant="danger">{submitError}</Alert>}

        <Form onSubmit={handleSub}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formQualification" className="form-group">
                <Form.Label>
                  Highest Qualification <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="qualification"
                  placeholder="e.g., Bachelor's Degree, Master's Degree"
                  value={formData.qualification}
                  onChange={handleChange}
                  isInvalid={!!errors.qualification}
                  disabled={loading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.qualification}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formInstitution" className="form-group">
                <Form.Label>
                  Institution Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="institution"
                  placeholder="Enter the institution name"
                  value={formData.institution}
                  onChange={handleChange}
                  isInvalid={!!errors.institution}
                  disabled={loading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.institution}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formGraduationYear" className="form-group">
                <Form.Label>
                  Year of Graduation <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="graduationYear"
                  placeholder="e.g., 2020"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  isInvalid={!!errors.graduationYear}
                  disabled={loading || formSubmitted}
                  min="1900"
                  max={new Date().getFullYear()}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.graduationYear}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formStudyArea" className="form-group">
                <Form.Label>
                  Area of Study <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="studyArea"
                  placeholder="e.g., Computer Science, Business Administration"
                  value={formData.studyArea}
                  onChange={handleChange}
                  isInvalid={!!errors.studyArea}
                  disabled={loading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.studyArea}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group controlId="formCertifications" className="form-group">
                <Form.Label>
                  Additional Courses or Certifications{" "}
                  <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="certifications"
                  rows={3}
                  placeholder="List any additional courses or certifications (e.g., AWS Certified, Google Analytics)"
                  value={formData.certifications}
                  onChange={handleChange}
                  isInvalid={!!errors.certifications}
                  disabled={loading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.certifications}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="btn-container">
            {!formSubmitted ? (
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Saving..." : "Save"}
                <span className="material-symbols-outlined">east</span>
              </button>
            ) : (
              <button onClick={handleNextClick} className="btn">
                Next
                <span className="material-symbols-outlined">east</span>
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

export default EducationalBackground;
