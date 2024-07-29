import { configureStore, combineReducers } from '@reduxjs/toolkit';
import redditReducer from './redditSlice.js';
import subRedditReducer from './subRedditSlice.js';

export default configureStore({
   reducer: combineReducers({
      reddit: redditReducer,
      subreddits: subRedditReducer,
   }),
});
