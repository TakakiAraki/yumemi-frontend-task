import { ResourceResult } from "interfaces/resources";

export interface Prefectures {
  message?: any;
  result: PrefecturesResult[];
}

interface PrefecturesResult {
  prefCode: number;
  prefName: string;
}

export type PrefecturesAPIRequestProps<T = unknown> = T;
export type PrefecturesAPIResult = ResourceResult<Prefectures>;

export interface Demographics {
  message?: any;
  result: Result;
}

interface DemographicsProps {
  prefCode: string;
  cityCode: string; // 「すべての市区町村」を選択する場合は「-」を送ります。
  addArea?: {
    prefCode: string;
    cityCode: string;
  }[]; // addArea=都道府県コード_市区町村コード addArea=1_01100,13_13101
}

interface Result {
  boundaryYear: number;
  data: Datum2[];
}

interface Datum2 {
  label: string;
  data: Datum[];
}

interface Datum {
  year: number;
  value: number;
  rate?: number;
}

export type DemographicsAPIRequestProps = DemographicsProps;
export type DemographicsAPIResult = ResourceResult<Demographics>;
