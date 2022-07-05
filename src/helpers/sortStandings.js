const sortByWP = (participants) => {
  return participants.sort((a, b) => {
    return b.stats.wp - a.stats.wp;
  });
};
const sortByWins = (participants) => {
  return participants.sort(
    (a, b) => b.stats.wp - a.stats.wp || b.stats.wins - a.stats.wins
  );
};

const sortByDiff = (participants) => {
  return participants.sort((a, b) => {
    if (b.stats.wp - a.stats.wp === 0 && b.stats.wins - a.stats.wins === 0) {
      return b.stats.diff - a.stats.diff;
    }
    return 0;
  });
};

const sortByH2H = (participants, matches) => {
  let tiedParticipants = getTiedParticipants(participants);
  let sortedByH2H = tiedParticipants
    .map((group) => {
      return group.length > 1 ? sortTiedParticipants(group, matches) : group;
    })
    .flat();
  return sortedByH2H;
};

const getTiedParticipants = (participants) => {
  let tiedParticipants = [];
  for (let i = 0, k = 0; i < participants.length; i += k) {
    let tiedGroup = participants.filter((participant) => {
      return (
        participant.stats.wp === participants[i].stats.wp &&
        participant.stats.wins === participants[i].stats.wins &&
        participant.stats.diff === participants[i].stats.diff
      );
    });

    tiedParticipants.push(tiedGroup);
    k = tiedGroup.length;
  }
  return tiedParticipants;
};

const sortTiedParticipants = (tiedGroup, matches) => {
  let h2hPoints = tiedGroup.map((participant) => {
    let opponents = tiedGroup
      .filter((person) => person.name !== participant.name)
      .map((person) => person.name);

    let matchesVsOpponents = matches.filter((match) => {
      return (
        (match.teamA.name === participant.name &&
          opponents.includes(match.teamB.name)) ||
        (match.teamB.name === participant.name &&
          opponents.includes(match.teamA.name))
      );
    });

    let h2hScore = matchesVsOpponents.reduce((score, match) => {
      if (match.winner === participant.name) {
        score += 1;
        return score;
      }
      if (match.winner === null) {
        score += 0;
        return score;
      } else {
        score -= 1;
        return score;
      }
    }, 0);
    return { ...participant, h2hScore };
  });

  return h2hPoints.sort((a, b) => b.h2hScore - a.h2hScore);
};

const sortByPFandPA = (participants) => {
  return participants.sort((a, b) => {
    if (
      b.stats.wp - a.stats.wp === 0 &&
      b.stats.wins - a.stats.wins === 0 &&
      b.stats.diff - a.stats.diff === 0 &&
      a.hasOwnProperty("h2hScore") &&
      b.hasOwnProperty("h2hScore") &&
      b.h2hScore - a.h2hScore === 0
    ) {
      return (
        b.stats.pf / (b.stats.pf + b.stats.pa) -
        a.stats.pf / (a.stats.pf + a.stats.pa)
      );
    }
    return 0;
  });
};

const sortStandings = (participants, matches) => {
  let sortedByWP = sortByWP(participants);
  let sortedByWins = sortByWins(sortedByWP);
  let sortedByDiff = sortByDiff(sortedByWins);
  let sortedByH2H = sortByH2H(sortedByDiff, matches);
  let sorted = sortByPFandPA(sortedByH2H);
  return sorted;
};

export default sortStandings;

//make rank and name the same color after a matcb
