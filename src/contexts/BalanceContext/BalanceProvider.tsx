import type { JSX, ReactNode } from "react";
import { useBalance } from "../../hooks/useBalance/useBalance";
import { BalanceContext } from "./BalanceContext";

interface BalanceProviderContext {
  children: ReactNode;
}

function BalanceProvider({ children }: BalanceProviderContext): JSX.Element {
  const balance = useBalance();

  return (
    <BalanceContext.Provider value={balance}>
      {children}
    </BalanceContext.Provider>
  );
}

export { BalanceProvider };
