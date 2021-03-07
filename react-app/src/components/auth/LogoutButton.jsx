import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import {navBarButton} from "../../assets/ComponentStyles";

const LogoutButton = ({setAuthenticated}) => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await dispatch(logout());
    setAuthenticated(false);
  };

  return <button onClick={onLogout} className={navBarButton}>Logout</button>;
};

export default LogoutButton;