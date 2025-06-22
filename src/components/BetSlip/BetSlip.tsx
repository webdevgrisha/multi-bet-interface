import styles from "./BetSlip.module.css";
import { BetsWrapper } from "./BetsCardsWrapper/BetsCardsWrapper";
import { ClearAllPendingBets } from "./ClearAllPendingBets/ClearAllPendingBets";
import { BetSlipFooter } from "./BetSlipFooter/BetSlipFooter";
import { BetSlipHeader } from "./BetSlipHeader/BetSlipHeader";
import React from "react";
import { SVG_Bill } from "../../assets";
import { usePendingBetsContext } from "../../contexts/PendingBetsContext/usePendingBetsContext";
import Tippy from "@tippyjs/react";
import { useLocation, useNavigate } from "react-router";

function BetSlip() {
  const { pendingBetsCount } = usePendingBetsContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const isTabOpen =
      new URLSearchParams(location.search).get("tab") === "bet-slip";

    setIsOpen(isTabOpen);
  }, [location.search]);

  React.useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (!isMobile && pendingBetsCount > 0) {
      setIsOpen(true);
    }
  }, [pendingBetsCount]);

  const handleClose = () => {
    setIsOpen(false);

    const params = new URLSearchParams(location.search);
    params.delete("tab");
    navigate(
      { pathname: location.pathname, search: params.toString() },
      { replace: true }
    );
  };
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
    <div className={styles.betSipWrapper}>
      <BetSlipHeader onClose={handleClose} />
      <ClearAllPendingBets />
      <div className={styles.content}>
        <BetsWrapper />
      </div>
      <BetSlipFooter />
    </div>
  );
}

export { BetSlip };
