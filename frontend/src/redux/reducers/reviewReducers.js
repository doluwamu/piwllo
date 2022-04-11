import {
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_RESET,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/reviewConstants";

export const addReview = (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return { loading: true };
    case ADD_REVIEW_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case ADD_REVIEW_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ADD_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const getReviews = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return { loading: true };
    case GET_REVIEWS_SUCCESS:
      return { loading: false, reviews: action.payload };
    case GET_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteReview = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return { loading: true };
    case DELETE_REVIEW_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case DELETE_REVIEW_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
