"use client";

import { Provider } from "react-redux";
import store from "api/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
