import styles from "./BetCard.module.css";
import type { PendingBetInfo } from "../../../../types/interfaces";
import { SVG_Close } from "../../../../assets";
import { useBetContext } from "../../../../context/BetContext/useBetContext";
import React from "react";
import classNames from "classnames";
import { BetCardError } from "./BetCardError/BetCardError";
import { useBalanceContext } from "../../../../context/BalanceContext/useBalanceContext";
import { validateStake } from "./helperFunctions";

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
    totalStakeAmount,
    setPendingBetError,
    getPendingBetErrorByBetId,
    submitPendingBetsStatus,
  } = useBetContext();
  const { balance } = useBalanceContext();

  const [stakeAmountValue, setStakeAmountValue] = React.useState<string>(
    stakeAmount.toFixed(2)
  );

  const [wasTouched, setWasTouched] = React.useState(false);

  React.useEffect(() => {
    const validationError: string | null = validateStake({
      newStakeValue: Number(stakeAmountValue),
      totalStakeAmount: Number(totalStakeAmount),
      currentStakeAmount: stakeAmount,
      balance,
    });

    setPendingBetError(betId, validationError);
  }, [
    totalStakeAmount,
    balance,
    stakeAmountValue,
    stakeAmount,
    wasTouched,
    betId,
    setPendingBetError,
  ]);

  const handleRemovePendingBet = () => {
    removePendingBet({ matchId, betTeamName });
  };

  const handleStakeChange = (value: string) => {
    setWasTouched(true);

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) return;

    setStakeAmountValue(value);

    const validationError: string | null = validateStake({
      newStakeValue: numericValue,
      totalStakeAmount: Number(totalStakeAmount),
      currentStakeAmount: stakeAmount,
      balance,
    });

    setPendingBetError(betId, validationError);

    if (!validationError) {
      const updated = {
        stakeAmount: numericValue,
        estPayout: +(numericValue * price).toFixed(2),
      };

      updatePendingBet({ matchId, betTeamName }, updated);
    }
  };

  const pendingBetErrorText = getPendingBetErrorByBetId(betId);
  const shouldShowError = wasTouched || submitPendingBetsStatus === "error";

  const inputClass = classNames({
    [styles.stakeInput]: true,
    [styles.stakeInputError]: pendingBetErrorText && shouldShowError,
  });

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
          <span className={styles.betPrice}>{price}</span>
        </div>
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
