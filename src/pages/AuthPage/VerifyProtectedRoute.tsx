import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function VerifyProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const stateEmail = (location.state as any)?.email;
  const pendingEmail =
    typeof window !== "undefined" ? localStorage.getItem("pendingEmail") : null;

  const allow = !!stateEmail || !!pendingEmail;

  if (!allow) return <Navigate to="/register" replace />;

  return <>{children}</>;
}
