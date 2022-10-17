import React from "react";
import { ComponentMeta, Story } from "@storybook/react";
import { IconButton, IconButtonProps } from "~/components/common/button/IconButton";
import { Icon } from "~/assets/icons";

export default {
  component: IconButton,
  argTypes: {},
} as ComponentMeta<typeof IconButton>;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;
export const Save = Template.bind({});
Save.args = {
  children: <Icon.Save size={50} fill="#fff" />,
  size: 50,
};

export const ChevronTop = Template.bind({});
ChevronTop.args = {
  children: <Icon.ChevronTop size={50} fill="#fff" />,
  size: 50,
};

export const ChevronBottom = Template.bind({});
ChevronBottom.args = {
  children: <Icon.ChevronBottom size={50} fill="#fff" />,
  size: 50,
};
