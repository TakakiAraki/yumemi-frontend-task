import React from "react";
import useSelectGraphState from "../selectors/useSelectGraphState";

export const LineDebug = () => {
  const state = useSelectGraphState();
  return <div>{JSON.stringify(state)}</div>;
};
