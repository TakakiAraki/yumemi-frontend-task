import * as React from "react";
import { useMachine } from "@xstate/react";
import { ExampleMachine } from "~/stores/example/Example";
import dynamic from "next/dynamic";

// SSR Fetch
// import fetch from 'isomorphic-unfetch';

type IIndexProps = {
  name: string;
};

const ExampleChart = dynamic(() => import("~/components/common/graph/ExampleChart"), {
  ssr: false,
});
const index = (props: IIndexProps) => {
  /* props */
  const { name } = props;
  const [current, send] = useMachine(ExampleMachine);

  return (
    <div>
      <div>
        <h1>{name}</h1>
      </div>
      {/* 
        横軸に関しては
      */}
      <ExampleChart
        data={[
          {
            date: "2019",
            values: {
              静岡県: 1000,
              神奈川県: 1101,
            },
          },
          {
            date: "2020",
            values: {
              静岡県: 1000,
              神奈川県: 1101,
            },
          },
          {
            date: "2021",
            values: {
              静岡県: null,
              神奈川県: 1201,
            },
          },
          {
            date: "2022",
            values: {
              静岡県: 1200,
              神奈川県: 1501,
            },
          },
          {
            date: "2023",
            values: {
              静岡県: 1200,
              神奈川県: 1501,
            },
          },
        ]}
      />
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

// ServerSideRendering;
index.getInitialProps = () => {
  // fetch
  return { name: "hello" };
};

export default index;
