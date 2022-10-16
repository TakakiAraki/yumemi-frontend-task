import * as React from "react";
import { BaseLineList } from "~/components/graphRecord/layout/BaseLineList";
import styles from "./ContentsViewer.module.scss";
import { FC } from "react";
import { Chart2DMetaData, Chart2DUserData } from "~/components/common/graph/LineChart/intarface";

const ContentsViewer: FC<{
  graphRows: {
    id: string;
    title: string;
    userDataId: string[];
  }[];
  userData: Chart2DUserData[];
  meta: Chart2DMetaData;
}> = ({ graphRows, meta, userData }) => {
  return (
    <>
      <div className={styles["content-template"]}>
        {graphRows.map((rows) => {
          return (
            <BaseLineList
              key={rows.id}
              title={rows.title}
              itemList={rows.userDataId.map((value) => {
                const userDataItem = userData.find((val) => val.id === value);
                if (userDataItem == null) throw new Error(`user data is not found id[${value}]`);
                return {
                  userData: userDataItem,
                  meta: meta,
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
