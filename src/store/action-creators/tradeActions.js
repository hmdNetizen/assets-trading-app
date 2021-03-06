import * as actionTypes from "../action-types";
import axios from "axios";
import { BASE_URL_SECURED, BASE_URL } from "../action-creators";

export const getAllUserTrades = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL_SECURED}/api/v1/user/trades/all`
    );

    dispatch({
      type: actionTypes.GET_ALL_TRADES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.TRADES_ERROR,
      payload: error.message,
    });
  }
};

export const postUserTrade = (details) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(details);
  try {
    const { data } = await axios.post(
      `${BASE_URL_SECURED}/api/v1/user/trades/store`,
      body,
      config
    );
    dispatch({
      type: actionTypes.POST_TRADE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.TRADES_ERROR,
      payload: error.message,
    });
  }
};

export const getAllOpenTrades = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/user/trades/open`);

    dispatch({
      type: actionTypes.GET_ALL_OPEN_TRADES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.TRADES_ERROR,
      payload: error.message,
    });
  }
};

export const getAllClosedTrades = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/user/trades/closed`);

    dispatch({
      type: actionTypes.GET_ALL_CLOSED_TRADES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.TRADES_ERROR,
      payload: error.message,
    });
  }
};

export const getUpdatedTradesPandL = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/user/trades/update/pnl`
    );

    dispatch({
      type: actionTypes.UPDATED_TRADES_P_AND_L,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.TRADES_ERROR,
      payload: error.message,
    });
  }
};
