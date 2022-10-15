import * as React from "react";
import { PrefecturesAPIResult } from "~/usecases/prefectures/interfaces";
import { UsecaseDemographicsResult } from "~/usecases/demographics/interface";
import { Text } from "~/components/common/text/Text";
import { BaseLineList } from "../graphRecord/layout/BaseLineList";
import Scroll from "../common/scroll/Scrollbar";

export interface IndexProps {
  prefectures: PrefecturesAPIResult;
  demographics: UsecaseDemographicsResult;
}

export const IndexPage = (props: IndexProps) => {
  // computed
  const result = props.demographics.state === "ERROR" ? [] : props.demographics.result;
  const labels = React.useMemo(() => {
    if (props.prefectures.state === "ERROR") return {};

    return props.prefectures.result.result.reduce((prev, next) => {
      return {
        [next.prefCode]: next.prefName,
        ...prev,
      };
    }, {});
  }, [props.prefectures]);
  const data = result.map((val) => ({
    label: val.date,
    values: val.values,
  }));

  // mock properties
  const region = [
    {
      title: "都会の人口推移",
      description: "都会の人口の推移を表示したマップ",
      selectedLabels: ["13", "27", "30", "40"],
    },
    {
      title: "関西圏マップ",
      description: "関西の人口の推移を表示したマップ",
      selectedLabels: ["24", "25", "26", "27", "28", "29", "30"],
    },
    {
      title: "四国マップ",
      description: "四国の人口の推移を表示したマップ",
      selectedLabels: ["36", "37", "38", "39"],
    },
  ];

  const place = [
    {
      title: "関西圏マップ",
      description: "関西の人口の推移を表示したマップ",
      selectedLabels: ["24", "25", "26", "27", "28", "29", "30"],
    },
  ];

  const properties = [
    {
      title: "人口マップ",
      contents: region,
    },
    {
      title: "人口マップ2",
      contents: place,
    },
  ];

  const meta = {
    data,
    labels,
    labelOrder: [],
  };

  return (
    <div>
      <Scroll height={"100vh"}>
        {properties.map((val) => {
          return (
            <div key={val.title}>
              <Text type="heading-1">{val.title}</Text>
              <div>
                <BaseLineList
                  title="都会のマップ"
                  itemList={val.contents.map((value) => {
                    return {
                      id: Math.random().toString(),
                      meta: {
                        ...meta,
                      },
                      ...value,
                    };
                  })}
                />
              </div>
            </div>
          );
        })}
      </Scroll>
    </div>
  );
};
