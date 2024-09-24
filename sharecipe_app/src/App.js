import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleSignup from './Views/GoogleSignUp_2.js'; // Google Signup Component
import { SignUp } from './Views/Login_2.js'; // Email/Password Login Component
import  Dashboard  from './Views/Dashboard.js'; // Dashboard component
import  AddRecipeForm  from './Views/AddRecipeForm.js'; // Import your AddRecipeForm component
import Home from './Views/Home.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recipes" element={<AddRecipeForm />} />
          {/* Add more routes as needed */}
        </Routes>
        
        {/* Google Signup/Login */}
        <GoogleSignup />
      </div>
    </Router>
  );
}


export default App;
