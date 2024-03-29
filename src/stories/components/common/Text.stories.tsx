import { ComponentMeta } from "@storybook/react";
import { Text } from "~/components/common/text/Text";

export const Primary = {};
export default {
  component: Text,
  argTypes: {
    children: {
      name: "children",
      type: "string",
      defaultValue: "fuga",
    },
  },
} as ComponentMeta<typeof Text>;
