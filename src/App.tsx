import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { DiabetesFormPage } from "./pages/DiabetesFormPage/FormPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/AuthPage/LoginPage/page";
import RegisterPage from "./pages/AuthPage/RegisterPage/page";
import PanduanPage from "./pages/PanduanPage/page";
import BacaanPage from "./pages/BacaanPage/page";
import VerifyTokenPage from "./pages/AuthPage/VerifyTokenPage/page";
import VerifyProtectedRoute from "./pages/AuthPage/VerifyProtectedRoute";
import GoogleCompletePage from "./pages/AuthPage/GoogleComplete/page";
import GoogleSuccessPage from "./pages/AuthPage/GoogleSuccess/page";
import { ProfilePage } from "./pages/ProfilePage/page";
import NotFoundPage from "./pages/NotFound/page";

import { AuthProvider } from "./pages/AuthPage/authContext";
import ProtectedRoute from "./pages/AuthPage/ProtectedRoute";
import AuthPageRemove from "./pages/AuthPage/AuthPageRemove";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/diabetes-check" element={<DiabetesFormPage />} />
          <Route
            path="/login"
            element={
              <AuthPageRemove>
                <LoginPage />
              </AuthPageRemove>
            }
          />
          <Route
            path="/register"
            element={
              <AuthPageRemove>
                <RegisterPage />
              </AuthPageRemove>
            }
          />
          <Route path="/panduan-check" element={<PanduanPage />} />
          <Route path="/bacaan" element={<BacaanPage />} />
          <Route
            path="/verify-otp"
            element={
              <VerifyProtectedRoute>
                <VerifyTokenPage />
              </VerifyProtectedRoute>
            }
          />

          <Route path="/auth/google-complete" element={<GoogleCompletePage />} />
          <Route path="/auth/google-success" element={<GoogleSuccessPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
