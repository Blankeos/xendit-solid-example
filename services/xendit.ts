import { publicConfig } from "@/config.public";
import axios from "axios";

const authToken = Buffer.from(publicConfig.XENDIT_API_KEY).toString("base64");

async function createInvoice() {
  try {
    const { data, status } = await axios.post(
      "https://api.xendit.co/v2/invoices",
      {
        external_id: "xendit_test_id_1",
        amount: 110000,
        currency: "IDR",
        customer: {
          given_names: "Ahmad",
          surname: "Gunawan",
          email: "ahmad_gunawan@example.com",
          mobile_number: "+6287774441111",
        },
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
