import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";

import { getTournaments } from "./actions/tournaments";
import Tournaments from "./components/Tournaments/Tournaments";
import Tournament from "./components/Tournaments/Tournament/Tournament";
import Form from "./components/Form/Form";
import Help from "./components/Help";
import NavBar from "./components/NavBar/NavBar";
import { theme } from "./helpers/theme";

const App = () => {
  const [toggleDark, setToggleDark] = useState(
    !localStorage.getItem("mode") || localStorage.getItem("mode") === "dark"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTournaments());
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={theme(toggleDark)}>
        <ConfirmProvider>
          <CssBaseline />
          <NavBar toggleDark={toggleDark} setToggleDark={setToggleDark} />
          <Routes>
            <Route exact path="/" element={<Tournaments />}></Route>
            <Route exact path="/tournaments" element={<Tournaments />}></Route>
            <Route exact path="/tournaments/new" element={<Form />}></Route>
            <Route exact path="/help" element={<Help />}></Route>
            <Route
              exact
              path="/tournaments/:id"
              element={<Tournament />}
            ></Route>
          </Routes>
        </ConfirmProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;

//FIX styling /colors for light mode especially and form
