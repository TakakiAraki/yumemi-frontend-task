import React, { FC, memo, useCallback } from "react";
import { Chart2DState } from "~/components/common/graph/LineChart/intarface";
import { BaseLineLayout } from "~/components/common/graph/LineChart/layouts/BaseLineLayout";
import { LineChartContextProvider } from "~/components/common/graph/LineChart/state/machine";
import Scroll from "~/components/common/scroll/Scrollbar";
import { Text } from "~/components/common/text/Text";
import useChartStateGetByGroupID from "~/stores/applicatrion/selectors/useChartStateGetByGroupID";
import { useIsSP } from "~/uses/useIsSP";
import styles from "./BaseChartList.module.scss";
import { useDispatch } from "react-redux";
import { updateUserData } from "~/stores/userData/slice";
import useChartStateGetUserData from "~/stores/applicatrion/selectors/useChartStateGetUserData";

export interface BaseLineListProps {
  itemList: Chart2DState[];
  onSave: (e: Chart2DState) => void;
}

const BaseLineListComponent: FC<{ id: string }> = (props) => {
  const dispatch = useDispatch();
  const isSp = useIsSP();
  const chartData = useChartStateGetByGroupID(props.id);
  const allUserData = useChartStateGetUserData();

  const handleSave = useCallback(
    (e: Chart2DState) => {
      dispatch(updateUserData(e.userData));
      return;
    },
    [allUserData],
  );

  return (
    <div className={styles["content-wrapper"]}>
      <Text type="heading-2">{chartData.title}</Text>
      {isSp ? (
        <SPViewr {...chartData} onSave={handleSave} />
      ) : (
        <PCViewr {...chartData} onSave={handleSave} />
      )}
    </div>
  );
};

const PCViewr: FC<BaseLineListProps> = (props) => {
  return (
    <div className={styles["base-pc"]}>
      {props.itemList.map((val) => {
        return (
          <LineChartContextProvider key={val.userData.id} context={val} onSave={props.onSave}>
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
              <LineChartContextProvider context={val} onSave={props.onSave}>
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
              <LineChartContextProvider context={val} onSave={props.onSave}>
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
