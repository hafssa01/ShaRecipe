import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential);
    setUser(details);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(details));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <div className='googl-signup-container'>
      {isLoggedIn && user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <GoogleOAuthProvider clientId="85792757464-4cer7qi0js1n067bhd9ca0ovcdcan1qg.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
      )}
    </div>
  );
};
 const handleLoginSuccess = (credentialResponse) => {
    if (credentialResponse && credentialResponse.credential) {
      const details = jwtDecode(credentialResponse.credential);
          setUser(details);
          setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(details));
    } else {
      console.error('Invalid credential response');
    }
  };

export default Login;