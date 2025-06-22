import { format } from "date-fns";
import type { MatchFullInfo } from "../../../types/interfaces";
import styles from "./MatchPreview.module.css";
import classNames from "classnames";
// import React from "react";
import { Outcomes } from "./Outcomes/Outcomes";
// import { ToggleArrowBtn } from "../../ToggleArrowBtn/ToggleArrowBtn";
// import { usePendingBetsContext } from "../../../contexts/PendingBetsContext/usePendingBetsContext";

interface MatchProps {
  matchFullInfo: MatchFullInfo;
  showLines: boolean;
  isLast: boolean;
}

function MatchPreview({ matchFullInfo, isLast, showLines = true }: MatchProps) {
  // const [isShowStakePart, setShowStakePart] = React.useState<boolean>(false);
  // const { isMatchHasPendingBets } = usePendingBetsContext();
  const { id: matchId, commenceTime, homeTeam, awayTeam } = matchFullInfo.match;

  const date = new Date(commenceTime);
  const formattedDate = format(date, "eee, MMM d hh:mm a");

  // const handleToggleShowBetConfig = React.useCallback(() => {
  //   setShowStakePart((prev) => !prev);
  // }, []);

  // const toggleBtnWrapperClass = classNames({
  //   [styles.toggleBtnWrapper]: true,
  //   [styles.toggleBtnWrapperHidden]: !isMatchHasPendingBets(matchId),
  // });

  const matchPreviewClass = classNames({
    [styles.matchPreview]: true,
    [styles.noBorder]: isLast,
  });

  return (
    <div className={styles.matchContainer}>
      <div className={matchPreviewClass}>
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

        {/* <div className={toggleBtnWrapperClass}>
          <ToggleArrowBtn
            isOpen={isShowStakePart}
            toggleCallback={handleToggleShowBetConfig}
          />
        </div> */}
      </div>
    </div>
  );
}

export { MatchPreview };
