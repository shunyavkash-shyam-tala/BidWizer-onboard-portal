import React, { useState } from "react";
import SearchCompanyForm from "../../../components/onboarding/SearchCompanyForm";
import DealerOnboardingForm from "../../../components/onboarding/DealerOnboardingForm";

function OnboardingPage() {
  const [selectedDealer, setSelectedDealer] = useState();
  function setDealer(dealer) {
    setSelectedDealer(dealer);
  }
  return (
    <>
      {!selectedDealer ? (
        <SearchCompanyForm setDealer={setDealer} />
      ) : (
        <DealerOnboardingForm selectedDealer={selectedDealer} />
      )}
    </>
  );
}

export default OnboardingPage;
