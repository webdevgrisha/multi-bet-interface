import styles from "./RootLayout.module.css";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/NavBar/NavBar";
import { BetSlip } from "../../components/BetSlip/BetSlip";
import { Outlet } from "react-router";
import { NavBarForMobile } from "../../components/NavBarForMobile/NavBarForMobile";
import { SVG_Logo } from "../../assets";
import { BalanceProvider } from "../../contexts/BalanceContext/BalanceProvider";
import { ActiveBetsProvider } from "../../contexts/ActiveBetsContext/ActiveBetsProvider";
import { PendingBetsProvider } from "../../contexts/PendingBetsContext/PendingBetsProvider";

function RootLayout() {
  return (
    <BalanceProvider>
      <ActiveBetsProvider>
        <PendingBetsProvider>
          <div className={styles.wrapper}>
            <div className={styles.mainContent}>
              <Header />
              <NavBar />
              <div className={styles.scrollableContent}>
                <main className={styles.main}>
                  <div className={styles.container}>
                    <Outlet />
                  </div>
                </main>

                <footer className={styles.footer}>
                  <div className={styles.container}>
                    <div className={styles.logo}>
                      <SVG_Logo />
                      <span className={styles.logoText}>Multi-Bet</span>
                    </div>
                    <span>© 2025 Multi-Bet.com | All Rights Reserved.</span>
                  </div>
                </footer>
              </div>
            </div>
            <div className={styles.rightSidebar}>
              <BetSlip />
            </div>
            <NavBarForMobile />
          </div>
        </PendingBetsProvider>
      </ActiveBetsProvider>
    </BalanceProvider>
  );
}

export { RootLayout };
