import { MEDIA } from "~/constants/style";

export const is = {
  production: process.env.NODE_ENV === "production",
  development: process.env.NODE_ENV === "development",
  test: process.env.NODE_ENV === "test",
  null: <T extends unknown>(value: T | null | undefined): value is null | undefined =>
    value == null,
  notNull: <T extends unknown>(value: T | null | undefined): value is T => value != null,
  client: typeof process === "undefined",
  server: typeof window === "undefined",
  array: Array.isArray,
  isPC: () => window.matchMedia(MEDIA.IS_SP).matches,
  isSP: () => !window.matchMedia(MEDIA.IS_SP).matches,
};
