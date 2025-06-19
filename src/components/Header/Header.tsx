import styles from "./Header.module.css";
import Tippy from "@tippyjs/react";
import { SVG_Logo } from "../../assets";
import { useBalanceContext } from "../../context/BalanceContext/useBalanceContext";
import { useActiveBetsContext } from "../../context/ActiveBetsContext/useActiveBetsContext";
import { usePendingBetsContext } from "../../context/PendingBetsContext/usePendingBetsContext";
import React from "react";

function Header() {
  const { balance, resetBalanceToInitValue } = useBalanceContext();
  const { clearAllActiveBets } = useActiveBetsContext();
  const { clearAllPendingBets } = usePendingBetsContext();

  const resetAll = React.useCallback(async () => {
    clearAllPendingBets();
    resetBalanceToInitValue();
    await clearAllActiveBets();
  }, [clearAllActiveBets, clearAllPendingBets, resetBalanceToInitValue]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <SVG_Logo />
          </div>

          <div className={styles.balanceConfig}>
            <Tippy
              content="Reset all bets and balance to initial values"
              placement="bottom"
            >
              <button className={styles.resetBtn} onClick={resetAll}>
                Reset
              </button>
            </Tippy>
            <span className={styles.balance}>Balance: {balance} €</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
