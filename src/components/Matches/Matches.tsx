import classNames from "classnames";
import { useSportContext } from "../../context/SportContext/useSportContext";
import { Loader } from "../Loaders/WobblingLoader/WobblingLoader";
import { MatchPreview } from "./MatchPreview/MatchPreview";
import { SportAccordion } from "../SportAccordion/SportAccordion";
import styles from "./Matches.module.css";
import React from "react";
import type {
  MatchAdditionalInfo,
  MatchFullInfo,
} from "../../types/interfaces";
import type { MatchType } from "../../types/types";

function MatchWrapperLoader() {
  return (
    <section className={classNames(styles.matchesWrapper, styles.loaderMargin)}>
      <Loader />
    </section>
  );
}

function Matches() {
  const { selectedSport, sportsData, error, isLoading, loadMore, hasMore } =
    useSportContext();
  const observerRef = React.useRef(null);

  //   стоит ли вынести в customHook
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "300px",
      }
    );

    const currentObserveElem = observerRef.current;

    if (currentObserveElem !== null) {
      observer.observe(currentObserveElem);
    }

    return () => {
      if (currentObserveElem !== null) {
        observer.unobserve(currentObserveElem);
      }
    };
  }, [hasMore, loadMore]);

  if (isLoading) return <MatchWrapperLoader />;

  if (error) {
    return <h2>Sorry there is was error when we load matches</h2>;
  }

  if (sportsData === undefined) {
    return <h2>No matches for this sport</h2>;
  }

  const sportsArr = sportsData.sports;

  return (
    <section className={styles.matchesWrapper}>
      {sportsArr.map((sport) => {
        const { key, name, description, matches } = sport;

        if (matches.length === 0) return;

        return (
          <SportAccordion
            key={key}
            sportName={name}
            description={description}
            matchCount={matches.length}
          >
            {matches.map((match, index) => {
              const matchType: MatchType =
                match.outcomes.length === 2 ? "Winner" : "1x2";

              const additionalInfo: MatchAdditionalInfo = {
                groupName: selectedSport,
                sportName: name,
                sportDescription: description,
                homeTeam: match.homeTeam,
                awayTeam: match.awayTeam,
                matchType,
              };

              const matchFullInfo: MatchFullInfo = {
                match: match,
                additionalInfo,
              };

              return (
                <MatchPreview
                  key={match.id}
                  matchFullInfo={matchFullInfo}
                  showLines={index !== 0}
                />
              );
            })}
          </SportAccordion>
        );
      })}

      <div ref={observerRef} className={styles.paginationTrigger}></div>
    </section>
  );
}

export { Matches };
