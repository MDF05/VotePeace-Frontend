import {
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  InputAdornment,
  MenuItem,
  Grid,
  Box,
  Container,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EventIcon from "@mui/icons-material/Event";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

const logo = "/homepage-image.jpg";
import CampaignCard from "./component/CardCampaign";
import Navbar from "~/component/Navbar";

export default function CampaignPage() {
  const now = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    // Fetch active campaigns
    axios.get("http://localhost:3000/campaigns")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#050B1A", // Dark theme background
        backgroundImage:
          "radial-gradient(circle at 10% 20%, rgba(0, 200, 255, 0.1) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(200, 0, 255, 0.1) 0%, transparent 40%)",
        color: "white",
        pb: 6,
      }}
    >
      <Navbar />
      <Box sx={{ py: 6 }}>
        <Container maxWidth="xl">
          {/* Header Section */}
          <Box mb={8} textAlign="center">
            <Typography
              variant="h3"
              fontWeight={800}
              sx={{
                background: "linear-gradient(45deg, #00C8FF 30%, #9D00FF 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 20px rgba(0, 200, 255, 0.3)",
                mb: 2,
              }}
            >
              Active Campaigns
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}
            >
              Participate in shaping the future. Cast your vote securely.
            </Typography>

            {/* Stats Bar */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={4}
              justifyContent="center"
              alignItems="center"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                py: 2,
                px: 4,
                display: "inline-flex",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <EventIcon sx={{ color: "#00C8FF" }} />
                <Typography variant="body1" fontWeight={600}>
                  {now}
                </Typography>
              </Stack>
              <Box
                sx={{
                  width: "1px",
                  height: "24px",
                  bgcolor: "rgba(255,255,255,0.2)",
                  display: { xs: "none", md: "block" },
                }}
              />
              <Stack direction="row" spacing={1} alignItems="center">
                <HowToVoteIcon sx={{ color: "#9D00FF" }} />
                <Typography variant="body1" fontWeight={600}>
                  {campaigns.length} Active Campaigns
                </Typography>
              </Stack>
            </Stack>
          </Box>

          {/* Controls Section (Search & Filter) */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
            sx={{ mb: 6 }}
          >
            <TextField
              placeholder="Search campaigns..."
              variant="outlined"
              sx={{
                width: { xs: "100%", md: "400px" },
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px",
                  color: "white",
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
                  "&:hover fieldset": { borderColor: "rgba(0, 200, 255, 0.5)" },
                  "&.Mui-focused fieldset": { borderColor: "#00C8FF" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                Filter by:
              </Typography>
              <TextField
                select
                defaultValue="all"
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 150,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    color: "white",
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
                    "&:hover fieldset": { borderColor: "rgba(0, 200, 255, 0.5)" },
                    "&.Mui-focused fieldset": { borderColor: "#00C8FF" },
                  },
                  "& .MuiSelect-icon": { color: "white" },
                }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="ended">Ended</MenuItem>
              </TextField>
            </Stack>
          </Stack>

          {/* Campaigns Grid */}
          <Grid container spacing={4}>
            {campaigns.map((campaign) => (
              <Grid item xs={12} md={6} lg={4} key={campaign.id}>
                <CampaignCard
                  id={campaign.id}
                  logo={logo} // Placeholder generic logo
                  name={campaign.title}
                  duration="Ending soon" // Should calculate real duration
                  address="Online" // Placeholder
                />
              </Grid>
            ))}
            {campaigns.length === 0 && (
              <Grid item xs={12}>
                <Typography textAlign="center" color="gray">
                  No active campaigns found. Check back later!
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
