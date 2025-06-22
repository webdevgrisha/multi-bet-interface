import classNames from "classnames";
import { usePendingBetsContext } from "../../../../../contexts/PendingBetsContext/usePendingBetsContext";
import type {
  Match,
  MatchAdditionalInfo,
  PendingBetInfo,
} from "../../../../../types/interfaces";
import styles from "./OutcomeBtn.module.css";
import React from "react";

interface OutcomeBtnProps {
  match: Match;
  outcomeIndex: number;
  matchAdditionalInfo: MatchAdditionalInfo;
}

function OutcomeBtn({
  match,
  outcomeIndex,
  matchAdditionalInfo,
}: OutcomeBtnProps) {
  const { isPendingBet, addPendingBet, removePendingBet } =
    usePendingBetsContext();

  const { id: matchId, commenceTime, homeTeam, awayTeam, outcomes } = match;
  const { name: betTeamName, price } = outcomes[outcomeIndex];

  const betIdRef = React.useRef(`${matchId}-${betTeamName}`);

  const isActive = isPendingBet({ matchId, betId: betIdRef.current });

  const outcomeBtnClass = classNames({
    [styles.outcomeBtn]: true,
    [styles["outcomeBtn--active"]]: isActive,
  });

  const handelAddBet = () => {
    const pendingBetInfo: PendingBetInfo = {
      betId: betIdRef.current,
      matchId,
      commenceTime,
      homeTeam,
      awayTeam,
      betTeamName,
      price,
      stakeAmount: 0,
      estPayout: 0,
      ...matchAdditionalInfo,
    };

    addPendingBet(pendingBetInfo);
  };

  const handleBtnClick = () => {
    if (isActive) {
      removePendingBet({ matchId, betId: betIdRef.current });
    } else {
      handelAddBet();
    }
  };

  return (
    <button className={outcomeBtnClass} onClick={handleBtnClick}>
      <span className={styles.outcomeTeamName}>{betTeamName}</span>
      <span className={styles.outcomePrice}>{price.toFixed(2)}</span>
    </button>
  );
}

export { OutcomeBtn };
