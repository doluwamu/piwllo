import {
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../constants/userConstants";
import { logoutUser } from "./authActions";
import axios from "axios";
import {
  connectionError,
  connectionErrorMessage,
  serverErrors,
  jwtErrors,
} from "./errors.global";

export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_PROFILE_REQUEST,
    });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get("/api/v1/users/user/profile", config);

    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data.message &&
      error.response.data.message === jwtErrors
    ) {
      dispatch(logoutUser());
    }
    dispatch({
      type: GET_USER_PROFILE_FAIL,
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

export const editUserProfile =
  (name, email, image = "", password, confirmPassword) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

      const {
        userLogin: { userDetails },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/v1/users/user/profile/edit",
        { name, email, image: image && image, password, confirmPassword },
        config
      );

      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
      });

      localStorage.setItem("userDetails", JSON.stringify(data));

      // dispatch(loginUser(email, password))
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data.message &&
        error.response.data.message === jwtErrors
      ) {
        dispatch(logoutUser());
      }
      dispatch({
        type: UPDATE_USER_PROFILE_FAIL,
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

export const listAllUsers =
  (pageNumber = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_USERS_REQUEST });

      const {
        userLogin: { userDetails },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userDetails.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/v1/users?pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: GET_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data.message &&
        error.response.data.message === jwtErrors
      ) {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_USERS_FAIL,
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

export const removeUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/v1/users/user/${userId}/delete`,
      config
    );

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data.message &&
      error.response.data.message === jwtErrors
    ) {
      dispatch(logoutUser());
    }
    dispatch({
      type: DELETE_USER_FAIL,
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
