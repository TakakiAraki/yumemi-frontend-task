import { Chart2DState } from "../../intarface";
import { createUpdater } from "@xstate/immer";

export default {
  add: createUpdater<
    Chart2DState,
    {
      type: "addLabel" | "removeLabel";
      input: string;
    }
  >("addLabel", (context: Chart2DState, event) => {
    context.userData.selectedLabels = [...(context.userData.selectedLabels || []), event.input];
  }),
  remove: createUpdater<
    Chart2DState,
    {
      type: "removeLabel";
      input: string;
    }
  >("removeLabel", (context: Chart2DState, event) => {
    context.userData.selectedLabels = context.userData.selectedLabels?.filter(
      (val) => val !== event.input,
    );
  }),
};
