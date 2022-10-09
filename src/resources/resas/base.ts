import { RESAS_API_KEY } from "utils/env";

export const fetchResas: typeof fetch = (url, init) => {
  return fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      "X-API-KEY": RESAS_API_KEY,
    },
  });
};
