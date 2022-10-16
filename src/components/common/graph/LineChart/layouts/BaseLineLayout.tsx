import dynamic from "next/dynamic";
import React from "react";
import { Accordion } from "~/components/common/accordion/Accordion";
import { LineDescription } from "../components/LineDescription";
import { LineGraphCheckList } from "../components/LineGraphCheckList";
import { LinegraphSave } from "../components/LinegraphSave";
import { LineTitle } from "../components/LinegraphTitle";
import style from "./BaseLineLayout.module.scss";

const LineGraph = dynamic(
  () =>
    import("~/components/common/graph/LineChart/components/LineGraph").then((res) => res.LineGraph),
  { ssr: false },
);
export const BaseLineLayout = () => {
  return (
    <div className={style["baseline-layout"]}>
      <div className={style["header"]}>
        <LineTitle />
        <LinegraphSave />
      </div>
      <Accordion height={30}>
        <LineGraphCheckList />
      </Accordion>
      <div style={{ height: 300 }}>
        <LineGraph height={300} />
      </div>
      <LineDescription />
    </div>
  );
};
