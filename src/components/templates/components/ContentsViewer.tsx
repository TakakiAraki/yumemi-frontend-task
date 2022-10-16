import React from "react";
import { BaseLineList } from "~/components/graphRecord/layout/BaseChartList";
import styles from "./ContentsViewer.module.scss";
import { FC } from "react";
import { useApplicationSelector } from "~/stores/applicatrion/store";

const ContentsViewer: FC = () => {
  const dataGroup = useApplicationSelector((state) => state.dataGroup.resource);
  const isCompleted = useApplicationSelector((state) => {
    return state.graphMeta.state === "completed";
  });

  if (!isCompleted)
    return (
      <div>
        hoge
        <p>{isCompleted ? "true" : "false"}</p>
      </div>
    );
  return (
    <>
      <div className={styles["content-template"]}>
        {dataGroup.map((rows) => {
          return <BaseLineList key={rows.id} id={rows.id} />;
        })}
      </div>
    </>
  );
};

export default ContentsViewer;
