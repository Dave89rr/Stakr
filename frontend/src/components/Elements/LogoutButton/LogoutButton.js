import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/session";
import { thunkLogoutWorkspace } from "../../../store/workspaces";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(thunkLogoutWorkspace());
    await dispatch(logout());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
