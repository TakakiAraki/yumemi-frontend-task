import * as React from "react";
import { useMachine } from "@xstate/react";
import { ExampleMachine } from "~/stores/example/Example";

// SSR Fetch
// import fetch from 'isomorphic-unfetch';

type IIndexProps = {
  name: string;
};

const index = (props: IIndexProps) => {
  /* props */
  const { name } = props;
  const [current, send] = useMachine(ExampleMachine);

  return (
    <div>
      <div>
        <h1>{name}</h1>
      </div>
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
