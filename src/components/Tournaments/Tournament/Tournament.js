import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getTournament } from "../../../actions/tournaments";
import Header from "./Header";
import RoundRobin from "./Round Robin/RoundRobin";
import SingleElimination from "./Single Elimination/SingleElimination";
import AlertMessage from "../../AlertMessage";
import Standings from "./Round Robin/Standings";
import MiniBracket from "./Single Elimination/MiniBracket";

const Tournament = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const tournaments = useSelector((state) => state.tournaments);
  const tournament = tournaments.find((tournament) => tournament._id === id);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  useEffect(() => {
    dispatch(getTournament(id));
  }, [dispatch, id]);

  if (!tournament) {
    return <AlertMessage severity="error" message="Tournament not found!" />;
  }
  if (!isSignedIn) {
    return (
      <AlertMessage
        severity="info"
        message="Please log in to view this tournament"
      />
    );
  }
  return (
    <>
      <Header tournament={tournament} />
      {tournament.type === "round robin" ? (
        <>
          <RoundRobin tournament={tournament} />
          <Standings tournament={tournament} />
        </>
      ) : (
        <>
          <SingleElimination tournament={tournament} />
          <MiniBracket tournament={tournament} />
        </>
      )}
    </>
  );
};

export default Tournament;

//format winning % from 85 to .830
//limit round robin participants
