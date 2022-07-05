const calculateTournamentProgress = (matches) => {
  let completedMatches = matches.filter((match) => match.completed).length;
  let totalMatches = matches.length;
  return Math.round((completedMatches / totalMatches) * 100);
};

export default calculateTournamentProgress;
