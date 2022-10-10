import * as React from "react";
import { useMachine } from "@xstate/react";
import { ExampleMachine } from "~/stores/example/Example";
import dynamic from "next/dynamic";
import { PrefecturesAPIResult } from "~/usecases/prefectures/interfaces";
import { fetchPrefectures } from "~/resources/resas/fetchPrefectures";
import { GetStaticProps } from "next";
import { clock } from "~/utils/clock";
import prefectures from "~/usecases/prefectures/prefectures";
import bulkCurrentDemographics from "~/usecases/demographics/bulkCurrentDemographics";
import { is } from "~/utils/Is";
import { UsecaseDemographicsResult } from "~/usecases/demographics/interface";

// SSR Fetch
// import fetch from 'isomorphic-unfetch';

export interface IndexProps {
  prefectures: PrefecturesAPIResult;
  demographics: UsecaseDemographicsResult;
}

const ExampleChart = dynamic(() => import("~/components/common/graph/ExampleChart"), {
  ssr: false,
});
const index = (props: IndexProps) => {
  /* props */
  const [current, send] = useMachine(ExampleMachine);
  const label =
    props.prefectures.state === "SUCCESS"
      ? props.prefectures.result.result
          .map((val) => ({ [val.prefCode]: val.prefName }))
          .reduce((prev, next) => ({ ...prev, ...next }))
      : [];
  const data = props.demographics.state === "SUCCESS" ? props.demographics.result : [];

  return (
    <div>
      {/* <p>{JSON.stringify(props)}</p> */}
      {/* 
        横軸に関しては
      */}
      <ExampleChart data={data} labels={label} />
      <button onClick={() => send("fetch")} disabled={!current.matches("initial")}>
        send fetch
      </button>
      <button onClick={() => send("fail")} disabled={!current.matches("loading")}>
        send fail
      </button>
      <button onClick={() => send("refetch")} disabled={!current.matches("failed")}>
        send refetch
      </button>
      <button onClick={() => send("success")} disabled={!current.matches("loading")}>
        send success
      </button>
      <p>{current.toStrings()}</p>
      <p>{current.context.failCount}回失敗しました</p>
    </div>
  );
};

// http://localhost:3000/api/v1/prefecture?prefCode=1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47
export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const result = await prefectures({
    api: fetchPrefectures,
  });

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
