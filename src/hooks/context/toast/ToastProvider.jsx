import { useState } from "react";
import Toast from "../../../components/global/toast/Toast";
import { ToastContext } from "./ToastContext";

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = ({ type = "success", message } = {}) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </ToastContext.Provider>
  );
};
