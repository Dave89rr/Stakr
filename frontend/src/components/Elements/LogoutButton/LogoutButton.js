import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../store/session";
import { actionLogoutWorkspace } from "../../../store/workspaces";

import classes from "./Logout.module.css";

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(actionLogoutWorkspace());
    await dispatch(logout());
    history.push("/");
  };

  return <div className={classes.logoutButton} onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
