import { useContext } from "react";
import { ToastContext } from "./ToastContext";

// Custom hook for using toast
const useToast = () => useContext(ToastContext);

export default useToast;
