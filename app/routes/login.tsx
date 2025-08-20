import HomePage from "~/page/home-page/HomePage";
import type { Route } from "./+types/home";
import LoginPage from "~/page/login-page/LoginPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return <LoginPage />;
}
