import { useSelector } from "@xstate/react";
import { stringToHashColor } from "~/utils/color";
import { useLineChartService } from "../state/machine";

export default () => {
  const service = useLineChartService();
  return useSelector(service, ({ context }) => {
    const lineProps = context.userData.selectedLabels?.map((val) => {
      const color = stringToHashColor(val + "soltingiikanji" + val);
      return {
        key: val,
        dayaKey: `values.${val}`,
        color: color.toRGBString(),
      };
    });

    return {
      data: context.meta.data,
      lineProps: lineProps,
      labels: context.meta.labels || {},
    };
  });
};
