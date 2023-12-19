import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { aApi } from "./services/a";
import { bApi } from "./services/b";
import { setupListeners } from "@rtk-incubator/rtk-query";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [aApi.reducerPath]: aApi.reducer,
      [bApi.reducerPath]: bApi.reducer,
      c(state = { count: 0 }, action) {
        if (action.type === "INCREMENT_C") {
          return {
            // @ts-ignore
            count: state.count + 1,
          };
        }
        return state;
      },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(aApi.middleware, bApi.middleware),
    ...options,
  });

export const store = createStore();
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
