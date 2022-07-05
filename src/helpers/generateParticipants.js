const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateParticipants = ({ participants }, shuffleRanks) => {
  participants = participants
    .replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, "")
    .split("\n")
    .filter((participant) => participant.length > 0);

  if (shuffleRanks) {
    participants = shuffleArray(participants);
  }

  return participants.map((participant, idx) => {
    return {
      name: participant || `Player ${idx + 1}`,
      rank: idx + 1,
      stats: {
        gp: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        wp: 0,
        pf: 0,
        pa: 0,
        diff: 0,
      },
    };
  });
};
export default generateParticipants;
