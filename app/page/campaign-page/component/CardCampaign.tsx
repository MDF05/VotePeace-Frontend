import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";

interface CampaignCardTypes {
  logo: string;
  name: string;
  duration: string;
  address: string;
}

export default function CampaignCard({
  logo,
  name,
  duration,
  address,
}: CampaignCardTypes) {
  return (
    <Card
      sx={{
        bgcolor: "transparent",
        border: "1px solid rgba(0, 200, 255, 0.3)",
        borderRadius: 3,
        boxShadow: "0 0 20px rgba(0, 150, 255, 0.2)",
        textAlign: "center",
        color: "white",
        mx: "auto",
        p: 3,
        cursor: "pointer",
        transition: "0.3s",
        width: "30%",
        "&:hover": {
          boxShadow: "0 0 25px rgba(0, 200, 255, 0.6)",
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent>
        {/* Logo Kampanye */}
        <Avatar
          src={logo}
          alt={name}
          sx={{ width: 70, height: 70, mx: "auto", mb: 2 }}
        />

        {/* Nama Kampanye */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textShadow: "0 0 8px rgba(255,255,255,0.8)",
          }}
        >
          {name}
        </Typography>

        {/* Durasi Kampanye */}
        <Typography
          variant="body2"
          sx={{ mt: 1, color: "rgba(255,255,255,0.7)" }}
        >
          {duration}
        </Typography>

        {/* Alamat/Lokasi */}
        <Typography
          variant="body2"
          sx={{ mt: 1, color: "rgba(0,200,255,0.9)", fontStyle: "italic" }}
        >
          {address}
        </Typography>
      </CardContent>
    </Card>
  );
}
