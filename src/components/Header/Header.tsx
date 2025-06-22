import styles from "./Header.module.css";
import Tippy from "@tippyjs/react";
import { SVG_Logo } from "../../assets";
import { useBalanceContext } from "../../contexts/BalanceContext/useBalanceContext";
import { useActiveBetsContext } from "../../contexts/ActiveBetsContext/useActiveBetsContext";
import { usePendingBetsContext } from "../../contexts/PendingBetsContext/usePendingBetsContext";
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
            <span className={styles.logoText}>Multi-Bet</span>
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
