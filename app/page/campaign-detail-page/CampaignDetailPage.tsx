import {
    Box,
    Container,
    Typography,
    Grid,
    Stack,
    Card,
    CardContent,
    Avatar,
    Chip,
    LinearProgress,
    Button,
    Stepper,
    Step,
    StepLabel,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import TimelineIcon from "@mui/icons-material/Timeline";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InsertChartIcon from "@mui/icons-material/InsertChart";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "~/component/Navbar";

const STEPS = ["Registration", "Campaign Period", "Voting Day", "Results"];

export default function CampaignDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState<any>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/campaigns/${id}`)
            .then(res => setCampaign(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!campaign) {
        return <Typography sx={{ color: "white", p: 4, textAlign: "center" }}>Loading campaign...</Typography>;
    }

    // Computed / Mock values for now
    const votesCast = 150; // Mocked
    const totalVoters = 1000; // Mocked
    const participationRate = (votesCast / totalVoters) * 100;

    // Calculate Days Left
    const daysLeft = Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#050B1A",
                backgroundImage:
                    "radial-gradient(circle at 50% 0%, rgba(0, 200, 255, 0.1) 0%, transparent 50%)",
                color: "white",
                pb: 8,
            }}
        >
            <Navbar />
            <Box
                sx={{
                    pt: 10, // Reduced from 15 since Navbar takes space
                    pb: 8,
                    textAlign: "center",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    background: "linear-gradient(180deg, rgba(5,11,26,0) 0%, rgba(5,11,26,1) 100%)",
                }}
            >
                <Container maxWidth="lg">
                    <Chip
                        icon={<VerifiedIcon />}
                        label="Official Campus Election"
                        sx={{
                            bgcolor: "rgba(0, 200, 255, 0.1)",
                            color: "#00C8FF",
                            border: "1px solid rgba(0, 200, 255, 0.3)",
                            mb: 3,
                        }}
                    />
                    <Typography
                        variant="h2"
                        fontWeight={800}
                        sx={{
                            background: "linear-gradient(45deg, #fff 30%, #a5aab5 90%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            mb: 2,
                        }}
                    >
                        {campaign.title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}>
                        {campaign.description}
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Chip
                            icon={<AccessTimeIcon />}
                            label={`${daysLeft} Days Remaining`}
                            variant="outlined"
                            sx={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
                        />
                        <Chip
                            icon={<GroupIcon />}
                            label={`${totalVoters} Eligible Voters`}
                            variant="outlined"
                            sx={{ color: "white", borderColor: "rgba(255,255,255,0.2)" }}
                        />
                    </Stack>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<HowToVoteIcon />}
                        onClick={() => navigate(`/campaign/${id}/vote`)}
                        sx={{
                            mt: 5,
                            px: 6,
                            py: 1.5,
                            fontSize: "1.2rem",
                            borderRadius: "50px",
                            background: "linear-gradient(45deg, #00C8FF 30%, #9D00FF 90%)",
                            boxShadow: "0 0 20px rgba(0, 200, 255, 0.4)",
                            "&:hover": {
                                boxShadow: "0 0 40px rgba(0, 200, 255, 0.6)",
                                transform: "scale(1.05)",
                            },
                        }}
                    >
                        Vote Now
                    </Button>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: -5 }}>
                {/* Stats Grid */}
                <Grid container spacing={4} sx={{ mb: 8 }}>
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                bgcolor: "rgba(22, 27, 46, 0.7)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 4,
                                p: 2,
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                                    <Box p={1} borderRadius={2} bgcolor="rgba(0, 200, 255, 0.1)">
                                        <HowToVoteIcon sx={{ color: "#00C8FF" }} />
                                    </Box>
                                    <Typography variant="h6">Votes Cast</Typography>
                                </Stack>
                                <Typography variant="h3" fontWeight="bold">
                                    {votesCast}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                                    Total votes received so far
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                bgcolor: "rgba(22, 27, 46, 0.7)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 4,
                                p: 2,
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                                    <Box p={1} borderRadius={2} bgcolor="rgba(34, 197, 94, 0.1)">
                                        <InsertChartIcon sx={{ color: "#22c55e" }} />
                                    </Box>
                                    <Typography variant="h6">Participation</Typography>
                                </Stack>
                                <Typography variant="h3" fontWeight="bold">
                                    {participationRate.toFixed(1)}%
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={participationRate}
                                    sx={{
                                        mt: 2,
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: "rgba(255,255,255,0.1)",
                                        "& .MuiLinearProgress-bar": {
                                            bgcolor: "#22c55e",
                                        },
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                bgcolor: "rgba(22, 27, 46, 0.7)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 4,
                                p: 2,
                            }}
                        >
                            <CardContent>
                                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                                    <Box p={1} borderRadius={2} bgcolor="rgba(217, 70, 239, 0.1)">
                                        <TimelineIcon sx={{ color: "#d946ef" }} />
                                    </Box>
                                    <Typography variant="h6">Status</Typography>
                                </Stack>
                                <Typography variant="h3" fontWeight="bold" sx={{ color: "#d946ef" }}>
                                    Active
                                </Typography>
                                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>
                                    Voting closes in {daysLeft} days
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Timeline */}
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h5" fontWeight="bold" mb={4}>
                        Election Timeline
                    </Typography>
                    <Stepper alternativeLabel activeStep={2} sx={{
                        "& .MuiStepLabel-label": { color: "rgba(255,255,255,0.7) !important" },
                        "& .MuiStepIcon-root": { color: "rgba(255,255,255,0.2)" },
                        "& .MuiStepIcon-root.Mui-active": { color: "#00C8FF" },
                        "& .MuiStepIcon-root.Mui-completed": { color: "#22c55e" },
                    }}>
                        {STEPS.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {/* Candidates Section */}
                <Typography variant="h5" fontWeight="bold" mb={4}>
                    Meet the Candidates
                </Typography>
                <Grid container spacing={4}>
                    {campaign.candidates.map((candidate) => (
                        <Grid item xs={12} key={candidate.id}>
                            <Card
                                sx={{
                                    bgcolor: "rgba(255, 255, 255, 0.02)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 4,
                                    overflow: "hidden",
                                }}
                            >
                                <Grid container>
                                    {/* Photo & Basic Info */}
                                    <Grid
                                        item
                                        xs={12}
                                        md={3}
                                        sx={{
                                            p: 4,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "rgba(255,255,255,0.02)",
                                            borderRight: { md: "1px solid rgba(255,255,255,0.1)" },
                                        }}
                                    >
                                        <Avatar
                                            src={candidate.photo}
                                            sx={{ width: 120, height: 120, mb: 2, border: "4px solid rgba(0,200,255,0.5)" }}
                                        />
                                        <Typography variant="h5" fontWeight="bold" align="center">
                                            {candidate.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}
                                        >
                                            Candidate #{candidate.number}
                                        </Typography>
                                        <Chip
                                            label={`Candidate #${candidate.id}`}
                                            sx={{ bgcolor: "#00C8FF", color: "black", fontWeight: "bold" }}
                                        />
                                    </Grid>

                                    {/* Details */}
                                    <Grid item xs={12} md={9} sx={{ p: 4 }}>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "#00C8FF" }}>
                                            Vision
                                        </Typography>
                                        <Typography paragraph sx={{ color: "rgba(255,255,255,0.8)", mb: 3 }}>
                                            "{candidate.vision}"
                                        </Typography>

                                        <Grid container spacing={4}>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: "#22c55e" }}>
                                                    Mission
                                                </Typography>
                                                <Stack spacing={1} sx={{ pl: 2 }}>
                                                    {candidate.mission && candidate.mission.split('\n').map((item: string, index: number) => (
                                                        <Box key={index} display="flex" gap={1}>
                                                            <Box
                                                                sx={{
                                                                    minWidth: 6,
                                                                    height: 6,
                                                                    mt: 1,
                                                                    borderRadius: "50%",
                                                                    bgcolor: "#22c55e",
                                                                }}
                                                            />
                                                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                                                                {item}
                                                            </Typography>
                                                        </Box>
                                                    ))}
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Card>
                        </Grid>
                    ))
                    }
                </Grid >
            </Container >
        </Box >
    );
}
