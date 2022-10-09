import { PrefecturesRepository } from "~/usecases/prefectures/interfaces";
import mock from "./prefectures.json";

export const mockPrefectures: PrefecturesRepository = async () => {
  return await {
    state: "SUCCESS",
    result: mock,
  };
};
