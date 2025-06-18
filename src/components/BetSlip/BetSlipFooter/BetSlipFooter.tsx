import { useBetContext } from "../../../context/BetContext/useBetContext";
import styles from "./BetSlipFooter.module.css";
import { SummaryRow } from "./SummaryRow/SummaryRow";
import classNames from "classnames";

function BetSlipFooter() {
  const {
    totalStakeAmount,
    totalEstPayoutAmount,
    submitPendingBets,
    submitPendingBetsError,
    submitPendingBetsStatus,
    termsAccepted,
    handleTermsAcceptanceChange,
  } = useBetContext();

  const handleSubmit = async () => {
    await submitPendingBets(termsAccepted);
  };

  const isTermsError = submitPendingBetsError?.toLowerCase().includes("terms");

  const termsClass = classNames({
    [styles.termsCheckbox]: true,
    [styles.termsCheckboxError]: isTermsError,
  });

  const isLoading = submitPendingBetsStatus === "loading";

  const submitBtnText = isLoading ? "Submitting" : "Submit Bets";

  return (
    <footer className={styles.footer}>
      <div className={styles.summaryRows}>
        <SummaryRow title="Total Stake" result={totalStakeAmount} />
        <SummaryRow title="Est. Payout" result={totalEstPayoutAmount} />
      </div>

      <div className={termsClass}>
        <input
          type="checkbox"
          id={"accept-terms-checkbox"}
          checked={termsAccepted}
          onChange={(event) =>
            handleTermsAcceptanceChange(event.target.checked)
          }
        />
        <label htmlFor={"accept-terms-checkbox"}>
          I accept the Terms & Conditions
        </label>
      </div>
      {submitPendingBetsError && (
        <div className={styles.submitError}>{submitPendingBetsError}</div>
      )}
      <button
        className={styles.submitBtn}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        <span>{submitBtnText}</span>
        {isLoading && <span className={styles.loader} />}
      </button>
    </footer>
  );
}

export { BetSlipFooter };
