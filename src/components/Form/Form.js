import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  IconButton,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  Box,
} from "@mui/material";

import { CloseRounded } from "@mui/icons-material";

import { createTournament } from "../../actions/tournaments";
import generateParticipants from "../../helpers/generateParticipants";
import generateMatches from "../../helpers/generateMatches";
import sports from "./sportsList";
import AlertMessage from "../AlertMessage";

const Form = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const [tournamentData, setTournamentData] = useState({
    title: "",
    sport: "",
    type: "single elimination",
    adminId: "",
    participants: "",
    matches: [],
    thirdPlaceMatch: false,
    numberOfRounds: 1,
    completed: false,
    dateCreated: Date.now(),
  });

  const [validTitle, setValidTitle] = useState(true);
  const [validSport, setValidSport] = useState(true);
  const [validParticipants, setValidParticipants] = useState(true);
  const [shuffleRanks, setShuffleRanks] = useState(false);

  const validateTitle = (title) => {
    let valid = title !== "";
    setValidTitle(valid);
    return valid;
  };

  const validateSport = (sport) => {
    let valid = sport !== "";
    setValidSport(valid);
    return valid;
  };

  const validateParticipants = (participants) => {
    let MIN_PARTICIPANTS = 2;
    let MAX_PARTICIPANTS = tournamentData.type === "round robin" ? 10 : 32;

    participants = participants
      .trim()
      .split("\n")
      .filter((line) => !/^ *$|^\n$/.test(line));

    let valid =
      participants.length >= MIN_PARTICIPANTS &&
      participants.length <= MAX_PARTICIPANTS &&
      participants.length === new Set(participants).size;

    setValidParticipants(valid);
    return valid;
  };

  const validateForm = ({ title, sport, participants }) => {
    return (
      validateTitle(title) &&
      validateSport(sport) &&
      validateParticipants(participants)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(tournamentData)) {
      return;
    }

    let participantsData = generateParticipants(tournamentData, shuffleRanks);

    let matchesData = generateMatches({
      ...tournamentData,
      participants: participantsData,
    });
    dispatch(
      createTournament({
        ...tournamentData,
        participants: participantsData,
        matches: matchesData,
        adminId: userId,
      })
    );

    navigate("/tournaments");
  };

  const limitInputLength = (input) => {
    let MAX_LINE_LENGTH = 15;

    let MAX_PARTICIPANTS = tournamentData.type === "round robin" ? 10 : 32;

    if (input.split("\n").length > MAX_PARTICIPANTS) {
      input = input.split("\n").slice(0, MAX_PARTICIPANTS).join("\n");
    }
    let lines = input
      .split(/(\r\n|\n|\r)/gm)
      .map((line) =>
        line.length > MAX_LINE_LENGTH ? line.slice(0, MAX_LINE_LENGTH) : line
      );

    return lines.join("");
  };

  if (isSignedIn === null) {
    return (
      <Container sx={{ textAlign: "center" }}>
        <CircularProgress sx={{ margin: "auto" }} />
      </Container>
    );
  }
  return (
    <Container>
      {isSignedIn ? (
        <Card
          elevation={5}
          sx={{
            borderRadius: "10px",
            width: { sm: "80%", xs: "90%", md: "50%" },
            margin: "auto",
            padding: "3%",
            backgroundColor: "background.paper",
            backgroundImage: "none",
          }}
        >
          <IconButton onClick={() => navigate("/tournaments")}>
            <CloseRounded
              sx={{
                cursor: "pointer",
                color: "text",
                fontSize: "25px",
              }}
            />
          </IconButton>

          <form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="overline" fontSize="16px">
              Create a tournament
            </Typography>
            <TextField
              inputProps={{ maxLength: 25 }}
              sx={{ marginBottom: "5%" }}
              name="title"
              required
              label={<Typography variant="overline">Title</Typography>}
              fullWidth
              error={!validTitle}
              helperText={!validTitle ? "Title is required" : ""}
              value={tournamentData.title}
              onFocus={() => {
                setValidTitle(true);
              }}
              onChange={(e) => {
                setTournamentData({
                  ...tournamentData,
                  title: e.target.value.replace(/ +/g, " ").replace(/^ /, ""),
                });
              }}
            />
            <FormControl
              sx={{ width: "100%", marginBottom: "5%" }}
              error={!validSport}
            >
              <InputLabel id="sport-select">
                <Typography variant="overline">Sport *</Typography>
              </InputLabel>
              <Select
                id="sport-select"
                value={tournamentData.sport}
                onFocus={() => {
                  setValidSport(true);
                }}
                onChange={(e) => {
                  setTournamentData({
                    ...tournamentData,
                    sport: e.target.value,
                  });
                }}
                required
                helpertext={"Sport is required"}
                label={<Typography variant="overline">Sport *</Typography>}
                MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
              >
                <MenuItem value="Other" key="0">
                  <em>Other</em>
                </MenuItem>
                {sports.map((sport, idx) => {
                  return (
                    <MenuItem value={sport} key={idx + 1}>
                      {sport}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {!validSport ? "Sport is required" : ""}
              </FormHelperText>
            </FormControl>
            <RadioGroup
              row
              name="type"
              sx={{
                marginBottom: "5%",
                width: "100%",
              }}
              defaultValue="single elimination"
              onChange={(e) => {
                setTournamentData({
                  ...tournamentData,
                  type: e.target.value,
                  numberOfRounds: 1,
                  thirdPlaceMatch: false,
                });
              }}
            >
              <FormControlLabel
                value="single elimination"
                control={<Radio size="small" />}
                label={
                  <Typography variant="overline">Single Elimination</Typography>
                }
              />
              <FormControlLabel
                value="round robin"
                control={<Radio size="small" />}
                label={<Typography variant="overline">Round Robin</Typography>}
              />
            </RadioGroup>
            <Box
              sx={{
                width: "100%",
                marginBottom: "5%",
              }}
            >
              {tournamentData.type === "round robin" ? (
                <FormControl sx={{ width: "60%" }}>
                  <InputLabel id="rounds-select">
                    <Typography variant="overline">How many rounds?</Typography>
                  </InputLabel>
                  <Select
                    labelId="rounds-select"
                    variant="outlined"
                    value={tournamentData.numberOfRounds}
                    label="How many rounds?"
                    onChange={(e) =>
                      setTournamentData({
                        ...tournamentData,
                        numberOfRounds: e.target.value,
                      })
                    }
                    size="small"
                  >
                    <MenuItem value={1}>
                      <Typography variant="overline">1</Typography>
                    </MenuItem>
                    <MenuItem value={2}>
                      <Typography variant="overline">2</Typography>
                    </MenuItem>
                    <MenuItem value={3}>
                      <Typography variant="overline">3</Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={tournamentData.thirdPlaceMatch}
                      onChange={(e) =>
                        setTournamentData({
                          ...tournamentData,
                          thirdPlaceMatch: e.target.checked,
                        })
                      }
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="overline" sx={{ fontSize: "10px" }}>
                      Third place match
                    </Typography>
                  }
                ></FormControlLabel>
              )}
            </Box>
            <TextField
              name="participants"
              required
              size="small"
              label={
                <Typography variant="overline">Participants / Teams</Typography>
              }
              helperText={`One per line | Order by seed  | Min: 2 | Max: ${
                tournamentData.type === "round robin" ? "10" : "32"
              }
          `}
              multiline
              rows={4}
              fullWidth
              error={!validParticipants}
              value={tournamentData.participants}
              onFocus={() => {
                setValidParticipants(true);
              }}
              onChange={(e) => {
                setTournamentData({
                  ...tournamentData,
                  participants: limitInputLength(e.target.value),
                });
              }}
            />
            <Box sx={{ width: "100%" }}>
              <FormControlLabel
                sx={{ width: "60%" }}
                control={
                  <Checkbox
                    checked={shuffleRanks}
                    onChange={() => {
                      setShuffleRanks(!shuffleRanks);
                    }}
                    size="small"
                  />
                }
                label={
                  <Typography variant="overline" sx={{ fontSize: "10px" }}>
                    Randomize Seeds
                  </Typography>
                }
              ></FormControlLabel>
            </Box>

            <Button
              variant="contained"
              className="submitButton"
              type="submit"
              sx={{
                margin: "5% 0",
              }}
            >
              Create
            </Button>
          </form>
        </Card>
      ) : (
        <AlertMessage
          severity="info"
          message="Please log in to create a tournament."
        />
      )}
    </Container>
  );
};

export default Form;

//move validators etc into helpers
//add date created - sort list of tournaments by date created
//find a way to naviagate to the tournament just successfully created.

//setup responsive font sizes (google responsive font sizes material ui)
