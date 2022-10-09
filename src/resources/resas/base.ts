import { RESAS_API_KEY } from "~/utils/env";
import { RequestError } from "~/errors/api/RequestError";
import ResponseError from "~/errors/api/ResponseError";

const BASE_URL = "https://opendata.resas-portal.go.jp";

export const fetchResas = async (
  url: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response | RequestError | ResponseError> => {
  try {
    const result = await fetch(BASE_URL + url, {
      ...init,
      headers: {
        ...init?.headers,
        "X-API-KEY": RESAS_API_KEY,
      },
    });
    if (!result.ok) return new ResponseError(result);
    return result;
  } catch (_error) {
    return new RequestError(url, init);
  }
};
