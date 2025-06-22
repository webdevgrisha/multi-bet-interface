import React from "react";
import { usePendingBets } from "../../hooks";

const PendingBetsContext = React.createContext<ReturnType<
  typeof usePendingBets
> | null>(null);

export { PendingBetsContext };
