import classNames from "classnames";
import styles from "./StakePart.module.css";
import { usePendingBetsContext } from "../../../../contexts/PendingBetsContext/usePendingBetsContext";
import React from "react";

interface StackPartProps {
  isOpen: boolean;
}

function StakePart({ isOpen }: StackPartProps) {
  const {
    removePendingBet,
    updatePendingBet,
    totalStakeAmount,
    submitPendingBetsStatus,
  } = usePendingBetsContext();

  const [stakeAmountValue, setStakeAmountValue] = React.useState<string>(
    stakeAmount.toFixed(2)
  );

  const inputClass = classNames({
    [styles.stakeInput]: true,
    // [styles.stakeInputError]: pendingBetErrorText && shouldShowError,
  });

  if (isOpen) {
    return null;
  }

  return (
    <div className={styles.stakeBlock}>
      <div className={styles.inputWrapper}>
        <span className={styles.euroSign}>&euro;</span>
        <input
          type="text"
          pattern="[0-9]*"
          inputMode="numeric"
          min={1}
          max={1000}
          className={inputClass}
          value={stakeAmountValue}
          onChange={(event) => handleStakeChange(event.target.value)}
          disabled={submitPendingBetsStatus === "loading"}
        />
      </div>
      <div className={styles.estPayoutWrapper}>
        <span className={styles.estPayoutText}>Est. Payout</span>
        <span className={styles.estPayout}>&euro; {estPayout.toFixed(2)}</span>
      </div>
    </div>
  );
}

export { StakePart };
