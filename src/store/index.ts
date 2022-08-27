import {
  init,
  Plugin,
  RematchDispatch,
  RematchRootState,
} from "@rematch/core";
import createPersistPlugin from "@rematch/persist";
import { models, RootModel } from "./models";
import storage from "redux-persist/lib/storage";

const persistPlugin: Plugin<
  RootModel,
  Record<string, never>,
  Partial<Record<string, never>>
> = createPersistPlugin({
  key: "root",
  storage,
  version: 2,
  whitelist: ["auth"],
});

export const store = init({
  models,
  plugins: [persistPlugin],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
