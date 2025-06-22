import styles from "./BetCard.module.css";
import type { PendingBetInfo } from "../../../../types/interfaces";
import { SVG_Close } from "../../../../assets";
import { usePendingBetsContext } from "../../../../contexts/PendingBetsContext/usePendingBetsContext";
import React from "react";
import { BetCardError } from "./BetCardError/BetCardError";
import { StakeInput } from "../../../StakeInput/StakeInput";

interface BetCardProps {
  betInfo: PendingBetInfo;
}

function BetCard({ betInfo }: BetCardProps) {
  const {
    matchId,
    betId,
    matchType,
    price,
    estPayout,
    betTeamName,
    homeTeam,
    awayTeam,
    stakeAmount,
  } = betInfo;

  const {
    removePendingBet,
    updatePendingBet,
    getPendingBetErrorByBetId,
    submitPendingBetsStatus,
  } = usePendingBetsContext();

  const [stakeAmountValue, setStakeAmountValue] = React.useState<string>(
    stakeAmount.toFixed(2)
  );

  const [wasTouched, setWasTouched] = React.useState(false);

  const handleRemovePendingBet = () => {
    removePendingBet({ matchId, betId });
  };

  const handleStakeChange = (value: string) => {
    setWasTouched(true);

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) return;

    setStakeAmountValue(value);

    const updated = {
      currentStakeAmount: stakeAmount,
      stakeAmount: numericValue,
      estPayout: +(numericValue * price).toFixed(2),
    };

    updatePendingBet({ matchId, betId }, updated);
  };

  const pendingBetErrorText = getPendingBetErrorByBetId(betId);
  const shouldShowError = wasTouched || submitPendingBetsStatus === "error";
  const isInputError = Boolean(pendingBetErrorText && shouldShowError);

  return (
    <div className={styles.betCard}>
      <header className={styles.header}>
        <span className={styles.teamNames}>{`${homeTeam} - ${awayTeam}`}</span>
        <button
          className={styles.deleteBetBtn}
          onClick={handleRemovePendingBet}
        >
          <SVG_Close />
        </button>
      </header>
      <div className={styles.content}>
        <span className={styles.matchType}>{matchType}</span>
        <div className={styles.outcomeInfo}>
          <span className={styles.betTeamName}>{betTeamName}</span>
          <span className={styles.betPrice}>{price.toFixed(2)}</span>
        </div>
        <div className={styles.stakeBlock}>
          <StakeInput
            stakeAmountValue={stakeAmountValue}
            isDisabled={submitPendingBetsStatus === "loading"}
            handleStakeChange={handleStakeChange}
            isError={isInputError}
          />
          <div className={styles.estPayoutWrapper}>
            <span className={styles.estPayoutText}>Est. Payout</span>
            <span className={styles.estPayout}>
              &euro; {estPayout.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <BetCardError error={shouldShowError ? pendingBetErrorText : null} />
    </div>
  );
}

export { BetCard };
