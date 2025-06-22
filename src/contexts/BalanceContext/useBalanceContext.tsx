import React from "react";
import { BalanceContext } from "./BalanceContext";

function useBalanceContext() {
  const context = React.useContext(BalanceContext);

  if (!context) {
    throw new Error("useBalanceContext must be used within BalanceProvider");
  }

  return context;
}

export { useBalanceContext };
