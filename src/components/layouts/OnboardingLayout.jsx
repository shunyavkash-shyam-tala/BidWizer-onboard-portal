import React from "react";
import log from "../../assets/headerLogo.svg";
import { Outlet } from "react-router";
import style from "./OnboardingLayout.module.css";

const OnboardingLayout = () => {
  return (
    <>
      <header className={style.header}>
        <img src={log} />
      </header>
      <main className={style.main}>
        <Outlet />
      </main>
    </>
  );
};

export default OnboardingLayout;
