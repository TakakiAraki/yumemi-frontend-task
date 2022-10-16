import clsx from "clsx";
import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import styles from "./IconButton.module.scss";

interface IconButtonProps {
  size?: number;
}

export const IconButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & IconButtonProps
> = (props) => {
  return (
    <button
      {...props}
      style={{
        ...props.style,
        width: props.size || 24,
        height: props.size || 24,
      }}
      className={clsx(props.className, styles["icon-button"], {
        [styles["-disabled"]]: props.disabled,
      })}
    />
  );
};
