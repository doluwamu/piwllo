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
  serverErrors,
} from "./errors.global";
import {
  piwlloUserGetAndDeleteInstance,
  piwlloUserPostAndPutInstance,
} from "./index";

// Action to add a review
export const createReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: ADD_REVIEW_REQUEST });

    const { data } = await piwlloUserPostAndPutInstance.post(
      "/api/v1/reviews",
      { review }
    );

    dispatch({
      type: ADD_REVIEW_SUCCESS,
      payload: data.message,
    });

    setTimeout(() => dispatch({ type: ADD_REVIEW_RESET }), 5000);
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
      type: ADD_REVIEW_FAIL,
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

// Action to fetch all reviews from  DB(Admin Only)
export const fetchReviews =
  (pageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_REVIEWS_RESET });
      dispatch({ type: GET_REVIEWS_REQUEST });

      const { data } = await piwlloUserGetAndDeleteInstance.get(
        `/api/v1/reviews?pageNumber=${pageNumber}`
      );

      dispatch({
        type: GET_REVIEWS_SUCCESS,
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
        type: GET_REVIEWS_FAIL,
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

// Action to remove a review(Admin Only)
export const removeReview = (reviewId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await piwlloUserGetAndDeleteInstance.delete(
      `/api/v1/reviews/${reviewId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.message,
    });

    dispatch({ type: DELETE_REVIEW_RESET });
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
      type: DELETE_REVIEW_FAIL,
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

export const reviewLike = (reviewId) => async (dispatch) => {
  try {
    dispatch({ type: LIKE_REVIEW_REQUEST });

    const { data } = await piwlloUserPostAndPutInstance.put(
      `/api/v1/reviews/${reviewId}/like`
    );

    dispatch({
      type: LIKE_REVIEW_SUCCESS,
      payload: data.liked,
      reviewId: data.reviewId,
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
      type: LIKE_REVIEW_FAIL,
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
