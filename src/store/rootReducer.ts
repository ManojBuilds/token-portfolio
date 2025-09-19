import { combineReducers } from '@reduxjs/toolkit';
import watchlistReducer from './slices/watchlistSlice';

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;