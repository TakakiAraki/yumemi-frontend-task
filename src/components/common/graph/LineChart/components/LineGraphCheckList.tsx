import React, { useCallback, useRef } from "react";
import { Tag } from "~/components/common/tag/Tag";
import useSelectGraphLabelList from "../selectors/useSelectGraphLabelList";
import updateLabel from "../state/actions/updateLabel";
import updateLabelOrder from "../state/actions/updateLabelOrder";
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
    <Tag
      key={props.id}
      color={props.color}
      onClick={cb}
      disabled={props.disabled}
      cursor
      width={56}
    >
      {/* スペース空いてるの懐かしい感じがして良いね！ */}
      {props.name.length === 3 ? props.name.split("").join(" ") : props.name}
    </Tag>
  );
};

// TODO
// chrome のタブに従って、マウスがタブ外に出るとソートを実施し、左上に詰めて、アニメーションを行うと良さそうだが、工数が足りない

export const LineGraphCheckList = () => {
  const labelList = useSelectGraphLabelList();
  const lineChart = useLineChartContext();
  const timeoutId = useRef(0);

  const handleSelect = useCallback((labelId: string) => {
    lineChart.send(updateLabel.add.update(labelId));
  }, []);

  const handleRemove = useCallback((labelId: string) => {
    lineChart.send(updateLabel.remove.update(labelId));
  }, []);

  const updateOrder = useCallback(() => {
    timeoutId.current = window.setTimeout(() => {
      lineChart.send(updateLabelOrder.update({}));
    }, 200);
  }, []);

  const resetOrder = useCallback(() => {
    window.clearTimeout(timeoutId.current);
  }, []);

  return (
    <div
      className={styles["linegraph-checklist"]}
      onMouseLeave={updateOrder}
      onMouseEnter={resetOrder}
    >
      {labelList.labels.map((value) => (
        <CheckList
          key={value.id}
          {...value}
          onClickSelected={handleSelect}
          onClickRemove={handleRemove}
          disabled={!labelList.selectedLabels?.includes(value.id)}
        />
      ))}
    </div>
  );
};
