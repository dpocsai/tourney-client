import { Divider, Typography, Box } from "@mui/material";
const Help = () => {
  return (
    <div>
      <Divider sx={{ color: "primary.main", margin: "2% 0" }}>
        <Typography variant="overline">About</Typography>
      </Divider>
      <Box
        sx={{
          backgroundColor: "background.paper",
          width: { xs: "90%", md: "70%", lg: "60%" },
          padding: "20px",
          margin: "auto",
          textAlign: "justify",
          borderRadius: "5px",
        }}
      >
        <Typography sx={{ fontWeight: "100", fontSize: "14px" }}>
          Tourney provides a simple way to setup and execute round robin and
          single elimination style tournaments. Log in with Google to begin
          designing your tournament!
        </Typography>
      </Box>

      <Divider sx={{ color: "primary.main", margin: "2% 0" }}>
        <Typography variant="overline">Round Robin</Typography>
      </Divider>
      <Box
        sx={{
          backgroundColor: "background.paper",
          width: { xs: "90%", md: "70%", lg: "60%" },
          padding: "20px",
          margin: "auto",
          textAlign: "justify",
          borderRadius: "5px",
        }}
      >
        <ul style={{ padding: "10px" }}>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>Suitable for 2 to 10 participants</li>
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>
              Each participant plays against every other participant - the order
              of matches does not matter
            </li>
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>
              Can choose between 1 to 3 rounds via a dropdown menu. The number
              of rounds determines how many times each participant plays every
              other participant
            </li>
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>
              Includes built-in standings that update after each match is
              completed. Standings include the following stats:
            </li>
          </Typography>
          <ul style={{ padding: "10px" }}>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>GP: Games Played</li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>W-L-T: Wins-Losses-Ties</li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>%: Win Percentage - calculated as (W + T/2) / GP</li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>
                +/-: Point Differential - calculated at Points-For(PF) -
                Points-Against(PA)
              </li>
            </Typography>
          </ul>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>
              The leader of the standings at the end of the tournament is
              declared the winner
            </li>
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>
              In the event of a tie, the following tiebreaker sequence is used:
            </li>
          </Typography>
          <ol style={{ padding: "10px" }}>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>Win%</li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>Wins</li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>+/-</li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>Head-to-head record</li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>PF / PF + PA</li>
            </Typography>
          </ol>
        </ul>
      </Box>
      <Divider sx={{ color: "primary.main", margin: "2% 0" }}>
        <Typography variant="overline">Single Elimination</Typography>
      </Divider>
      <Box
        sx={{
          backgroundColor: "background.paper",
          width: { xs: "90%", md: "70%", lg: "60%" },
          padding: "20px",
          margin: "auto",
          textAlign: "justify",
          borderRadius: "5px",
        }}
      >
        <ul style={{ padding: "10px" }}>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>Suitable for 2 to 32 participants</li>
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>
              Participants are arranged in a bracket style tournament based on
              their seeding. Higher seeded players match up with lower seeded
              players
            </li>
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>
              Can randomize player seeds if needed - click the "randomize seeds"
              checkbox
            </li>
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>
              Option to include a third place match - click the "third place
              match" checkbox
            </li>
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>
              After each match, the loser is immediately eliminated, and the
              winner advances to the next round.
            </li>
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>The last participant standing wins the tournament</li>
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontSize: "14px",
              wordWrap: "break-word",
            }}
          >
            <li>This style of tournament uses a "bye" system:</li>
          </Typography>

          <ul style={{ padding: "10px" }}>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>
                A bye means a participant will advance to the next round
                automatically, without playing a match
              </li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>
                This is needed when the number of players cannot form a perfect
                bracket; i.e. 2, 4, 8, 16, or 32 participants. is formed
              </li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>
                Byes ensure that after round 1 either 2, 4, 8, 16 or 32
                participants are left, thus forming a perfect bracket for the
                remainder of the tournament
              </li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>
                If the number of participants can form a perfect bracket, no
                byes are needed
              </li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>
                Higher seeded participants will recieve precendence if a bye is
                needed.
              </li>
            </Typography>
            <Typography
              sx={{
                fontWeight: "100",
                fontSize: "14px",
                wordWrap: "break-word",
              }}
            >
              <li>
                Example: If there are 5 participants, 3 participants will get a
                bye (participants seeded 1, 2 and 3) and advance to round 2. The
                bottom 2 participants will play a match in the first round to
                determine who goes to the second round. The second round will
                then feature the following matches: 1 vs. winner of 4 and 5, and
                2 vs. 3.
              </li>
            </Typography>
          </ul>
        </ul>
      </Box>
    </div>
  );
};
export default Help;
