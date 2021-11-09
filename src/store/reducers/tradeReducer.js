import * as actionTypes from "../action-types";

const initialState = {
    loading: true,
    userTrades: [],
    openTrades: [],
    closedTrades: [],
    updatedPandL: [],
    error: null,
};

const tradeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_TRADES:
            return {
                ...state,
                loading: false,
                userTrades: action.payload,
                error: null,
            };
        case actionTypes.GET_ALL_OPEN_TRADES:
            return {
                ...state,
                loading: false,
                openTrades: action.payload,
                error: null,
            };
        case actionTypes.GET_ALL_CLOSED_TRADES:
            return {
                ...state,
                loading: false,
                closedTrades: action.payload,
                error: null,
            };
        case actionTypes.UPDATED_TRADES_P_AND_L:
            return {
                ...state,
                loading: false,
                updatedPandL: action.payload,
                error: null,
            };
        default:
            return state;
    }
};

export default tradeReducer;
