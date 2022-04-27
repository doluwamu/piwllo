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
import {
  GET_USER_TASKS_RESET,
  GET_ALL_TASKS_RESET,
  GET_TASK_BY_ID_RESET,
  UPDATE_TASK_RESET,
  DELETE_TASK_RESET,
  ADD_TASK_RESET,
  GET_TASK_BY_RANK_RESET,
} from "../constants/taskConstants";
import {
  GET_USER_PROFILE_RESET,
  GET_USERS_RESET,
  UPDATE_USER_PROFILE_RESET,
  DELETE_USER_RESET,
} from "../constants/userConstants";
import {
  ADD_REVIEW_RESET,
  GET_REVIEWS_RESET,
  DELETE_REVIEW_RESET,
  LIKE_REVIEW_RESET,
} from "../constants/reviewConstants";
import {
  connectionError,
  connectionErrorMessage,
  serverErrors,
} from "./errors.global";

const piwlloInstance = axios.create({
  baseURL: "https://piwllo-server.herokuapp.com/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser =
  (name, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTERATION_REQUEST,
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await piwlloInstance.post("/api/v1/auth/signup", {
        name,
        email,
        password,
        confirmPassword,
      });

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
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.data.message.includes(connectionError)
            ? connectionErrorMessage
            : error.message && error.message === serverErrors
            ? connectionErrorMessage
            : error.response.data.message || error.message,
      });
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await piwlloInstance.post("/api/v1/auth/signin", {
      email,
      password,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    dispatch({ type: GET_USER_PROFILE_RESET });
    dispatch({ type: GET_USERS_RESET });
    dispatch({ type: UPDATE_USER_PROFILE_RESET });
    dispatch({ type: DELETE_USER_RESET });

    dispatch({ type: GET_TASK_BY_ID_RESET });
    dispatch({ type: GET_ALL_TASKS_RESET });
    dispatch({ type: GET_TASK_BY_RANK_RESET });
    dispatch({ type: ADD_TASK_RESET });
    dispatch({ type: DELETE_TASK_RESET });
    dispatch({ type: UPDATE_TASK_RESET });

    dispatch({ type: ADD_REVIEW_RESET });
    dispatch({ type: GET_REVIEWS_RESET });
    dispatch({ type: DELETE_REVIEW_RESET });
    dispatch({ type: LIKE_REVIEW_RESET });

    localStorage.setItem("userDetails", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message === connectionError
          ? connectionErrorMessage
          : error.response.data.message || error.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userDetails");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LOGIN_RESET });
  dispatch({ type: USER_REGISTERATION_RESET });
  dispatch({ type: GET_USER_TASKS_RESET });
};

export const emailVerify = (email) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_EMAIL_REQUEST,
    });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await piwlloInstance.post("/api/v1/auth/verify-email", {
      email,
    });

    dispatch({
      type: VERIFY_EMAIL_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: VERIFY_EMAIL_FAIL,
      payload:
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        error.response.data.message.includes(connectionError)
          ? connectionErrorMessage
          : error.message && error.message === serverErrors
          ? connectionErrorMessage
          : error.response.data.message || error.message,
    });
  }
};

export const passwordReset =
  (email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
      });

      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      const { data } = await piwlloInstance.put(
        `/api/v1/auth/password-reset/${email}`,
        { password, confirmPassword }
      );

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload:
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.data.message.includes(connectionError)
            ? connectionErrorMessage
            : error.message && error.message === serverErrors
            ? connectionErrorMessage
            : error.response.data.message || error.message,
      });
    }
  };
