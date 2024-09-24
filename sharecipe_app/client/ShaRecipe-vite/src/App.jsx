import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import Home from './pages/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route index element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
