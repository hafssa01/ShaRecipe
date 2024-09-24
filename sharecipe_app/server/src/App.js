import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleSignup from './Views/GoogleSignUp_2.js'; // Google Signup Component
import { SignUp } from './Views/Login_2.js'; // Email/Password Login Component
import Dashboard from './Views/Dashboard.js'; // Make sure to import your Dashboard component
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling

function App() {
  const express = require('express');
  const app = express();
  const router = require('./routes');

  app.use(express.json());
  app.use('/api', router);

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more routes as needed */}
        </Routes>
        
        {/* Google Signup/Login */}
        <GoogleSignup />
      </div>
    </Router>
  );
}


export default App;
