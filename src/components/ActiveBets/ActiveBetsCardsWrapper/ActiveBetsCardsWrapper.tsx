import type { ActiveBetInfo } from "../../../types/interfaces";
import { EmptyBanner } from "../../Banners/EmptyBanner/EmptyBanner";
import { ActiveBetCard } from "../ActiveBetCard/ActiveBetCard";
import styles from "./ActiveBetsCardsWrapper.module.css";

interface ActiveBetsCardsWrapperProps {
  activeBetsCount: number;
  activeBets: ActiveBetInfo[];
}

function ActiveBetsCardsWrapper({
  activeBetsCount,
  activeBets,
}: ActiveBetsCardsWrapperProps) {
  if (activeBetsCount === 0) {
    return (
      <div className={styles.bannerWrapper}>
        <EmptyBanner />
      </div>
    );
  }

  return (
    <div className={styles.activeBetsWrapper}>
      {activeBets.map((activeBetInfo) => (
        <ActiveBetCard key={activeBetInfo.id} activeBetInfo={activeBetInfo} />
      ))}
    </div>
  );
}

export { ActiveBetsCardsWrapper };
