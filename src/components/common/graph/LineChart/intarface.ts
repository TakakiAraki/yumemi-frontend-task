import { ReactNode } from "react";

export interface LineChartContextProviderProps {
  children: ReactNode | ReactNode[];
  context?: Chart2DState;
}

export interface Data {
  label: string | number;
  values: { [key: string | number]: number };
}

export interface Chart2DMetaData {
  data: Data[];
  labels?: { [key: string]: string };
  labelOrder?: string[];
}
export interface GraphGroup {
  id: string;
  title: string;
  userDataId: string[];
}

export interface Chart2DUserData {
  id: string;
  type: string;
  title?: string;
  description?: string;
  selectedLabels?: string[];
}
export interface Chart2DState {
  userData: Chart2DUserData;
  meta: Chart2DMetaData;
}

export type Chart2DAction<Payload extends { type: string }> = {
  action: (context: Chart2DState, payload: Payload) => void;
  create: (payload: Payload) => Payload;
};

export type Chart2DGrads = (context: Chart2DState) => boolean;
