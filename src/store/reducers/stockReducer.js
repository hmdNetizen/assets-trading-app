import * as actionTypes from "../action-types";

const initialState = {
  loading: true,
  crypto: [],
  iex: [],
  commodities: [],
  forex: [],
  etf: [],
  defaultStockAsset: {},
  currentSelectedStock: {},
  stocksSelected: [],
  allStockAssets: [],
  error: null,
};

export default function stockReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_CRYPTO_ASSETS:
      return {
        ...state,
        loading: false,
        crypto: state.allStockAssets.filter((asset) => asset.type === "crypto"),
      };
    case actionTypes.GET_IEX_ASSETS:
      return {
        ...state,
        loading: false,
        iex: state.allStockAssets.filter((asset) => asset.type === "stocks"),
      };
    case actionTypes.GET_COMMODITY_ASSETS:
      return {
        ...state,
        loading: false,
        commodities: [],
      };
    case actionTypes.GET_FOREX_ASSETS:
      return {
        ...state,
        loading: false,
        forex: state.allStockAssets.filter((asset) => asset.type === "forex"),
      };
    case actionTypes.GET_ETF_ASSETS:
      return {
        ...state,
        loading: false,
        etf: state.allStockAssets.filter((asset) => asset.type === "indices"),
      };
    case actionTypes.GET_ALL_ASSETS:
      return {
        ...state,
        loading: false,
        allStockAssets: action.payload,
        error: null,
      };
    case actionTypes.SET_CURRENT_STOCK_SELECTED:
      return {
        ...state,
        loading: false,
        currentSelectedStock: action.payload,
      };
    case actionTypes.GET_DEFAULT_ASSET:
      return {
        ...state,
        loading: false,
        defaultStockAsset: action.payload,
        stocksSelected: [],
      };
    case actionTypes.ADD_STOCK_TO_LIST:
      return {
        ...state,
        loading: false,
        stocksSelected: [action.payload, ...state.stocksSelected],
      };
    case actionTypes.DELETE_STOCK:
      return {
        ...state,
        loading: false,
        stocksSelected: state.stocksSelected.filter(
          (stock) => stock.id !== action.payload
        ),
      };
    case actionTypes.STOCK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
