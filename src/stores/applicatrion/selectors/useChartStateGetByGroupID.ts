import { useMemo } from "react";
import { Chart2DState } from "~/components/common/graph/LineChart/intarface";
import { is } from "~/utils/Is";
import { useApplicationSelector } from "../store";

export default (
  groupId: string,
): {
  title: string;
  itemList: Chart2DState[];
} => {
  const group = useApplicationSelector((state) => {
    return state.dataGroup.resource.find((val) => val.id === groupId);
  });

  const data = useApplicationSelector((state) => {
    const userIdList = group?.userDataIdList || [];

    return userIdList
      .map((userId) => {
        return state.userData.resource.find((userData) => userData.id === userId);
      })
      .filter(is.notNull);
  });

  const meta = useApplicationSelector((state) => {
    return state.graphMeta.resource;
  });

  return useMemo(() => {
    return {
      title: group?.title || "",
      itemList: data.map((val) => {
        return {
          userData: val,
          meta: meta[val.type],
        };
      }),
    };
  }, [data, meta, group]);
};
