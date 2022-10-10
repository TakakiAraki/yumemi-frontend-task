import * as React from "react";
import { PrefecturesAPIResult } from "~/usecases/prefectures/interfaces";
import { GetStaticProps } from "next";
import { clock } from "~/utils/clock";
import prefectures from "~/usecases/prefectures/prefectures";
import bulkCurrentDemographics from "~/usecases/demographics/bulkCurrentDemographics";
import { is } from "~/utils/Is";
import { UsecaseDemographicsResult } from "~/usecases/demographics/interface";
import { LineChartContextProvider } from "~/components/common/graph/LineChart/state/machine";
import dynamic from "next/dynamic";

const LineGraph = dynamic(
  () =>
    import("~/components/common/graph/LineChart/components/LineGraph").then((res) => res.LineGraph),
  { ssr: false },
);

// SSR Fetch
export interface IndexProps {
  prefectures: PrefecturesAPIResult;
  demographics: UsecaseDemographicsResult;
}

const index = (props: IndexProps) => {
  const result = props.demographics.state === "ERROR" ? [] : props.demographics.result;
  const labels = React.useMemo(() => {
    if (props.prefectures.state === "ERROR") {
      return {};
    }
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

  return (
    <div>
      <LineChartContextProvider
        context={{
          data,
          labels,
        }}
      >
        <LineGraph />
      </LineChartContextProvider>
    </div>
  );
};

// http://localhost:3000/api/v1/prefecture?prefCode=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47
export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const result = await prefectures();
  const prefCode =
    "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47";
  const parameters = is.array(prefCode) ? prefCode : prefCode.split(",");
  const demographics = await bulkCurrentDemographics(
    parameters.map((prefCode) => ({ prefCode, cityCode: "-" })),
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
