import React, { FC } from "react";
import useSelectGraphState from "../selectors/useSelectGraphState";
import { Tooltip, Line, Legend, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { is } from "~/utils/Is";
import { useMeasure } from "react-use";

export interface Data {
  date: string | number;
  values: { [key: string]: number };
}

export interface ExampleChartProps {
  data: Data[];
}

export const LineGraph: FC = () => {
  const state = useSelectGraphState();
  const [ref, size] = useMeasure<HTMLDivElement>();

  return (
    <div ref={ref}>
      <LineChart
        width={size.width}
        height={400}
        data={state.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        {/* <Tooltip /> */}
        <Legend />
        {state.lineProps.map((val) => (
          <Line
            type="monotone"
            dataKey={val.dayaKey}
            stroke={val.color}
            key={val.key}
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
