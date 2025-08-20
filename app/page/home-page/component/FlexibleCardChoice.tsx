import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import configColor from "~/color/configColor";

const features = [
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: "black" }} />,
    title: "Secure & Transparent",
    description:
      "Advanced encryption and real-time monitoring ensure vote integrity",
  },
  {
    icon: <FlashOnIcon sx={{ fontSize: 40, color: "black" }} />,
    title: "AI-Powered Insights",
    description: "Smart analytics provide deep insights into voting patterns",
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40, color: "black" }} />,
    title: "Real-time Results",
    description: "Live updates and instant result visualization",
  },
];

export default function FlexibleCardChoice() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Box
        display={"grid"}
        justifyContent="center"
        gap={"20px"}
        gridTemplateColumns={"30% 30% 30%"}
      >
        {features.map((feature, index) => (
          <Grid key={index}>
            <Card
              sx={{
                bgcolor: "transparent",
                borderRadius: 3,
                textAlign: "center",
                color: "white",
                boxShadow: "0 0 20px rgba(0, 150, 255, 0.2)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 0 25px rgba(0, 150, 255, 0.6)",
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    bgcolor: configColor.colorYoungBlue2,
                    width: 70,
                    height: 70,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textShadow: configColor.textShadow,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: configColor.textShadow }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Box>
    </Box>
  );
}
