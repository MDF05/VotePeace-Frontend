import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
}
