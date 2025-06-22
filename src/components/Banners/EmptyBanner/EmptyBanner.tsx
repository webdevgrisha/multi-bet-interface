import styles from "./EmptyBanner.module.css";
import { SVG_DollarBill } from "../../../assets";
import { Banner } from "../Banner/Banner";

function EmptyBanner() {
  return (
    <Banner
      infoText="Bet Slip is Empty"
      linkText="Start Betting Now!"
      linkTo="/"
    >
      <div className={styles.icon}>
        <SVG_DollarBill />
      </div>
    </Banner>
  );
}

export { EmptyBanner };
