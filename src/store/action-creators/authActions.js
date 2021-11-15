import * as actionTypes from "../action-types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { BASE_URL_SECURED } from "../action-creators";

// "https://trade-backend-daari.ondigitalocean.app/api/registration/login"

const checkConnection = () => {
  if (navigator.onLine) {
    return true;
  } else {
    return false;
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  if (!checkConnection()) return;

  try {
    const { data } = await axios.get(`${BASE_URL_SECURED}/api/user`);
    dispatch({
      type: actionTypes.USER_LOADED,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.AUTH_ERROR,
      payload: error.message,
    });
  }
};

export const registerUser = (profile) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(profile);
  try {
    const { status } = await axios.post(
      `${BASE_URL_SECURED}/api/v1/auth/register`,
      body,
      config
    );

    if (status === 200) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAILED,
      payload: error.message,
    });
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const { data } = await axios.post(
      `${BASE_URL_SECURED}/api/v1/auth/login`,
      body,
      config
    );

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: {
        token: data.access_token,
      },
    });

    dispatch(loadUser());
    logoutOnExpiry(dispatch, data.expires_in);
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAILED,
      payload: error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT,
  });
};

const logoutOnExpiry = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer * 1000);
};

export const updateUserProfile = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    const { data } = await axios.post(
      `${BASE_URL_SECURED}/api/v1/auth/update`,
      body,
      config
    );
    dispatch({
      type: actionTypes.UPDATE_USER_PROFILE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.REQUEST_ERROR,
      payload: error.message,
    });
  }
};

export const changeUserPassword = (details) => async (dispatch) => {
  dispatch({
    type: actionTypes.API_CALL_STARTED,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);

  try {
    await axios.post(
      `${BASE_URL_SECURED}/api/v1/auth/change_pass`,
      body,
      config
    );

    dispatch({
      type: actionTypes.CHANGE_PASSWORD,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.REQUEST_ERROR,
      payload: error.message,
    });
  }
};
