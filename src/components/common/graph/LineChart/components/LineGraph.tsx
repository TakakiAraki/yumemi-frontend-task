import React, { FC } from "react";
import useSelectGraphState from "../selectors/useSelectGraphState";
import { Line, Legend, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { is } from "~/utils/Is";
import { useMeasure } from "react-use";

export interface LineGraphProps {
  height?: number;
}

export const LineGraph: FC<LineGraphProps> = (props) => {
  const state = useSelectGraphState();
  const [ref, size] = useMeasure<HTMLDivElement>();

  return (
    <div ref={ref}>
      <LineChart
        width={size.width}
        height={props.height ?? 300}
        data={state.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Legend />
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
