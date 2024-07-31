/** Only place public configurations here. */
export const publicConfig = {
  NODE_ENV: (import.meta.env.DEV ? "development" : "production") as "development" | "production",
  BASE_ORIGIN: import.meta.env.PUBLIC_ENV__BASE_ORIGIN || "http://localhost:3000",
};
