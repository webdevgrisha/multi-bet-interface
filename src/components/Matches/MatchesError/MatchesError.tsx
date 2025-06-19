import styles from "./MatchesError.module.css";

function MatchesError() {
  return (
    <div className={styles.errorBox}>
      <p className={styles.errorIcon}>⚠️</p>
      <h2 className={styles.errorTitle}>Something went wrong</h2>
      <p className={styles.errorMessage}>
        Sorry, there was an error while loading the matches.
      </p>
    </div>
  );
}

export { MatchesError };
