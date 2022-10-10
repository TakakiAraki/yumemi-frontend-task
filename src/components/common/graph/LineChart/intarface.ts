import { ReactNode } from "react";

export interface LineChartContextProviderProps {
  children: ReactNode | ReactNode[];
}

export interface Data {
  date: string | number;
  values: { [key: string | number]: number };
}

export interface Chart2DState {
  data: Data[];
  labels?: { [key: string | number]: string };
}

export type Chart2DAction = (context: Chart2DState) => void;
export type Chart2DGrads = (context: Chart2DState) => boolean;
