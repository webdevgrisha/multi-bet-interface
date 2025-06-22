import styles from "./Banner.module.css";
import { Link } from "react-router";

interface BannerProps {
  children: React.ReactNode;
  infoText: string;
  linkText: string;
  linkTo: string;
}

function Banner({ children, infoText, linkText, linkTo }: BannerProps) {
  return (
    <div className={styles.bannerWrapper}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>{children}</div>
        <span className={styles.infoText}>{infoText}</span>
        <Link to={linkTo} className={styles.link}>
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export { Banner };
