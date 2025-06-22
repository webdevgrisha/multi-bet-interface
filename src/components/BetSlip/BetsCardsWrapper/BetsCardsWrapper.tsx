import styles from "./BetsCardsWrapper.module.css";
import { usePendingBetsContext } from "../../../contexts/PendingBetsContext/usePendingBetsContext";
import { BetCard } from "./BetCard/BetCard";
import type { PendingBets } from "../../../types/interfaces";
import type { JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EmptyBanner } from "../../Banners/EmptyBanner/EmptyBanner";
import { SuccessSubmitBanner } from "./SuccessSubmitBanner/SuccessSubmitBanner";

function renderBetCardArr(pendingBets: PendingBets): JSX.Element[] {
  const betCardArr = Object.values(pendingBets).flatMap((matchBetArr) => {
    const betCardArrFromMatch = matchBetArr.map((betInfo) => {
      return (
        <motion.div
          key={betInfo.betId}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{ width: "100%" }}
        >
          <BetCard betInfo={betInfo} />
        </motion.div>
      );
    });
    return [...betCardArrFromMatch];
  });

  return betCardArr;
}

function BetsWrapper() {
  const { pendingBets, pendingBetsCount, submitPendingBetsStatus } =
    usePendingBetsContext();

  if (submitPendingBetsStatus === "success") return <SuccessSubmitBanner />;
  if (pendingBetsCount === 0) return <EmptyBanner />;

  const betCardArr: JSX.Element[] = renderBetCardArr(pendingBets);

  return (
    <div className={styles.betsWrapper}>
      {submitPendingBetsStatus === "loading" && (
        <div className={styles.blurOverlay}></div>
      )}
      <AnimatePresence>{betCardArr}</AnimatePresence>
    </div>
  );
}

export { BetsWrapper };
