import Box from "@mui/material/Box";
import type { Route } from "./+types/home";
import VotePage from "~/page/vote-page/VotePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function vote() {
  return <VotePage />;
}
