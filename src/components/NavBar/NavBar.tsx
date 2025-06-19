import { SVG_Basketball, SVG_Bill } from "../../assets";
import { NavLink } from "react-router";
import styles from "./NavBar.module.css";
import classNames from "classnames";

function NavBar() {
  return (
    <nav className={styles.navBarWrapper}>
      <div className={styles.container}>
        <div className={styles.navBarContent}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              classNames(styles.navItem, { [styles.active]: isActive })
            }
          >
            <div className={styles.navIconWrapper}>
              <SVG_Basketball />
            </div>
            <span className={styles.navItemText}>Lobby</span>
          </NavLink>
          <NavLink
            to="/my-bets"
            className={({ isActive }) =>
              classNames(styles.navItem, { [styles.active]: isActive })
            }
          >
            <div className={styles.navIconWrapper}>
              <SVG_Bill />
            </div>
            <span className={styles.navItemText}>My Bets</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export { NavBar };
