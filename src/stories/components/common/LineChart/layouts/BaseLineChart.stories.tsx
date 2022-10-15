import React from "react";
import { ComponentMeta, Story } from "@storybook/react";
import { BaseLineLayout } from "~/components/common/graph/LineChart/layouts/BaseLineLayout";
import { Text } from "~/components/common/text/Text";
import { LineChartContextProvider } from "~/components/common/graph/LineChart/state/machine";
import { LineChartContextProviderProps } from "~/components/common/graph/LineChart/intarface";
import { LineDebug } from "~/components/common/graph/LineChart/components/Debug";

export default {
  component: LineChartContextProvider,
  argTypes: {
    context: {
      defaultValue: {
        id: "1234",
        title: "チャートタイトル",
        description: "チャートディスクリプション",
        selectedLabels: ["1", "3"],
        meta: {
          data: [
            {
              label: "dataのラベル",
              values: {
                "1": 100,
                "2": 200,
                "3": 100,
              },
            },
            {
              label: "dataのラベル",
              values: {
                "1": 150,
                "2": 300,
                "3": 280,
              },
            },
            {
              label: "dataのラベル",
              values: {
                "1": 100,
                "2": 200,
                "3": 100,
              },
            },
          ],
          labels: {
            "1": "ラベル１",
            "2": "ラベル２",
            "3": "ラベル３",
          },
        },
      },
    },
  },
} as ComponentMeta<typeof Text>;

const Template: Story<LineChartContextProviderProps> = (args) => (
  <LineChartContextProvider {...args} />
);

export const BaseLineLayoutComponent = Template.bind({});
BaseLineLayoutComponent.args = {
  children: (
    <>
      <BaseLineLayout />
    </>
  ),
};
