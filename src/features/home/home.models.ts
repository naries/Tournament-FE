import { createModel } from "@rematch/core";
import axios, { AxiosError } from "axios";
import { api } from "../../store/instance";
import { RootModel } from "../../store/models";

type StateType = {
  status: "loading" | "idle" | "success" | "error";
  data: {
    managerDetails: {
      current_event: number;
      favourite_team: number;
      id: string;
      joined_time: string;
      last_deadline_bank: number;
      last_deadline_total_transfers: number;
      last_deadline_value: number;
      name: string;
      name_change_blocked: boolean;
      player_first_name: string;
      player_last_name: string;
      player_region_id: number;
      player_region_iso_code_long: string;
      player_region_iso_code_short: string;
      player_region_name: string;
      started_event: number;
      summary_event_points: number;
      summary_event_rank: number;
      summary_overall_points: number;
      summary_overall_rank: number;
      balance: number;
    };
    walletInformation: {
      balance: number;
    };
  } | null;
};

const initState: StateType = {
  status: "idle",
  data: null,
};

export const home = createModel<RootModel>()({
  state: initState,
  reducers: {
    reset() {
      return initState;
    },
    fetchUserDetailsLoading(state) {
      return { ...state, status: "loading" };
    },
    fetchUserDetailsSuccess(state, payload) {
      return { ...state, status: "success", data: payload };
    },
    fetchUserDetailsError(state) {
      return { ...state, status: "error" };
    },
  },
  effects: (dispatch) => ({
    async getUserInformation() {
      const {
        fetchUserDetailsLoading,
        fetchUserDetailsError,
        fetchUserDetailsSuccess,
      } = dispatch.home;
      try {
        fetchUserDetailsLoading();
        const response = await api.get("/user/user");
        fetchUserDetailsSuccess(response?.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const serverError = e as AxiosError<string>;
          if (serverError) {
            fetchUserDetailsError();
          }
        }
      }
    },
  }),
});
