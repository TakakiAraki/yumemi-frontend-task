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
    context.meta.labelOrder = context.meta.labelOrder?.sort((a, b) =>
      Number(a) > Number(b) ? 1 : -1,
    );
    return;
  }

  context.meta.labelOrder = [
    ...(context.meta.labelOrder || [])
      .filter((val) => context.selectedLabels?.includes(val))
      .sort((a, b) => (Number(a) > Number(b) ? 1 : -1)),
    ...(context.meta.labelOrder || [])
      .filter((val) => !context.selectedLabels?.includes(val))
      .sort((a, b) => (Number(a) > Number(b) ? 1 : -1)),
  ];
  return;
});
