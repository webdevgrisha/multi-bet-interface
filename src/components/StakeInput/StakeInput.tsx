import classNames from "classnames";
import { MAX_STAKE_AMOUNT, MIN_STAKE_AMOUNT } from "../../config/constants";
import styles from "./StakeInput.module.css";

interface StakeInputProps {
  stakeAmountValue: string;
  isDisabled: boolean;
  handleStakeChange: (value: string) => void;
  isError: boolean;
}

function StakeInput({
  stakeAmountValue,
  isDisabled,
  handleStakeChange,
  isError,
}: StakeInputProps) {
  const inputClass = classNames({
    [styles.stakeInput]: true,
    [styles.stakeInputError]: isError,
  });

  return (
    <div className={styles.inputWrapper}>
      <span className={styles.euroSign}>&euro;</span>
      <input
        type="text"
        pattern="[0-9]*"
        inputMode="numeric"
        min={MIN_STAKE_AMOUNT}
        max={MAX_STAKE_AMOUNT}
        className={inputClass}
        value={stakeAmountValue}
        onChange={(event) => handleStakeChange(event.target.value)}
        disabled={isDisabled}
      />
    </div>
  );
}

export { StakeInput };
