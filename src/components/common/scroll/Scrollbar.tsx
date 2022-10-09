import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { ReactNode, useEffect, useRef } from "react";
import { is } from "~/utils/Is";

export interface ScrollProps {
  children: ReactNode | ReactNode[] | string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const Scroll = (props: ScrollProps) => {
  const refWrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (is.null(refWrap.current)) return;
    const scrollInstance = new PerfectScrollbar(refWrap.current);
    return () => {
      scrollInstance.destroy();
    };
  }, []);
  return (
    <div
      className={props.className}
      ref={refWrap}
      style={{ position: "relative", overflow: "hidden", width: props.width, height: props.height }}
    >
      {props.children}
    </div>
  );
};

export default Scroll;
