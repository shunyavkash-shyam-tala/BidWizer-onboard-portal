import React from "react";
import FormSecondaryHeader from "../global/inputs/FormSecondaryHeader";
import ExistingAdditionalContact from "./ExistingAdditionalContact";

export default function AdditionalContactContainer() {
  return (
    <>
      <FormSecondaryHeader heading="Additional Users" />
      {[0, 1].map((index) => (
        <ExistingAdditionalContact key={index} index={index} />
      ))}
    </>
  );
}
