import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

export default function AuthPageRemove({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const auth = isAuthenticated || !!token;

  if (auth) return <Navigate to="/" replace />;

  return <>{children}</>;
}
