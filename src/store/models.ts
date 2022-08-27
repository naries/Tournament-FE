import { Models } from "@rematch/core";
import { auth } from "../features/authentication/auth.model";
import { home } from "../features/home/home.models";
import { payment } from "../features/home/payment.models";
export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
  home: typeof home;
  payment: typeof payment
}

export const models: RootModel = { auth, home, payment };
