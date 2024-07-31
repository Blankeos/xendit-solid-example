import { productsDAO } from "@/server/dao/product.dao";
import { Hono } from "hono";

export const productsController = new Hono().basePath("products").get("/", async (c) => {
  return c.json({
    allProducts: productsDAO.getAllProducts(),
  });
});
