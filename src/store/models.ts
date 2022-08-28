import { Models } from "@rematch/core";
import { auth } from "../features/authentication/auth.model";
import { home } from "../features/home/home.models";
import { payment } from "../features/home/payment.models";
import { initialize } from '../features/initialization/init.model'
export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
  home: typeof home;
  payment: typeof payment;
  initialize: typeof initialize;
}

export const models: RootModel = { auth, home, payment, initialize };
