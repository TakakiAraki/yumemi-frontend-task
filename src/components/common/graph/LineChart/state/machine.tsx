import React, { createContext, FC, useContext } from "react";
import { useActor, useInterpret } from "@xstate/react";
import data from "./data";
import { createMachine, InterpreterFrom } from "xstate";
import { is } from "~/utils/Is";
import { Chart2DState, LineChartContextProviderProps } from "../intarface";
import isValid from "./grads/isValid";
import updateLabel from "./actions/updateLabel";
import updateLabelOrder from "./actions/updateLabelOrder";

// ref https://stately.ai/registry/editor/share/9e6176b4-73b8-4ab1-8f92-b74a0dcdb5a7
const context: Chart2DState = {
  data: [],
  title: "",
  selectedLabels: [],
  labelOrder: [],
};

const lineChartMachine = createMachine({
  ...data,
  ...{
    predictableActionArguments: true,
  },
  context,
});

export const LineChartContext = createContext<{
  lineChart?: InterpreterFrom<typeof lineChartMachine>;
}>({});

export const useLineChartService = () => {
  const service = useContext(LineChartContext).lineChart;
  if (is.null(service)) throw new Error("");
  return service;
};

export const useLineChartContext = () => {
  const service = useLineChartService();
  const [state, send] = useActor(service);
  return {
    state,
    send,
  };
};

export const LineChartContextProvider: FC<LineChartContextProviderProps> = (props) => {
  const lineChart = useInterpret(lineChartMachine, {
    guards: { isValid },
    context: {
      ...props.context,
      labelOrder: Object.keys(props.context?.labels || {}),
    },
    actions: {
      updateLabelOrder: updateLabelOrder.action,
      updateLabel: updateLabel.action,
    },
  });

  return (
    <LineChartContext.Provider value={{ lineChart }}>{props.children}</LineChartContext.Provider>
  );
};
