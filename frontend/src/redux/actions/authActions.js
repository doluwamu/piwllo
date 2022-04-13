import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTERATION_FAIL,
  USER_REGISTERATION_REQUEST,
  USER_REGISTERATION_RESET,
  USER_REGISTERATION_SUCCESS,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../constants/authConstants";
import { GET_USER_PROFILE_RESET } from "../constants/userConstants";
import { connectionError, connectionErrorMessage } from "./errors.global";

export const registerUser =
  (name, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTERATION_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/auth/signup",
        { name, email, password, confirmPassword },
        config
      );

      dispatch({
        type: USER_REGISTERATION_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_REGISTERATION_RESET,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTERATION_FAIL,
        payload:
          error.response.data.message === connectionError
            ? connectionErrorMessage
            : error.response.data.message,
      });
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/signin",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userDetails", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response.data.message === connectionError
          ? connectionErrorMessage
          : error.response.data.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userDetails");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LOGIN_RESET });
  dispatch({ type: USER_REGISTERATION_RESET });
  dispatch({ type: GET_USER_PROFILE_RESET });
};

export const emailVerify = (email) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_EMAIL_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/verify-email",
      { email },
      config
    );

    dispatch({
      type: VERIFY_EMAIL_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_FAIL,
      payload:
        error.response.data.message === connectionError
          ? connectionErrorMessage
          : error.response.data.message,
    });
  }
};

export const passwordReset =
  (email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/auth/password-reset/${email}`,
        { password, confirmPassword },
        config
      );

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload:
          error.response.data.message === connectionError
            ? connectionErrorMessage
            : error.response.data.message,
      });
    }
  };
