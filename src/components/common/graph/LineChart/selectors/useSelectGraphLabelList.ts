import { useSelector } from "@xstate/react";
import { stringToHashColor } from "~/utils/color";
import { is } from "~/utils/Is";
import { useLineChartService } from "../state/machine";

export default () => {
  const service = useLineChartService();
  return useSelector(service, ({ context }) => {
    context.meta.labels;
    return {
      selectedLabels: context.userData.selectedLabels,
      labels: (context.meta.labelOrder || []).map((val) => ({
        id: val,
        name: is.notNull(context.meta.labels) ? context.meta.labels[val] : val,
        color: stringToHashColor(val + "soltingiikanji" + val).toRGBString(),
      })),
    };
  });
};
