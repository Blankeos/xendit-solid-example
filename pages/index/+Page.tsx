import { usePaddleContext } from "@/store/paddle.store";
import { CheckoutOpenLineItem } from "@paddle/paddle-js";

export default function Page() {
  const [items, setItems] = createStore<CheckoutOpenLineItem[]>([]);

  const products = [
    { id: "pri_01j30gpbandt6x1hh1jf881wdy", name: "Watercolor Brush (Basic)", price: 4 },
    { id: "pri_01j30gqm006t8qperkn0h3v1h7", name: "Watercolor Brush (Profesional Set)", price: 14 },
    { id: "pri_01j30gx2zmeban9z2tr265k3d7", name: "Watercolor Co Membership", price: 4 },
  ];

  const { openCheckout } = usePaddleContext();

  function toggleAddItem(priceId: string, quantity: number) {
    setItems(
      produce((_draft) => {
        const _item = _draft.find((_item) => _item.priceId === priceId);

        // Add New
        if (!_item) {
          _draft.push({ priceId, quantity });
          return;
        }

        // Remove since exists.
        _draft.splice(_draft.indexOf(_item), 1);
      })
    );
  }

  return (
    <>
      <div class="flex flex-col flex-1">
        <div class="h-20" />

        <div class="flex items-center justify-center gap-4">
          <For each={products}>
            {(product) => (
              <ProductCard
                id={product.id}
                active={Boolean(items.find((_item) => _item.priceId === product.id))}
                name={product.name}
                price={product.price}
                onClick={() => toggleAddItem(product.id, 1)}
              />
            )}
          </For>
        </div>

        <div class="h-20" />

        <button
          class="self-center border rounded px-3 py-1 bg-emerald-500 text-white border-emerald-300 transition active:scale-95"
          onClick={() => {
            const _items = unwrap(items);

            openCheckout({
              items: _items,
            });
          }}
        >
          Checkout
        </button>

        <div class="h-5" />

        <div class="flex flex-col gap-y-1 items-center max-w-lg w-full mx-auto">
          <h2>Items to Checkout</h2>

          <pre class="text-sm text-gray-500 bg-neutral-800 font-mono w-full p-5 min-h-44 rounded-lg">
            {JSON.stringify(items, null, 2)}
          </pre>
        </div>
      </div>
    </>
  );
}

// ===========================================================================
// Subcomponents
// ===========================================================================

import { For, mergeProps, VoidProps } from "solid-js";
import { createStore, produce, unwrap } from "solid-js/store";

type ProductCardProps = {
  id: string;
  active?: boolean;
  name: string;
  price: number;
  recurring?: boolean;
  onClick?: () => void;
};

function ProductCard(props: VoidProps<ProductCardProps>) {
  const defaultProps = mergeProps(
    {
      // Add default values here.
    },
    props
  );

  return (
    <button
      class={`p-2 h-44 w-44 border rounded-lg flex flex-col gap-y-3 items-center justify-center active:scale-95 transition ${defaultProps.active ? "bg-gray-100" : "bg-white"}`}
      onClick={props.onClick}
    >
      <span>{defaultProps.name}</span>

      <span class="text-sm text-gray-500">
        USD {defaultProps.price}
        {defaultProps.recurring && <span class="text-xs text-gray-500">/month</span>}
      </span>
    </button>
  );
}
