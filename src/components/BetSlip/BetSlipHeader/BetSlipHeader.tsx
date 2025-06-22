import styles from "./BetSlipHeader.module.css";
import Tippy from "@tippyjs/react";
import { SVG_Bill, SVG_Close } from "../../../assets";
import { usePendingBetsContext } from "../../../contexts/PendingBetsContext/usePendingBetsContext";

interface BetSlipHeaderProps {
  onClose: () => void;
}

function BetSlipHeader({ onClose }: BetSlipHeaderProps) {
  const { pendingBetsCount } = usePendingBetsContext();

  return (
    <header className={styles.header}>
      <div className={styles.headerInfo}>
        <div className={styles.headerIcon}>
          <SVG_Bill />
        </div>
        <h4 className={styles.headerTitle}>Bet Slip</h4>
        <span className={styles.pendingBetsCount}>{pendingBetsCount}</span>
      </div>
      <Tippy content="Collapse sidebar" placement="bottom">
        <button className={styles.closeBtn} onClick={onClose}>
          <SVG_Close />
        </button>
      </Tippy>
    </header>
  );
}

export { BetSlipHeader };
