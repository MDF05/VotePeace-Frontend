import {
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Grid,
  Box,
  Container,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "~/component/Navbar";

export default function VotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/campaigns/${id}`)
        .then(res => setCampaign(res.data))
        .catch(err => console.error("Failed to fetch campaign", err));
    }
  }, [id]);

  const handleVote = (candidateId: number, candidateName: string) => {
    Swal.fire({
      title: "Confirm Your Vote?",
      text: `You are about to vote for ${candidateName}. This cannot be undone.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00C8FF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Vote!",
      background: "#1e1e2e",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Implement actual vote API call here
        Swal.fire({
          title: "Voted!",
          text: "Your vote has been cast successfully.",
          icon: "success",
          background: "#1e1e2e",
          color: "#fff",
          confirmButtonColor: "#00C8FF",
        }).then(() => {
          navigate(`/campaign/${id}`);
        });
      }
    });
  };

  if (!campaign) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#050B1A", color: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography>Loading Campaign...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#050B1A",
        backgroundImage:
          "radial-gradient(circle at 10% 20%, rgba(0, 200, 255, 0.1) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(200, 0, 255, 0.1) 0%, transparent 40%)",
        color: "white",
        textAlign: "center",
      }}
    >
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Container maxWidth="lg">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: "white", mb: 4, alignSelf: "flex-start" }}
          >
            Back to Details
          </Button>

          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: "bold",
              textShadow: "0 0 12px rgba(0,200,255,0.8)",
            }}
          >
            Cast Your Vote
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "rgba(255,255,255,0.7)" }}
          >
            Select your preferred candidate for <strong>{campaign.title}</strong>
          </Typography>

          {/* Candidate Grid */}
          <Grid container spacing={4} justifyContent="center">
            {campaign.candidates.map((candidate) => (
              <Grid item xs={12} md={4} key={candidate.id}>
                <Card
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(0, 200, 255, 0.3)",
                    borderRadius: 4,
                    boxShadow: "0 0 20px rgba(0, 150, 255, 0.1)",
                    textAlign: "center",
                    transition: "0.3s",
                    height: "100%",
                    "&:hover": {
                      boxShadow: "0 0 25px rgba(0, 200, 255, 0.4)",
                      transform: "translateY(-5px)",
                      borderColor: "#00C8FF",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      src={candidate.photo}
                      alt={candidate.name}
                      sx={{ width: 100, height: 100, mx: "auto", mb: 3, border: "3px solid rgba(255,255,255,0.2)" }}
                    />
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                      {candidate.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 3, color: "rgba(255,255,255,0.6)" }}
                    >
                      "{candidate.vision}"
                    </Typography>

                    {/* Vote Button */}
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<HowToVoteIcon />}
                      onClick={() => handleVote(candidate.id, candidate.name)}
                      sx={{
                        mt: "auto",
                        bgcolor: "rgba(0,200,255,0.8)",
                        color: "black",
                        fontWeight: "bold",
                        borderRadius: 2,
                        py: 1.5,
                        "&:hover": {
                          bgcolor: "#00C8FF",
                          boxShadow: "0 0 15px rgba(0,200,255,0.7)",
                        },
                      }}
                    >
                      Select Candidate
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
