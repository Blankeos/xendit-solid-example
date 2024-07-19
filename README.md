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
- [ ] Non-paddle related: Simple Auth + Database signifiying that the user has paid

## Quickstart

> Assumes you have zero knowledge of Xendit.

1. Sign up for a [**Xendit account**](https://dashboard.xendit.co/register).

   - Your live account will be in `vendors.paddle.com`
   - Your sandbox account will be in `vendors-sandbox.paddle.com`

2. Generate a Secret API Key for development in Test mode. Go to **Settings > Developers > API Keys**.

   - Make sure to set "Write" permissions for your API key for Money-in products.

3. Fill environment variables

   - `cp .env.example .env`
   - `PUBLIC_ENV__PADDLE_SELLER_ID` - From **Paddle > Developer Tools > Authentication**
   - `PUBLIC_ENV__PADDLE_CLIENT_SIDE_TOKEN` - From **Paddle > Developer Tools > Authentication**

4. Create Products and Prices in Paddle

   - Go to **Paddle > Catalog > Products**
   - Make the following:
     - Watercolor Brush (Basic) - $4 - One-time payment
     - Watercolor Brush (Profesional Set) - $14 - One-time payment
     - Watercolor Co Membership - $4 - Recurring Subscription per month
   - After creating the products, get their **Price IDs**
   - Go to `index/+Page.tsx` of this project and paste the **Price IDs** in the `products.id`.

5. Set Default Payment Link

   - Go to **Paddle > Checkout > Checkout settings > Default payment link** and set it to `http://localhost:3000` (or wherever your `openCheckout` will be called).
   - This is like an "allowed domain" used for checkout. Otherwise, opening checkouts in that URL will fail.

6. Install deps and run dev server
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

  - 1.  User selects a product/or chooses some products. (c.o. dev)
  - 2.  Backend creates an invoice. (c.o. dev + xendit API)
  - 3.  Backend redirects the user to Xendit's Checkout URL. (c.o. xendit)
  - 4.  User inputs payment, then finishes payment. (c.o. xendit)
  - 5.  Xendit redirects user to success url. (c.o. xendit)
  - 6.  If user failed payment, they will be redirected to failure url. (c.o. dev)
  - 7.  Handle the callback via webhook POST (c.o. dev)

- I that most payment integrations is literally just three steps:
  - Invoice - List of products to pay for before a checkout session.
  - Checkout Session - Handle transaction.
  - Webhook - A way for the dev to react to the transaction and serve the user appropriately.

## Resources

- https://docs.xendit.co/create-a-checkout-page-via-api
