import React from "react";
import { Tag } from "~/components/common/tag/Tag";
import useSelectGraphState from "../selectors/useSelectGraphState";

export const LineGraphTagList = () => {
  const { lineProps, labels } = useSelectGraphState();

  return (
    <div>
      {lineProps.map((value) => {
        return (
          <Tag key={value.key} color={value.color}>
            {labels[value.key]}
          </Tag>
        );
      })}
    </div>
  );
};
