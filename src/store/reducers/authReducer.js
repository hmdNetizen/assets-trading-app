import * as actionTypes from "../action-types";

const initialState = {
  loading: true,
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  error: "",
  authError: null,
  isRequestLoading: false,
  requestError: null,
  successMsg: "",
};
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.API_CALL_STARTED:
      return {
        ...state,
        isRequestLoading: true,
      };
    case actionTypes.USER_LOADED:
      localStorage.setItem("isAuthenticated", true);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        authError: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        loading: false,
        isAuthenticated: true,
      };

    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: "You can login now",
      };
    case actionTypes.UPDATE_USER_PROFILE:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: "",
        authError: null,
        isRequestLoading: false,
        requestError: null,
      };

    case actionTypes.CHANGE_PASSWORD:
      return {
        ...state,
        isRequestLoading: false,
        successMsg: "Password Changed Successfully",
        requestError: null,
      };

    case actionTypes.LOGIN_FAILED:
    case actionTypes.REGISTER_FAILED:
    case actionTypes.AUTH_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        authError: "Something went wrong",
        error: "",
        token: null,
        user: null,
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: null,
        authError: null,
        error: "",
      };
    case actionTypes.REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        isRequestLoading: false,
        requestError: action.payload,
        successMsg: "",
      };
    default:
      return state;
  }
}

export const ToggleOpenReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case actionTypes.SET_OPEN:
      return {
        ...state,
        open: true,
      };

    case actionTypes.SET_CLOSE:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
};
