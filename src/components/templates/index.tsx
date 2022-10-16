import * as React from "react";
import { Text } from "~/components/common/text/Text";
import Scroll from "../common/scroll/Scrollbar";
import styles from "./index.module.scss";
import { useMemo } from "react";
import ContentsViewer from "./components/ContentsViewer";
import { Chart2DMetaData } from "../common/graph/LineChart/intarface";

export interface IndexProps {
  demographics: Chart2DMetaData;
}

export const IndexPage = (props: IndexProps) => {
  // mock properties
  const data = useMemo(
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

  const properties = useMemo(
    () => [
      {
        id: "hogehoge2",
        title: "人口マップ",
        userDataId: ["hogehoge", "2hogehoge", "3hogehoge"],
      },
      {
        id: "hogehoge3",
        title: "人口マップ2",
        userDataId: ["4hogehoge"],
      },
    ],
    [],
  );

  return (
    <div className={styles["content-wrap"]}>
      <header className={styles["header"]}>
        <Text type="heading-1" color="reverse">
          japan doc
        </Text>
        <Text type="mini" color="reverse">
          (日本の人口統計マップ)
        </Text>
      </header>

      <article className={styles["content"]}>
        <Scroll height="100%" width="100%">
          <ContentsViewer graphRows={properties} userData={data} meta={props.demographics} />
        </Scroll>
      </article>
    </div>
  );
};
