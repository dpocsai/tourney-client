import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, Card, Box, Divider } from "@mui/material";
import { Edit } from "@mui/icons-material";

import UpdateMatch from "../UpdateMatch";

const renderRoundDivider = (matchId, matches, numberOfRounds) => {
  let matchesPerRound = matches.length / numberOfRounds;
  if ((matchId - 1) % matchesPerRound === 0) {
    return (
      <Divider
        sx={{
          width: "100%",
          margin: "10px auto",
          color: "secondary.main",
        }}
      >{`Round ${(matchId - 1) / matchesPerRound + 1}`}</Divider>
    );
  }
};

const RenderMatch = (match, tournament) => {
  let { teamA, teamB, matchId } = match;
  let { matches, numberOfRounds } = tournament;
  const [open, setOpen] = useState(false);
  const currentUserId = useSelector((state) => state.auth.userId);
  const adminId = tournament.adminId;

  const setScoreColors = ({ teamA, teamB }) => {
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
      {renderRoundDivider(matchId, matches, numberOfRounds)}
      <Grid item key={matchId} xs={11} sm={6} lg={4} xl={3}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px 10px",
          }}
        >
          <Typography variant="overline">{matchId}</Typography>
          <Card
            sx={{
              width: "100%",
              margin: "5px",
              backgroundColor: "background.default",
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
                    color: setScoreColors(match).name[0],
                  }}
                >
                  {teamA.name}
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: "right" }}>
                <Typography
                  variant="overline"
                  sx={{ color: setScoreColors(match).score[0] }}
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
                  sx={{ color: setScoreColors(match).name[1] }}
                >
                  {teamB.name}
                </Typography>
              </Grid>

              <Grid item xs={2} sx={{ textAlign: "right" }}>
                <Typography
                  variant="overline"
                  sx={{ color: setScoreColors(match).score[1] }}
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
            <Edit sx={{ cursor: "pointer" }} onClick={() => setOpen(true)} />
          ) : null}
        </Box>
      </Grid>
    </React.Fragment>
  );
};

const RoundRobin = ({ tournament }) => {
  return (
    <>
      <Grid container spacing={2} marginBottom="20%" padding="10px">
        {tournament.matches.map((match) => RenderMatch(match, tournament))}
      </Grid>
    </>
  );
};

export default RoundRobin;
