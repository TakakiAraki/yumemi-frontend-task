import React, { FC, memo } from "react";
import { Chart2DState } from "~/components/common/graph/LineChart/intarface";
import { BaseLineLayout } from "~/components/common/graph/LineChart/layouts/BaseLineLayout";
import { LineChartContextProvider } from "~/components/common/graph/LineChart/state/machine";
import Scroll from "~/components/common/scroll/Scrollbar";
import { Text } from "~/components/common/text/Text";
import { useIsSP } from "~/uses/useIsSP";
import styles from "./BaseChartList.module.scss";

export interface BaseLineListProps {
  title: string;
  itemList: Chart2DState[];
}

const BaseLineListComponent: FC<BaseLineListProps> = (props) => {
  const isSp = useIsSP();
  return (
    <div className={styles["content-wrapper"]}>
      <Text type="heading-2">{props.title}</Text>
      {isSp ? <SPViewr {...props} /> : <PCViewr {...props} />}
    </div>
  );
};

const PCViewr: FC<BaseLineListProps> = (props) => {
  return (
    <div className={styles["base-pc"]}>
      {props.itemList.map((val) => {
        return (
          <LineChartContextProvider key={val.userData.id} context={val}>
            <BaseLineLayout />
          </LineChartContextProvider>
        );
      })}
    </div>
  );
};

const SPViewr: FC<BaseLineListProps> = (props) => {
  if (props.itemList.length === 1)
    return (
      <div className={styles["base-sp"]}>
        {props.itemList.map((val) => {
          return (
            <div className={styles["content"]} style={{ overflow: "hidden" }} key={val.userData.id}>
              <LineChartContextProvider context={val}>
                <BaseLineLayout />
              </LineChartContextProvider>
            </div>
          );
        })}
      </div>
    );

  return (
    <Scroll>
      <div className={styles["base-sp"]} style={{ width: `${props.itemList.length}00%` }}>
        {props.itemList.map((val) => {
          return (
            <div className={styles["content"]} style={{ overflow: "hidden" }} key={val.userData.id}>
              <LineChartContextProvider context={val}>
                <BaseLineLayout />
              </LineChartContextProvider>
            </div>
          );
        })}
      </div>
    </Scroll>
  );
};

export const BaseLineList = memo(BaseLineListComponent);