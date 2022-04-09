import {
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
} from "../constants/userConstants";
import { logoutUser } from "./authActions";
import axios from "axios";
import { globalError } from "./errors.global";

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
    // debugger;

    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response.data.message === "jwt expired") {
      dispatch(logoutUser());
    }
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload:
        error.response.data.message === globalError
          ? "Ooops, something went wrong :("
          : error.response.data.message,
    });
  }
};

export const editUserProfile =
  (name, email, password, confirmPassword) => async (dispatch, getState) => {
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
        { name, email, password, confirmPassword },
        config
      );
      // debugger;

      dispatch({
        type: UPDATE_USER_PROFILE_SUCCESS,
      });

      localStorage.setItem("userDetails", JSON.stringify(data));
    } catch (error) {
      if (error.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: UPDATE_USER_PROFILE_FAIL,
        payload:
          error.response.data.message === globalError
            ? "Ooops, something went wrong :("
            : error.response.data.message,
      });
    }
  };
