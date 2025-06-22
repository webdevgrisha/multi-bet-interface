import styles from "./ActiveBetsTotalResult.module.css";

interface ActiveBetsTotalResultProps {
  totalStakeAmount: string;
  totalEstPayoutAmount: string;
}

function ActiveBetsTotalResult({
  totalStakeAmount,
  totalEstPayoutAmount,
}: ActiveBetsTotalResultProps) {
  return (
    <div className={styles.totalResultWrapper}>
      <div className={styles.resultRow}>
        <span>Total Stake</span>
        <span>€ {totalStakeAmount}</span>
      </div>
      <div className={styles.resultRow}>
        <span>Est. Payout</span>
        <span>€ {totalEstPayoutAmount}</span>
      </div>
    </div>
  );
}

export { ActiveBetsTotalResult };
