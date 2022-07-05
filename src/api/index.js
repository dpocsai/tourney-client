import axios from "axios";

const url = "https://dpocsai-tourney.herokuapp.com/tournaments";

export const getTournament = (id) => axios.get(`${url}/${id}`);

export const getTournaments = () => axios.get(url);

export const createTournament = (newTournament) =>
  axios.post(`${url}/new`, newTournament);

export const deleteTournament = (id) => axios.delete(`${url}/${id}`);

export const updateTournament = (id, updatedTournament) =>
  axios.patch(`${url}/${id}`, updatedTournament);
