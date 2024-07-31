import "@/styles/global.css";

import { createSignal, type FlowProps } from "solid-js";

export default function RootLayout(props: FlowProps) {
  return (
    <div class="min-h-screen flex flex-col">
      {/* <nav>
        <a href="/">Home</a>
        <span>{" | "}</span>
        <a href="/dashboard">Dashboard</a>
        <span>{" | "}</span>
        <Counter />
      </nav> */}
      <main class="flex-1 flex flex-col">{props.children}</main>
    </div>
  );
}

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Root Counter {count()}
    </button>
  );
}
