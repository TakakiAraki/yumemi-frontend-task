import * as React from "react";
import { PrefecturesAPIResult } from "~/usecases/prefectures/interfaces";
import { UsecaseDemographicsResult } from "~/usecases/demographics/interface";
import { LineChartContextProvider } from "~/components/common/graph/LineChart/state/machine";
import { BaseLineLayout } from "~/components/common/graph/LineChart/layouts/BaseLineLayout";
import { Text } from "~/components/common/text/Text";

// SSR Fetch
export interface IndexProps {
  prefectures: PrefecturesAPIResult;
  demographics: UsecaseDemographicsResult;
}

export const IndexPage = (props: IndexProps) => {
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
    description: "hogehoge",
    selectedLabels: ["2", "3", "4"],
  };

  const meta = {
    data,
    labels,
    labelOrder: [],
  };

  return (
    <div>
      <div>
        <Text type="heading-1">ダッシュボード</Text>
        <div>
          <Text type="heading-2">人口マップ</Text>
          <div style={{ display: "flex" }}>
            {[0, 1, 2].map((val) => (
              <LineChartContextProvider
                key={val}
                context={{
                  id: Math.random().toString(),
                  meta: {
                    ...meta,
                  },
                  ...values,
                }}
              >
                <BaseLineLayout />
              </LineChartContextProvider>
            ))}
          </div>
        </div>
        <div>
          <Text type="heading-2">ローカルマップ</Text>
          <div style={{ display: "flex" }}>
            <LineChartContextProvider
              context={{
                id: Math.random().toString(),
                meta: {
                  ...meta,
                },
                ...values,
              }}
            >
              <BaseLineLayout />
            </LineChartContextProvider>
            <LineChartContextProvider
              context={{
                id: Math.random().toString(),
                meta: {
                  ...meta,
                },
                ...values,
              }}
            >
              <BaseLineLayout />
            </LineChartContextProvider>
            <LineChartContextProvider
              context={{
                id: Math.random().toString(),
                meta: {
                  ...meta,
                },
                ...values,
              }}
            >
              <BaseLineLayout />
            </LineChartContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
