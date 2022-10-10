import { ResourceResult } from "~/interfaces/resources";
export interface Prefectures {
  message?: any;
  result: Result[];
}

interface Result {
  prefCode: number;
  prefName: string;
}

export type PrefecturesAPIRequestProps<T = unknown> = T;
export type PrefecturesAPIResult = ResourceResult<Prefectures>;
export type PrefecturesRepository = () => Promise<PrefecturesAPIResult>;
