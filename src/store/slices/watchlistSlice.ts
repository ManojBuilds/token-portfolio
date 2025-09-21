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
    removeTokenFromWatchlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
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
  removeTokenFromWatchlist,
  updateHoldings,
  addBulkToWatchlist,
  refreshPrices,
} = watchlistSlice.actions;

export const { portfolioTotal } = watchlistSlice.selectors;

export default watchlistSlice.reducer;
