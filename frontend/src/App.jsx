import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import SnackbarProvider from "./components/ui/Snackbar";
import "./index.css";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
