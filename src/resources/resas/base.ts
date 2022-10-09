import { RESAS_API_KEY } from "~/utils/env";
import { RequestError } from "~/errors/api/RequestError";

const BASE_URL = "https://opendata.resas-portal.go.jp";

export const fetchResas = async (
  url: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response | RequestError> => {
  try {
    const result = await fetch(BASE_URL + url, {
      ...init,
      headers: {
        ...init?.headers,
        "X-API-KEY": RESAS_API_KEY,
      },
    });
    return result;
  } catch (_error) {
    return new RequestError(url, init);
  }
};
