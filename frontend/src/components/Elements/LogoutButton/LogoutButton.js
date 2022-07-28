import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../store/session";
import { thunkLogoutWorkspace } from "../../../store/workspaces";

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(thunkLogoutWorkspace());
    await dispatch(logout());
    history.push('/login');
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
