import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
} from "@mui/material";
import { Replay } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";

import { updateTournament } from "../../../actions/tournaments";
import updateMatches from "../../../helpers/updateMatches";
import updateParticipants from "../../../helpers/updateParticipants";

const UpdateMatch = ({ match, tournament, open, setOpen }) => {
  let { teamA, teamB } = match;
  let { matches, participants, type, thirdPlaceMatch } = tournament;

  const dispatch = useDispatch();
  const confirm = useConfirm();

  const [scores, setScores] = useState([teamA.score, teamB.score]);
  const [prevScores, setPrevScores] = useState(scores);

  const dispatchUpdatedTournament = (resetMatchStats) => {
    let editMatchStats = match.completed;
    let updatedMatches = updateMatches(
      matches,
      match,
      scores,
      resetMatchStats,
      participants,
      thirdPlaceMatch
    );
    let updatedParticipants = updateParticipants(
      participants,
      match,
      scores,
      editMatchStats,
      resetMatchStats
    );
    let updatedCompletion = updatedMatches.every((match) => match.completed);

    dispatch(
      updateTournament(tournament._id, {
        ...tournament,
        matches: updatedMatches,
        participants: updatedParticipants,
        completed: updatedCompletion,
      })
    );
  };

  const handleSubmit = () => {
    dispatchUpdatedTournament(false);

    setScores(scores);
    setPrevScores(scores);
    setOpen(false);
  };

  const handleReset = () => {
    confirm({
      description: "This match will be reset and scores will be lost.",
      confirmationButtonProps: { autoFocus: true },
    }).then(() => {
      dispatchUpdatedTournament(true);

      setScores([0, 0]);
      setPrevScores([0, 0]);
      setOpen(false);
    });
  };

  const handleClose = () => {
    setScores(prevScores);
    setOpen(false);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      sx={{
        width: "100%",
        margin: "auto",

        backgroundImage: "none",
      }}
      open={open}
      onClose={() => {
        handleClose();
      }}
    >
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>
          <Typography variant="overline">Please enter scores</Typography>
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "20px",
          }}
        >
          <TextField
            autoFocus
            inputProps={{
              maxLength: 3,
              style: { textAlign: "right" },
            }}
            autoComplete="off"
            size="small"
            variant="outlined"
            sx={{ marginBottom: "5%", width: "60%" }}
            name="score"
            label={<Typography variant="overline">{teamA.name}</Typography>}
            onChange={(e) =>
              setScores([e.target.value.replace(/[^0-9]/, "") || 0, scores[1]])
            }
            value={+scores[0] || ""}
          />
          <TextField
            inputProps={{
              maxLength: 3,
              style: { textAlign: "right" },
            }}
            autoComplete="off"
            size="small"
            variant="outlined"
            sx={{ marginBottom: "5%", width: "60%" }}
            name="score"
            label={<Typography variant="overline">{teamB.name}</Typography>}
            onChange={(e) =>
              setScores([scores[0], e.target.value.replace(/[^0-9]/, "") || 0])
            }
            value={+scores[1] || ""}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              if (match.completed) {
                handleReset();
              }
            }}
          >
            <Replay sx={{ cursor: "pointer" }} />
            <Typography variant="overline">Reset</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            if (type === "single elimination" && scores[0] === scores[1]) {
              return;
            }

            handleSubmit();
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateMatch;
