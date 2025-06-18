import type { JSX, ReactNode } from "react";
import { usePendingBets } from "../../hooks";
import { BetContext } from "./BetContext";

interface BetProviderProps {
  children: ReactNode;
}

function BetProvider({ children }: BetProviderProps): JSX.Element {
  const pendingBets = usePendingBets();

  return (
    <BetContext.Provider value={pendingBets}>
      {children}
    </BetContext.Provider>
  );
}

export { BetProvider };
