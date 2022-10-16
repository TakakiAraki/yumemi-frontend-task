import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GraphGroup } from "~/components/common/graph/LineChart/intarface";

export interface UserDataState {
  resource: GraphGroup[];
}

const initialState: UserDataState = {
  resource: [
    {
      id: "hogehoge1",
      title: "人口マップ",
      userDataIdList: ["hogehoge", "2hogehoge", "3hogehoge"],
    },
    {
      id: "hogehoge3",
      title: "人口マップ2",
      userDataIdList: ["4hogehoge", "2hogehoge"],
    },
    {
      id: "hogehoge2",
      title: "人口マップ3",
      userDataIdList: ["hogehoge"],
    },
  ],
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<GraphGroup[]>) => {
      return {
        ...state,
        group: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
