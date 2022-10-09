import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { RESAS_API_KEY } from "utils/env";

export const fetchResas = (url: URL, init?: RequestInit) => {
  return fetch(url, {
    ...init,
    headers: {
      "X-API-KEY": RESAS_API_KEY,
    },
  });
};
