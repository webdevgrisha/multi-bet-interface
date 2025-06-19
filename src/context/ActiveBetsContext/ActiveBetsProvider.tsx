import type { JSX, ReactNode } from "react";
import { useActiveBets } from "../../hooks/useActiveBets/useActiveBets";
import { ActiveBetsContext } from "./ActiveBetsContext";

interface ActiveBetsProviderProps {
  children: ReactNode;
}

function ActiveBetsProvider({
  children,
}: ActiveBetsProviderProps): JSX.Element {
  const activeBets = useActiveBets();

  return (
    <ActiveBetsContext.Provider value={activeBets}>
      {children}
    </ActiveBetsContext.Provider>
  );
}

export { ActiveBetsProvider };
