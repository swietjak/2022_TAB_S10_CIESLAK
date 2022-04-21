import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import commonStore from "shared/store";
import { reducers } from "modules";

export const store = configureStore({
  reducer: combineReducers({ ...reducers, common: commonStore.reducer }),
  middleware: getDefaultMiddleware({
    // Turned off due to redux-persist usage
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
