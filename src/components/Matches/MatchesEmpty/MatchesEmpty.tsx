import styles from "./MatchesEmpty.module.css";

function MatchesEmpty() {
  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.emptyBox}>
        <p className={styles.emptyIcon}>📭</p>
        <h2 className={styles.emptyTitle}>No matches found</h2>
        <p className={styles.emptyMessage}>
          There are currently no matches available for this sport.
        </p>
      </div>
    </div>
  );
}

export { MatchesEmpty };
