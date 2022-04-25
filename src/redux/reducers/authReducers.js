import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCCESS,
  USER_REGISTERATION_FAIL,
  USER_REGISTERATION_REQUEST,
  USER_REGISTERATION_RESET,
  USER_REGISTERATION_SUCCESS,
  USER_LOGOUT,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
  VERIFY_EMAIL_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
} from "../constants/authConstants";

export const userRegistration = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTERATION_REQUEST:
      return { loading: true };
    case USER_REGISTERATION_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case USER_REGISTERATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_REGISTERATION_RESET:
      return {};
    default:
      return state;
  }
};

export const userLogin = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userDetails: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGIN_RESET || USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const verifyEmail = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_EMAIL_REQUEST:
      return { loading: true };
    case VERIFY_EMAIL_SUCCESS:
      return { loading: false, message: action.payload };
    case VERIFY_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    case VERIFY_EMAIL_RESET:
      return {};
    default:
      return state;
  }
};

export const resetPassword = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload };
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
