import { useSelector } from "@xstate/react";
import { useLineChartService } from "../state/machine";

export default () => {
  const service = useLineChartService();
  return useSelector(service, ({ context }) => {
    return context.title;
  });
};
