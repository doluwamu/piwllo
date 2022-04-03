import {
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_RESET,
  GET_USER_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const getUserProfile = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return { loading: true };
    case GET_USER_PROFILE_SUCCESS:
      return { loading: false, profileInfo: action.payload };
    case GET_USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case GET_USER_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
