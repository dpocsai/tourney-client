const getWinner = (teamA, teamB, scores) => {
  if (+scores[0] > +scores[1]) {
    return teamA.name;
  }
  if (+scores[1] > +scores[0]) {
    return teamB.name;
  }
  return null;
};

const getLoser = (match) => {
  if (+match.teamA.score < +match.teamB.score) {
    return match.teamA.name;
  }
  if (+match.teamB.score < +match.teamA.score) {
    return match.teamB.name;
  }

  return null;
};

const getRank = (name, participants) => {
  let participant = participants.find(
    (participant) => participant.name === name
  );

  return participant.rank;
};

const getPrevMatch = (prevMatchId, matches) => {
  return prevMatchId
    ? matches.find((match) => match.matchId === prevMatchId)
    : null;
};

const resetMatch = (match) => {
  return {
    ...match,
    teamA: { ...match.teamA, score: 0 },
    teamB: { ...match.teamB, score: 0 },
    completed: false,
    winner: null,
  };
};

const setNextParticipant = (participant, prevMatch, match, participants) => {
  let nextParticipant = match.thirdPlaceMatch
    ? getLoser(prevMatch)
    : prevMatch.winner;

  return {
    ...match,
    [participant]: {
      ...match[participant],
      name: nextParticipant,
      rank: getRank(nextParticipant, participants),
      score: match[participant].score,
    },
  };
};
const resetParticipant = (participant, match) => {
  return {
    ...match,
    [participant]: { ...match[participant], name: null, rank: null, score: 0 },
    completed: false,
    winner: null,
  };
};

const updateMatch = (match, scores) => {
  return {
    ...match,
    teamA: { ...match.teamA, score: scores[0] },
    teamB: { ...match.teamB, score: scores[1] },
    completed: true,
    winner: getWinner(match.teamA, match.teamB, scores),
  };
};

const updateMatches = (matches, match, scores, reset, participants) => {
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].matchId === match.matchId) {
      matches[i] = reset ? resetMatch(match) : updateMatch(match, scores);
    }

    let prevMatchA = getPrevMatch(matches[i].teamA.prevMatchId, matches);
    let prevMatchB = getPrevMatch(matches[i].teamB.prevMatchId, matches);

    if (!prevMatchA || !prevMatchB) {
      continue;
    }

    if (prevMatchA.completed || prevMatchB.completed) {
      if (
        prevMatchA.winner !== matches[i].teamA.name ||
        prevMatchB.winner !== matches[i].teamB.name
      ) {
        matches[i] = matches[i].thirdPlaceMatch
          ? { ...matches[i] }
          : resetMatch(matches[i]);
      }

      if (prevMatchA.completed) {
        matches[i] = setNextParticipant(
          "teamA",
          prevMatchA,
          matches[i],
          participants
        );
      }
      if (prevMatchB.completed) {
        matches[i] = setNextParticipant(
          "teamB",
          prevMatchB,
          matches[i],
          participants
        );
      }
    }

    if (!prevMatchA.completed) {
      matches[i] = resetParticipant("teamA", matches[i]);
    }
    if (!prevMatchB.completed) {
      matches[i] = resetParticipant("teamB", matches[i]);
    }
  }

  return matches;
};

export default updateMatches;
