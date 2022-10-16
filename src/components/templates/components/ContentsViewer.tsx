import React, { useMemo } from "react";
import { BaseLineList } from "~/components/graphRecord/layout/BaseChartList";
import styles from "./ContentsViewer.module.scss";
import { FC } from "react";
import { Chart2DMetaData } from "~/components/common/graph/LineChart/intarface";
import { is } from "~/utils/Is";
import { IndexProps } from "..";
import { useApplicationSelector } from "~/stores/applicatrion/store";

const validatinGraphTypes = (key: string, graphType: IndexProps): Chart2DMetaData => {
  if (key === "demographics") {
    const target = graphType[key];
    if (is.null(target)) throw new Error(`グラフのメタデータが設定されていません ${target}`);
    return target;
  }
  throw new Error(`グラフタイプが存在しません ${key}`);
};

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
