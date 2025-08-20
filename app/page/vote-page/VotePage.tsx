import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  Box,
} from "@mui/material";

export default function VotePage() {
  const candidates = [
    {
      id: 1,
      name: "John Doe",
      vision: "Improving campus facilities and student welfare.",
      photo: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Jane Smith",
      vision: "Fostering innovation and inclusivity on campus.",
      photo: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Alex Johnson",
      vision: "Strengthening student representation and voices.",
      photo: "https://via.placeholder.com/80",
    },
  ];

  const handleVote = (id) => {
    alert(`You voted for candidate ID: ${id}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#050B1A",
        color: "white",
        p: 4,
        textAlign: "center",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          mb: 1,
          fontWeight: "bold",
          textShadow: "0 0 12px rgba(0,200,255,0.8)",
        }}
      >
        Choose Your Candidate
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 3, color: "rgba(255,255,255,0.7)" }}
      >
        Cast your vote securely and transparently
      </Typography>

      {/* Campaign Info */}
      <Typography sx={{ mb: 4, fontSize: 14, color: "rgba(0,200,255,0.8)" }}>
        Campaign: <b>Student Body Election 2024</b> | Date: 20/08/2025
      </Typography>

      {/* Candidate Grid */}
      <Grid container spacing={3} justifyContent="center">
        {candidates.map((candidate) => (
          <Grid key={candidate.id}>
            <Card
              sx={{
                bgcolor: "transparent",
                border: "1px solid rgba(0, 200, 255, 0.3)",
                borderRadius: 3,
                boxShadow: "0 0 20px rgba(0, 150, 255, 0.2)",
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 0 25px rgba(0, 200, 255, 0.6)",
                  transform: "translateY(-5px)",
                },
              }}
            >
              <CardContent>
                <Avatar
                  src={candidate.photo}
                  alt={candidate.name}
                  sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {candidate.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "rgba(255,255,255,0.7)" }}
                >
                  {candidate.vision}
                </Typography>

                {/* Vote Button */}
                <Button
                  variant="contained"
                  onClick={() => handleVote(candidate.id)}
                  sx={{
                    mt: 2,
                    bgcolor: "rgba(0,200,255,0.8)",
                    color: "black",
                    fontWeight: "bold",
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "rgba(0,200,255,1)",
                      boxShadow: "0 0 15px rgba(0,200,255,0.7)",
                    },
                  }}
                >
                  Vote
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
