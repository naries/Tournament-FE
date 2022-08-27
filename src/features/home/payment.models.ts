import { createModel } from "@rematch/core";
import { AxiosError } from "axios";
import { api } from "../../store/instance";
import { RootModel } from "../../store/models";

type generatedLinkType = {
  authorization_url: string;
  access_code: string;
  reference: string;
};

type StateType = {
  status:
    | "idle"
    | "generating_link"
    | "generate_link_success"
    | "generate_link_error";
  data: {
    generatedLink: generatedLinkType | null;
  };
};

const initState: StateType = {
  status: "idle",
  data: {
    generatedLink: null,
  },
};

export const payment = createModel<RootModel>()({
  state: initState,
  reducers: {
    reset() {
      return initState;
    },
    getLinkLoading(state) {
      return { ...state, status: "generating_link" };
    },
    getLinkSuccess(state, payload) {
      return {
        ...state,
        status: "generate_link_success",
        data: { ...state.data, generatedLink: payload?.data },
      };
    },
    getLinkError(state, payload) {
      return { ...state, status: "generate_link_error", payload };
    },
  },
  effects: (dispatch) => ({
    async getLink(amount) {
      const { getLinkLoading, getLinkError, getLinkSuccess } = dispatch.payment;
      getLinkLoading();
      try {
        const response = await api.get(`/wallet?amount=${amount}`);
        getLinkSuccess(response?.data);
      } catch (e) {
        const serverError = e as AxiosError<string>;
        if (serverError) {
          getLinkError(serverError);
        }
      }
    },
  }),
});
