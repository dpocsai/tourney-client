import React, { useState } from "react";
import {
  Typography,
  Drawer,
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Box,
  Card,
  AppBar,
} from "@mui/material";
import { AccountTree } from "@mui/icons-material";

const splitMatchesByRound = (matches, participants, thirdPlaceMatch) => {
  let _thirdPlaceMatch = matches.filter((match) => match.thirdPlaceMatch);
  let _matches = [...matches.filter((match) => !match.thirdPlaceMatch)];

  let matchesPerRound = [1, 2, 4, 8, 16, 32];
  let firstRoundMatches =
    matchesPerRound.find((match) => match >= participants.length) / 2;

  let matchesByRound = [];
  for (let i = firstRoundMatches; i >= 1; i = i / 2) {
    matchesByRound.push([..._matches.splice(0, i)]);
  }
  if (thirdPlaceMatch) {
    matchesByRound.splice(matchesByRound.length - 1, 0, _thirdPlaceMatch);
  }

  return matchesByRound;
};

const getDisplayText = (participant, match, matches) => {
  if (participant.name) {
    return participant.name.length > 10
      ? participant.name.slice(0, 10).concat("..")
      : participant.name;
  }
  if (!participant.prevMatchId) {
    return "Bye";
  }

  let prevMatchId = matches.find(
    (match) => match.matchId === participant.prevMatchId
  ).matchId;

  return match.thirdPlaceMatch
    ? `Loser of ${prevMatchId}`
    : `Winner of ${prevMatchId}`;
};

const getMatchDisplayColors = ({ teamA, teamB, bye }) => {
  if (bye) {
    return teamA.name
      ? {
          score: ["text.primary", "text.disabled"],
          name: ["text.default", "text.disabled"],
          editBtn: ["text.disabled"],
        }
      : {
          score: ["text.disabled", "text.primary"],
          name: ["text.disabled", "text.default"],
          editBtn: ["text.disabled"],
        };
  }
  if (!teamA.rank || !teamB.rank) {
    return {
      score: ["text.disabled", "text.disabled"],
      name: ["text.disabled", "text.disabled"],
      editBtn: ["text.disabled"],
    };
  }
  if (+teamA.score > +teamB.score) {
    return {
      score: ["text.primary", "text.disabled"],
      name: ["text.default", "text.disabled"],
    };
  }
  if (+teamB.score > +teamA.score) {
    return {
      score: ["text.disabled", "text.primary"],
      name: ["text.disabled", "text.default"],
    };
  }
  return {
    score: ["text.disabled", "text.disabled"],
    name: ["text.primary", "text.primary"],
  };
};

const getRoundLabel = (idx, rounds, thirdPlaceMatch) => {
  let roundLabels = [
    "Finals",
    "Semifinals",
    "Quarterfinals",
    "Round of 16",
    "Round of 32",
  ];

  if (thirdPlaceMatch) {
    roundLabels.splice(1, 0, "3rd Place");
  }
  roundLabels = [...roundLabels].slice(0, rounds.length).reverse();

  return roundLabels[idx];
};

const renderRows = (round, matches) => {
  return round.map((match) => {
    let { teamA, teamB, matchId } = match;

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "5px 10px",
        }}
        key={`match${matchId}`}
      >
        <Typography
          variant="overline"
          sx={{ fontSize: "9px", marginRight: "5px" }}
        >
          {matchId}
        </Typography>
        <Card
          sx={{
            width: "100%",
            backgroundColor: "background.default",
            margin: "5px 0",
            lineHeight: "1",
          }}
        >
          <Grid
            container
            spacing={0}
            sx={{
              backgroundColor: "background.paper",
              padding: "0px 5px",
            }}
          >
            <Grid item xs={10}>
              <Typography
                variant="overline"
                sx={{
                  fontSize: "9px",
                  color: getMatchDisplayColors(match).name[0],
                  ...(!teamA.name && { fontStyle: "italic" }),
                  ...(!teamA.name && { fontSize: "8px" }),
                }}
              >
                {getDisplayText(teamA, match, matches)}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <Typography
                variant="overline"
                sx={{
                  fontSize: "8px",
                  color: getMatchDisplayColors(match).score[0],
                }}
              >
                {teamA.score}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={0} sx={{ padding: "0px 5px" }}>
            <Grid item xs={10}>
              <Typography
                variant="overline"
                sx={{
                  fontSize: "9px",
                  color: getMatchDisplayColors(match).name[1],
                  ...(!teamB.name && { fontStyle: "italic" }),
                  ...(!teamB.name && { fontSize: "8px" }),
                }}
              >
                {getDisplayText(teamB, match, matches)}
              </Typography>
            </Grid>

            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <Typography
                variant="overline"
                sx={{
                  fontSize: "8px",
                  color: getMatchDisplayColors(match).score[1],
                }}
              >
                {teamB.score}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Box>
    );
  });
};
const renderColumns = (rounds, matches, thirdPlaceMatch) => {
  return rounds.map((round, idx) => {
    return (
      <Grid
        item
        xs={1.5}
        sx={{
          margin: "0px",
          height: "100%",
          textAlign: "center",
        }}
        key={`Col${idx + 1}`}
      >
        <AppBar
          sx={{
            position: "sticky",
            backgroundColor: "primary.dark",
            boxShadow: "none",
          }}
        >
          <Typography variant="overline" sx={{ fontSize: "10px" }}>
            {getRoundLabel(idx, rounds, thirdPlaceMatch)}
          </Typography>
        </AppBar>

        <Grid
          container
          direction="column"
          justifyContent="space-around"
          height="100%"
          sx={{ textAlign: "left" }}
        >
          {renderRows(round, matches)}
        </Grid>
      </Grid>
    );
  });
};

const MiniBracket = ({ tournament }) => {
  let rounds = splitMatchesByRound(
    tournament.matches,
    tournament.participants,
    tournament.thirdPlaceMatch
  );
  const [openMiniBracket, setOpenMiniBracket] = useState(false);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        sx={{
          cursor: "pointer",
          boxShadow: "none",
          backgroundColor: "background.default",
          opacity: "0.8",
        }}
        onClick={() => {
          setOpenMiniBracket(true);
        }}
      >
        <BottomNavigationAction
          label="View Bracket"
          icon={<AccountTree sx={{ color: "primary.main" }} />}
          sx={{ color: "secondary.main" }}
        />
      </BottomNavigation>
      <Drawer
        variant="temporary"
        anchor="bottom"
        open={openMiniBracket}
        onClose={() => setOpenMiniBracket(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%" },
            height: "60%",
            margin: "auto",
            boxShadow: "none",
            backgroundColor: "background.default",
            opacity: "0.9",
          },
        }}
      >
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "minmax(9rem,auto)",
            gridGap: "0px",
            height: "100%",
            margin: "0",
            padding: "10px 0px",
            overflow: "scroll",
          }}
        >
          {renderColumns(
            rounds,
            tournament.matches,
            tournament.thirdPlaceMatch
          )}
        </div>
      </Drawer>
    </Box>
  );
};

export default MiniBracket;
