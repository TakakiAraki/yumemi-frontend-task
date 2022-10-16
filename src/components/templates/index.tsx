import * as React from "react";
import { Text } from "~/components/common/text/Text";
import Scroll from "../common/scroll/Scrollbar";
import styles from "./index.module.scss";
import { Chart2DMetaData } from "../common/graph/LineChart/intarface";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { setMetaData } from "~/stores/graphMeta/slice";

const ContentsViewer = dynamic(() => import("./components/ContentsViewer"), { ssr: false });

export interface IndexProps {
  demographics?: Chart2DMetaData;
}

export const IndexPage = (props: IndexProps) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      setMetaData({
        ...props,
      }),
    );
  }, [props]);

  return (
    <div className={styles["content-wrap"]}>
      <header className={styles["header"]}>
        <Text type="heading-1" color="reverse">
          japan doc
        </Text>
        <Text type="mini" color="reverse">
          (日本の人口統計マップ)
        </Text>
      </header>

      <article className={styles["content"]}>
        <Scroll height="100%" width="100%">
          <ContentsViewer />
        </Scroll>
      </article>
    </div>
  );
};
