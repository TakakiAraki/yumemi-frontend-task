import React from "react";
import { ComponentMeta } from "@storybook/react";
import { Accordion } from "~/components/common/accordion/Accordion";

export const Primary = {};
export default {
  component: Accordion,
  argTypes: {
    children: {
      name: "children",
      defaultValue: (
        <div>
          <p>テスト</p>
          <p>テスト</p>
          <p>テスト</p>
          <p>テスト</p>
          <p>テスト</p>
          <p>テスト</p>
          <p>テスト</p>
        </div>
      ),
    },
    height: {
      name: "height",
      type: "number",
      defaultValue: 50,
    },
  },
} as ComponentMeta<typeof Accordion>;
