import { useCallback } from "react";
import { useLineChartContext } from "../states/machine";

export default () => {
  const lineChartState = useLineChartContext();

  return useCallback(() => {
    // TODO: 内部実装
    lineChartState.send("cancel");
  }, [lineChartState]);
};
