import * as React from "react";
import { PrefecturesAPIResult } from "~/usecases/prefectures/interfaces";
import { GetStaticProps } from "next";
import { clock } from "~/utils/clock";
import prefectures from "~/usecases/prefectures/prefectures";
import bulkCurrentDemographics from "~/usecases/demographics/bulkCurrentDemographics";
import { UsecaseDemographicsResult } from "~/usecases/demographics/interface";
import { LineChartContextProvider } from "~/components/common/graph/LineChart/state/machine";
import { mockPrefectures } from "~/resources/resas/mockPrefectures";
import { mockDemographics } from "~/resources/resas/mockDemographics";
import { BaseLineLayout } from "~/components/common/graph/LineChart/layouts/BaseLineLayout";
import { Text } from "~/components/common/text/Text";

// SSR Fetch
export interface IndexProps {
  prefectures: PrefecturesAPIResult;
  demographics: UsecaseDemographicsResult;
}

const index = (props: IndexProps) => {
  const result = props.demographics.state === "ERROR" ? [] : props.demographics.result;
  const labels = React.useMemo(() => {
    if (props.prefectures.state === "ERROR") return {};

    return props.prefectures.result.result.reduce((prev, next) => {
      return {
        [next.prefCode]: next.prefName,
        ...prev,
      };
    }, {});
  }, [props.prefectures]);

  const data = result.map((val) => ({
    label: val.date,
    values: val.values,
  }));

  const values = {
    title: "hogehoge",
    data,
    labels,
    selectedLabels: ["2", "3", "4"],
    description: "hogehoge",
  };

  return (
    <div>
      <div>
        <Text type="heading-1">ダッシュボード</Text>
        <div>
          <Text type="heading-2">人口マップ</Text>
          <div style={{ display: "flex" }}>
            <LineChartContextProvider
              context={{ ...values, title: "過疎化マップ", description: "hoge" }}
            >
              <BaseLineLayout />
            </LineChartContextProvider>
            <LineChartContextProvider
              context={{ ...values, title: "都会マップ", description: "hoge" }}
            >
              <BaseLineLayout />
            </LineChartContextProvider>
          </div>
        </div>
        <div>
          <Text type="heading-2">ローカルマップ</Text>
          <div style={{ display: "flex" }}>
            <LineChartContextProvider
              context={{ ...values, title: "過疎化マップ", description: "hoge" }}
            >
              <BaseLineLayout />
            </LineChartContextProvider>
            <LineChartContextProvider
              context={{ ...values, title: "過疎化マップ", description: "hoge" }}
            >
              <BaseLineLayout />
            </LineChartContextProvider>
            <LineChartContextProvider
              context={{ ...values, title: "過疎化マップ", description: "hoge" }}
            >
              <BaseLineLayout />
            </LineChartContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

// http://localhost:3000/api/v1/prefecture?prefCode=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47
export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const result = await prefectures({
    api: mockPrefectures,
  });
  const prefCode =
    "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47";

  const parameters = prefCode.split(",");
  const demographics = await bulkCurrentDemographics(
    parameters.map((prefCode) => ({ prefCode, cityCode: "-" })),
    {
      api: mockDemographics,
    },
  );

  return {
    props: {
      prefectures: result,
      demographics: demographics,
    },
    revalidate: clock({ days: 1 }).toSeconds(),
  };
};

export default index;
