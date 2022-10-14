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
  id: string;
  title?: string;
  description?: string;
  selectedLabels?: string[];
  meta: {
    data: Data[];
    labels?: { [key: string]: string };
    labelOrder?: string[];
  };
}

export type Chart2DAction<Payload extends { type: string }> = {
  action: (context: Chart2DState, payload: Payload) => void;
  create: (payload: Payload) => Payload;
};

export type Chart2DGrads = (context: Chart2DState) => boolean;
