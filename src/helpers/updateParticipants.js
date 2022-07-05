const calcGp = (gp, editMatchStats, resetMatchStats) => {
  if (resetMatchStats) return gp - 1;
  return editMatchStats ? gp : gp + 1;
};

const calcWins = (
  wins,
  parScoreNew,
  oppScoreNew,
  parScoreOld,
  oppScoreOld,
  editMatchStats,
  resetMatchStats
) => {
  let previousWinner = parScoreOld > oppScoreOld;
  let currentWinner = parScoreNew > oppScoreNew;
  if (resetMatchStats && previousWinner) {
    return wins - 1;
  }
  if (editMatchStats && previousWinner) {
    wins -= 1;
  }
  return currentWinner ? wins + 1 : wins;
};

const calcLosses = (
  losses,
  parScoreNew,
  oppScoreNew,
  parScoreOld,
  oppScoreOld,
  editMatchStats,
  resetMatchStats
) => {
  let previousLoser = parScoreOld < oppScoreOld;
  let currentLoser = parScoreNew < oppScoreNew;
  if (resetMatchStats && previousLoser) {
    return losses - 1;
  }
  if (editMatchStats && previousLoser) {
    losses -= 1;
  }
  return currentLoser ? losses + 1 : losses;
};

const calcTies = (
  ties,
  parScoreNew,
  oppScoreNew,
  parScoreOld,
  oppScoreOld,
  editMatchStats,
  resetMatchStats
) => {
  let previousTied = parScoreOld === oppScoreOld;
  let currentTied = parScoreNew === oppScoreNew;
  if (resetMatchStats && previousTied) {
    return ties - 1;
  }
  if (editMatchStats && previousTied) {
    ties -= 1;
  }
  return currentTied ? ties + 1 : ties;
};

const calcPf = (
  pf,
  parScoreNew,
  parScoreOld,
  editMatchStats,
  resetMatchStats
) => {
  if (resetMatchStats) return pf - parScoreOld;
  return editMatchStats ? pf - parScoreOld + parScoreNew : pf + parScoreNew;
};

const calcPa = (
  pa,
  oppScoreNew,
  oppScoreOld,
  editMatchStats,
  resetMatchStats
) => {
  if (resetMatchStats) return pa - oppScoreOld;
  return editMatchStats ? pa - oppScoreOld + oppScoreNew : pa + oppScoreNew;
};

const calcDiff = (pf, pa) => {
  return pf - pa;
};

const calcWp = (wins, ties, gp) => {
  return gp === 0
    ? 0
    : Math.round(((2 * wins + ties) / (2 * gp) + Number.EPSILON) * 100) / 100;
};

const updateParticipant = (
  participant,
  parScoreNew,
  oppScoreNew,
  parScoreOld,
  oppScoreOld,
  editMatchStats,
  resetMatchStats
) => {
  let { gp, wins, losses, ties, pf, pa } = participant.stats;

  let _gp = calcGp(gp, editMatchStats, resetMatchStats);
  let _wins = calcWins(
    wins,
    parScoreNew,
    oppScoreNew,
    parScoreOld,
    oppScoreOld,
    editMatchStats,
    resetMatchStats
  );
  let _losses = calcLosses(
    losses,
    parScoreNew,
    oppScoreNew,
    parScoreOld,
    oppScoreOld,
    editMatchStats,
    resetMatchStats
  );
  let _ties = calcTies(
    ties,
    parScoreNew,
    oppScoreNew,
    parScoreOld,
    oppScoreOld,
    editMatchStats,
    resetMatchStats
  );

  let _pf = calcPf(
    pf,
    parScoreNew,
    parScoreOld,
    editMatchStats,
    resetMatchStats
  );
  let _pa = calcPa(
    pa,
    oppScoreNew,
    oppScoreOld,
    editMatchStats,
    resetMatchStats
  );
  let _diff = calcDiff(_pf, _pa);
  let _wp = calcWp(_wins, _ties, _gp);
  return {
    ...participant,
    stats: {
      gp: _gp,
      wins: _wins,
      losses: _losses,
      ties: _ties,
      pf: _pf,
      pa: _pa,
      diff: _diff,
      wp: _wp,
    },
  };
};

const updateParticipants = (
  participants,
  { teamA, teamB },
  scores,
  editMatchStats,
  resetMatchStats
) => {
  return participants.map((participant) => {
    if (participant.name !== teamA.name && participant.name !== teamB.name) {
      return participant;
    }
    let parScoreOld =
      teamA.name === participant.name ? +teamA.score : +teamB.score;
    let oppScoreOld =
      teamA.name === participant.name ? +teamB.score : +teamA.score;
    let parScoreNew = teamA.name === participant.name ? +scores[0] : +scores[1];
    let oppScoreNew = teamA.name === participant.name ? +scores[1] : +scores[0];

    return updateParticipant(
      participant,
      parScoreNew,
      oppScoreNew,
      parScoreOld,
      oppScoreOld,
      editMatchStats,
      resetMatchStats
    );
  });
};

export default updateParticipants;
