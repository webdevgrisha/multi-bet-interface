import { SVG_Clear } from "../../../assets";
import { useBetContext } from "../../../context/BetContext/useBetContext";
import styles from "./ClearAllPendingBets.module.css";

function ClearAllPendingBets() {
  const { clearAllPendingBets } = useBetContext();

  return (
    <div className={styles.clearAllWrapper}>
      <button className={styles.clearAllBtn} onClick={clearAllPendingBets}>
        <div className={styles.clearAllBtnIcon}>
          <SVG_Clear />
        </div>
        <span>Clear All</span>
      </button>
    </div>
  );
}

export { ClearAllPendingBets };
