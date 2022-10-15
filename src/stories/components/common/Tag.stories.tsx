import { ComponentMeta } from "@storybook/react";
import { Tag } from "~/components/common/tag/Tag";

export const Primary = {};
export default {
  component: Tag,
  argTypes: {
    children: {
      name: "children",
      type: "string",
      defaultValue: "タグ名",
    },
    color: {
      name: "color (#XXXXXX)",
      type: "string",
      defaultValue: "#000000",
    },
  },
} as ComponentMeta<typeof Tag>;
