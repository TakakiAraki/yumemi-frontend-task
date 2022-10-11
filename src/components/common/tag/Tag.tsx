import React, { FC, ReactNode } from "react";
import { BLACK, color, WHITE } from "~/utils/color";

interface TagProps {
  color: string;
  children: ReactNode | ReactNode[] | string;
  onClick?: () => void;
}

export const Tag: FC<TagProps> = (props) => {
  return (
    <div
      style={{
        display: "inline-block",
        margin: 4,
        borderRadius: 4,
        backgroundColor: props.color,
        color: color(props.color).futhest([BLACK, WHITE]).toRGBString(),
        fontWeight: "bold",
        padding: 4,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
