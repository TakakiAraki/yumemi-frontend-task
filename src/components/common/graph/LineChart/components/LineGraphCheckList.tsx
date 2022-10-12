import React, { useCallback } from "react";
import { Tag } from "~/components/common/tag/Tag";
import useSelectGraphLabelList from "../selectors/useSelectGraphLabelList";
import updateLabel from "../state/actions/updateLabel";
import { useLineChartContext } from "../state/machine";
import styles from "./LineGraphCheckList.module.scss";

const CheckList = (props: {
  id: string;
  color: string;
  name: string;
  disabled: boolean;
  onClickSelected: (id: string) => void;
  onClickRemove: (id: string) => void;
}) => {
  const cb = useCallback(() => {
    if (props.disabled) {
      return props.onClickSelected(props.id);
    } else {
      return props.onClickRemove(props.id);
    }
  }, [props.id, props.disabled]);
  return (
    <Tag key={props.id} color={props.color} onClick={cb} disabled={props.disabled} cursor>
      {props.name}
    </Tag>
  );
};

// chrome のタブに従って、マウスがタブ外に出るとソートを実施し、左上に詰めても良さそう。

export const LineGraphCheckList = () => {
  const labelList = useSelectGraphLabelList();
  const lineChart = useLineChartContext();

  const handleSelect = useCallback((labelId: string) => {
    lineChart.send(updateLabel.create({ type: "addLabel", labelId }));
  }, []);

  const handleRemove = useCallback((labelId: string) => {
    lineChart.send(updateLabel.create({ type: "removeLabel", labelId }));
  }, []);

  return (
    <div className={styles["linegraph-checklist"]}>
      {labelList.labels.map((value) => (
        <CheckList
          key={value.id}
          {...value}
          onClickSelected={handleSelect}
          onClickRemove={handleRemove}
          disabled={!labelList.selectedLabels.includes(value.id)}
        />
      ))}
    </div>
  );
};
