import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Avatar,
    Paper,
    Divider,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Stack,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    IconButton,
    Drawer,
    AppBar,
    Toolbar
} from "@mui/material";
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    HowToVote as VoteIcon,
    Settings as SettingsIcon,
    ExitToApp as LogoutIcon,
    TrendingUp,
    Add as AddIcon,
    Campaign as CampaignIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Close as CloseIcon,
    PersonAdd as PersonAddIcon,
    ArrowBack,
    Menu as MenuIcon,
} from "@mui/icons-material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserDTO } from "~/DTO/user-dto";
import axios from "axios";
import { VOTERS_DATA } from "~/data/mock-voters";
import Swal from "sweetalert2";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

export default function DashboardPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserDTO | null>(null);
    const [currentTab, setCurrentTab] = useState("overview");
    const [openAddModal, setOpenAddModal] = useState(false);

    // State for Campaigns
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [newCampaign, setNewCampaign] = useState({ title: "", description: "", startDate: "", endDate: "" });

    // State for Candidates
    const [openCandidateModal, setOpenCandidateModal] = useState(false);
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
    const [newCandidate, setNewCandidate] = useState({ name: "", number: 0, vision: "", mission: "", photo: "" });

    // Campaign Detail View State
    const [viewCampaignId, setViewCampaignId] = useState<number | null>(null);
    const [detailTab, setDetailTab] = useState("stats"); // stats | voters
    const [campaignStats, setCampaignStats] = useState<any>(null);
    const [campaignVoters, setCampaignVoters] = useState<any[]>([]);

    // Mobile Sidebar State
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    React.useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                setUser(JSON.parse(userStr));
            } catch (e) {
                // ignore
            }
        }
    }, []);

    // Fetch Campaigns on Mount
    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const response = await axios.get("http://localhost:3000/campaigns");
            setCampaigns(response.data);
        } catch (error) {
            console.error("Failed to fetch campaigns", error);
        }
    };

    const handleLogout = () => {
        Cookies.remove("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleAddCampaign = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCampaign.title || !newCampaign.description || !newCampaign.startDate || !newCampaign.endDate) {
            Swal.fire("Error", "Please fill in all fields", "warning");
            return;
        }
        try {
            await axios.post("http://localhost:3000/campaigns", newCampaign);
            Swal.fire("Success", "Campaign created successfully", "success");
            setOpenAddModal(false);
            setNewCampaign({ title: "", description: "", startDate: "", endDate: "" });
            fetchCampaigns(); // Refresh list
        } catch (error: any) {
            console.error("Add Campaign Error:", error);
            const errorMessage = error.response?.data?.error || "Failed to create campaign";
            Swal.fire("Error", errorMessage, "error");
        }
    };

    const handleDeleteCampaign = async (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3000/campaigns/${id}`);
                    Swal.fire("Deleted!", "Your campaign has been deleted.", "success");
                    fetchCampaigns(); // Refresh list
                } catch (error) {
                    Swal.fire("Error", "Failed to delete campaign", "error");
                }
            }
        });
    };

    const handleAddCandidate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCampaignId) return;

        try {
            await axios.post("http://localhost:3000/candidates", {
                campaignId: selectedCampaignId,
                ...newCandidate
            });
            Swal.fire("Success", "Candidate added successfully", "success");
            setOpenCandidateModal(false);
            setNewCandidate({ name: "", number: 0, vision: "", mission: "", photo: "" });
            fetchCampaigns();
        } catch (error: any) {
            console.error("Add Candidate Error:", error);
            const errorMessage = error.response?.data?.error || "Failed to add candidate";
            Swal.fire("Error", errorMessage, "error");
        }
    };

    const handleViewCampaign = async (id: number) => {
        setViewCampaignId(id);
        setCampaignStats(null);
        setCampaignVoters([]);

        try {
            const statsRes = await axios.get(`http://localhost:3000/campaigns/${id}/summary`);
            setCampaignStats(statsRes.data);

            const votersRes = await axios.get(`http://localhost:3000/campaigns/${id}/votes`);
            setCampaignVoters(votersRes.data);
        } catch (error) {
            console.error("Failed to fetch campaign details", error);
            Swal.fire("Error", "Failed to load campaign statistics", "error");
        }
    };

    const navItems = [
        { text: "Overview", icon: <DashboardIcon />, value: "overview" },
        { text: "Campaigns", icon: <CampaignIcon />, value: "campaigns" },
        { text: "Voters Log", icon: <PeopleIcon />, value: "voters" },
    ];

    const drawer = (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#0f1929", color: "white" }}>
            <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
                <DashboardIcon sx={{ color: "cyan", fontSize: 32 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: "white" }}>
                    VotePeace
                </Typography>
            </Box>

            <List sx={{ flex: 1, px: 2 }}>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            selected={currentTab === item.value}
                            onClick={() => {
                                setCurrentTab(item.value);
                                setMobileOpen(false); // Close drawer on mobile click
                            }}
                            sx={{
                                borderRadius: 2,
                                "&.Mui-selected": {
                                    bgcolor: "rgba(0,200,255,0.1)",
                                    color: "cyan",
                                    "&:hover": { bgcolor: "rgba(0,200,255,0.15)" },
                                },
                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.05)",
                                    color: "white",
                                },
                                color: currentTab === item.value ? "cyan" : "rgba(255,255,255,0.6)",
                            }}
                        >
                            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
            <List sx={{ px: 2 }}>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: "#ff4d4f" }}>
                        <ListItemIcon sx={{ color: "#ff4d4f" }}><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#050B1A", color: "white" }}>
            {/* Mobile Header */}
            <AppBar
                position="fixed"
                sx={{
                    display: { xs: "flex", md: "none" },
                    bgcolor: "rgba(15,25,40,0.95)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                elevation={0}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, color: "cyan" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" fontWeight="bold">
                        VotePeace Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar (Desktop & Mobile) */}
            <Box
                component="nav"
                sx={{ width: { md: 260 }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 260, bgcolor: "#0f1929", borderRight: "1px solid rgba(255,255,255,0.1)" },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop Permanent Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 260, bgcolor: "rgba(15,25,40,0.95)", borderRight: "1px solid rgba(0,200,255,0.1)" },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 }, width: { md: `calc(100% - 260px)` }, pt: { xs: 10, md: 4 }, height: "100vh", overflowY: "auto" }}>

                {/* CAMPAIGN DETAIL VIEW */}
                {viewCampaignId ? (
                    <Box>
                        {/* Header with Back Button */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                            <Button
                                onClick={() => setViewCampaignId(null)}
                                startIcon={<ArrowBack />}
                                sx={{ color: "gray", "&:hover": { color: "white" } }}
                            >
                                Back
                            </Button>
                            <Box>
                                <Typography variant="h4" fontWeight="bold" sx={{ color: "white" }}>
                                    {campaignStats?.campaign || "Loading..."}
                                </Typography>
                                <Typography variant="body2" color="gray">
                                    Campaign Analytics & Voter Log
                                </Typography>
                            </Box>
                        </Box>

                        {/* Tabs */}
                        <Box sx={{ borderBottom: 1, borderColor: "rgba(255,255,255,0.1)", mb: 4 }}>
                            <Stack direction="row" spacing={4}>
                                <Button
                                    onClick={() => setDetailTab("stats")}
                                    sx={{
                                        color: detailTab === "stats" ? "cyan" : "gray",
                                        borderBottom: 2,
                                        borderColor: detailTab === "stats" ? "cyan" : "transparent",
                                        pb: 1,
                                        borderRadius: 0
                                    }}
                                >
                                    Quick Count
                                </Button>
                                <Button
                                    onClick={() => setDetailTab("voters")}
                                    sx={{
                                        color: detailTab === "voters" ? "cyan" : "gray",
                                        borderBottom: 2,
                                        borderColor: detailTab === "voters" ? "cyan" : "transparent",
                                        pb: 1,
                                        borderRadius: 0
                                    }}
                                >
                                    Voter Log
                                </Button>
                            </Stack>
                        </Box>

                        {/* STATS CONTENT */}
                        {detailTab === "stats" && campaignStats && (
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Card sx={{ bgcolor: "rgba(255,255,255,0.05)", borderRadius: 4, p: 3, height: "100%" }}>
                                        <Typography color="gray" gutterBottom>Total Votes</Typography>
                                        <Typography variant="h3" fontWeight="bold" color="white" sx={{ mb: 4 }}>
                                            {campaignStats.totalVotes}
                                        </Typography>

                                        <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
                                            Vote Distribution
                                        </Typography>
                                        <Box sx={{ height: 250, width: "100%" }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={campaignStats.results}
                                                        dataKey="votes"
                                                        nameKey="name"
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        label
                                                    >
                                                        {campaignStats.results.map((entry: any, index: number) => (
                                                            <Cell key={`cell-${index}`} fill={["#00C8FF", "#9D00FF", "#FF0080", "#00E676"][index % 4]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: "#0f1929", borderColor: "rgba(255,255,255,0.1)", color: "white" }}
                                                        itemStyle={{ color: "white" }}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </Box>
                                    </Card>
                                </Grid>
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <Grid container spacing={3}>
                                        <Grid size={12}>
                                            <Card sx={{ bgcolor: "rgba(255,255,255,0.05)", borderRadius: 4, p: 3 }}>
                                                <Typography variant="h6" fontWeight="bold" color="white" gutterBottom sx={{ mb: 3 }}>
                                                    Votes Overview
                                                </Typography>
                                                <Box sx={{ height: 300, width: "100%" }}>
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart
                                                            data={campaignStats.results}
                                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                                        >
                                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                                            <XAxis dataKey="name" stroke="gray" tick={{ fill: 'gray' }} />
                                                            <YAxis stroke="gray" tick={{ fill: 'gray' }} />
                                                            <Tooltip
                                                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                                contentStyle={{ backgroundColor: "#0f1929", borderColor: "rgba(255,255,255,0.1)", color: "white" }}
                                                            />
                                                            <Bar dataKey="votes" fill="#00C8FF" radius={[4, 4, 0, 0]}>
                                                                {campaignStats.results.map((entry: any, index: number) => (
                                                                    <Cell key={`cell-${index}`} fill={["#00C8FF", "#9D00FF", "#FF0080", "#00E676"][index % 4]} />
                                                                ))}
                                                            </Bar>
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </Box>
                                            </Card>
                                        </Grid>

                                        {campaignStats.results.map((candidate: any) => (
                                            <Grid key={candidate.candidateId} size={12}>
                                                <Paper sx={{ p: 3, bgcolor: "rgba(15,25,40,0.8)", borderRadius: 3, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 3 }}>
                                                    <Avatar src={candidate.photo || ""} sx={{ width: 64, height: 64, bgcolor: "cyan", color: "black", fontWeight: "bold", fontSize: 24 }}>
                                                        {candidate.number}
                                                    </Avatar>
                                                    <Box flex={1}>
                                                        <Typography variant="h6" fontWeight="bold">{candidate.name}</Typography>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={campaignStats.totalVotes ? (candidate.votes / campaignStats.totalVotes) * 100 : 0}
                                                            sx={{ height: 10, borderRadius: 5, mt: 1, bgcolor: "rgba(255,255,255,0.1)", "& .MuiLinearProgress-bar": { bgcolor: "cyan" } }}
                                                        />
                                                    </Box>
                                                    <Box textAlign="right">
                                                        <Typography variant="h4" fontWeight="bold" color="cyan">{candidate.votes}</Typography>
                                                        <Typography variant="body2" color="gray">
                                                            {campaignStats.totalVotes ? ((candidate.votes / campaignStats.totalVotes) * 100).toFixed(1) : 0}%
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}

                        {/* VOTERS CONTENT */}
                        {detailTab === "voters" && (
                            <TableContainer component={Paper} sx={{ bgcolor: "rgba(255,255,255,0.03)", borderRadius: 3 }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: "rgba(0,0,0,0.2)" }}>
                                        <TableRow>
                                            <TableCell sx={{ color: "gray" }}>Voter Name</TableCell>
                                            <TableCell sx={{ color: "gray" }}>Email/NIK</TableCell>
                                            <TableCell sx={{ color: "gray" }}>Candidate Voted</TableCell>
                                            <TableCell sx={{ color: "gray" }}>Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {campaignVoters.map((vote: any) => (
                                            <TableRow key={vote.id}>
                                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>{vote.user?.name || "Unknown"}</TableCell>
                                                <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>{vote.user?.nik || "-"}</TableCell>
                                                <TableCell sx={{ color: "cyan" }}>{vote.candidate?.name || "Unknown"}</TableCell>
                                                <TableCell sx={{ color: "gray" }}>{new Date(vote.timestamp).toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                        {campaignVoters.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center" sx={{ color: "gray", py: 4 }}>
                                                    No votes recorded yet.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                    </Box>
                ) : (
                    <>
                        {/* Header */}
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
                            <Box>
                                <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                                    {currentTab === "overview" && "Dashboard Overview"}
                                    {currentTab === "campaigns" && "Manage Campaigns"}
                                    {currentTab === "voters" && "Voter Activity Log"}
                                </Typography>
                                <Typography variant="body1" color="gray">
                                    Welcome back, {user?.name || "Admin"}
                                </Typography>
                            </Box>
                            <Avatar sx={{ bgcolor: "cyan", color: "black", fontWeight: "bold" }}>
                                {user?.name?.charAt(0) || "A"}
                            </Avatar>
                        </Box>

                        {/* OVERVIEW TAB */}
                        {currentTab === "overview" && (
                            <Grid container spacing={4}>
                                {/* Stats Cards */}
                                {[
                                    { title: "Total Users", value: "1,234", icon: <PeopleIcon sx={{ fontSize: 40, color: "cyan" }} />, color: "rgba(0,255,255,0.1)" },
                                    { title: "Total Votes", value: campaigns.reduce((acc, c) => acc + c.votesCast, 0), icon: <VoteIcon sx={{ fontSize: 40, color: "#d946ef" }} />, color: "rgba(217, 70, 239, 0.1)" },
                                    { title: "Active Campaigns", value: campaigns.length, icon: <CampaignIcon sx={{ fontSize: 40, color: "#22c55e" }} />, color: "rgba(34, 197, 94, 0.1)" },
                                ].map((stat, index) => (
                                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                                        <Card sx={{
                                            bgcolor: "rgba(20,30,50,0.6)",
                                            color: "white",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                            borderRadius: 4
                                        }}>
                                            <CardContent sx={{ display: "flex", alignItems: "center", gap: 3, p: 3 }}>
                                                <Box sx={{ p: 2, borderRadius: 3, bgcolor: stat.color, display: "flex" }}>
                                                    {stat.icon}
                                                </Box>
                                                <Box>
                                                    <Typography variant="body2" color="gray">{stat.title}</Typography>
                                                    <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}

                                {/* Charts Section */}
                                <Grid size={12}>
                                    <Grid container spacing={3}>
                                        {/* Campaign Status (Pie) - Row 1 */}
                                        <Grid size={12}>
                                            <Card sx={{ bgcolor: "rgba(255,255,255,0.03)", borderRadius: 4, p: 3, border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                                                <Box>
                                                    <Typography variant="h6" fontWeight="bold" color="white" gutterBottom>
                                                        Campaign Status
                                                    </Typography>
                                                    <Typography variant="body2" color="gray" sx={{ maxWidth: 300 }}>
                                                        Overview of your active vs ended campaigns. Keep track of ongoing elections effectively.
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ width: 300, height: 200, position: "relative" }}>
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <PieChart>
                                                            <Pie
                                                                data={[
                                                                    { name: 'Active', value: campaigns.filter(c => c.daysLeft > 0).length },
                                                                    { name: 'Ended', value: campaigns.filter(c => c.daysLeft <= 0).length }
                                                                ]}
                                                                cx="50%"
                                                                cy="50%"
                                                                innerRadius={50}
                                                                outerRadius={70}
                                                                paddingAngle={5}
                                                                dataKey="value"
                                                                stroke="none"
                                                            >
                                                                <Cell fill="#00C8FF" />
                                                                <Cell fill="#ef4444" />
                                                            </Pie>
                                                            <Tooltip
                                                                content={({ active, payload }) => {
                                                                    if (active && payload && payload.length) {
                                                                        return (
                                                                            <Box sx={{
                                                                                bgcolor: "rgba(15, 25, 40, 0.9)",
                                                                                backdropFilter: "blur(10px)",
                                                                                border: "1px solid rgba(255,255,255,0.1)",
                                                                                borderRadius: 3,
                                                                                p: 2
                                                                            }}>
                                                                                <Box display="flex" alignItems="center" gap={1}>
                                                                                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: payload[0].payload.fill }} />
                                                                                    <Typography color="white" fontWeight="bold">
                                                                                        {payload[0].name}: {payload[0].value}
                                                                                    </Typography>
                                                                                </Box>
                                                                            </Box>
                                                                        );
                                                                    }
                                                                    return null;
                                                                }}
                                                            />
                                                            <Legend
                                                                layout="vertical"
                                                                verticalAlign="middle"
                                                                align="right"
                                                                iconType="circle"
                                                                formatter={(value) => <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginLeft: 5 }}>{value}</span>}
                                                            />
                                                        </PieChart>
                                                    </ResponsiveContainer>
                                                    {/* Center Label */}
                                                    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none" }}>
                                                        <Typography variant="h5" fontWeight="bold" color="white">
                                                            {campaigns.length}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Card>
                                        </Grid>

                                        {/* Votes by Campaign (Bar) - Row 2 */}
                                        <Grid size={12}>
                                            <Card sx={{ bgcolor: "rgba(255,255,255,0.03)", borderRadius: 4, p: 3, border: "1px solid rgba(255,255,255,0.05)" }}>
                                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                                    <Typography variant="h6" fontWeight="bold" color="white">
                                                        Votes Analysis
                                                    </Typography>
                                                    <Box sx={{ display: "flex", gap: 2 }}>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                            <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#00C8FF" }} />
                                                            <Typography variant="caption" color="gray">Total Votes</Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ height: 350, width: "100%" }}>
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart
                                                            data={campaigns}
                                                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                                            barSize={60}
                                                        >
                                                            <defs>
                                                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="0%" stopColor="#00C8FF" stopOpacity={1} />
                                                                    <stop offset="100%" stopColor="#9D00FF" stopOpacity={0.8} />
                                                                </linearGradient>
                                                            </defs>
                                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                                            <XAxis
                                                                dataKey="title"
                                                                stroke="gray"
                                                                tick={{ fill: 'gray', fontSize: 12 }}
                                                                tickLine={false}
                                                                axisLine={false}
                                                                dy={10}
                                                            />
                                                            <YAxis
                                                                stroke="gray"
                                                                tick={{ fill: 'gray', fontSize: 12 }}
                                                                tickLine={false}
                                                                axisLine={false}
                                                                dx={-10}
                                                            />
                                                            <Tooltip
                                                                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                                                content={({ active, payload, label }) => {
                                                                    if (active && payload && payload.length) {
                                                                        return (
                                                                            <Box sx={{
                                                                                bgcolor: "rgba(15, 25, 40, 0.9)",
                                                                                backdropFilter: "blur(10px)",
                                                                                border: "1px solid rgba(255,255,255,0.1)",
                                                                                borderRadius: 3,
                                                                                p: 2,
                                                                                boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
                                                                            }}>
                                                                                <Typography variant="body2" color="gray" sx={{ mb: 1 }}>{label}</Typography>
                                                                                <Typography variant="h6" fontWeight="bold" color="#00C8FF">
                                                                                    {payload[0].value} Votes
                                                                                </Typography>
                                                                            </Box>
                                                                        );
                                                                    }
                                                                    return null;
                                                                }}
                                                            />
                                                            <Bar dataKey="votesCast" fill="url(#barGradient)" radius={[8, 8, 0, 0]} animationDuration={1500} />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </Box>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Live Results Section */}
                                <Grid size={12}>
                                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, mt: 2 }}>
                                        Live Election Results
                                    </Typography>
                                    <Stack spacing={2}>
                                        {campaigns.map((campaign) => (
                                            <Paper
                                                key={campaign.id}
                                                onClick={() => handleViewCampaign(campaign.id)}
                                                elevation={0}
                                                sx={{
                                                    p: 3,
                                                    bgcolor: "rgba(255,255,255,0.03)",
                                                    border: "1px solid rgba(255,255,255,0.05)",
                                                    borderRadius: 4,
                                                    borderRadius: 4,
                                                    display: "flex",
                                                    flexDirection: { xs: "column", md: "row" },
                                                    alignItems: { xs: "flex-start", md: "center" },
                                                    gap: 4,
                                                    cursor: "pointer",
                                                    transition: "all 0.2s",
                                                    "&:hover": {
                                                        bgcolor: "rgba(255,255,255,0.05)",
                                                        borderColor: "rgba(0,200,255,0.3)",
                                                        transform: "translateX(4px)"
                                                    }
                                                }}
                                            >
                                                {/* Left: Indicator & Title */}
                                                <Box display="flex" alignItems="center" gap={3} flex={1}>
                                                    <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <Box sx={{
                                                            width: 12, height: 12, borderRadius: "50%", bgcolor: "#00C8FF",
                                                            boxShadow: "0 0 10px #00C8FF",
                                                            animation: "pulse 2s infinite",
                                                            "@keyframes pulse": {
                                                                "0%": { boxShadow: "0 0 0 0 rgba(0, 200, 255, 0.7)" },
                                                                "70%": { boxShadow: "0 0 0 10px rgba(0, 200, 255, 0)" },
                                                                "100%": { boxShadow: "0 0 0 0 rgba(0, 200, 255, 0)" }
                                                            }
                                                        }} />
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 0.5 }}>
                                                            {campaign.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="gray">
                                                            Live Tracking • {campaign.totalVoters} Registered Voters
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                {/* Right: Stats */}
                                                <Box sx={{ width: { xs: "100%", md: 300 }, display: { xs: "flex", md: "block" }, flexDirection: "column", mt: { xs: 2, md: 0 } }}>
                                                    <Box display="flex" justifyContent="space-between" mb={1}>
                                                        <Typography variant="body2" color="gray">Participation Rate</Typography>
                                                        <Typography variant="body2" fontWeight="bold" color="#00C8FF">
                                                            {((campaign.votesCast / (campaign.totalVoters || 1)) * 100).toFixed(1)}%
                                                        </Typography>
                                                    </Box>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={(campaign.votesCast / (campaign.totalVoters || 1)) * 100}
                                                        sx={{
                                                            height: 10,
                                                            borderRadius: 5,
                                                            bgcolor: "rgba(255,255,255,0.05)",
                                                            "& .MuiLinearProgress-bar": {
                                                                bgcolor: "linear-gradient(90deg, #00C8FF, #9D00FF)"
                                                            }
                                                        }}
                                                    />
                                                    <Typography variant="caption" color="gray" sx={{ mt: 1, display: "block", textAlign: "right" }}>
                                                        {campaign.votesCast} votes cast
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Stack>
                                </Grid>
                            </Grid>
                        )}

                        {/* CAMPAIGNS TAB */}
                        {currentTab === "campaigns" && (
                            <Box>
                                <Box display="flex" justifyContent="flex-end" mb={3}>
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        onClick={() => setOpenAddModal(true)}
                                        sx={{
                                            bgcolor: "#00C8FF",
                                            color: "black",
                                            fontWeight: "bold",
                                            borderRadius: "30px",
                                            textTransform: "none",
                                        }}
                                    >
                                        Add New Campaign
                                    </Button>
                                </Box>

                                <Stack spacing={2}>
                                    {campaigns.map((campaign) => (
                                        <Paper
                                            key={campaign.id}
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                bgcolor: "rgba(255,255,255,0.03)",
                                                border: "1px solid rgba(255,255,255,0.05)",
                                                borderRadius: 4,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 3,
                                                transition: "all 0.2s",
                                                "&:hover": {
                                                    bgcolor: "rgba(255,255,255,0.05)",
                                                    borderColor: "rgba(0,200,255,0.3)",
                                                    transform: "translateX(4px)"
                                                }
                                            }}
                                        >
                                            <Box sx={{ width: 4, height: 40, bgcolor: campaign.daysLeft > 0 ? "#00C8FF" : "#ef4444", borderRadius: 2 }} />

                                            <Box sx={{ flex: 1, cursor: "pointer" }} onClick={() => handleViewCampaign(campaign.id)}>
                                                <Box display="flex" alignItems="center" gap={2} mb={0.5}>
                                                    <Typography variant="h6" fontWeight="bold" color="white">
                                                        {campaign.title}
                                                    </Typography>
                                                    <Chip
                                                        size="small"
                                                        label={campaign.daysLeft > 0 ? "Active" : "Ended"}
                                                        sx={{
                                                            bgcolor: campaign.daysLeft > 0 ? "rgba(0, 200, 255, 0.1)" : "rgba(239, 68, 68, 0.1)",
                                                            color: campaign.daysLeft > 0 ? "#00C8FF" : "#ef4444",
                                                            fontWeight: "bold",
                                                            height: 24
                                                        }}
                                                    />
                                                </Box>
                                                <Typography variant="body2" color="gray" sx={{ mb: 1, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                                    {campaign.description}
                                                </Typography>
                                                <Stack direction="row" spacing={3} alignItems="center">
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <PeopleIcon sx={{ fontSize: 16, color: "gray" }} />
                                                        <Typography variant="caption" color="gray">
                                                            {campaign.candidates?.length || 0} Candidates
                                                        </Typography>
                                                    </Box>
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <TrendingUp sx={{ fontSize: 16, color: "gray" }} />
                                                        <Typography variant="caption" color="gray">
                                                            Ends in {campaign.daysLeft} days
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </Box>

                                            <Box sx={{ width: 220, display: { xs: "none", lg: "block" } }}>
                                                <Box display="flex" justifyContent="space-between" mb={1}>
                                                    <Typography variant="caption" color="gray">Participation</Typography>
                                                    <Typography variant="caption" color="white" fontWeight="bold">
                                                        {campaign.totalVoters > 0 ? ((campaign.votesCast / campaign.totalVoters) * 100).toFixed(0) : 0}%
                                                    </Typography>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={campaign.totalVoters > 0 ? (campaign.votesCast / campaign.totalVoters) * 100 : 0}
                                                    sx={{ height: 6, borderRadius: 3, bgcolor: "rgba(255,255,255,0.1)", "& .MuiLinearProgress-bar": { bgcolor: "#00C8FF" } }}
                                                />
                                                <Typography variant="caption" color="gray" sx={{ mt: 0.5, display: "block", textAlign: "right" }}>
                                                    {campaign.votesCast} / {campaign.totalVoters} Votes
                                                </Typography>
                                            </Box>

                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    startIcon={<PersonAddIcon />}
                                                    onClick={() => {
                                                        setSelectedCampaignId(campaign.id);
                                                        setOpenCandidateModal(true);
                                                    }}
                                                    sx={{
                                                        color: "#22c55e",
                                                        borderColor: "rgba(34, 197, 94, 0.3)",
                                                        minWidth: 40,
                                                        px: 2,
                                                        "&:hover": { bgcolor: "rgba(34, 197, 94, 0.1)", borderColor: "#22c55e" }
                                                    }}
                                                    variant="outlined"
                                                    size="small"
                                                >
                                                    Candidate
                                                </Button>
                                                <IconButton
                                                    sx={{ color: "gray", "&:hover": { color: "#00C8FF", bgcolor: "rgba(0, 200, 255, 0.1)" } }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => handleDeleteCampaign(campaign.id)}
                                                    sx={{ color: "gray", "&:hover": { color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.1)" } }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </Paper>
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        {/* VOTERS TAB */}
                        {currentTab === "voters" && (
                            <Box>
                                <TableContainer component={Paper} sx={{ bgcolor: "rgba(255,255,255,0.03)", borderRadius: 3 }}>
                                    <Table>
                                        <TableHead sx={{ bgcolor: "rgba(0,0,0,0.2)" }}>
                                            <TableRow>
                                                <TableCell sx={{ color: "gray" }}>Voter Name</TableCell>
                                                <TableCell sx={{ color: "gray" }}>Email</TableCell>
                                                <TableCell sx={{ color: "gray" }}>Campaign</TableCell>
                                                <TableCell sx={{ color: "gray" }}>Choice</TableCell>
                                                <TableCell sx={{ color: "gray" }}>Time</TableCell>
                                                <TableCell sx={{ color: "gray" }}>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {VOTERS_DATA.map((row) => (
                                                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>{row.name}</TableCell>
                                                    <TableCell sx={{ color: "rgba(255,255,255,0.7)" }}>{row.email}</TableCell>
                                                    <TableCell sx={{ color: "cyan" }}>{row.campaign}</TableCell>
                                                    <TableCell sx={{ color: "white" }}>{row.choice}</TableCell>
                                                    <TableCell sx={{ color: "gray" }}>{new Date(row.timestamp).toLocaleTimeString()}</TableCell>
                                                    <TableCell>
                                                        <Chip label={row.status} size="small" sx={{ bgcolor: "rgba(34, 197, 94, 0.2)", color: "#22c55e", fontWeight: "bold" }} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )}
                    </>
                )}
            </Box>

            {/* ADD CAMPAIGN MODAL */}
            <Dialog
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                PaperProps={{
                    sx: {
                        bgcolor: "#0f1929",
                        color: "white",
                        minWidth: "400px",
                        border: "1px solid rgba(0,200,255,0.2)"
                    }
                }}
            >
                <DialogTitle sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Add New Campaign
                    <IconButton onClick={() => setOpenAddModal(false)} sx={{ color: "gray" }}><CloseIcon /></IconButton>
                </DialogTitle>
                <form onSubmit={handleAddCampaign}>
                    <DialogContent>
                        <Stack spacing={3} mt={1}>
                            <TextField
                                autoFocus
                                name="title"
                                label="Campaign Title"
                                fullWidth
                                variant="outlined"
                                value={newCampaign.title}
                                onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                                required
                                sx={{
                                    "& label": { color: "gray" },
                                    "& input": { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                        "&:hover fieldset": { borderColor: "cyan" },
                                    }
                                }}
                            />
                            <TextField
                                name="description"
                                label="Description"
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    "& label": { color: "gray" },
                                    "& textarea": { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                        "&:hover fieldset": { borderColor: "cyan" },
                                    }
                                }}
                                value={newCampaign.description}
                                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                                required
                            />
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    name="startDate"
                                    label="Start Date"
                                    type="date"
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    value={newCampaign.startDate}
                                    onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                                    required
                                    sx={{
                                        "& label": { color: "gray" },
                                        "& input": { color: "white" },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                            "&:hover fieldset": { borderColor: "cyan" },
                                            "& input::-webkit-calendar-picker-indicator": {
                                                filter: "invert(1)",
                                            },
                                        }
                                    }}
                                />
                                <TextField
                                    name="endDate"
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    value={newCampaign.endDate}
                                    onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                                    required
                                    sx={{
                                        "& label": { color: "gray" },
                                        "& input": { color: "white" },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                            "&:hover fieldset": { borderColor: "cyan" },
                                            "& input::-webkit-calendar-picker-indicator": {
                                                filter: "invert(1)",
                                            },
                                        }
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                        <Button onClick={() => setOpenAddModal(false)} sx={{ color: "gray" }}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ bgcolor: "cyan", color: "black", fontWeight: "bold" }}>
                            Create Campaign
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* ADD CANDIDATE MODAL */}
            <Dialog
                open={openCandidateModal}
                onClose={() => setOpenCandidateModal(false)}
                PaperProps={{
                    sx: {
                        bgcolor: "#0f1929",
                        color: "white",
                        minWidth: "400px",
                        border: "1px solid rgba(0,200,255,0.2)"
                    }
                }}
            >
                <DialogTitle sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Add New Candidate
                    <IconButton onClick={() => setOpenCandidateModal(false)} sx={{ color: "gray" }}><CloseIcon /></IconButton>
                </DialogTitle>
                <form onSubmit={handleAddCandidate}>
                    <DialogContent>
                        <Stack spacing={3} mt={1}>
                            <TextField
                                autoFocus
                                label="Name"
                                fullWidth
                                variant="outlined"
                                value={newCandidate.name}
                                onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                                required
                                sx={{
                                    "& label": { color: "gray" },
                                    "& input": { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                        "&:hover fieldset": { borderColor: "cyan" },
                                    }
                                }}
                            />
                            <TextField
                                label="Candidate Number"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={newCandidate.number}
                                onChange={(e) => setNewCandidate({ ...newCandidate, number: parseInt(e.target.value) })}
                                required
                                sx={{
                                    "& label": { color: "gray" },
                                    "& input": { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                        "&:hover fieldset": { borderColor: "cyan" },
                                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                                            "-webkit-appearance": "none",
                                            margin: 0,
                                        },
                                    }
                                }}
                            />
                            <TextField
                                label="Vision"
                                multiline
                                rows={2}
                                fullWidth
                                variant="outlined"
                                value={newCandidate.vision}
                                onChange={(e) => setNewCandidate({ ...newCandidate, vision: e.target.value })}
                                sx={{
                                    "& label": { color: "gray" },
                                    "& textarea": { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                        "&:hover fieldset": { borderColor: "cyan" },
                                    }
                                }}
                            />
                            <TextField
                                label="Mission"
                                multiline
                                rows={3}
                                fullWidth
                                variant="outlined"
                                value={newCandidate.mission}
                                onChange={(e) => setNewCandidate({ ...newCandidate, mission: e.target.value })}
                                sx={{
                                    "& label": { color: "gray" },
                                    "& textarea": { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                        "&:hover fieldset": { borderColor: "cyan" },
                                    }
                                }}
                            />
                            <TextField
                                label="Photo URL"
                                fullWidth
                                variant="outlined"
                                value={newCandidate.photo}
                                onChange={(e) => setNewCandidate({ ...newCandidate, photo: e.target.value })}
                                sx={{
                                    "& label": { color: "gray" },
                                    "& input": { color: "white" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                                        "&:hover fieldset": { borderColor: "cyan" },
                                    }
                                }}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ p: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                        <Button onClick={() => setOpenCandidateModal(false)} sx={{ color: "gray" }}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ bgcolor: "cyan", color: "black", fontWeight: "bold" }}>
                            Add Candidate
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box >
    );
}
