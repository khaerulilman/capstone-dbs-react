import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokenToLocalStorage } from "../authApi";

export default function GoogleSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      saveTokenToLocalStorage(token);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Processing Google login...
    </div>
  );
}
