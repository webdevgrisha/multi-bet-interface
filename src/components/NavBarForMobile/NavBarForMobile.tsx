import { SVG_Active, SVG_Basketball, SVG_Bill } from "../../assets";
import { NavLink, useLocation } from "react-router";
import styles from "./NavBarForMobile.module.css";
import classNames from "classnames";
import { usePendingBetsContext } from "../../contexts/PendingBetsContext/usePendingBetsContext";
import { useActiveBetsContext } from "../../contexts/ActiveBetsContext/useActiveBetsContext";

function NavBarForMobile() {
  const { pendingBetsCount } = usePendingBetsContext();
  const { activeBetsCount } = useActiveBetsContext();
  const location = useLocation();

  const isLobbyActive =
    location.pathname === "/" && !location.search.includes("tab=bet-slip");

  const isBetSlipActive =
    location.pathname === "/" && location.search.includes("tab=bet-slip");

  const isMyBetsActive = location.pathname === "/my-bets";

  return (
    <nav className={styles.navBarWrapper}>
      <NavLink
        to="/my-bets"
        className={() =>
          classNames(styles.navItem, { [styles.active]: isMyBetsActive })
        }
      >
        <span className={styles.count}>{activeBetsCount}</span>
        <div className={styles.navIconWrapper}>
          <SVG_Active />
        </div>
        <span className={styles.navItemText}>My Bets</span>
      </NavLink>

      <NavLink
        to="/"
        className={() =>
          classNames(styles.navItem, { [styles.active]: isLobbyActive })
        }
      >
        <div className={styles.navIconWrapper}>
          <SVG_Basketball />
        </div>
        <span className={styles.navItemText}>Lobby</span>
      </NavLink>

      <NavLink
        to={{ pathname: "/", search: "?tab=bet-slip" }}
        className={() =>
          classNames(styles.navItem, { [styles.active]: isBetSlipActive })
        }
      >
        <span className={styles.count}>{pendingBetsCount}</span>
        <div className={styles.navIconWrapper}>
          <SVG_Bill />
        </div>
        <span className={styles.navItemText}>Bet Slip</span>
      </NavLink>
    </nav>
  );
}

export { NavBarForMobile };
