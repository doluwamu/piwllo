import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTERATION_FAIL,
  USER_REGISTERATION_REQUEST,
  USER_REGISTERATION_RESET,
  USER_REGISTERATION_SUCCESS,
} from "../constants/authConstants";

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
      debugger;
      dispatch({
        type: USER_REGISTERATION_FAIL,
        payload: error.response.data.message,
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

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
