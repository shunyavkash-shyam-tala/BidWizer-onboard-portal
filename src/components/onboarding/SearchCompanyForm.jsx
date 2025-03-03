import React, { useState } from "react";
import OnboardingFormLayout from "../layouts/OnboardingFormLayout";
import SearchInput from "../global/inputs/SearchInput";

const SearchCompanyForm = () => {
  const [, setDealer] = useState();
  function onSelect(dealer) {
    setDealer(dealer);
  }
  return (
    <OnboardingFormLayout formTitle={"Search Dealer"}>
      <SearchInput onSelect={onSelect} />
    </OnboardingFormLayout>
  );
};

export default SearchCompanyForm;
