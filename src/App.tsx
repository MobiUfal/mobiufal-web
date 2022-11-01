import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

import { Routes } from "./Routes";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}
