import {
  ADD_REVIEW_FAIL,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
} from "../constants/reviewConstants";

export const addReview = (state = {}, action) => {
  switch (action.type) {
    case ADD_REVIEW_REQUEST:
      return { loading: true };
    case ADD_REVIEW_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case ADD_REVIEW_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
