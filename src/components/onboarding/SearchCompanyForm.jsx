import React from "react";
import OnboardingFormLayout from "../layouts/OnboardingFormLayout";
import SearchInput from "../global/inputs/SearchInput";

const SearchCompanyForm = () => {
  return (
    <OnboardingFormLayout formTitle={"Search Dealer"}>
      <form>
        <SearchInput />
      </form>
    </OnboardingFormLayout>
  );
};

export default SearchCompanyForm;
