// app/components/forms/PersonalDetails.tsx
"use client";

import { useState, useEffect } from "react";
import { Form, Row, Col, Container, Alert } from "react-bootstrap";
import "../style/forms.css";

// Define props interface
interface PersonalDetailsProps {
  onComplete?: (data: any) => void;
  studentEmail?: string;
  handleShowNext?: () => void;
}

// Define form data interface
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  nationality: string;
  address: string;
  profileImage: string;
}

// Define errors interface
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  nationality?: string;
  address?: string;
  profileImage?: string;
}

function PersonalDetails({ onComplete, studentEmail, handleShowNext }: PersonalDetailsProps) {
  const [loading, setLoading] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    nationality: "",
    address: "",
    profileImage: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load saved data from localStorage and API on mount
  useEffect(() => {
    const loadSavedData = async () => {
      setLoadingSaved(true);
      
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        // First load from localStorage
        const savedData = localStorage.getItem("personalDetails");
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setFormData(parsed);
          if (parsed.fullName) {
            setFormSubmitted(true);
            setShowNextButton(true);
          }
        }

        // Then try to load from API if email is available
        const email = studentEmail || getEmailFromLocalStorage();
        if (email) {
          const response = await fetch(`${API_URL}/api/forms/personalDetails?email=${email}`);
          if (response.ok) {
            const data = await response.json();
            setFormData(prev => ({ ...prev, ...data }));
            if (data.fullName) {
              setFormSubmitted(true);
              setShowNextButton(true);
            }
          }
        }
      } catch (error) {
        console.error("Error loading saved data:", error);
      } finally {
        setLoadingSaved(false);
      }
    };

    loadSavedData();
  }, [studentEmail]);

  // Helper to get email from localStorage
  const getEmailFromLocalStorage = (): string => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return user.email || "";
      }
    } catch (error) {
      console.error("Error getting email from localStorage:", error);
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitError("");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full name is required.";
      isValid = false;
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Email address is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits.";
      isValid = false;
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required.";
      isValid = false;
    }
    if (!formData.gender) {
      newErrors.gender = "Gender selection is required.";
      isValid = false;
    }
    if (!formData.nationality?.trim()) {
      newErrors.nationality = "Nationality is required.";
      isValid = false;
    }
    if (!formData.address?.trim()) {
      newErrors.address = "Address is required.";
      isValid = false;
    }
    if (!formData.profileImage && !selectedFile) {
      newErrors.profileImage = "Profile image is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveToLocalStorage = (data: FormData) => {
    try {
      localStorage.setItem("personalDetails", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };



const handleSub = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    setSubmitError("Please correct the errors above.");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    let profileImageUrl = formData.profileImage;

    if (selectedFile) {
      const uploadData = new FormData();
      uploadData.append("profileImage", selectedFile);

      const uploadRes = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: uploadData,
      });

      if (!uploadRes.ok) {
        const data = await uploadRes.json();
        throw new Error(data.message || "Failed to upload image");
      }

      const data = await uploadRes.json();
      profileImageUrl = data.imageUrl;
    }

    const submissionData = { ...formData, profileImage: profileImageUrl };
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/forms/personalDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to submit form");

    setSuccessMessage("Personal details saved successfully!");
    setShowNextButton(true);
    setFormSubmitted(true);
    setFormData((prev) => ({ ...prev, profileImage: profileImageUrl }));
    localStorage.setItem("personalDetails", JSON.stringify(submissionData));

    if (onComplete) onComplete({ ...submissionData, completed: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    setSubmitError(errorMessage);
    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const handleNextClick = () => {
    if (onComplete) {
      onComplete({ ...formData, completed: true });
    } else if (handleShowNext) {
      handleShowNext();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setSubmitError(
        "Invalid file type. Only JPEG, PNG, JPG, and WEBP are allowed.",
      );
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setSubmitError("File size too large. Maximum size is 5MB.");
      return;
    }

    setSelectedFile(file);
    setSubmitError("");
    setErrors((prev) => ({ ...prev, profileImage: "" }));

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, profileImage: previewUrl }));
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
        <h3>Personal Details (Step 1 of 4)</h3>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {submitError && <Alert variant="danger">{submitError}</Alert>}

        {isUploading && (
          <Alert variant="info">Uploading image... Please wait.</Alert>
        )}

        <Form onSubmit={handleSub}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFullName" className="form-group">
                <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.fullName}
                  disabled={loading || isUploading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fullName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formBasicEmail" className="form-group">
                <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                  disabled={loading || isUploading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formAddress" className="form-group">
                <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleInputChange}
                  isInvalid={!!errors.address}
                  disabled={loading || isUploading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formPhoneNumber" className="form-group">
                <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  isInvalid={!!errors.phone}
                  disabled={loading || isUploading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formDateOfBirth" className="form-group">
                <Form.Label>Date of Birth <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  isInvalid={!!errors.dob}
                  disabled={loading || isUploading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dob}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formGender" className="form-group">
                <Form.Label>Gender <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleSelectChange}
                  isInvalid={!!errors.gender}
                  disabled={loading || isUploading || formSubmitted}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formNationality" className="form-group">
                <Form.Label>Nationality <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="nationality"
                  placeholder="Enter your nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  isInvalid={!!errors.nationality}
                  disabled={loading || isUploading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nationality}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formProfileImage" className="form-group">
                <Form.Label>Profile Image <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  isInvalid={!!errors.profileImage}
                  disabled={loading || isUploading || formSubmitted}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.profileImage}
                </Form.Control.Feedback>
                {selectedFile && (
                  <small className="text-success">
                    File selected: {selectedFile.name}
                  </small>
                )}
                {formData.profileImage && selectedFile && (
                  <div className="mt-2">
                    <img
                      src={formData.profileImage}
                      alt="Preview"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <div className="btn-container">
            {!formSubmitted ? (
              <button
                type="submit"
                className="btn"
                disabled={loading || isUploading}
              >
                {loading
                  ? "Submitting..."
                  : isUploading
                    ? "Uploading..."
                    : "Save"}
                <span className="material-symbols-outlined">east</span>
              </button>
            ) : (
              <button
                onClick={handleNextClick}
                className="btn"
              >
                Next
                <span className="material-symbols-outlined">east</span>
              </button>
            )}
          </div>
        </Form>
      </Container>

      {/* Form submission loading overlay */}
        {loading && (
        <div className="loading-container2">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default PersonalDetails;