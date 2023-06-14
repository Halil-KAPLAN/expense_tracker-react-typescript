import { useDispatch, useSelector } from "react-redux";

import { logout } from "../store/actions/userActions";
import { UserDispatch } from "../types/user";
import { useEffect } from "react";
import { AppState } from "../store";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const dispatch: UserDispatch = useDispatch();
  const { data } = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!data.username) {
    navigate("/login");
  }

  return <div>Logging out...</div>;
};
