import { reduces } from "~/utils/array";
import currentDemographics from "./currentDemographics";
import { DemographicsRepository, UsecaseDemographicsResult } from "./interface";

interface ICurrent {
  prefCode: string;
  cityCode?: string;
}
interface IRepository {
  api: DemographicsRepository;
}

export default async (
  props: ICurrent[],
  repository?: IRepository,
): Promise<UsecaseDemographicsResult> => {
  const result = await Promise.all(
    props.map((current) => {
      return currentDemographics(current, repository);
    }),
  );

  const results = result.reduce(
    reduces.filterMap((value) => {
      if (value.state === "ERROR") return false;
      return value.result;
    }),
    [],
  );
  return {
    state: "SUCCESS",
    result: results.reduce((value, current) => {
      if (value.length === 0) return current;
      return value.map((a, index) => ({
        ...a,
        values: {
          ...a.values,
          ...current[index].values,
        },
      }));
    }, []),
  };
};
