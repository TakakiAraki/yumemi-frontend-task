import { is } from "~/utils/Is";
import { Chart2DAction } from "../../intarface";

export default {
  action: (context, payload) => {
    switch (payload.type) {
      case "updateOrder":
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
    }
  },
  create: (payload) => payload,
} as Chart2DAction<{
  type: "updateOrder";
}>;
