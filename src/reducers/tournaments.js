const reducer = (tournaments = [], action) => {
  switch (action.type) {
    case "GET_TOURNAMENTS":
      return action.payload;

    case "GET_TOURNAMENT":
      return [...tournaments];

    case "CREATE_TOURNAMENT":
      return [...tournaments, action.payload];

    case "UPDATE_TOURNAMENT":
      return tournaments.map((tournament) =>
        tournament._id === action.payload._id ? action.payload : tournament
      );

    case "DELETE_TOURNAMENT":
      return tournaments.filter(
        (tournament) => tournament._id !== action.payload
      );

    default:
      return tournaments;
  }
};

export default reducer;
