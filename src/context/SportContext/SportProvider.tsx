import type { JSX, ReactNode } from "react";
import { useSportGroupMatches } from "../../hooks";
import { SportContext } from "./SportContext";

interface SportProviderProps {
  children: ReactNode;
}

function SportProvider({ children }: SportProviderProps): JSX.Element {
  const matches = useSportGroupMatches();

  return (
    <SportContext.Provider value={matches}>
      {children}
    </SportContext.Provider>
  );
}

export { SportProvider };
