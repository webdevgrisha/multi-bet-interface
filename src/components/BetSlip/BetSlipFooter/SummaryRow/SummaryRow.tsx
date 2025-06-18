import styles from "./SummaryRow.module.css";

interface SummaryRowProps {
  title: string;
  result: string;
}

function SummaryRow({ title, result }: SummaryRowProps) {
  return (
    <div className={styles.summaryRow}>
      <span className={styles.rowTitle}>{title}</span>
      <span className={styles.rowResult}>€ {result}</span>
    </div>
  );
}

export { SummaryRow };
