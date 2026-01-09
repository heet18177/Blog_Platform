import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import Store from "../Store/Store.js";
import { ThemeProvider } from "./context/ThemeContext";
import "./utils/disableConsole.js";

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <ThemeProvider>
      <Toaster />
      <App />
    </ThemeProvider>
  </Provider>
);
