import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Thunk from "redux-thunk";
import reducers from "./reducers";
import Logger from "redux-logger"

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart", "product"],
};

const enhancers = applyMiddleware(Thunk,Logger);
const PersistReducer = persistReducer(persistConfig, reducers);
export const store = createStore(PersistReducer, enhancers);
// export const store = configureStore({
//   reducer: persistConfig,
//   middleware: enhancers,
//   PersistReducer,
// });
export const PersiStStore = persistStore(store);
