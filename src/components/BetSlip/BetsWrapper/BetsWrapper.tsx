import styles from "./BetsWrapper.module.css";
import { useBetContext } from "../../../context/BetContext/useBetContext";
import { SVG_DollarBill, SVG_Success } from "../../../assets";
import { BetCard } from "./BetCard/BetCard";
import type { PendingBets } from "../../../types/interfaces";
import type { JSX } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

function EmptyBetList() {
  const wrapperClass = classNames({
    [styles.betsWrapper]: true,
    [styles.messageWrapper]: true,
  });

  return (
    <div className={wrapperClass}>
      <div className={styles.emptyBitsList}>
        <div className={styles.iconWrapper}>
          <SVG_DollarBill />
        </div>
        <span className={styles.infoText}>Bet Slip is Empty</span>
        {/* TODO: make a link */}
        <a href="#" className={styles.bettingNow}>
          Start Betting Now!
        </a>
      </div>
    </div>
  );
}

function SuccessSubmitMessage() {
  const wrapperClass = classNames({
    [styles.betsWrapper]: true,
    [styles.messageWrapper]: true,
  });

  return (
    <div className={wrapperClass}>
      <div className={styles.successMessage}>
        <div className={styles.iconWrapper}>
          <SVG_Success />
        </div>
        <span className={styles.infoText}>Bets submitted successfully!</span>
        <a href="#" className={styles.checkBets}>
          Check your bets list!
        </a>
      </div>
    </div>
  );
}

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
    useBetContext();

  if (submitPendingBetsStatus === "success") return <SuccessSubmitMessage />;
  if (pendingBetsCount === 0) return <EmptyBetList />;

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
