import classNames from "classnames";
import { usePendingBetsContext } from "../../../../../context/PendingBetsContext/usePendingBetsContext";
import type {
  Match,
  MatchAdditionalInfo,
  Outcome,
  PendingBetInfo,
} from "../../../../../types/interfaces";
import styles from "./OutcomeBtn.module.css";

interface OutcomeBtnProps {
  matchId: Match["id"];
  outcome: Outcome;
  matchAdditionalInfo: MatchAdditionalInfo;
}

function OutcomeBtn({
  matchId,
  outcome,
  matchAdditionalInfo,
}: OutcomeBtnProps) {
  const { isPendingBet, addPendingBet, removePendingBet } =
    usePendingBetsContext();

  const { name, price } = outcome;
  const isActive = isPendingBet({ matchId, betTeamName: name });

  const outcomeBtnClass = classNames({
    [styles.outcomeBtn]: true,
    [styles["outcomeBtn--active"]]: isActive,
  });

  const handelAddBet = () => {
    const pendingBetInfo: PendingBetInfo = {
      betId: crypto.randomUUID(),
      matchId,
      betTeamName: name,
      price,
      stakeAmount: 0,
      estPayout: 0,
      ...matchAdditionalInfo,
    };

    addPendingBet(pendingBetInfo);
  };

  const handleBtnClick = () => {
    if (isActive) {
      removePendingBet({ matchId, betTeamName: name });
    } else {
      handelAddBet();
    }
  };

  return (
    <button className={outcomeBtnClass} onClick={handleBtnClick}>
      <span className={styles.outcomeTeamName}>{name}</span>
      <span className={styles.outcomePrice}>{price}</span>
    </button>
  );
}

export { OutcomeBtn };
