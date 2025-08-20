import Box from "@mui/material/Box";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function dashboard() {
  return <Box color={"red"}>dashboard</Box>;
}
