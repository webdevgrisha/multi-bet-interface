import type { JSX, ReactNode } from "react";
import { usePendingBets } from "../../hooks";
import { PendingBetsContext } from "./PendingBetsContext";

interface PendingBetsProviderProps {
  children: ReactNode;
}

function PendingBetsProvider({
  children,
}: PendingBetsProviderProps): JSX.Element {
  const pendingBets = usePendingBets();

  return (
    <PendingBetsContext.Provider value={pendingBets}>
      {children}
    </PendingBetsContext.Provider>
  );
}

export { PendingBetsProvider };
