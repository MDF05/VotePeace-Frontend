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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import logo from "../../.../../../public/homepage-image.jpg";
import CampaignCard from "./component/CardCampaign";

export default function CampaignPage() {
  const now = new Date().toLocaleString();

  return (
    <Grid>
      <Card
        sx={{
          bgcolor: "transparent",
          border: "1px solid rgba(0, 200, 255, 0.3)",
          boxShadow: "0 0 20px rgba(0, 150, 255, 0.2)",
          borderRadius: 3,
          p: 4,
          mb: 4,
          color: "white",
        }}
      >
        <CardContent>
          {/* Title */}
          <Typography
            variant="h5"
            align="center"
            sx={{
              fontWeight: "bold",
              textShadow: "0 0 8px rgba(255,255,255,0.8)",
              mb: 1,
            }}
          >
            Choose Ongoing Campaigns
          </Typography>

          {/* Sub info */}
          <Typography
            align="center"
            sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}
          >
            Cast your vote securely and transparently
          </Typography>

          {/* Info Stats */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="body2">
              <strong>Date & Time:</strong> {now}
            </Typography>
            <Typography variant="body2">
              <strong>Total Campaigns:</strong> 5
            </Typography>
          </Stack>

          {/* Search & Filter */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {/* Search */}
            <TextField
              placeholder="Search campaigns..."
              variant="outlined"
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 2,
                input: { color: "white" },
                width: { xs: "100%", sm: "300px" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.6)" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/*! Filter */}
            <TextField
              select
              variant="outlined"
              size="small"
              defaultValue="all"
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 2,
                color: "white",
                minWidth: 160,
                "& .MuiSelect-icon": { color: "white" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon sx={{ color: "rgba(255,255,255,0.6)" }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All Campaigns</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
              <MenuItem value="ended">Ended</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>
      <Box display={"flex"} width={"100%"}>
        <CampaignCard
          logo={logo}
          name="campaign 1"
          duration="5 days"
          address="tangerang"
        ></CampaignCard>
        <CampaignCard
          logo={logo}
          name="campaign 2"
          duration="5 days"
          address="depok"
        ></CampaignCard>
        <CampaignCard
          logo={logo}
          name="campaign 3"
          duration="5 days"
          address="bandung"
        ></CampaignCard>
      </Box>
    </Grid>
  );
}
