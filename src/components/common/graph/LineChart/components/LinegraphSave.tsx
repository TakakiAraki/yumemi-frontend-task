import React from "react";
import { Button } from "~/components/common/button/Button";
import { Text } from "~/components/common/text/Text";
import { useLineChartContext } from "../state/machine";

export const LinegraphSave = () => {
  const lineChart = useLineChartContext();

  return (
    <Button onClick={() => lineChart.send({ type: "save" })}>
      <Text type="mini" color="reverse">
        <b>保存</b>
      </Text>
    </Button>
  );
};
