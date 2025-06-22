import React from "react";
import type { useActiveBets } from "../../hooks/useActiveBets/useActiveBets";

const ActiveBetsContext = React.createContext<ReturnType<
  typeof useActiveBets
> | null>(null);

export { ActiveBetsContext };
