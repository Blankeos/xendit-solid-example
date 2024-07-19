/** Only place private configurations here. */
export const privateConfig = {
  BASE_ORIGIN: import.meta.env.PUBLIC_ENV__BASE_ORIGIN || "http://localhost:3000",
  /** Port of the app (in dev). */
  PORT: (process.env.PORT || 3000) as number,
  /** Development or Production. */
  NODE_ENV: (process.env.NODE_ENV ?? "development") as "development" | "production",
  xendit: {
    SECRET_API_KEY: process.env.XENDIT_SECRET_API_KEY || "",
  },
};
