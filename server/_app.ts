import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { authController } from "./modules/auth/auth.controller";
import { productsController } from "./modules/products/products.controller";

const app = new Hono();

// see https://hono.dev/middleware/builtin/csrf for more options
app.use(csrf());

/**
 * The base router. Include all the routes here from `./routes/*`
 */
export const appRouter = app //
  .route("/", authController)
  .route("/", productsController);
// add .route(newController)
//     .route(otherController) for extra routers here.

/** Exported type definition for the hono/client. */
export type AppRouter = typeof appRouter;
