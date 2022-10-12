import dynamic from "next/dynamic";
import React from "react";
import { Accordion } from "~/components/common/accordion/Accordion";
import { LineGraphCheckList } from "../components/LineGraphCheckList";
import { LineTitle } from "../components/LineTitle";

const LineGraph = dynamic(
  () =>
    import("~/components/common/graph/LineChart/components/LineGraph").then((res) => res.LineGraph),
  { ssr: false },
);
export const BaseLineLayout = () => {
  return (
    <div style={{ width: "100%", overflowY: "hidden" }}>
      <LineTitle />
      <Accordion height={45}>
        <LineGraphCheckList />
      </Accordion>
      <LineGraph />
    </div>
  );
};
