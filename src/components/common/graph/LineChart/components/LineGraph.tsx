import React, { FC } from "react";
import useSelectGraphState from "../selectors/useSelectGraphState";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { is } from "~/utils/Is";
import { useMeasure } from "react-use";

export interface LineGraphProps {
  height?: number;
}
const formatter = new Intl.NumberFormat("ja-JP", { style: "decimal" });

const numberFormatYAxis = (value: any) => {
  if (is.integer(value)) {
    return `${value / 10000}万人`;
  }
  return value;
};

const numberFormatTooltip = (value: any) => {
  if (is.integer(value)) {
    return `${formatter.format(value)}人`;
  }
  return value;
};

export const LineGraph: FC<LineGraphProps> = (props) => {
  const state = useSelectGraphState();
  const [ref, size] = useMeasure<HTMLDivElement>();

  return (
    <div ref={ref}>
      <LineChart
        width={size.width}
        height={props.height ?? 300}
        data={state.data}
        margin={{ right: 35 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="label" />
        <YAxis tickFormatter={numberFormatYAxis} />
        <Tooltip
          isAnimationActive={false}
          position={{ x: size.width - 100, y: 0 }}
          formatter={numberFormatTooltip}
        />
        {(state.lineProps || []).map((val) => (
          <Line
            type="monotone"
            dataKey={val.dayaKey}
            stroke={val.color}
            key={val.key}
            isAnimationActive={false}
            name={(() => {
              if (is.null(state.labels)) return;
              return state.labels[val.key];
            })()}
          />
        ))}
      </LineChart>
    </div>
  );
};
