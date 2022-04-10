import axios from "axios";
import {
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
} from "../constants/reviewConstants";
import { logoutUser } from "./authActions";
import { globalError } from "./errors.global";

export const createReview = (review) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_REVIEW_REQUEST });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.post("/api/v1/reviews", { review }, config);
    // debugger;

    dispatch({
      type: ADD_REVIEW_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    if (error.response.data.message === "jwt expired") {
      dispatch(logoutUser());
    }
    dispatch({
      type: ADD_REVIEW_FAIL,
      payload:
        error.response.data.message === globalError
          ? "Ooops, something went wrong :("
          : error.response.data.message,
    });
  }
};

export const fetchReviews = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.get("/api/v1/reviews", config);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response.data.message === "jwt expired") {
      dispatch(logoutUser());
    }
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload:
        error.response.data.message === globalError
          ? "Ooops, something went wrong :("
          : error.response.data.message,
    });
  }
};