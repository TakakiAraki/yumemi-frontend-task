import { ComponentMeta } from "@storybook/react";
import { Button } from "~/components/common/button/Button";

export const Primary = {};
export default {
  component: Button,
  argTypes: {
    children: {
      name: "children",
      type: "string",
      defaultValue: "ボタン",
    },
  },
} as ComponentMeta<typeof Button>;
