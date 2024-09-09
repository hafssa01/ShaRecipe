import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPassword";
import ResetPasswordForm from "./ResetPassword";

const RoutesHandler = () => {
  return (
    <Router>
      <Route path="/" element={<ForgotPasswordForm/>} />
      <Route path="/reset-password" element={<ResetPasswordForm/>} />
    </Router>
  );
};

export default RoutesHandler;
