import React, { FC, ReactNode, useState } from "react";
import styles from "./Accordion.module.scss";
import { useMeasure } from "react-use";
import clsx from "clsx";

export interface AccordionProps {
  height: number | string;
  children: ReactNode | ReactNode[] | string;
  opened?: boolean;
}

export const Accordion: FC<AccordionProps> = (props) => {
  const [ref, size] = useMeasure<HTMLDivElement>();
  const [open, toggle] = useState(props.opened ?? false);
  const wrap = clsx(styles["accordion-wrap"], {
    [styles["-open"]]: open,
    [styles["-close"]]: !open,
  });

  return (
    <div className={wrap} style={{ height: open ? size.height : props.height }}>
      <div ref={ref}>{props.children}</div>

      <div className={styles["opener"]}>
        <div className={styles["arrow-wrap"]}>
          <div className={styles["gradation"]} />
          <a className={styles["icon"]} onClick={() => toggle((v) => !v)}>
            click!
          </a>
        </div>
      </div>

      <div className={styles["closer"]}>
        <div className={styles["arrow-wrap"]}>
          <div className={styles["liner"]} />
          <a className={styles["icon"]} onClick={() => toggle((v) => !v)}>
            click! close!
          </a>
        </div>
      </div>
    </div>
  );
};
