import React from "react";
import style from "./OnboardingFormLayout.module.css";
const OnboardingFormLayout = ({ children, formTitle }) => {
  return (
    <div className={style.form_container}>
      <div class={style.form_title}>{formTitle && <h1>{formTitle}</h1>}</div>
      {children}
    </div>
  );
};

export default OnboardingFormLayout;
