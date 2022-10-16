import React, { FC, ReactNode, useMemo, useState } from "react";
import styles from "./Accordion.module.scss";
import { useMeasure } from "react-use";
import clsx from "clsx";
import { Icon } from "~/assets/icons";
import { is } from "~/utils/Is";

export interface AccordionProps {
  height: number | string;
  children: ReactNode | ReactNode[] | string;
  opened?: boolean;
}

export const Accordion: FC<AccordionProps> = (props) => {
  const [ref, size] = useMeasure<HTMLDivElement>();
  const [open, toggle] = useState(props.opened ?? false);

  const isSmall = useMemo(() => {
    return is.integer(props.height) && size.height > props.height;
  }, [props.height, size.height]);

  const wrap = clsx(styles["accordion-wrap"], {
    [styles["-open"]]: isSmall || open,
    [styles["-close"]]: !isSmall || !open,
  });

  return (
    <div className={wrap} style={{ height: open ? size.height : props.height }}>
      <div ref={ref}>{props.children}</div>
      {isSmall ? (
        <>
          <div className={styles["opener"]}>
            <div className={styles["arrow-wrap"]}>
              <div className={styles["gradation"]} />
              <a
                className={clsx(styles["icon"], styles["-bottomfade"])}
                onClick={() => toggle((v) => !v)}
              >
                <Icon.ChevronBottom size={15} />
              </a>
            </div>
          </div>

          <div className={styles["closer"]}>
            <div className={styles["arrow-wrap"]}>
              <div className={styles["liner"]} />
              <a
                className={clsx(styles["icon"], styles["-topfade"])}
                onClick={() => toggle((v) => !v)}
              >
                <Icon.ChevronTop size={15} />
              </a>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
