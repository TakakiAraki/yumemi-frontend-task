import { ReactNode } from "react";

export interface LineChartContextProviderProps {
  children: ReactNode | ReactNode[];
  context?: Chart2DState;
}

export interface Data {
  label: string | number;
  values: { [key: string | number]: number };
}

export interface Chart2DState {
  data: Data[];
  title?: string;
  labels?: { [key: string | number]: string };
  selectedLabels?: string[];
  labelOrder?: string[];
}

export type Chart2DAction<Payload extends { type: string }> = {
  action: (context: Chart2DState, payload: Payload) => void;
  create: (payload: Payload) => Payload;
};

export type Chart2DGrads = (context: Chart2DState) => boolean;
