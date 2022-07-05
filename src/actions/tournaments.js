import * as api from "../api";

export const signIn = (userId) => {
  return { type: "SIGN_IN", payload: userId };
};

export const signOut = () => {
  return { type: "SIGN_OUT" };
};

export const getTournament = (id) => async (dispatch) => {
  try {
    const { data } = await api.getTournament(id);
    dispatch({ type: "GET_TOURNAMENT", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
export const getTournaments = () => async (dispatch) => {
  try {
    const { data } = await api.getTournaments();

    dispatch({ type: "GET_TOURNAMENTS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createTournament = (newTournament) => async (dispatch) => {
  try {
    const { data } = await api.createTournament(newTournament);

    dispatch({ type: "CREATE_TOURNAMENT", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTournament = (id) => async (dispatch) => {
  try {
    await api.deleteTournament(id);
    dispatch({ type: "DELETE_TOURNAMENT", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTournament = (id, updatedTournament) => async (dispatch) => {
  try {
    const { data } = await api.updateTournament(id, updatedTournament);
    dispatch({ type: "UPDATE_TOURNAMENT", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
