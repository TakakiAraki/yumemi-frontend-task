import { useMemo } from "react";
import { stringToHashColor } from "~/utils/color";
import { useLineChartContext } from "../state/machine";

export default () => {
  const {
    state: { context },
  } = useLineChartContext();

  const lineProps = useMemo(() => {
    return Object.keys(context.data[0].values).map((val) => {
      const color = stringToHashColor(val + "soltingiikanji" + val);

      return {
        key: val,
        dayaKey: `values.${val}`,
        color: color.toRGBString(),
      };
    });
  }, [context.data]);

  return {
    data: context.data,
    lineProps: lineProps,
    labels: context.labels || {},
  };
};
