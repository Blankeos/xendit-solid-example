/**
 * NOTE
 * This is the no SDK implementation for Xendit. (Just for reference).
 *
 * A better implementation is to use the official SDK.
 */

import { privateConfig } from "@/config.private";
import axios from "axios";

const authToken = Buffer.from(privateConfig.xendit.SECRET_API_KEY).toString("base64");

type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
  category: string;
};

type XenditCustomer = {
  given_names: string;
  surname: string;
  email: string;
  mobile_number: string;
};

async function createInvoice(params: { items: InvoiceItem[]; customer: XenditCustomer }) {
  try {
    const { data, status } = await axios.post(
      "https://api.xendit.co/v2/invoices",
      {
        external_id: "xendit_test_id_1",
        amount: 110000,
        currency: "PHP",
        // customer: {
        //   given_names: "Carlo",
        //   surname: "Taleon",
        //   email: "carlo@example.com",
        //   mobile_number: "+6287774441111",
        // },
        customer_notification_preference: {
          invoice_paid: ["email", "whatsapp"],
        },
        success_redirect_url: "example.com/success",
        failure_redirect_url: "example.com/failure",
        items: [
          {
            name: "Double Cheeseburger",
            quantity: 1,
            price: 7000,
            category: "Fast Food",
          },
          {
            name: "Chocolate Sundae",
            quantity: 1,
            price: 3000,
            category: "Fast Food",
          },
        ],
        fees: [
          {
            type: "Delivery",
            value: 10000,
          },
        ],
      },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
        },
      }
    );
  } catch (error: any) {}
}
