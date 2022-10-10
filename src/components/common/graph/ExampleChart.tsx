import React, { useMemo } from "react";
import { LineChart, Tooltip, Line, Legend, XAxis, YAxis, CartesianGrid } from "recharts";
import { is } from "~/utils/Is";

export interface Data {
  date: string | number;
  values: { [key: string | number]: number };
}

export interface ExampleChartProps {
  data: Data[];
  labels: { [key: string | number]: string };
}

export const ExampleChart = ({ data, labels }: ExampleChartProps) => {
  const parsedData = useMemo(() => {
    return data.map((val) => {
      const data = Object.entries(val.values).reduce((val, [key, result]) => {
        return {
          ...val,
          [key]: result,
        };
      }, {});

      return {
        key: val.date,
        values: data,
      };
    });
  }, [data]);

  const lines = useMemo(() => {
    return Object.keys(data[0].values).map((val) => (
      <Line
        dataKey={`values.${val}`}
        key={val}
        type="monotone"
        stroke="#8884d8"
        name={labels[Number(val)] || val}
      />
    ));
  }, [data]);

  return (
    <LineChart
      width={730}
      height={250}
      data={parsedData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="key" />
      <YAxis
        unit="万人"
        tick
        tickFormatter={(num) => {
          if (!is.number(num)) return num;
          return num / 10000;
        }}
      />
      <Tooltip />
      <Legend />
      {lines}
    </LineChart>
  );
};

export default ExampleChart;
