import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import commonStore from "shared/store";
import { reducers } from "modules";

export const store = configureStore({
  reducer: combineReducers({ ...reducers, common: commonStore.reducer }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
