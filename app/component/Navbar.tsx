import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    useEffect(() => {
        // Check for token in cookies
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);
    }, [location]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        handleCloseNavMenu();
    };

    // Pages configuration
    const pages = [
        { name: "Home", path: "/" },
        { name: "Campaigns", path: "/campaign" },
    ];

    return (
        <AppBar
            position="sticky"
            sx={{
                bgcolor: "rgba(5, 11, 26, 0.8)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* LOGO - Desktop */}
                    <HowToVoteIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#00C8FF" }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => navigate("/")}
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "white",
                            textDecoration: "none",
                            cursor: "pointer",
                            "&:hover": { color: "#00C8FF" },
                        }}
                    >
                        VOTEPEACE
                    </Typography>

                    {/* MOBILE MENU */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                                "& .MuiPaper-root": {
                                    bgcolor: "#0f1929",
                                    color: "white",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => handleNavigate(page.path)}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                            {isLoggedIn ? (
                                <MenuItem onClick={() => handleNavigate("/dashboard")}>
                                    <Typography textAlign="center">Dashboard</Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem onClick={() => handleNavigate("/login")}>
                                    <Typography textAlign="center" color="#00C8FF">
                                        Login
                                    </Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>

                    {/* LOGO - Mobile */}
                    <HowToVoteIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "#00C8FF" }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/");
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "white",
                            textDecoration: "none",
                        }}
                    >
                        VOTEPEACE
                    </Typography>

                    {/* DESKTOP MENU LINKS */}
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center", gap: 3 }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handleNavigate(page.path)}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                    fontWeight: location.pathname === page.path ? "bold" : "normal",
                                    borderBottom:
                                        location.pathname === page.path ? "2px solid #00C8FF" : "none",
                                    "&:hover": { color: "#00C8FF", bgcolor: "rgba(255,255,255,0.05)" },
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* AUTH BUTTONS */}
                    <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                        {isLoggedIn ? (
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/dashboard")}
                                sx={{
                                    color: "#00C8FF",
                                    borderColor: "#00C8FF",
                                    borderRadius: "20px",
                                    "&:hover": {
                                        bgcolor: "rgba(0, 200, 255, 0.1)",
                                        borderColor: "#00C8FF",
                                    },
                                }}
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <Stack direction="row" spacing={2}>
                                <Button
                                    onClick={() => navigate("/login")}
                                    sx={{ color: "white", "&:hover": { color: "#00C8FF" } }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate("/register")}
                                    sx={{
                                        bgcolor: "#00C8FF",
                                        color: "black",
                                        fontWeight: "bold",
                                        borderRadius: "20px",
                                        "&:hover": { bgcolor: "cyan" },
                                    }}
                                >
                                    Register
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
