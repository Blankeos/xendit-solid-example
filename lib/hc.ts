import { publicConfig } from "@/config.public";
import { AppRouter } from "@/server/_app";
import { hc as createHc } from "hono/client";

export const hc = createHc<AppRouter>(publicConfig.BASE_ORIGIN + "/api");
