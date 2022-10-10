import { fetchDemographics } from "~/resources/resas/fetchDemographics";
import { reduces } from "~/utils/array";
import { is } from "~/utils/Is";
import { DemographicsRepository } from "./interface";

interface ICurrent {
  prefCode: string;
  cityCode?: string;
}
interface IRepository {
  api: DemographicsRepository;
}

export default async ({ prefCode, cityCode = "-" }: ICurrent, repository?: IRepository) => {
  const api = repository?.api || fetchDemographics;

  const { state, result } = await api({
    prefCode,
    cityCode,
  });

  if (state === "ERROR") {
    return {
      state,
      result,
    };
  }

  const boundaryYear = result.result.boundaryYear;
  const data = result.result.data.find((prefectureData) => prefectureData.label !== "総人口");
  const value = data?.data.reduce(
    reduces.filterMap((population) => {
      if (population.year > boundaryYear) return false;
      return {
        date: population.year,
        values: {
          [prefCode]: population.value,
        },
      };
    }),
    [],
  );

  if (is.null(value)) {
    // TODO: ErrorObjectを作成

    return {
      state: "ERROR",
      result: {
        code: "",
        message: "",
      },
    };
  }

  return {
    state,
    result: value,
  };
};
