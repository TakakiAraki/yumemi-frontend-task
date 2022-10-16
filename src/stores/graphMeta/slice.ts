import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chart2DMetaData } from "~/components/common/graph/LineChart/intarface";

export interface GraphMetaState {
  state: "init" | "completed";
  resource: { [key: string]: Chart2DMetaData };
}

const initialState: GraphMetaState = {
  state: "init",
  resource: {},
};

export const graphMetaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setMetaData: (state, action: PayloadAction<GraphMetaState["resource"]>) => {
      return {
        ...state,
        state: "completed",
        resource: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMetaData } = graphMetaSlice.actions;

export default graphMetaSlice.reducer;
