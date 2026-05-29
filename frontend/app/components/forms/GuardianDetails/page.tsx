// app/components/forms/GuardianDetails.tsx
"use client";

import { useState, useEffect } from "react";
import { Form, Container, Alert, Modal, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Congratulations from "../../../assets/Congratulations.jpg";
import "../style/forms.css";

interface GuardianDetailsProps {
  onComplete?: (data: any) => void;
  handleShowNext?: () => void;
  studentEmail?: string;
  formData?: any;
}

interface FormData {
  guardianFullName: string;
  relationship: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianOccupation: string;
}

interface FormErrors {
  guardianFullName?: string;
  relationship?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  guardianOccupation?: string;
}

function GuardianDetails({ onComplete, handleShowNext, studentEmail, formData: parentFormData }: GuardianDetailsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    guardianFullName: "",
    relationship: "",
    guardianPhone: "",
    guardianEmail: "",
    guardianOccupation: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('guardianDetails');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        if (parsed.guardianFullName) {
          setFormSubmitted(true);
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
      if (parentFormData?.guardianDetails) {
        setFormData(prev => ({
          ...prev,
          ...parentFormData.guardianDetails
        }));
        if (parentFormData.guardianDetails?.guardianFullName) {
          setFormSubmitted(true);
        }
        return;
      }

      // Otherwise try to load from API
      const email = studentEmail || getEmailFromLocalStorage();
      
      if (email) {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          setLoadingSaved(true);
          const response = await fetch(`${API_URL}/api/forms/guardianDetails?email=${email}`);
          
          if (response.ok) {
            const data = await response.json();
            setFormData({
              guardianFullName: data.guardianFullName || "",
              relationship: data.relationship || "",
              guardianPhone: data.guardianPhone || "",
              guardianEmail: data.guardianEmail || "",
              guardianOccupation: data.guardianOccupation || "",
            });
            
            // If data exists, mark as submitted
            if (data.guardianFullName) {
              setFormSubmitted(true);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.guardianFullName?.trim()) {
      newErrors.guardianFullName = "Please enter the guardian's full name.";
      isValid = false;
    }

    if (!formData.relationship?.trim()) {
      newErrors.relationship = "Please enter the relationship with the guardian.";
      isValid = false;
    }

    if (!formData.guardianPhone?.trim()) {
      newErrors.guardianPhone = "Please enter the guardian's phone number.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.guardianPhone.replace(/\D/g, ""))) {
      newErrors.guardianPhone = "Please enter a valid 10-digit phone number.";
      isValid = false;
    }

    if (!formData.guardianEmail?.trim()) {
      newErrors.guardianEmail = "Please enter the guardian's email address.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.guardianEmail)) {
      newErrors.guardianEmail = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.guardianOccupation?.trim()) {
      newErrors.guardianOccupation = "Please enter the guardian's occupation.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveToLocalStorage = (data: FormData) => {
    try {
      localStorage.setItem("guardianDetails", JSON.stringify(data));
      localStorage.setItem("allFormsCompleted", "true");
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
        const email = studentEmail || getEmailFromLocalStorage();
        
        if (!email) {
          throw new Error('No email found. Please complete personal details first.');
        }

        const submissionData = {
          ...formData,
          email,
        };

        const response = await fetch(`${API_URL}/api/forms/guardianDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to submit form");
        }

        setSuccessMessage("Guardian details saved successfully!");
        setSubmitError("");
        setFormSubmitted(true);

        saveToLocalStorage(formData);

        // Pass data to parent
        if (onComplete) {
          onComplete({ ...formData, completed: true });
        }

        // Show modal after 2 seconds
        setTimeout(() => {
          setShowModal(true);
        }, 2000);
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

const clearAllFormStorage = () => {
  try {
    localStorage.removeItem("studentFormData");
    localStorage.removeItem("personalDetails");
    localStorage.removeItem("programApplyingFor");
    localStorage.removeItem("educationalBackground");
    localStorage.removeItem("guardianDetails");
    localStorage.removeItem("allFormsCompleted");

    console.log("🧹 All form data cleared from localStorage");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

const handlePaymentClick = () => {
  clearAllFormStorage(); 
  setShowModal(false);
  router.push("/pages/feeSelection");
};

  const handleCloseModal = () => {
    clearAllFormStorage(); 
    setShowModal(false);
    router.push("/pages/apply");
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

        <h3>Guardian Details (Step 4 of 4)</h3>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {submitError && <Alert variant="danger">{submitError}</Alert>}

        <Form onSubmit={handleSub}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formGuardianFullName" className="form-group">
                <Form.Label>Guardian&apos;s Full Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="guardianFullName"
                  placeholder="Enter guardian's full name"
                  value={formData.guardianFullName}
                  onChange={handleChange}
                  isInvalid={!!errors.guardianFullName}
                  disabled={loading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.guardianFullName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formRelationship" className="form-group">
                <Form.Label>Relationship to Student <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="relationship"
                  placeholder="e.g., Father, Mother, Uncle"
                  value={formData.relationship}
                  onChange={handleChange}
                  isInvalid={!!errors.relationship}
                  disabled={loading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.relationship}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formGuardianPhone" className="form-group">
                <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="guardianPhone"
                  placeholder="Enter 10-digit phone number"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  isInvalid={!!errors.guardianPhone}
                  disabled={loading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.guardianPhone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formGuardianEmail" className="form-group">
                <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="email"
                  name="guardianEmail"
                  placeholder="Enter guardian's email"
                  value={formData.guardianEmail}
                  onChange={handleChange}
                  isInvalid={!!errors.guardianEmail}
                  disabled={loading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.guardianEmail}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group controlId="formGuardianOccupation" className="form-group">
                <Form.Label>Occupation <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="guardianOccupation"
                  placeholder="Enter guardian's occupation"
                  value={formData.guardianOccupation}
                  onChange={handleChange}
                  isInvalid={!!errors.guardianOccupation}
                  disabled={loading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.guardianOccupation}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="btn-container">
            {!formSubmitted ? (
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
                <span className="material-symbols-outlined">east</span>
              </button>
            ) : (
              <button type="button" className="btn" disabled>
                Submitted
                <span className="material-symbols-outlined">check_circle</span>
              </button>
            )}
          </div>
        </Form>

        {/* Modal congratulating the user */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header >
            <Modal.Title className="text-center w-100">
              <div style={{ position: "relative", width: "100%", height: "150px" }}>
                <Image
                  src={Congratulations}
                  alt="Congratulations"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>All your form details have been successfully submitted!</p>
            <p>
              Would you like to proceed to make your fees payment?
            </p>
          </Modal.Body>
          <div className="btn-container">
            <button className="btn" onClick={handlePaymentClick}>
              Payment
              <span className="material-symbols-outlined ms-2">payment</span>
            </button>
            <button className="btn " onClick={handleCloseModal}>
              Close
              <span className="material-symbols-outlined ms-2">close</span>
            </button>
          </div>
        </Modal>
      </Container>

          {loading && (
        <div className="loading-container2">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default GuardianDetails;