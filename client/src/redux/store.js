import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middleware = [];

if (process.env.NODE_ENV !== "production") middleware.push(logger);

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export const persistor = persistStore(store);

export default store;
