import clsx from "clsx";
import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  width?: number;
  height?: number;
}

export const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & ButtonProps
> = (props) => {
  return (
    <button
      {...props}
      style={{
        ...props.style,
        width: props.width,
        height: props.height,
      }}
      className={clsx(props.className, styles["icon-button"], {
        [styles["-disabled"]]: props.disabled,
      })}
    />
  );
};
