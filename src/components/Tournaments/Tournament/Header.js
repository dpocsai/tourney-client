import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Badge,
  LinearProgress,
  Tooltip,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { Edit, Person, Share, ContentCopy } from "@mui/icons-material";
import ClipboardJS from "clipboard";

import { updateTournament } from "../../../actions/tournaments";
import calculateTournamentProgress from "../../../helpers/calculateTournamentProgress";
import getFormattedDateString from "../../../helpers/getDateString";

const Header = ({ tournament }) => {
  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.auth.userId);
  const adminId = tournament.adminId;

  const [shareOpen, setShareOpen] = useState(false);
  const [copyAlertOpen, setCopyAlertOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [titleEditOpen, setTitleEditOpen] = useState(false);
  const [title, setTitle] = useState(tournament.title);
  const [prevTitle, setPrevTitle] = useState(tournament.title);

  const handleSubmit = () => {
    if (title !== "") {
      setTitle(title);
      setPrevTitle(title);
      dispatch(
        updateTournament(tournament._id, {
          ...tournament,
          title,
        })
      );
      setTitleEditOpen(false);
    }
  };

  new ClipboardJS(".copyURL");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",

          flexWrap: "wrap",
          alignItems: "center",
          width: { xs: "90%", md: "50%" },
          margin: "auto",
        }}
      >
        <Badge badgeContent={tournament.participants.length}>
          <Person sx={{ fontSize: "20px" }} />
        </Badge>
        <Typography
          variant="overline"
          sx={{
            fontSize: "14px",
            letterSpacing: "3px",
          }}
        >
          {tournament.title}
          {currentUserId === adminId ? (
            <Tooltip title="Edit Title">
              <Edit
                sx={{ cursor: "pointer", fontSize: "20px", marginLeft: "5px" }}
                onClick={() => setTitleEditOpen(true)}
              />
            </Tooltip>
          ) : null}
        </Typography>

        <Share
          sx={{ cursor: "pointer" }}
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setShareOpen(true);
          }}
        />

        <Menu
          disableAutoFocusItem
          open={shareOpen}
          onClose={() => {
            setAnchorEl(null);
            setShareOpen(false);
          }}
          anchorEl={anchorEl}
        >
          <MenuItem>
            <EmailShareButton
              subject="Tourney"
              body="Check out my Tourney!"
              url={window.location.href}
            >
              <EmailIcon
                size="30"
                round
                bgStyle={{ fill: "rgb(48,138,179)" }}
              />
            </EmailShareButton>
          </MenuItem>
          <MenuItem>
            <WhatsappShareButton
              title="Check out my Tourney!"
              url={window.location.href}
            >
              <WhatsappIcon size="30" round />
            </WhatsappShareButton>
          </MenuItem>
          <MenuItem>
            <FacebookShareButton
              quote="Check out my Tourney!"
              url={window.location.href}
            >
              <FacebookIcon size="30" round />
            </FacebookShareButton>
          </MenuItem>
          <MenuItem
            className="copyURL"
            onClick={() => {
              setShareOpen(false);
              setCopyAlertOpen(true);
            }}
            data-clipboard-action="cut"
            data-clipboard-text={window.location.href}
          >
            <ContentCopy
              sx={{
                fontSize: "20px",
                margin: "auto",
              }}
            />
          </MenuItem>
        </Menu>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={copyAlertOpen}
          autoHideDuration={800}
          onClose={() => setCopyAlertOpen(false)}
          message="URL copied"
        />
      </Box>
      <Dialog
        sx={{ width: "100%", margin: "auto" }}
        open={titleEditOpen}
        onClose={() => {
          setTitleEditOpen(false);
          setTitle(prevTitle);
        }}
      >
        <DialogContent>
          <DialogContentText>
            <Typography variant="overline">Please enter a new title</Typography>
          </DialogContentText>
          <TextField
            autoFocus
            type="text"
            variant="standard"
            inputProps={{ maxLength: 20 }}
            sx={{ marginBottom: "5%" }}
            name="title"
            required
            label={<Typography variant="overline">Title</Typography>}
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value.replace(/ +/g, " ").replace(/^ /, ""));
            }}
            error={title === ""}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setTitleEditOpen(false);
              setTitle(prevTitle);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        spacing={0}
        justifyContent="space-evenly"
        sx={{
          backgroundColor: "background.paper",
          textAlign: "center",
          width: { xs: "90%", md: "60%", lg: "40%" },
          margin: "5% auto",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="overline"
            sx={{
              fontSize: "10px",
            }}
          >
            {tournament.sport}
          </Typography>

          <Typography
            variant="overline"
            sx={{
              fontSize: "10px",
            }}
          >
            {tournament.type}
          </Typography>

          <Typography variant="overline" sx={{ fontSize: "10px" }}>
            {getFormattedDateString(tournament.dateCreated)}
          </Typography>
        </Grid>

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
          <Box sx={{ width: "80%", margin: "auto" }}>
            <LinearProgress
              variant="determinate"
              value={calculateTournamentProgress(tournament.matches)}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography
              variant="body2"
              color="overline"
            >{`${calculateTournamentProgress(
              tournament.matches
            )}%`}</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
