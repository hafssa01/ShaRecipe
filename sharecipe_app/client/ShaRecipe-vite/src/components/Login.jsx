import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';

const LoginForm = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (response) => {
    if (response && response.credential) {
      const details = jwtDecode(response.credential);
      setUser(details);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(details));
    } else {
      console.error('Invalid credential response');
      setShowToast(true);
      setToastMessage('Login failed!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4" style={{ width: '100%', maxWidth: '600px' }}>
        {isLoggedIn && user ? (
          <div>
            <h2 className="text-center mb-4">Welcome, {user.name}!</h2>
            <Button className="w-100" variant="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-center mb-4">Login</h2>
            <GoogleOAuthProvider clientId="85792757464-4cer7qi0js1n067bhd9ca0ovcdcan1qg.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => {
                  console.log('Login Failed');
                  setShowToast(true);
                  setToastMessage('Google sign-in failed!');
                }}
                render={({ onClick }) => (
                  <Button
                    className="w-100 mt-2 btn-light border"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={onClick}
                  >
                    <FaGoogle className="me-2" /> Sign in with Google
                  </Button>
                )}
              />
            </GoogleOAuthProvider>
          </div>
        )}
      </Card>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default LoginForm;
