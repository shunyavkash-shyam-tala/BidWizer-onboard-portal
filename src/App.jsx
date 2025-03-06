import AppRouter from "./router";
import "./app.css";
import { ToastProvider } from "./hooks/context/toast/ToastProvider";

function App() {
  return (
    <>
      <ToastProvider>
        <AppRouter></AppRouter>
      </ToastProvider>
    </>
  );
}

export default App;
