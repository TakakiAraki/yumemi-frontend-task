import React, { FC } from "react";
import ChevronBottom from "./ChevronBottom";
import ChevronTop from "./ChevronTop";

interface IconProps {
  size: number;
  fill?: string;
}
// eslint-disable-next-line react/display-name
const IconWrap = (Component: FC<any>): FC<IconProps> => {
  const Icon: FC<IconProps> = (props) => {
    return <Component width={props.size} height={props.size} fill={props.fill || "#333"} />;
  };
  return Icon;
};
export const Icon = {
  ChevronBottom: IconWrap(ChevronBottom),
  ChevronTop: IconWrap(ChevronTop),
};
