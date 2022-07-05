import React, { useEffect, useRef } from "react";
import { IconButton, Avatar, Tooltip } from "@mui/material";
import { Login, Logout } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

import { signIn, signOut } from "../actions/tournaments";

const GoogleAuth = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();

  let auth = useRef(null);

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      setTimeout(() => {
        window.gapi.client
          .init({
            client_id: process.env.REACT_APP_GOOGLE_CLIENTID,
            scope: "email",
            plugin_name: "tourny",
          })
          .then(() => {
            auth.current = window.gapi.auth2.getAuthInstance();
            onAuthChange(auth.current.isSignedIn.get());
            auth.current.isSignedIn.listen(onAuthChange);
          });
      }, 1);
    });
  });

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      dispatch(signIn(auth.current.currentUser.get().getId()));
    } else {
      dispatch(signOut());
    }
  };

  const onSignInClicked = () => {
    auth.current.signIn();
  };

  const onSignOutClicked = () => {
    auth.current.signOut();
  };

  const renderAuthButton = () => {
    return (
      <Tooltip ref={auth} title={isSignedIn ? "Logout" : "Login"}>
        <IconButton onClick={isSignedIn ? onSignOutClicked : onSignInClicked}>
          <Avatar
            alt={isSignedIn ? "Logout" : "Login"}
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            {isSignedIn ? <Logout /> : <Login />}
          </Avatar>
        </IconButton>
      </Tooltip>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;
