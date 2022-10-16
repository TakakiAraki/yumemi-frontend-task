import * as React from "react";
import { BaseLineList } from "~/components/graphRecord/layout/BaseLineList";
import styles from "./ContentsViewer.module.scss";
import { FC } from "react";
import { Chart2DState } from "~/components/common/graph/LineChart/intarface";

const ContentsViewer: FC<{
  properties: {
    title: string;
    contents: Omit<Chart2DState, "meta">[];
  }[];
  meta: Chart2DState["meta"];
}> = ({ properties, meta }) => {
  return (
    <>
      <div className={styles["content-template"]}>
        {properties.map((val) => {
          return (
            <BaseLineList
              key={val.title}
              title={val.title}
              itemList={val.contents.map((value) => {
                return {
                  ...value,
                  id: Math.random().toString(),
                  meta: {
                    ...meta,
                  },
                };
              })}
            />
          );
        })}
      </div>
    </>
  );
};

export default React.memo(ContentsViewer);
