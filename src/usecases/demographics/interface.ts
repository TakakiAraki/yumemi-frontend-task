import { ResourceResult } from "~/interfaces/resources";
import { UsecaseResult } from "~/interfaces/usecase";

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
  // CHECK: 将来的に label が追加される可能性があるため、要チェック
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

export type DemographicsRepository = (
  props: DemographicsAPIRequestProps,
) => Promise<DemographicsAPIResult>;

export type UsecaseDemographicsSuccess = {
  date: number;
  values: {
    [x: string]: number;
  };
}[];

export type UsecaseDemographicsResult = UsecaseResult<UsecaseDemographicsSuccess>;
