import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import OnboardingPage from "./pages/company/OnboardingPage";
import OnboardingLayout from "./components/layouts/OnboardingLayout";
import DealerUpdatePage from "./pages/company/DealerUpdatePage";
import DealerContactUpdatePage from "./pages/company/DealerContactUpdatePage";

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
          <Route path="update" element={<DealerUpdatePage />} />
          <Route path="contact/update" element={<DealerContactUpdatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
