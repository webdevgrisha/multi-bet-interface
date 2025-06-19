import styles from "./BetSlip.module.css";
import { BetsWrapper } from "./BetsWrapper/BetsWrapper";
import { ClearAllPendingBets } from "./ClearAllPendingBets/ClearAllPendingBets";
import { BetSlipFooter } from "./BetSlipFooter/BetSlipFooter";
import { BetSlipHeader } from "./BetSlipHeader/BetSlipHeader";
import React from "react";
import { SVG_Bill } from "../../assets";
import { usePendingBetsContext } from "../../context/PendingBetsContext/usePendingBetsContext";
import { motion, AnimatePresence } from "framer-motion";
import Tippy from "@tippyjs/react";

function BetSlip() {
  const { pendingBetsCount } = usePendingBetsContext();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (pendingBetsCount > 0) {
      setIsOpen(true);
    }
  }, [pendingBetsCount]);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  if (!isOpen) {
    return (
      <Tippy content="Open sidebar" placement="bottom">
        <div className={styles.reopenWrapper} onClick={handleOpen}>
          <button className={styles.reopenBtn}>
            <SVG_Bill />
            {pendingBetsCount > 0 && (
              <span className={styles.pendingBetsCount}>
                {pendingBetsCount}
              </span>
            )}
          </button>
        </div>
      </Tippy>
    );
  }

  return (
    <AnimatePresence>
      <motion.section
        className={styles.betSipWrapper}
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        key="betslip"
      >
        <BetSlipHeader onClose={handleClose} />
        <ClearAllPendingBets />
        <div className={styles.content}>
          <BetsWrapper />
        </div>
        <BetSlipFooter />
      </motion.section>
    </AnimatePresence>
  );
}

export { BetSlip };
