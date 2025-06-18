import React from "react";
import { usePendingBets } from "../../hooks";

const BetContext = React.createContext<ReturnType<
  typeof usePendingBets
> | null>(null);

export { BetContext };
