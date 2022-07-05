import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Card, Box, Divider } from "@mui/material";
import { Edit } from "@mui/icons-material";

import UpdateMatch from "../UpdateMatch";

const renderRoundDivider = (matchId, matches, thirdPlaceMatch) => {
  let numberOfRounds = Math.ceil(Math.log2(matches.length));

  let roundLabels = [
    "Finals",
    "Semifinals",
    "Quarterfinals",
    "Round of 16",
    "Round of 32",
  ];

  let matchesPerRound = [1, 2, 4, 8, 16];

  if (thirdPlaceMatch) {
    roundLabels.splice(1, 0, "3rd Place");
    matchesPerRound.splice(1, 0, 1);
    numberOfRounds++;
  }

  roundLabels = [...roundLabels].slice(0, numberOfRounds).reverse();
  matchesPerRound = [...matchesPerRound].slice(0, numberOfRounds).reverse();

  let cutoffMatchIds = [];
  for (let i = 0, totalMatches = 1; i < numberOfRounds; i++) {
    cutoffMatchIds.push(totalMatches);
    totalMatches += matchesPerRound[i];
  }

  let roundDividers = cutoffMatchIds.reduce((dividers, matchId, idx) => {
    dividers[matchId] = roundLabels[idx];
    return dividers;
  }, {});

  if (roundDividers[matchId]) {
    return (
      <Divider
        sx={{
          width: "100%",
          margin: "10px auto",
          color: "secondary.main",
        }}
      >
        {roundDividers[matchId]}
      </Divider>
    );
  }
};

const nextMatch = (matches) => {
  return matches.find(
    (match) => !match.completed && match.teamA.name && match.teamB.name
  )?.matchId;
};

const RenderMatch = (match, tournament) => {
  let { teamA, teamB, matchId, bye } = match;
  let { matches, thirdPlaceMatch } = tournament;
  const [open, setOpen] = useState(false);
  const currentUserId = useSelector((state) => state.auth.userId);
  const adminId = tournament.adminId;

  const getDisplayText = (participant, thirdPlaceMatch) => {
    if (!participant.prevMatchId) {
      return "Bye";
    }

    let prevMatch = matches.find(
      (match) => match.matchId === participant.prevMatchId
    );
    if (thirdPlaceMatch && matches[matches.length - 2].matchId === matchId) {
      return `Loser of ${prevMatch.matchId}`;
    }
    return `Winner of ${prevMatch.matchId}`;
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
        editBtn: ["text.disabled"],
        score: ["text.disabled", "text.disabled"],
        name: ["text.disabled", "text.disabled"],
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

  return (
    <React.Fragment key={matchId}>
      {renderRoundDivider(matchId, matches, thirdPlaceMatch)}
      <Grid
        item
        key={matchId}
        xs={11}
        sm={6}
        lg={4}
        xl={3}
        sx={{
          ...((matchId === matches[matches.length - 1].matchId ||
            match.thirdPlaceMatch) && { margin: "auto" }),
        }}
      >
        <Box
          sx={{
            ...(match.bye && {
              opacity: "0.5",
            }),

            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "5px 10px",
          }}
        >
          <Typography variant="overline" sx={{ width: "5%" }}>
            {matchId}
          </Typography>
          <Card
            sx={{
              width: "100%",
              margin: "5px",
              backgroundColor: "background.default",
              ...(match.matchId === nextMatch(matches) && {
                border: "2px solid rgb(48,138,179)",
              }),
            }}
          >
            <Grid
              container
              spacing={0}
              sx={{
                backgroundColor: "background.paper",
                padding: "5px 10px",
              }}
            >
              <Grid item xs={1}>
                <Typography
                  variant="overline"
                  sx={{ color: "text.disabled", fontSize: "10px" }}
                >
                  {teamA.rank}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  variant="overline"
                  sx={{
                    color: getMatchDisplayColors(match).name[0],
                    ...(!teamA.name && { fontStyle: "italic" }),
                    ...(!teamA.name && { fontSize: "10px" }),
                  }}
                >
                  {teamA.name || getDisplayText(teamA, thirdPlaceMatch)}
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "right" }}>
                <Typography
                  variant="overline"
                  sx={{ color: getMatchDisplayColors(match).score[0] }}
                >
                  {teamA.score}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={0} sx={{ padding: "5px 10px" }}>
              <Grid item xs={1}>
                <Typography
                  variant="overline"
                  sx={{ color: "text.disabled", fontSize: "10px" }}
                >
                  {teamB.rank}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography
                  variant="overline"
                  sx={{
                    color: getMatchDisplayColors(match).name[1],
                    ...(!teamB.name && { fontStyle: "italic" }),
                    ...(!teamB.name && { fontSize: "10px" }),
                  }}
                >
                  {teamB.name || getDisplayText(teamB, thirdPlaceMatch)}
                </Typography>
              </Grid>

              <Grid item xs={2} sx={{ textAlign: "right" }}>
                <Typography
                  variant="overline"
                  sx={{ color: getMatchDisplayColors(match).score[1] }}
                >
                  {teamB.score}
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <UpdateMatch
            match={match}
            tournament={tournament}
            open={open}
            setOpen={setOpen}
          />
          {currentUserId === adminId ? (
            <Edit
              sx={{
                cursor: "pointer",
                color: getMatchDisplayColors(match).editBtn,
              }}
              onClick={() => {
                if (!bye && teamA.rank && teamB.rank) {
                  setOpen(true);
                }
              }}
            />
          ) : null}
        </Box>
      </Grid>
    </React.Fragment>
  );
};

const SingleElimination = ({ tournament }) => {
  return (
    <>
      <Grid container spacing={2} marginBottom="50px">
        {tournament.matches.map((match) => RenderMatch(match, tournament))}
      </Grid>
    </>
  );
};

export default SingleElimination;
