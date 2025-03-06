import React, { useState } from "react";
import OnboardingFormLayout from "../../components/layouts/OnboardingFormLayout";
import SearchInput from "../../components/global/inputs/SearchInput";
import UpdateDealerForm from "../../components/updateDealer/UpdateDealerForm";
export default function DealerUpdatePage() {
  const [selectedDealer, setSelectedDealer] = useState();
  function setDealer(dealer) {
    setSelectedDealer(dealer);
  }
  return (
    <>
      <OnboardingFormLayout formTitle={"Search Dealer for update"}>
        {!selectedDealer ? (
          <SearchInput
            onSelect={setDealer}
            apiEndPoint="onboardedDealerSearch"
          />
        ) : (
          <UpdateDealerForm selectedDealer={selectedDealer} />
        )}
      </OnboardingFormLayout>
    </>
  );
}
