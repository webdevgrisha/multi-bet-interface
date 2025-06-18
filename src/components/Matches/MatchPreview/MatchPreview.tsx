import { format } from "date-fns";
import type { MatchFullInfo } from "../../../types/interfaces";
import styles from "./MatchPreview.module.css";
import classNames from "classnames";
import React from "react";
import { Outcomes } from "./Outcomes/Outcomes";
import { ToggleArrowBtn } from "../../ToggleArrowBtn/ToggleArrowBtn";
import { useBetContext } from "../../../context/BetContext/useBetContext";

interface MatchProps {
  matchFullInfo: MatchFullInfo;
  showLines: boolean;
}

function MatchPreview({ matchFullInfo, showLines = true }: MatchProps) {
  const [isShowBetConfig, setShowBetConfig] = React.useState<boolean>(false);
  const { isMatchHasPendingBets } = useBetContext();
  const { id: matchId, commenceTime, homeTeam, awayTeam } = matchFullInfo.match;

  const date = new Date(commenceTime);
  const formattedDate = format(date, "eee, MMM d hh:mm a");

  const handleToggleShowBetConfig = React.useCallback(() => {
    setShowBetConfig((prev) => !prev);
  }, []);

  const toggleBtnWrapperClass = classNames({
    [styles.toggleBtnWrapper]: true,
    [styles.toggleBtnWrapperHidden]: !isMatchHasPendingBets(matchId),
  });

  return (
    <div className={styles.container}>
      <div className={styles.infoPart}>
        <span className={styles.time}>{formattedDate}</span>
        <div className={styles.teamWrapper}>
          <span className={styles.teamName}>{homeTeam}</span>
          <span className={styles.teamName}>{awayTeam}</span>
        </div>
      </div>

      <span
        className={classNames(styles.line, styles.lineStart, {
          [styles.lineHidden]: !showLines,
        })}
      />
      <span
        className={classNames(styles.line, styles.lineEnd, {
          [styles.lineHidden]: !showLines,
        })}
      />

      <Outcomes
        match={matchFullInfo.match}
        matchAdditionalInfo={matchFullInfo.additionalInfo}
      />

      <div className={toggleBtnWrapperClass}>
        <ToggleArrowBtn
          isOpen={isShowBetConfig}
          toggleCallback={handleToggleShowBetConfig}
        />
      </div>
    </div>
  );
}

export { MatchPreview };
