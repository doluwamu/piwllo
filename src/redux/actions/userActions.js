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
import {
  connectionError,
  connectionErrorMessage,
  serverErrors,
  jwtErrors,
} from "./errors.global";
import {
  piwlloUserGetAndDeleteInstance,
  piwlloUserPostAndPutInstance,
} from "./index";

export const fetchUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_PROFILE_REQUEST,
    });

    const { data } = await piwlloUserGetAndDeleteInstance.get(
      "/api/v1/users/user/profile"
    );

    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (
      (error &&
        error.response &&
        error.response.data.message &&
        error.response.data.message === jwtErrors) ||
      error.response === 500 ||
      error.response.status === 500
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

export const editUserProfile = (userProfile) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

    const { data } = await piwlloUserPostAndPutInstance.put(
      "/api/v1/users/user/profile/edit",
      userProfile
    );

    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
    });

    localStorage.setItem("userDetails", JSON.stringify(data));

    // dispatch(loginUser(email, password))
  } catch (error) {
    if (
      (error &&
        error.response &&
        error.response.data.message &&
        error.response.data.message === jwtErrors) ||
      error.response === 500 ||
      error.response.status === 500
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
  async (dispatch) => {
    try {
      dispatch({ type: GET_USERS_REQUEST });

      const { data } = await piwlloUserGetAndDeleteInstance.get(
        `/api/v1/users?pageNumber=${pageNumber}`
      );

      dispatch({
        type: GET_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (
        (error &&
          error.response &&
          error.response.data.message &&
          error.response.data.message === jwtErrors) ||
        error.response === 500 ||
        error.response.status === 500
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

export const removeUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const { data } = await piwlloUserGetAndDeleteInstance.delete(
      `/api/v1/users/user/${userId}/delete`
    );

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    if (
      (error &&
        error.response &&
        error.response.data.message &&
        error.response.data.message === jwtErrors) ||
      error.response === 500 ||
      error.response.status === 500
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
