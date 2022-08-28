import { createModel } from "@rematch/core";
import axios, { AxiosError } from "axios";
import { api } from "../../store/instance";
import { RootModel } from "../../store/models";

type StateType = {
  status: "idle" | "verifyingPayment" | "success" | "error";
  data: null;
};

const initState: StateType = {
  status: "idle",
  data: null,
};

export const initialize = createModel<RootModel>()({
  state: initState,
  reducers: {
    reset() {
      return initState;
    },
    verifyPendingPayments(state) {
      return { ...state, status: "verifyingPayment" };
    },
    verifyPendingPaymentsComplete(state) {
      return { ...state, status: "success" };
    },
    initError(state) {
      return { ...state, status: "error" };
    },
  },
  effects: (dispatch) => ({
    async getVerifyPayment() {
      const {
        verifyPendingPayments,
        initError,
        verifyPendingPaymentsComplete,
      } = dispatch.initialize;
      verifyPendingPayments();
      try {
        await api.get("/Wallet/VerifyPendingTransactions");
        verifyPendingPaymentsComplete();
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const serverError = e as AxiosError<string>;
          if (serverError) {
            initError();
          }
        }
      }
    },
  }),
});
