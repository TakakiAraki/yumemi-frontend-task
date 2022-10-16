import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chart2DUserData } from "~/components/common/graph/LineChart/intarface";

export interface UserDataState {
  resource: Chart2DUserData[];
}

const initialState: UserDataState = {
  resource: [
    {
      id: "hogehoge",
      type: "demographics",
      title: "都会の人口推移",
      description: "都会の人口の推移を表示したマップ",
      selectedLabels: ["13", "27", "40"],
    },
    {
      id: "2hogehoge",
      type: "demographics",
      title: "関西圏マップ",
      description: "関西の人口の推移を表示したマップ",
      selectedLabels: ["24", "25", "26", "27", "28", "29", "30"],
    },
    {
      id: "3hogehoge",
      type: "demographics",
      title: "四国マップ",
      description: "四国の人口の推移を表示したマップ",
      selectedLabels: ["36", "37", "38", "39"],
    },
    {
      id: "4hogehoge",
      type: "demographics",
      title: "関西圏マップ",
      description: "関西の人口の推移を表示したマップ",
      selectedLabels: ["24", "25", "26", "27", "28", "29", "30"],
    },
  ],
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Chart2DUserData[]>): UserDataState => {
      return {
        ...state,
        resource: action.payload,
      };
    },
    updateUserData: (state, action: PayloadAction<Chart2DUserData>): UserDataState => {
      return {
        ...state,
        resource: state.resource.map((val) => {
          if (val.id === action.payload.id) return action.payload;
          return val;
        }),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, updateUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
