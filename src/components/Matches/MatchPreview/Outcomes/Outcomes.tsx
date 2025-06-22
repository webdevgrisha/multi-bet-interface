import type { Match, MatchAdditionalInfo } from "../../../../types/interfaces";
import { OutcomeBtn } from "./OutcomeBtn/OutcomeBtn";
import styles from "./Outcomes.module.css";

interface OutcomesProps {
  match: Match;
  matchAdditionalInfo: MatchAdditionalInfo;
}

function Outcomes({ match, matchAdditionalInfo }: OutcomesProps) {
  const { homeTeam, awayTeam, outcomes } = match;

  const homeTeamOutcomeIndex: number = outcomes.findIndex(
    (outcomeInfo) => outcomeInfo.name === homeTeam
  )!;
  const awayTeamOutcomeIndex: number = outcomes.findIndex(
    (outcomeInfo) => outcomeInfo.name === awayTeam
  )!;
  const drawOutcomeIndex: number = outcomes.findIndex(
    (outcomeInfo) => outcomeInfo.name === "Draw"
  );

  return (
    <div className={styles.outcomesPart}>
      <span className={styles.outcomeType}>
        {matchAdditionalInfo.matchType}
      </span>
      <div className={styles.outcomesBtnWrapper}>
        <OutcomeBtn
          match={match}
          outcomeIndex={homeTeamOutcomeIndex}
          matchAdditionalInfo={matchAdditionalInfo}
        />
        {drawOutcomeIndex !== -1 && (
          <OutcomeBtn
            match={match}
            outcomeIndex={drawOutcomeIndex}
            matchAdditionalInfo={matchAdditionalInfo}
          />
        )}
        <OutcomeBtn
          match={match}
          outcomeIndex={awayTeamOutcomeIndex}
          matchAdditionalInfo={matchAdditionalInfo}
        />
      </div>
    </div>
  );
}

export { Outcomes };
