# xendit-solid-example

> [!WARNING]
> Very WIP

> This was bootstrapped with [Solid Hop](https://github.com/blankeos/solid-hop).

- Xendit
- SolidJS
- Hono + Vike

A Xendit integration that works in the 🇵🇭 Philippines :D. If you're just learning, I recommend cloning this and taking a few hours to study it (even if I don't use similar tech as you).

Concept: A Watercolor Brush Company

Features covered

- [x] Products
  - [x] Simple one-time payment with tiers (Basic, Professional Set for Watercolor Brushes)
  - [x] Recurring Subscription (Membership)
  - [ ] One-time payment with extra units (Watercolor event tickets)
- [ ] Discounts
- [ ] Webhook (What happens after successful transaction)
- [ ] Non-xendit related: Simple Auth + Database signifiying that the user has paid

## Quickstart

> Assumes you have zero knowledge of Xendit.

1. Sign up for a [**Xendit account**](https://dashboard.xendit.co/register). As **Sole Proprietorship** minimum to be able to accept credit/debit card payments.

2. Generate a Secret API Key for development in Test mode. Go to **Settings > Developers > API Keys**.

   - Make sure to set "Write" permissions for your API key for Money-in products.

3. Fill environment variables

   ```sh
   $ cp .env.example .env
   ```

   - `XENDIT_SECRET_API_KEY` - From **Settings > Developers > API Keys**

4. Install deps and run dev server
   ```sh
   bun install
   bun dev
   ```

## Some notes

- Xendit feels headless compared to Paddle. Most of it is just a REST API, no extra SDK.
- What Xendit provides that I think I need:
  - A **create invoice API** - returns a checkout url. You can also set a success and failure **redirect** url. (they are not webhooks)
  - A **Checkout URL**
    - You redirect the user here after creating an invoice.
    - Xendit owns this checkout page, I guess so most of the UI is done.
    - Xendit will redirect the user to **success** or **failure** pages. The ones you set in the **create invoice API**.
    - When the user finishes the payment, they will be redirected to the success url. Else, they will be redirected to the failure url.
- **Webhooks** - You have to set on the dashboard. Xendit will send a POST request to your webhooks after some events.

- My rough outline of how the payment flow works/is built:

  - 1.  User selects a product/or chooses some products. (c.o. **dev**)
  - 2.  Backend creates an invoice. (c.o. **dev** + xendit API)
  - 3.  Backend redirects the user to Xendit's Checkout URL. (c.o. xendit)
  - 4.  User inputs payment, then finishes payment. (c.o. xendit)
  - 5.  Xendit redirects user to success url. (c.o. xendit)
  - 6.  If user failed payment, they will be redirected to failure url. (c.o. **dev**)
  - 7.  Handle the callback via webhook POST (c.o. **dev**)

- I think that most payment integrations is literally just three steps:
  - Invoice - List of products to pay for before a checkout session.
  - Checkout Session - Handle transaction.
  - Webhook - A way for the dev to react to the transaction and serve the user appropriately.

## Resources

- https://docs.xendit.co/create-a-checkout-page-via-api
