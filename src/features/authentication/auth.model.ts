import { createModel } from "@rematch/core";
import axios, { AxiosError } from "axios";
import { RootModel } from "../../store/models";
import { api } from "../../store/instance";
import { AuthModel } from "authentication-feature";

type StateType = {
  status: "loading" | "idle" | "logged-in" | "signed-up" | "error";
  data: {
    id: string;
    userName: string;
    emailAddress: string;
    token: string;
  } | null;
};

const initState: StateType = {
  status: "idle",
  data: null,
};

export const auth = createModel<RootModel>()({
  state: initState,
  reducers: {
    reset() {
      return initState;
    },
    authLoading(state) {
      return { ...state, status: "loading" };
    },
    loggedIn(state, payload) {
      return { ...state, status: "logged-in", data: payload };
    },
    signedUp(state, payload) {
      return { ...state, status: "signed-up", data: payload };
    },
    signedOut(state) {
      return { ...state, status: "idle", data: null };
    },
    error(state, payload) {
      return { ...state, status: "error", data: payload };
    },
  },
  effects: (dispatch) => ({
    async signin(payload: AuthModel) {
      const { authLoading, loggedIn, error } = dispatch.auth;
      try {
        authLoading();
        const response = await api.post("/user/authenticate", payload);
        if (response) loggedIn(response?.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const serverError = e as AxiosError<string>;
          if (serverError) {
            error(serverError);
          }
        }
      }
    },
    async signup(payload: AuthModel) {
      const { authLoading, error, signedUp } = dispatch.auth;
      try {
        authLoading();
        const response = await api.post("/user/create", payload);
        if (response) signedUp(response?.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const serverError = e as AxiosError<string>;
          if (serverError) {
            error(serverError);
          }
        }
      }
    },
  }),
});
