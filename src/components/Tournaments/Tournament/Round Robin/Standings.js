import React, { useState } from "react";
import {
  Typography,
  Drawer,
  BottomNavigation,
  BottomNavigationAction,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { FormatListNumbered, Person } from "@mui/icons-material";

import sortStandings from "../../../../helpers/sortStandings";

const Standings = ({ tournament }) => {
  const [openStandings, setOpenStandings] = useState(false);

  const formatStandings = () => {
    let sortedStandings = sortStandings(
      tournament.participants,
      tournament.matches
    );
    return sortedStandings.map((participant) => ({
      name:
        participant.name.length > 10
          ? participant.name.slice(0, 10).concat("..")
          : participant.name,
      gp: participant.stats.gp,
      wlt: `${participant.stats.wins}-${participant.stats.losses}-${participant.stats.ties}`,
      percentage: participant.stats.wp,
      diff: participant.stats.diff,
    }));
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        margin: "auto",
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
          setOpenStandings(true);
        }}
      >
        <BottomNavigationAction
          label="View Standings"
          icon={<FormatListNumbered sx={{ color: "primary.main" }} />}
          sx={{ color: "secondary.main" }}
        />
      </BottomNavigation>
      <Drawer
        variant="temporary"
        anchor="bottom"
        open={openStandings}
        onClose={() => setOpenStandings(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", md: "60%" },
            margin: "auto",
            boxShadow: "none",
          },
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 500,

            margin: "auto",
          }}
        >
          <Table stickyHeader sx={{ minWidth: 350 }} size="small">
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "35%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "background.paper" }}
                ></TableCell>
                <TableCell sx={{ backgroundColor: "background.paper" }}>
                  <Person sx={{ fontSize: "16px" }} />
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "background.paper" }}
                  align="right"
                >
                  <Typography variant="overline" sx={{ fontSize: "10px" }}>
                    GP
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "background.paper" }}
                  align="right"
                >
                  <Typography variant="overline" sx={{ fontSize: "10px" }}>
                    W-L-T
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "background.paper" }}
                  align="right"
                >
                  <Typography variant="overline" sx={{ fontSize: "12px" }}>
                    %
                  </Typography>
                </TableCell>

                <TableCell
                  sx={{ backgroundColor: "background.paper" }}
                  align="right"
                >
                  <Typography variant="overline" sx={{ fontSize: "10px" }}>
                    +/-
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: "background.default" }}>
              {formatStandings().map((row, idx) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="overline" sx={{ fontSize: "10px" }}>
                      {idx + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="overline" sx={{ fontSize: "10px" }}>
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="overline" sx={{ fontSize: "10px" }}>
                      {row.gp}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="overline" sx={{ fontSize: "10px" }}>
                      {row.wlt}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="overline" sx={{ fontSize: "10px" }}>
                      {row.percentage}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="overline" sx={{ fontSize: "10px" }}>
                      {row.diff}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Drawer>
    </Box>
  );
};

export default Standings;
