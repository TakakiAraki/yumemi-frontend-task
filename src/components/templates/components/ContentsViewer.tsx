import React, { useMemo } from "react";
import { BaseLineList } from "~/components/graphRecord/layout/BaseChartList";
import styles from "./ContentsViewer.module.scss";
import { FC } from "react";
import {
  Chart2DMetaData,
  Chart2DUserData,
  GraphGroup,
} from "~/components/common/graph/LineChart/intarface";
import { is } from "~/utils/Is";
import { IndexProps } from "..";

const validatinGraphTypes = (key: string, graphType: IndexProps): Chart2DMetaData => {
  if (key === "demographics") {
    const target = graphType[key];
    if (is.null(target)) throw new Error(`グラフのメタデータが設定されていません ${target}`);
    return target;
  }
  throw new Error(`グラフタイプが存在しません ${key}`);
};
const ContentsViewer: FC<{
  meta: IndexProps;
}> = ({ meta }) => {
  const data: Chart2DUserData[] = useMemo(
    () => [
      {
        id: "hogehoge",
        type: "demographics",
        title: "都会の人口推移",
        description: "都会の人口の推移を表示したマップ",
        selectedLabels: ["13", "27", "40"],
      },
      {
        id: "2hogehoge",
        type: "demographics",
        title: "関西圏マップ",
        description: "関西の人口の推移を表示したマップ",
        selectedLabels: ["24", "25", "26", "27", "28", "29", "30"],
      },
      {
        id: "3hogehoge",
        type: "demographics",
        title: "四国マップ",
        description: "四国の人口の推移を表示したマップ",
        selectedLabels: ["36", "37", "38", "39"],
      },
      {
        id: "4hogehoge",
        type: "demographics",
        title: "関西圏マップ",
        description: "関西の人口の推移を表示したマップ",
        selectedLabels: ["24", "25", "26", "27", "28", "29", "30"],
      },
    ],
    [],
  );

  const dataGroup: GraphGroup[] = useMemo(
    () => [
      {
        id: "hogehoge1",
        title: "人口マップ",
        userDataId: ["hogehoge", "2hogehoge", "3hogehoge"],
      },
      {
        id: "hogehoge3",
        title: "人口マップ2",
        userDataId: ["4hogehoge", "2hogehoge"],
      },
      {
        id: "hogehoge2",
        title: "人口マップ3",
        userDataId: ["hogehoge"],
      },
    ],
    [],
  );

  return (
    <>
      <div className={styles["content-template"]}>
        {dataGroup.map((rows) => {
          return (
            <BaseLineList
              key={rows.id}
              title={rows.title}
              itemList={rows.userDataId.map((value) => {
                const userDataItem = data.find((val) => val.id === value);
                if (userDataItem == null) throw new Error(`user data is not found id[${value}]`);
                return {
                  userData: userDataItem,
                  meta: validatinGraphTypes(userDataItem.type, meta),
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
