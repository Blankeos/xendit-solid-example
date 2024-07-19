import { publicConfig } from "@/config.public";
import { CheckoutOpenOptions, Paddle } from "@paddle/paddle-js";
import {
  Accessor,
  createContext,
  createSignal,
  FlowComponent,
  onMount,
  useContext,
} from "solid-js";

// ===========================================================================
// Context
// ===========================================================================

export type PaddleContextValue = {
  paddle: Accessor<Paddle | undefined>;
  openCheckout: (input: CheckoutOpenOptions) => void;
};

const PaddleContext = createContext({
  openCheckout(_) {},
} as PaddleContextValue);

// ===========================================================================
// Hook
// ===========================================================================
export const usePaddleContext = () => useContext(PaddleContext);

// ===========================================================================
// Provider
// ===========================================================================
export const PaddleContextProvider: FlowComponent = (props) => {
  const [paddle, setPaddle] = createSignal<Paddle>();

  onMount(async () => {
    const { initializePaddle } = await import("@paddle/paddle-js");

    initializePaddle({
      token: publicConfig.PADDLE_CLIENT_SIDE_TOKEN,
      environment: publicConfig.NODE_ENV === "development" ? "sandbox" : "production",
      eventCallback: function (data) {
        console.log("[paddle eventCallback]", data);
      },
    }).then((_paddle) => {
      if (_paddle) {
        console.debug("[PaddleContext] Initialized.");
        setPaddle(_paddle);
      }
    });
  });

  function openCheckout(input: CheckoutOpenOptions) {
    paddle()?.Checkout.open(input);
  }

  return (
    <PaddleContext.Provider
      value={{
        paddle: paddle,
        openCheckout: openCheckout,
      }}
    >
      {props.children}
    </PaddleContext.Provider>
  );
};
