import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import OnboardingPage from "./pages/company/onboarding/OnboardingPage";
import OnboardingLayout from "./components/layouts/OnboardingLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/company/onboarding" replace />}
        />
        <Route path="/company" element={<OnboardingLayout />}>
          <Route path="onboarding" element={<OnboardingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
