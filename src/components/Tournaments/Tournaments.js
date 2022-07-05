import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Badge,
  Fab,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import {
  ExpandMore,
  DoubleArrow,
  Delete,
  Person,
  Add,
} from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";

import { deleteTournament } from "../../actions/tournaments";

import AlertMessage from "../AlertMessage";
import calculateTournamentProgress from "../../helpers/calculateTournamentProgress";

const Tournaments = () => {
  let tournaments = useSelector((state) => state.tournaments);

  const { userId, isSignedIn } = useSelector((state) => state.auth);
  const confirm = useConfirm();
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState("panel0");

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    confirm({
      description: "This tournament will be permanently deleted",
      confirmationButtonProps: { autoFocus: true },
    }).then(() => {
      dispatch(deleteTournament(id));
    });
  };

  const sortTournaments = () => {
    tournaments.sort(
      (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
    );
  };

  const renderList = () => {
    sortTournaments();
    if (isSignedIn === false) {
      return (
        <AlertMessage
          severity="info"
          message="Please log in to view and create tournaments."
        />
      );
    }
    if (isSignedIn === null) {
      return <CircularProgress />;
    }
    return tournaments.map((tournament, idx) => {
      return userId === tournament.adminId ? (
        <Accordion
          TransitionProps={{ unmountOnExit: true }}
          key={tournament._id}
          expanded={expanded === `panel${idx}`}
          onChange={handleChange(`panel${idx}`)}
          sx={{ width: { xs: "90%", md: "51%", marginBottom: "6px" } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              padding: "5px 10px",
              backgroundColor: "background.paper",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Delete
              onClick={(e) => handleDelete(e, tournament._id)}
              sx={{ alignSelf: "center" }}
            />
            <Grid
              container
              sx={{
                width: "100%",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {tournament.title}
              </Typography>
              <Grid
                item
                xs={8}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "background.paper",
                  margin: "2% auto",
                }}
              >
                <Box sx={{ width: "40%", margin: "auto" }}>
                  <LinearProgress
                    variant="determinate"
                    value={calculateTournamentProgress(tournament.matches)}
                  />
                </Box>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "background.default",
              padding: "10px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "auto",
              }}
            >
              <Badge badgeContent={tournament.participants.length}>
                <Person sx={{ fontSize: "20px" }} />
              </Badge>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="overline" sx={{ fontSize: "11px" }}>
                  {tournament.sport}
                </Typography>
                <Typography variant="overline" sx={{ fontSize: "11px" }}>
                  {tournament.type}
                </Typography>
              </Box>

              <Link to={`/tournaments/${tournament._id}`}>
                <Fab
                  size="small"
                  sx={{
                    backgroundColor: "background.default",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "background.paper",
                    },
                  }}
                >
                  <DoubleArrow
                    sx={{
                      cursor: "pointer",
                      fontSize: "25px",
                    }}
                  />
                </Fab>
              </Link>
            </Box>
          </AccordionDetails>
        </Accordion>
      ) : null;
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: { xs: "80%", md: "50%" },
          margin: "auto",
        }}
      >
        <Typography
          variant="overline"
          sx={{ fontSize: "16px", letterSpacing: "4px" }}
        >
          My Tournaments
        </Typography>
        <Link to="/tournaments/new">
          <Tooltip title="New">
            <Fab
              size="small"
              sx={{
                backgroundColor: "background.default",
                color: "primary.main",
                "&:hover": {
                  backgroundColor: "background.paper",
                },
              }}
            >
              <Add sx={{ fontSize: "25px" }} />
            </Fab>
          </Tooltip>
        </Link>
      </Box>

      <Grid
        container
        spacing={5}
        justifyContent="space-around"
        sx={{ width: "100%", margin: "30px auto" }}
      >
        {renderList()}
      </Grid>
    </>
  );
};

export default Tournaments;

//autocomplete for sport instead of select
