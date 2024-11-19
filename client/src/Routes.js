import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminDashboard";
import AppraisalPage from "./pages/ManagerDashboard";
import AuthPage from "./pages/AuthPage";
// import AuthPage from "./pages/AuthPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/appraisal" element={<AppraisalPage />} />
    </Routes>
  );
};

export default AppRoutes;
