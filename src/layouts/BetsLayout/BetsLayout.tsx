import styles from "./BetsLayout.module.css";
import { Matches } from "../../components/Matches/MatchesPreviewsWrapper/MatchesPreviewsWrapper";
import { SportTypeFilter } from "../../components/SportTypeFilter/SportTypeFilter";
import { SportProvider } from "../../contexts/SportContext/SportProvider";

function BetsLayout() {
  return (
    <SportProvider>
      <section className={styles.betsSection}>
        <SportTypeFilter />
        <Matches />
      </section>
    </SportProvider>
  );
}

export { BetsLayout };
