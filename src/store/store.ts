import { configureStore } from "@reduxjs/toolkit";
import { recordsApi } from "../api/recordAPI";
import { usersApi } from "../api/usersAPI";
import { wetherApi } from "../api/wetherAPI";

export const store = configureStore({
  reducer: {
    [recordsApi.reducerPath]: recordsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [wetherApi.reducerPath]: wetherApi.reducer,
  },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(recordsApi.middleware)
    .concat(usersApi.middleware)
    .concat(wetherApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch