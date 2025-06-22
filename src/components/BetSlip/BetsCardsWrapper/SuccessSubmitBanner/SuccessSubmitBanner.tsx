import styles from "./SuccessSubmitBanner.module.css";
import { SVG_Success } from "../../../../assets";
import { Banner } from "../../../Banners/Banner/Banner";

function SuccessSubmitBanner() {
  return (
    <Banner
      infoText="Bets submitted successfully!"
      linkText="Check your bets list!"
      linkTo="/my-bets"
    >
      <div className={styles.icon}>
        <SVG_Success />
      </div>
    </Banner>
  );
}

export { SuccessSubmitBanner };
