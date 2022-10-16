import { createElement, HTMLAttributes, ReactNode, useMemo } from "react";
import { is } from "~/utils/Is";
import styles from "./Text.module.scss";
import clsx from "clsx";

export interface TextProps {
  type?: "heading-1" | "heading-2" | "text" | "mini" | "caption";
  tag?: "p" | "h1" | "h2" | "h3" | "span";
  color?: "base" | "reverse" | "link" | "success" | "warn" | "error";
  children: ReactNode | ReactNode[] | string;
}

export type OtherProps = HTMLAttributes<HTMLElement>;
export const Text = (props: TextProps & OtherProps) => {
  const { tag, type = "text", children, ...otherProps } = props;

  const _tag = useMemo(() => {
    if (is.notNull(tag)) return tag;
    switch (type) {
      case "heading-1":
        return "h1";
      case "heading-2":
        return "h2";
      default:
        return "p";
    }
  }, [tag]);

  return createElement(
    _tag,
    {
      className: clsx(styles["base"], styles[type], {
        [styles[`-${props.color || "base"}`]]: true,
      }),
      ...otherProps,
    },
    children,
  );
};
