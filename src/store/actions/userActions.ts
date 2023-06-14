import { LoginForm, User, UserDispatch } from "../../types/user";
import api from "../../utils/api";

export const login =
  (creds: LoginForm) => async (dispatchEvent: UserDispatch) => {
    dispatchEvent({ type: "LOGIN_START" });
    try {
      const response = await api().post<User>("/users/login", creds);
      dispatchEvent({ type: "LOGIN_SUCCESS", payload: response.data });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      dispatchEvent({ type: "LOGIN_ERROR" });
    }
  };

export const isLoggedIn = () => async (dispatchEvent: UserDispatch) => {
  dispatchEvent({ type: "IS_LOGGED_IN_START" });
  try {
    const response = await api().post<User>("/users/is_logged_in");
    dispatchEvent({ type: "IS_LOGGED_IN_SUCCESS", payload: response.data });
  } catch (error) {
    dispatchEvent({ type: "IS_LOGGED_IN_ERROR" });
  }
};

export const logout = () => (dispatchEvent: UserDispatch) => {
  localStorage.removeItem("token");
  dispatchEvent({ type: "LOGOUT" });
};
