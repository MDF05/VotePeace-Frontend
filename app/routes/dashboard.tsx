import type { Route } from "./+types/home";
import DashboardPage from "~/page/dashboard-page/DashboardPage";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard" },
    { name: "description", content: "VotePeace Admin Dashboard" },
  ];
}

export default function Dashboard() {
  return <DashboardPage />;
}
