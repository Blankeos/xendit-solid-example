import { productsDAO } from "@/server/dao/product.dao";
import { xenditClient } from "@/server/lib/xendit";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { CreateInvoiceRequest } from "xendit-node/invoice/models";
import { z } from "zod";

export const paymentsController = new Hono()
  .basePath("payments")

  // Create Checkout
  .post(
    "/checkout",
    zValidator(
      "json",
      z.object({
        items: z
          .array(
            z.object({
              referenceId: z.string(),
              quantity: z.number(),
            })
          )
          .min(1),
        currency: z.string().optional(),
      })
    ),
    async (c) => {
      const body = c.req.valid("json");

      // ---------------------------------------------------------------------------
      // 1. Validate that products exist.
      // ---------------------------------------------------------------------------

      const existingProducts = await productsDAO.getProductsById(
        body.items.map((item) => item.referenceId)
      );

      /** For better performance. Create a one-pass map. */
      const existingProductsMap: Record<string, (typeof existingProducts)[number]> = {};
      for (const existingProduct of existingProducts) {
        existingProductsMap[existingProduct.id] = existingProduct;
      }

      for (const item of body.items) {
        if (!existingProductsMap[item.referenceId])
          throw new Error(`Product ${item.referenceId} does not exist.`);
      }

      // ---------------------------------------------------------------------------
      // 2. Calculate total amount.
      // ---------------------------------------------------------------------------

      const totalAmount = body.items.reduce((_totalAmount, item) => {
        const productData = existingProductsMap[item.referenceId];

        return _totalAmount + productData.price * item.quantity;
      }, 0);

      // ---------------------------------------------------------------------------
      // 3. Parse `items` input to CreateInvoiceRequest["items"]
      // ---------------------------------------------------------------------------

      const itemsToCheckout: CreateInvoiceRequest["items"] = body.items.map((item) => ({
        name: existingProductsMap[item.referenceId].name,
        quantity: item.quantity,
        price: existingProductsMap[item.referenceId].price,
        currency: "USD",
      }));

      // ---------------------------------------------------------------------------
      // 4. Create the invoice.
      // ---------------------------------------------------------------------------
      const invoice = await xenditClient.Invoice.createInvoice({
        data: {
          amount: totalAmount,
          externalId: "",
          items: itemsToCheckout,
        },
      });
    }
  );
