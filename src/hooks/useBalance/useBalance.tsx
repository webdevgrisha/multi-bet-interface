import React from "react";
import {
  initUserBalance,
  updateBalanceInStorage,
  validateNewBalanceValue,
} from "./helperFunctions";
import { BALANCE_INIT_VALUE } from "../../config/constants";

function useBalance() {
  const [balance, setBalance] = React.useState<number>(initUserBalance);

  const handleUpdateBalance = React.useCallback((balance: number) => {
    validateNewBalanceValue(balance);

    updateBalanceInStorage(balance);

    setBalance(balance);
  }, []);

  const resetBalanceToInitValue = React.useCallback(() => {
    updateBalanceInStorage(BALANCE_INIT_VALUE);
    setBalance(BALANCE_INIT_VALUE);
  }, []);

  return { balance, handleUpdateBalance, resetBalanceToInitValue };
}

export { useBalance };
