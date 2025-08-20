import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}
