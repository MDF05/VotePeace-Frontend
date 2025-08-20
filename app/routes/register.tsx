import HomePage from "~/page/home-page/HomePage";
import type { Route } from "./+types/home";
import LoginPage from "~/page/login-page/LoginPage";
import RegisterPage from "~/page/register-page/RegisterPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return <RegisterPage />;
}
