import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Protected Route Check - Token:", token); // DEBUG
    if (token) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === null) return null; // Loading

  if (!isAuthorized) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}
