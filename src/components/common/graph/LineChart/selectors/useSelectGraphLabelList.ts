import { useSelector } from "@xstate/react";
import { stringToHashColor } from "~/utils/color";
import { is } from "~/utils/Is";
import { useLineChartService } from "../state/machine";

export default () => {
  const service = useLineChartService();
  return useSelector(service, ({ context }) => {
    return {
      selectedLabels: context.selectedLabels,
      labels: Object.keys(context.data[0]?.values || {}).map((val) => ({
        id: val,
        name: is.notNull(context.labels) ? context.labels[val] : val,
        color: stringToHashColor(val + "soltingiikanji" + val).toRGBString(),
      })),
    };
  });
};
