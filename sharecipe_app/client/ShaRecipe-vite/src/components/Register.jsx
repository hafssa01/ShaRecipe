import React, { useState } from "react";
import { Form, Button, Col, Row, Toast, ToastContainer, Card } from "react-bootstrap";
import { FaGoogle } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    sex: '',
    country: '',
  });

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent non-alphabetic characters for first name, last name, and country
    if (name === 'firstName' || name === 'lastName' || name === 'country') {
      const alphabeticValue = value.replace(/[^a-zA-Z\s]+/g, '');
      setFormData({ ...formData, [name]: alphabeticValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Update errors in real-time
    const newErrors = validate({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const validate = (formData) => {
    const newErrors = {};

    // Check for required fields and validate format
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Password and confirm password validation
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.sex) {
      newErrors.sex = 'Please select your sex';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Please select your country';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission (e.g., send data to server)
      console.log('Form submitted successfully:', formData);
      setShowToast(true);
      setToastMessage('Registration successful!');
    }
  };

  const handleGoogleSuccess = (response) => {
    const { credential } = response;
    console.log('Google token:', credential);

    fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credential }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        // Handle successful response
        // e.g., redirect to dashboard or show a success message
        setShowToast(true);
        setToastMessage('Google sign-in successful!');
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error
        setShowToast(true);
        setToastMessage('Google sign-in failed!');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Join us!</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mt-3">
            <Col sm={6}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col sm={6}>
              <Form.Group controlId="sex">
                <Form.Label>Sex</Form.Label>
                <Form.Select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  isInvalid={!!errors.sex}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.sex}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  isInvalid={!!errors.country}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.country}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Button className="mt-4 w-100" variant="primary" type="submit">
            Register
          </Button>

          <p className="text-center mt-3">
            Already have an account? <a href="/login" className="text-primary">Login</a>
          </p>

          <hr />
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={(error) => {
              console.error('Google login error:', error);
              setShowToast(true);
              setToastMessage('Google sign-in failed!');
            }}
            render={({ onClick }) => (
              <Button className="w-100 mt-2 btn-light border" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClick}>
                <FaGoogle className="me-2" /> Sign up with Google
              </Button>
            )}
          />
        </Form>
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default RegisterForm;
