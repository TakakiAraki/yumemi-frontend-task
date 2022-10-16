import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { useSelector } from "react-redux";
import graphMetaReducer from "../graphMeta/slice";
import userDataReducer from "../userData/slice";
import dataGroup from "../dataGroup/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
  reducer: {
    graphMeta: graphMetaReducer,
    userData: userDataReducer,
    dataGroup: dataGroup,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type StoreState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useApplicationSelector = <Result extends any>(
  ...args: Parameters<typeof useSelector<StoreState, Result>>
) => useSelector(...args);
