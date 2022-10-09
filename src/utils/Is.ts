export const is = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
  null: <T extends unknown>(value: T | null | undefined): value is T => value == null,
  notNull: <T extends unknown>(value: T | null | undefined): value is T => value != null,
};
