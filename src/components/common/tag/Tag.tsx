import clsx from "clsx";
import React, { FC, ReactNode, useMemo } from "react";
import { BLACK, color, WHITE } from "~/utils/color";
import styles from "./Tag.module.scss";

interface TagProps {
  color: string;
  children: ReactNode | ReactNode[] | string;
  disabled?: boolean;
  cursor?: boolean;
  width?: number;
  onClick?: () => void;
}

export const Tag: FC<TagProps> = (props) => {
  return (
    <div
      className={clsx(styles["tag-wrap"], { [styles["-cursor"]]: props.cursor })}
      style={{
        width: props.width,
        backgroundColor: props.color,
        color: color(props.color).futhest([BLACK, WHITE]).toRGBString(),
        opacity: props.disabled ? 0.3 : 1.0,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
