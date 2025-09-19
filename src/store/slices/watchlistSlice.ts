import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Token } from "../../types";

interface WatchlistState {
  items: Token[];
  lastRefreshed: string | null;
}

const initialState: WatchlistState = {
  items: [],
  lastRefreshed: null,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  selectors: {
    portfolioTotal: (state) => {
      return state.items.reduce(
        (acc, curr) => acc + curr.price * curr.holdings,
        0,
      );
    },
  },
  reducers: {
    addTokenToWatchlist: (state, action: PayloadAction<Token>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (!existingItem) {
        state.items.push({
          ...action.payload,
          value: action.payload.price * action.payload.holdings,
        });
      }
    },
    removeTokenFromWatchlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleTokenInWatchlist: (state, action: PayloadAction<Token>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (existingItemIndex !== -1) {
        state.items.splice(existingItemIndex, 1);
      } else {
        state.items.push({
          ...action.payload,
          value: action.payload.price * action.payload.holdings,
        });
      }
    },
    updateHoldings: (
      state,
      action: PayloadAction<{ id: string; holdings: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.holdings = action.payload.holdings;
        item.value = item.price * item.holdings;
      }
    },
    updateTokenDetails: (
      state,
      action: PayloadAction<{
        id: string;
        price: number;
        price_change_percentage_24h: number;
        sparkline_in_7d: number[];
      }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.price = action.payload.price;
        item.price_change_percentage_24h =
          action.payload.price_change_percentage_24h;
        item.sparkline_in_7d = action.payload.sparkline_in_7d;
        item.value = item.price * item.holdings;
      }
    },
    addBulkToWatchlist: (state, action: PayloadAction<Token[]>) => {
      action.payload.forEach((newItem) => {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        if (!existingItem) {
          state.items.push({
            ...newItem,
            value: newItem.price * newItem.holdings,
          });
        }
      });
    },
    refreshPrices: (state, action: PayloadAction<Token[]>) => {
      action.payload.forEach((token) => {
        const existingToken = state.items.find((item) => item.id === token.id);
        if (existingToken) {
          existingToken.price = token.price;
          existingToken.price_change_percentage_24h =
            token.price_change_percentage_24h;
          existingToken.sparkline_in_7d = token.sparkline_in_7d;
          existingToken.value = token.price * existingToken.holdings;
        }
      });
      state.lastRefreshed = new Date().toISOString();
    },
  },
});

export const {
  addTokenToWatchlist,
  removeTokenFromWatchlist,
  toggleTokenInWatchlist,
  updateHoldings,
  updateTokenDetails,
  addBulkToWatchlist,
  refreshPrices,
} = watchlistSlice.actions;

export const { portfolioTotal } = watchlistSlice.selectors;

export default watchlistSlice.reducer;
