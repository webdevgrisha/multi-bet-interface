import styles from "./App.module.css";
import { Matches } from "./components/Matches/Matches";

import { SportTypeFilter } from "./components/SportTypeFilter/SportTypeFilter";
import { BetSlip } from "./components/BetSlip/BetSlip";
import { Header } from "./components/Header/Header";

function App() {
  return (
    // <>
    <div className={styles.wrapper}>
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <SportTypeFilter />
            <Matches />
          </div>
        </main>
      </div>
      <div className={styles.rightSidebar}>
        <BetSlip />
      </div>
    </div>
    // </>
  );
}

export default App;
