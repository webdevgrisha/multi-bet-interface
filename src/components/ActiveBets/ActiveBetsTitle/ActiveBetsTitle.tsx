import { SVG_Bill } from "../../../assets";
import styles from "./ActiveBetsTitle.module.css";

interface ActiveBetsTitleProps {
  activeBetsCount: number;
}

function ActiveBetsTitle({ activeBetsCount }: ActiveBetsTitleProps) {
  return (
    <h2 className={styles.title}>
      <div className={styles.icon}>
        <SVG_Bill />
      </div>

      <span>My Bets</span>
      <span className={styles.count}>{activeBetsCount}</span>
    </h2>
  );
}

export { ActiveBetsTitle };
