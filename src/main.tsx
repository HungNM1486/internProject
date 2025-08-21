import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
<<<<<<< HEAD
  <StrictMode>
    <App />
  </StrictMode>,
=======
  // <StrictMode> // Disabled for development to prevent double mounting
    <App />
  // </StrictMode>
>>>>>>> 40115e6 (cập nhật code mới)
);