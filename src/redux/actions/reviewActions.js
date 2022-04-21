import axios from "axios";
import {
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_RESET,
  LIKE_REVIEW_REQUEST,
  LIKE_REVIEW_SUCCESS,
  LIKE_REVIEW_FAIL,
} from "../constants/reviewConstants";
import { logoutUser } from "./authActions";
import {
  connectionError,
  connectionErrorMessage,
  jwtErrors,
} from "./errors.global";

// Action to add a review
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

    setTimeout(() => dispatch({ type: ADD_REVIEW_RESET }), 5000);
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
      type: ADD_REVIEW_FAIL,
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

// Action to fetch all reviews from  DB(Admin Only)
export const fetchReviews =
  (pageNumber = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: GET_REVIEWS_RESET });
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

      const { data } = await axios.get(
        `/api/v1/reviews?pageNumber=${pageNumber}`,
        config
      );

      dispatch({
        type: GET_REVIEWS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // debugger;
      if (
        error &&
        error.response &&
        error.response.data.message &&
        error.response.data.message === jwtErrors
      ) {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_REVIEWS_FAIL,
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

// Action to remove a review(Admin Only)
export const removeReview = (reviewId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const {
      userLogin: { userDetails },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userDetails.token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/reviews/${reviewId}`, config);

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.message,
    });

    dispatch({ type: DELETE_REVIEW_RESET });
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
      type: DELETE_REVIEW_FAIL,
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

export const reviewLike = (reviewId) => async (dispatch, getState) => {
  try {
    dispatch({ type: LIKE_REVIEW_REQUEST });

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
      `/api/v1/reviews/${reviewId}/like`,
      config
    );
    // debugger;

    dispatch({
      type: LIKE_REVIEW_SUCCESS,
      payload: data.liked,
      reviewId: data.reviewId,
    });
  } catch (error) {
    // debugger;
    if (
      error &&
      error.response &&
      error.response.data.message &&
      error.response.data.message === jwtErrors
    ) {
      dispatch(logoutUser());
    }
    dispatch({
      type: LIKE_REVIEW_FAIL,
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
