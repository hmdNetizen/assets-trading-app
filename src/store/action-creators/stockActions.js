import * as actionTypes from "../action-types";
import axios from "axios";

const BASE_URL =
  "https://rhubarb-crumble-16507.herokuapp.com/http://webtrader.plus";

export const getCryptoAssets = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_CRYPTO_ASSETS,
  });
};

export const getForexStocks = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_FOREX_ASSETS,
  });
};

export const getInvestorsExchange = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_IEX_ASSETS,
  });
};

export const getCommodityStocks = () => async (dispatch) => {
  try {
    const { data } = await axios(
      `https://financialmodelingprep.com/api/v3/quotes/commodity?apikey=6e39eba411ee51caced6ab2be49f987b`
    );

    dispatch({
      type: actionTypes.GET_COMMODITY_ASSETS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.STOCK_ERROR,
      payload: error.message,
    });
  }
};

export const getExchangeTradedFund = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_ETF_ASSETS,
  });
};

// export const getAllStockAssets = () => async (dispatch) => {
//   Promise.all([
//     fetch(
//       "https://financialmodelingprep.com/api/v3/quotes/crypto?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/quotes/forex?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/stock/list?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/quotes/commodity?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/etf/list?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//   ])
//     .then((response) => Promise.all(response.map((result) => result.json())))
//     .then((result) => {
//       const data = result[0].concat(
//         result[1],
//         result[2].slice(0, 100),
//         result[3],
//         result[4].slice(0, 100)
//       );

//       dispatch({
//         type: actionTypes.GET_ALL_ASSETS,
//         payload: data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: actionTypes.STOCK_ERROR,
//         payload: err.message,
//       });
//     });
// };

// export const setDefaultSelectedStock = () => async (dispatch) => {
//   const { data } = await axios.get(
//     `https://financialmodelingprep.com/api/v3/quotes/crypto?apikey=6e39eba411ee51caced6ab2be49f987b`
//   );

//   const btcData = data.filter((data) => data.symbol === "BTCUSD");

//   dispatch({
//     type: actionTypes.SET_DEFAULT_STOCK_SELECTED,
//     payload: btcData[0],
//   });
// };

// export const setCurrentSelectedStock = (stock) => (dispatch) => {
//   dispatch({
//     type: actionTypes.SET_CURRENT_STOCK_SELECTED,
//     payload: stock,
//   });
// };

export const addStockToList = (stock) => (dispatch) => {
  dispatch({
    type: actionTypes.ADD_STOCK_TO_LIST,
    payload: stock,
  });
};

export const deleteStock = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_STOCK,
    payload: id,
  });
};

// export const getAllStockAssets = () => async (dispatch) => {
//   Promise.all([
//     fetch(
//       "https://financialmodelingprep.com/api/v3/quotes/crypto?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/quotes/forex?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/stock/list?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/quotes/commodity?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//     fetch(
//       "https://financialmodelingprep.com/api/v3/etf/list?apikey=6e39eba411ee51caced6ab2be49f987b"
//     ),
//   ])
//     .then((response) => Promise.all(response.map((result) => result.json())))
//     .then((result) => {
//       const data = result[0].concat(
//         result[1],
//         result[2].slice(0, 100),
//         result[3],
//         result[4].slice(0, 100)
//       );

//       dispatch({
//         type: actionTypes.GET_ALL_ASSETS_CURRENT_PRICE,
//         payload: data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: actionTypes.STOCK_ERROR,
//         payload: err.message,
//       });
//     });
// };

export const getAllAssets = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/assets`);
    dispatch({
      type: actionTypes.GET_ALL_ASSETS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.STOCK_ERROR,
      payload: error.message,
    });
  }
};

export const getDefaultAsset = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/asset/1`);

    dispatch({
      type: actionTypes.GET_DEFAULT_ASSET,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.STOCK_ERROR,
      payload: error.message,
    });
  }
};

export const setCurrentAsset = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/asset/${id}`);

    dispatch({
      type: actionTypes.SET_CURRENT_STOCK_SELECTED,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.STOCK_ERROR,
      payload: error.message,
    });
  }
};
