import styles from "./Header.module.css";
import Tippy from "@tippyjs/react";
import { SVG_Logo } from "../../assets";
import { useBalanceContext } from "../../context/BalanceContext/useBalanceContext";

function Header() {
  const { balance } = useBalanceContext();

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
              <button className={styles.resetBtn}>Reset</button>
            </Tippy>
            <span className={styles.balance}>Balance: {balance} €</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
