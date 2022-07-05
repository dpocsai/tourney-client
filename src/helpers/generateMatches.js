const roundRobin = require("roundrobin");

const getRanks = (participants) => {
  return participants.reduce((ranks, participant) => {
    ranks[participant.name] = participant.rank;
    return ranks;
  }, {});
};

const generateRoundRobin = (
  numberOfParticipants,
  namesOfParticipants,
  ranksOfParticipants,
  numberOfRounds
) => {
  let roundRobinTournament = [];
  for (let rounds = 1; rounds <= numberOfRounds; rounds++) {
    roundRobinTournament.push(
      ...roundRobin(numberOfParticipants, namesOfParticipants).flat()
    );
  }
  return roundRobinTournament.map((match, idx) => {
    return {
      matchId: idx + 1,
      teamA: { name: match[0], score: 0, rank: ranksOfParticipants[match[0]] },
      teamB: { name: match[1], score: 0, rank: ranksOfParticipants[match[1]] },
      completed: false,
      winner: null,
    };
  });
};

const generateSingleElimination = (participants, thirdPlaceMatch) => {
  const getNextPowerOfTwo = (number) => {
    const POWERS_OF_TWO = [2, 4, 8, 16, 32];
    let nextPowerOfTwo = POWERS_OF_TWO.find(
      (powerOfTwo) => powerOfTwo >= number
    );
    return nextPowerOfTwo;
  };

  const getRank = (name) => {
    if (!name) {
      return null;
    }

    let participant = seedParticipants.find((p) => p.name === name);
    return participant.rank;
  };

  const getLoser = (match) => {
    if (!match.winner) {
      return null;
    }
    if (match.teamA.name === match.winner) {
      return match.teamB.name;
    }
    if (match.teamB.name === match.winner) {
      return match.teamA.name;
    }
  };

  let rounds = [];
  let baseMatches = [];
  let nextPowerOfTwo = getNextPowerOfTwo(participants.length);
  let participantsNeeded = nextPowerOfTwo - participants.length;
  if (participants.length < 4) {
    thirdPlaceMatch = false;
  }

  let seedParticipants = [...participants].sort((a, b) => a.rank - b.rank);
  for (let i = 0; i < participantsNeeded; i++) {
    seedParticipants.push({ name: null, rank: null, stats: {} });
  }

  let numberOfRounds = Math.log2(seedParticipants.length);

  let seed_rounds = [...new Array(numberOfRounds).fill().map(() => [])];

  seed_rounds[numberOfRounds] = [1, 2];

  for (let r = numberOfRounds; r > 0; r--) {
    let round = seed_rounds[r];
    let feed_round = seed_rounds[r - 1];
    for (let m = 0; m < round.length; m++) {
      let num_teams_in_round = round.length * 2;
      feed_round[m * 2] = round[m];
      feed_round[m * 2 + 1] = num_teams_in_round + 1 - round[m];
    }
  }

  for (let i = 0; i < seed_rounds[1].length; i += 2) {
    let teamA = seedParticipants[seed_rounds[1][i] - 1];
    let teamB = seedParticipants[seed_rounds[1][i + 1] - 1];
    baseMatches.push({
      teamA: { name: teamA.name, rank: teamA.rank, score: 0 },
      teamB: { name: teamB.name, rank: teamB.rank, score: 0 },
      completed: false,
      winner: null,
    });
  }

  baseMatches = baseMatches.map((match, idx) => {
    if (!match.teamA.name) {
      return {
        ...match,
        completed: true,
        winner: match.teamB.name,
        matchId: idx + 1,
        bye: true,
      };
    }
    if (!match.teamB.name) {
      return {
        ...match,
        completed: true,
        winner: match.teamA.name,
        matchId: idx + 1,
        bye: true,
      };
    }
    return { ...match, matchId: idx + 1 };
  });

  rounds.push(baseMatches);
  for (
    let i = 2,
      roundLength = baseMatches.length / 2,
      id = baseMatches.length + 1;
    i <= numberOfRounds;
    i++, id += roundLength, roundLength = roundLength / 2
  ) {
    let round = new Array(roundLength).fill(null).map((_, idx) => {
      return {
        teamA: { name: "", rank: 0, score: 0 },
        teamB: { name: "", rank: 0, score: 0 },
        completed: false,
        winner: null,
        matchId: id + idx,
      };
    });
    rounds.push(round);
  }

  rounds = rounds.map((round, roundIdx) => {
    if (roundIdx === 0) {
      return round;
    }
    let updatedRound = [];
    for (let i = 0, j = 0; i < rounds[roundIdx - 1].length; i += 2, j++) {
      let matchA = rounds[roundIdx - 1][i];
      let matchB = rounds[roundIdx - 1][i + 1];

      let winnerA = matchA.winner;
      let winnerB = matchB.winner;

      let winnerRankA = getRank(winnerA);
      let winnerRankB = getRank(winnerB);

      updatedRound.push({
        ...round[j],

        teamA: {
          ...round[j].teamA,
          name: winnerA,
          rank: winnerRankA,
          prevMatchId: matchA.matchId,
        },
        teamB: {
          ...round[j].teamB,
          name: winnerB,
          rank: winnerRankB,
          prevMatchId: matchB.matchId,
        },
      });
    }
    return updatedRound;
  });

  if (thirdPlaceMatch) {
    let matchA = rounds[rounds.length - 2][0];
    let matchB = rounds[rounds.length - 2][1];
    let loserA = getLoser(matchA);
    let loserB = getLoser(matchB);
    let loserRankA = getRank(loserA);
    let loserRankB = getRank(loserB);

    rounds.splice(rounds.length - 1, 0, [
      {
        completed: false,
        winner: null,
        matchId: rounds[rounds.length - 1][0].matchId,
        thirdPlaceMatch: true,
        teamA: {
          name: loserA,
          rank: loserRankA,
          score: 0,
          prevMatchId: matchA.matchId,
        },
        teamB: {
          name: loserB,
          rank: loserRankB,
          score: 0,
          prevMatchId: matchB.matchId,
        },
      },
    ]);
    rounds[rounds.length - 1][0].matchId++;
  }

  return rounds.flat();
};

const generateMatches = ({
  participants,
  type,
  numberOfRounds,
  thirdPlaceMatch,
}) => {
  let namesOfParticipants = participants.map((participant) => participant.name);
  let ranksOfParticipants = getRanks(participants);
  let numberOfParticipants = participants.length;

  if (type === "round robin") {
    return generateRoundRobin(
      numberOfParticipants,
      namesOfParticipants,
      ranksOfParticipants,
      numberOfRounds
    );
  }

  if (type === "single elimination") {
    return generateSingleElimination(participants, thirdPlaceMatch);
  }
};

export default generateMatches;
