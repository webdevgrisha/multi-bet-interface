import styles from "./ActiveBetsLayout.module.css";
import { useActiveBetsContext } from "../../contexts/ActiveBetsContext/useActiveBetsContext";
import {
  ActiveBetsCardsWrapper,
  ActiveBetsTitle,
  ActiveBetsTotalResult,
} from "../../components/ActiveBets";

function ActiveBetsLayout() {
  const {
    activeBets,
    activeBetsCount,
    totalStakeAmount,
    totalEstPayoutAmount,
  } = useActiveBetsContext();

  return (
    <section className={styles.activeBetsSection}>
      <ActiveBetsTitle activeBetsCount={activeBetsCount} />
      <ActiveBetsCardsWrapper
        activeBetsCount={activeBetsCount}
        activeBets={activeBets}
      />
      {activeBetsCount > 0 && (
        <ActiveBetsTotalResult
          totalStakeAmount={totalStakeAmount}
          totalEstPayoutAmount={totalEstPayoutAmount}
        />
      )}
    </section>
  );
}

export { ActiveBetsLayout };
