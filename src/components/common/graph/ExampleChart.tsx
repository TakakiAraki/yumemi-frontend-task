import React, { useMemo } from "react";
import { LineChart, Tooltip, Line, Legend, XAxis, YAxis, CartesianGrid } from "recharts";

export interface Data {
  date: string | number;
  values: { [key: string]: number };
}

export interface ExampleChartProps {
  data: Data[];
}

export const ExampleChart = ({ data }: ExampleChartProps) => {
  const parsedData = useMemo(() => {
    return data.map((val) => {
      const data = Object.entries(val.values).reduce((val, [key, result]) => {
        if (key === "data") throw new Error("values.dataは予約語のため使用できません");
        return {
          ...val,
          [key]: result,
        };
      }, {});
      return {
        data: val.date,
        ...data,
      };
    });
  }, [data]);

  const lines = useMemo(() => {
    return Object.keys(data[0].values).map((val) => (
      <Line type="monotone" dataKey={val} stroke="#8884d8" key={val} />
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
      <XAxis dataKey="date" />
      <YAxis />
      {/* <Tooltip /> */}
      <Legend />
      {lines}
    </LineChart>
  );
};

export default ExampleChart;
