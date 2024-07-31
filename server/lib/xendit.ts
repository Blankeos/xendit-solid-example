import { privateConfig } from "@/config.private";
import { Xendit } from "xendit-node";

export const xenditClient = new Xendit({
  secretKey: privateConfig.xendit.SECRET_API_KEY,
});

// xenditClient.Invoice.createInvoice({
//   data: {
//     amount: 11000,
//     externalId: "",
//     items: [],

//   }
// })
