import React from "react";
import type { useBalance } from "../../hooks/useBalance/useBalance";

const BalanceContext = React.createContext<ReturnType<
  typeof useBalance
> | null>(null);

export { BalanceContext };
