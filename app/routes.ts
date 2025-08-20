import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // auth
  route("/login", "routes/login.tsx"),
  route("/register", "routes/register.tsx"),


  // dashboard yang dilindungi
  route("dashboard", "routes/protected-admin.tsx", [
    index("routes/dashboard.tsx"),
  ]),
  
  route("campaign", "routes/protected.tsx", [
    index("routes/campaign.tsx"),
    route("vote", "routes/vote.tsx")
  ]),
] satisfies RouteConfig;
