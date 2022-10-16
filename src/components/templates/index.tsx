import * as React from "react";
import { Prefectures } from "~/usecases/prefectures/interfaces";
import { UsecaseDemographicsSuccess } from "~/usecases/demographics/interface";
import { Text } from "~/components/common/text/Text";
import Scroll from "../common/scroll/Scrollbar";
import styles from "./index.module.scss";
import { useToggle } from "react-use";
import clsx from "clsx";
import { useMemo } from "react";
import ContentsViewer from "./components/ContentsViewer";

// TODO propsなためコンポーネント向けにしたほうが良い。
export interface IndexProps {
  prefectures: Prefectures;
  demographics: UsecaseDemographicsSuccess;
}

export const IndexPage = (props: IndexProps) => {
  const [isShowNav, _toggleNav] = useToggle(false);

  const labels = React.useMemo(() => {
    return props.prefectures.result.reduce((prev, next) => {
      return {
        [next.prefCode]: next.prefName,
        ...prev,
      };
    }, {});
  }, [props.prefectures]);

  const data = useMemo(
    () =>
      props.demographics.map((val) => ({
        label: val.date,
        values: val.values,
      })),
    [props.demographics],
  );

  // mock properties
  const region = useMemo(
    () => [
      {
        id: "hogehoge",
        title: "都会の人口推移",
        description: "都会の人口の推移を表示したマップ",
        selectedLabels: ["13", "27", "30", "40"],
      },
      {
        id: "2hogehoge",
        title: "関西圏マップ",
        description: "関西の人口の推移を表示したマップ",
        selectedLabels: ["24", "25", "26", "27", "28", "29", "30"],
      },
      {
        id: "3hogehoge",
        title: "四国マップ",
        description: "四国の人口の推移を表示したマップ",
        selectedLabels: ["36", "37", "38", "39"],
      },
    ],
    [],
  );

  const place = useMemo(
    () => [
      {
        id: "3hogehoge",
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
        title: "人口マップ",
        contents: region,
      },
      {
        title: "人口マップ2",
        contents: place,
      },
    ],
    [],
  );

  const meta = useMemo(
    () => ({
      data,
      labels,
      labelOrder: [],
    }),
    [],
  );

  return (
    <div className={styles["content-wrap"]}>
      <header className={styles["header"]}>
        <Text type="heading-1">japan doc</Text>
      </header>
      <nav
        className={clsx(styles["nav"], {
          [styles["-close"]]: !isShowNav,
          [styles["-open"]]: isShowNav,
        })}
      >
        hoge hoge hoge hoge hoge hoge hoge
      </nav>

      <article className={styles["content"]}>
        <Scroll height="100%" width="100%">
          <ContentsViewer properties={properties} meta={meta} />
        </Scroll>
      </article>
    </div>
  );
};
