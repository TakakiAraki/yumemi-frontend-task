import { useMemo } from "react";
import { useLineChartContext } from "../state/machine";

export default () => {
  const {
    state: { context },
  } = useLineChartContext();

  const lineProps = useMemo(() => {
    return Object.keys(context.data[0].values).map((val) => ({
      key: val,
      dayaKey: `values.${val}`,
      color: "#8884d8",
    }));
  }, [context.data]);

  return {
    data: context.data,
    lineProps: lineProps,
    labels: context.labels,
  };
};
