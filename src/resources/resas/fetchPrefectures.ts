import { RequestError } from "errors/api/RequestError";
import ResponseError from "errors/api/ResponseError";
import { fetchResas } from "./base";
import { PrefecturesAPIResult } from "./interfaces";

/**
 * https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html
 */
export const fetchPrefectures = async (): PrefecturesAPIResult => {
  const response = await fetchResas("/api/v1/prefectures");

  if (response instanceof RequestError) {
    return {
      state: "ERROR",
      result: {
        code: response.name,
        message: response.message,
      },
    };
  }

  if (!response.ok) {
    const result = new ResponseError(response);
    return {
      state: "ERROR",
      result: {
        code: result.name,
        message: result.message,
      },
    };
  }

  const result = await response.json();
  return {
    state: "SUCCESS",
    result: result,
  };
};
