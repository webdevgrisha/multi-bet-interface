import Tippy from "@tippyjs/react";
import type { ActiveBetInfo } from "../../../types/interfaces";
import styles from "./ActiveBetCard.module.css";
import { sportIcons } from "../../../config/sportIcons";
import { format } from "date-fns";

interface ActiveBetCardProps {
  activeBetInfo: ActiveBetInfo;
}

function ActiveBetCard({ activeBetInfo }: ActiveBetCardProps) {
  const {
    betTeamName,
    price,
    commenceTime,
    stakeAmount,
    estPayout,
    groupName,
    homeTeam,
    awayTeam,
    matchType,
    createdAt,
  } = activeBetInfo;

  const IconComponent = sportIcons[groupName];

  console.log("commenceTime:", commenceTime);
  const date = new Date(commenceTime);
  const formattedDate = format(date, "eee, MMM d hh:mm a");

  return (
    <div className={styles.activeBetCard}>
      <header className={styles.header}>{createdAt}</header>
      <div className={styles.matchInfo}>
        <div className={styles.teams}>
          <Tippy content={groupName} placement="bottom">
            <div className={styles.iconWrapper}>
              <IconComponent />
            </div>
          </Tippy>
          <span>{`${homeTeam} - ${awayTeam}`}</span>
        </div>

        <span className={styles.matchType}>{matchType}</span>
        <div className={styles.betInfo}>
          <span>{betTeamName}</span>
          <span>{price.toFixed(2)}</span>
        </div>
        <span className={styles.matchStart}>{formattedDate}</span>
      </div>
      <div className={styles.stakeResult}>
        <div className={styles.resultRow}>
          <span>Stake</span>
          <span>€ {stakeAmount.toFixed(2)}</span>
        </div>
        <div className={styles.resultRow}>
          <span>Est. Payout</span>
          <span>€ {estPayout.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export { ActiveBetCard };
