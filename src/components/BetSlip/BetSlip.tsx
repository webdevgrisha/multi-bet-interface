import styles from "./BetSlip.module.css";
import { BetsWrapper } from "./BetsWrapper/BetsWrapper";
import { ClearAllPendingBets } from "./ClearAllPendingBets/ClearAllPendingBets";
import { BetSlipFooter } from "./BetSlipFooter/BetSlipFooter";
import { BetSlipHeader } from "./BetSlipHeader/BetSlipHeader";

function BetSlip() {
  return (
    <section className={styles.betSipWrapper}>
      <BetSlipHeader />

      <ClearAllPendingBets />

      <div className={styles.content}>
        <BetsWrapper />
      </div>

      <BetSlipFooter />
    </section>
  );
}

export { BetSlip };
