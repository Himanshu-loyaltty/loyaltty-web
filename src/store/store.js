import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./orebiSlice";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import retailerService from "./services/retailerService";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const Store = configureStore({
  reducer: {
    [retailerService.reducerPath]: retailerService.reducer,
    authReducer: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([retailerService.middleware]),
});

export default Store;

export let persistor = persistStore(Store);
