import { RequestError } from "~/errors/api/RequestError";
import ResponseError from "~/errors/api/ResponseError";
import { is } from "~/utils/Is";
import { fetchResas } from "./base";
import {
  DemographicsAPIRequestProps,
  DemographicsRepository,
} from "~/usecases/demographics/interface";

// prefCode: string;
// cityCode: string;
export const parseAddArea = (addArea: Required<DemographicsAPIRequestProps>["addArea"]): string =>
  addArea.map((area) => `${area.cityCode}_${area.prefCode}`).join(",");

/**
 * https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
 */

export const fetchDemographics: DemographicsRepository = async (props) => {
  const { addArea, ...params } = props;

  const param = new URLSearchParams(params);
  if (is.notNull(addArea)) param.set("addArea", parseAddArea(addArea));
  const response = await fetchResas("/api/v1/population/composition/perYear?" + param.toString());

  if (response instanceof RequestError || response instanceof ResponseError) {
    return {
      state: "ERROR",
      result: {
        code: response.name,
        message: response.message,
      },
    };
  }
  const result = await response.json();
  return {
    state: "SUCCESS",
    result: result,
  };
};
