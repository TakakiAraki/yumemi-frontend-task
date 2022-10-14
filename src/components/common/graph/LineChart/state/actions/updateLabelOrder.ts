import { is } from "~/utils/Is";
import { Chart2DState } from "../../intarface";
import { createUpdater } from "@xstate/immer";

export default createUpdater<
  Chart2DState,
  {
    type: "updateOrder" | "xstate.init";
    input: unknown;
  }
>("updateOrder", (context: Chart2DState, _event) => {
  if (context.selectedLabels?.length === 0 || is.null(context.selectedLabels)) {
    context.labelOrder = context.labelOrder?.sort((a, b) => (Number(a) > Number(b) ? 1 : -1));
    return;
  }

  context.labelOrder = [
    ...(context.labelOrder || [])
      .filter((val) => context.selectedLabels?.includes(val))
      .sort((a, b) => (Number(a) > Number(b) ? 1 : -1)),
    ...(context.labelOrder || [])
      .filter((val) => !context.selectedLabels?.includes(val))
      .sort((a, b) => (Number(a) > Number(b) ? 1 : -1)),
  ];
  return;
});
