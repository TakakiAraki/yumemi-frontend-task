import { fetchPrefectures } from "~/resources/resas/fetchPrefectures";
import { PrefecturesRepository } from "./interfaces";

interface IRepository {
  api: PrefecturesRepository;
}

// TODO: cacheを考える
export default async (repository?: IRepository) => {
  const api = repository?.api || fetchPrefectures;
  const { state, result } = await api();

  if (state === "ERROR") {
    return {
      state,
      result,
    };
  }

  return {
    state,
    result: result.result,
  };
};
