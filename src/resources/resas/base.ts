import { RESAS_API_KEY } from "~/utils/env";
import { RequestError } from "~/errors/api/RequestError";
import ResponseError from "~/errors/api/ResponseError";
import { clock } from "~/utils/clock";
import { promiseControl, waitFor } from "~/utils/promise";

const BASE_URL = "https://opendata.resas-portal.go.jp";

/**
 * リクエスト数/日 10000
 * 1秒あたりのリクエスト平均数 5
 * @param url
 * @param init
 * @returns
 */
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
