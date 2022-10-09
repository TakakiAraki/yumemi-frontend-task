import { is } from "./Is";

type FilterCb<Value extends unknown, Result extends unknown> = (
  value: Value,
  index: number,
  array: Value[],
) => false | null | undefined | Result;

export const reduces = {
  filterMap:
    <Value extends unknown, Result extends unknown>(cb: FilterCb<Value, Result>) =>
    (
      previousValue: Result[],
      currentValue: Value,
      currentIndex: number,
      array: Value[],
    ): Result[] => {
      const value = cb(currentValue, currentIndex, array);
      if ((typeof value === "boolean" && !value) || is.null(value)) return previousValue;
      return [...previousValue, value];
    },
};
