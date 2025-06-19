import styles from "./RootLayout.module.css";
import { Header } from "../../components/Header/Header";
import { NavBar } from "../../components/NavBar/NavBar";
import { BetSlip } from "../../components/BetSlip/BetSlip";
import { Outlet } from "react-router";


function RootLayout() {

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <Header />
        <NavBar />
        <main className={styles.main}>
          <div className={styles.container}>
            <Outlet />
          </div>
        </main>
      </div>
      <div className={styles.rightSidebar}>
        <BetSlip />
      </div>
    </div>
  );
}

export { RootLayout };
