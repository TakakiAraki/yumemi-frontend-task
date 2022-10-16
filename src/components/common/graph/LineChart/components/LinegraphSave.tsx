import React from "react";
import { Button } from "~/components/common/button/Button";
import { Text } from "~/components/common/text/Text";
import { useLineChartContext } from "../state/machine";

export const LinegraphSave = () => {
  const lineChart = useLineChartContext();

  return (
    <Button
      onClick={async () => {
        const isSave = await window.confirm("保存しますか");

        if (isSave) {
          lineChart.send({ type: "save" });
          await window.alert("保存しました");
        }
      }}
    >
      <Text type="mini" color="reverse">
        <b>保存</b>
      </Text>
    </Button>
  );
};
