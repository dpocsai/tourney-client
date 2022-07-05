import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
  EmojiEvents,
} from "@mui/icons-material";

import useStyles from "./styles";
import GoogleAuth from "../GoogleAuth";

const NavBar = ({ toggleDark, setToggleDark }) => {
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleModeChange = () => {
    setToggleDark(!toggleDark);
    localStorage.setItem("mode", toggleDark ? "dark" : "light");
  };

  return (
    <AppBar
      position="sticky"
      sx={{ marginBottom: "30px", backgroundColor: "primary.dark" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link className={classes.link} to="/tournaments">
            <EmojiEvents sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Link>
          <Typography
            variant="overline"
            noWrap
            sx={{
              mr: 2,
              fontSize: "20px",
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "5px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link className={classes.link} to="/tournaments">
              TOURNEY
            </Link>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <Tooltip title="Menu">
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link className={classes.link} to="/tournaments">
                <MenuItem key={"tournaments"} onClick={handleCloseNavMenu}>
                  <Typography variant="overline" textAlign="center">
                    Tournaments
                  </Typography>
                </MenuItem>
              </Link>
              <Link className={classes.link} to="/tournaments/new">
                <MenuItem key={"create new"} onClick={handleCloseNavMenu}>
                  <Typography variant="overline" textAlign="center">
                    Create
                  </Typography>
                </MenuItem>
              </Link>
              <Link className={classes.link} to="/help">
                <MenuItem key={"help"} onClick={handleCloseNavMenu}>
                  <Typography variant="overline" textAlign="center">
                    Help
                  </Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Link className={classes.link} to="/tournaments">
            <EmojiEvents sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          </Link>

          <Typography
            variant="overline"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "20px",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link className={classes.link} to="/tournaments">
              TOURNEY
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link className={classes.link} to="/tournaments">
              <Button
                key={"tournaments"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Tournaments
              </Button>
            </Link>
            <Link className={classes.link} to="/tournaments/new">
              <Button
                key={"create new"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Create
              </Button>
            </Link>
            <Link className={classes.link} to="/help">
              <Button
                key={"help"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Help
              </Button>
            </Link>
          </Box>
          <Tooltip title={toggleDark ? "Light mode" : "Dark Mode"}>
            <IconButton
              sx={{ ml: 1 }}
              color="inherit"
              onClick={handleModeChange}
            >
              {toggleDark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 0 }}>
            <GoogleAuth />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
