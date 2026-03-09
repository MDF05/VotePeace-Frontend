import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";
import { UserDTO } from "~/DTO/user-dto";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const userStr = localStorage.getItem("user");
    let user: UserDTO | null = null;

    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        user = null;
      }
    }

    if (token && user && user.role === "ADMIN") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === null) {
    return null; // Or a loading spinner
  }

  if (!isAuthorized) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}
