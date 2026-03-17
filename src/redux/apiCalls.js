import { publicRequest } from "../requestMerthod";
import {
  loginStart,
  loginFailure,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(loginFailure());
    throw error;
  }
};

export const registerUser = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(registerFailure());
    throw error;
  }
};
