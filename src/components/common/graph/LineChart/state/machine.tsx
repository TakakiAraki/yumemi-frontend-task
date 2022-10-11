import React, { createContext, FC, useContext, useEffect } from "react";
import { useActor, useInterpret } from "@xstate/react";
import machine from "./machine.json";
import { createMachine, InterpreterFrom } from "xstate";
import { is } from "~/utils/Is";
import { Chart2DState, LineChartContextProviderProps } from "../intarface";
import isValid from "./grads/isValid";
import edit from "./actions/edit";
import cancel from "./actions/cancel";
import save from "./actions/save";

// ref https://stately.ai/registry/editor/share/9e6176b4-73b8-4ab1-8f92-b74a0dcdb5a7
const context: Chart2DState = {
  data: [],
};

const lineChartMachine = createMachine({
  ...machine,
  context,
});

export const LineChartContext = createContext<{
  lineChart?: InterpreterFrom<typeof lineChartMachine>;
}>({});

export const useLineChartContext = () => {
  const service = useContext(LineChartContext);
  if (is.null(service.lineChart)) throw new Error("");
  const [state, send] = useActor(service.lineChart);
  return {
    state,
    send,
  };
};

export const LineChartContextProvider: FC<LineChartContextProviderProps> = (props) => {
  const lineChart = useInterpret(lineChartMachine, {
    guards: { isValid },
    actions: { edit, cancel, save },
    context: props.context,
  });

  return (
    <LineChartContext.Provider value={{ lineChart }}>{props.children}</LineChartContext.Provider>
  );
};
