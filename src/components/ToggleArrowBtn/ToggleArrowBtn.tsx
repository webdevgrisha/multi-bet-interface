import styles from "./ToggleArrowBtn.module.css";
import { SVG_Arrow } from "../../assets";
import classNames from "classnames";

interface ToggleArrowBtnProps {
  isOpen: boolean;
  toggleCallback: () => void;
}

function ToggleArrowBtn({
  isOpen = false,
  toggleCallback,
}: ToggleArrowBtnProps) {
  const toggleBtnClass = classNames({
    [styles.toggleBtn]: true,
    [styles["toggleBtn--rotated"]]: isOpen,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleCallback();
  };

  return (
    <button className={toggleBtnClass} onClick={handleClick}>
      <SVG_Arrow />
    </button>
  );
}

export { ToggleArrowBtn };
