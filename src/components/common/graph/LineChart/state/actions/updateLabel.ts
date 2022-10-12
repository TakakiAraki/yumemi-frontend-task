import { Chart2DAction } from "../../intarface";

export default {
  action: (context, payload) => {
    switch (payload.type) {
      case "addLabel":
        context.selectedLabels = [...context.selectedLabels, payload.labelId];
        break;
      case "removeLabel":
        context.selectedLabels = context.selectedLabels.filter((val) => val !== payload.labelId);
        break;
    }
  },
  create: (payload) => payload,
} as Chart2DAction<{
  type: "addLabel" | "removeLabel";
  labelId: string;
}>;
