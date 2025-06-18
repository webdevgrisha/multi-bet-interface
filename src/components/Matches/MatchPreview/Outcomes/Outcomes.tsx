import type {
  Match,
  MatchAdditionalInfo,
  Outcome,
} from "../../../../types/interfaces";
import { OutcomeBtn } from "./OutcomeBtn/OutcomeBtn";
import styles from "./Outcomes.module.css";

interface OutcomesProps {
  match: Match;
  matchAdditionalInfo: MatchAdditionalInfo;
}

function Outcomes({ match, matchAdditionalInfo }: OutcomesProps) {
  const { homeTeam, awayTeam, outcomes } = match;

  const homeTeamOutcomeObj: Outcome = outcomes.find(
    (outcomeInfo) => outcomeInfo.name === homeTeam
  )!;
  const awayTeamOutcomeObj: Outcome = outcomes.find(
    (outcomeInfo) => outcomeInfo.name === awayTeam
  )!;
  const drawOutcomeObj: Outcome | undefined = outcomes.find(
    (outcomeInfo) => outcomeInfo.name === "Draw"
  );

  return (
    <div className={styles.outcomesPart}>
      <span className={styles.outcomeType}>
        {matchAdditionalInfo.matchType}
      </span>
      <div className={styles.outcomesBtnWrapper}>
        <OutcomeBtn
          matchId={match.id}
          outcome={homeTeamOutcomeObj}
          matchAdditionalInfo={matchAdditionalInfo}
        />
        {drawOutcomeObj && (
          <OutcomeBtn
            matchId={match.id}
            outcome={drawOutcomeObj}
            matchAdditionalInfo={matchAdditionalInfo}
          />
        )}
        <OutcomeBtn
          matchId={match.id}
          outcome={awayTeamOutcomeObj}
          matchAdditionalInfo={matchAdditionalInfo}
        />
      </div>
    </div>
  );
}

export { Outcomes };
