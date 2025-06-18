interface ValidateStakeProps {
    newStakeValue: number;
    totalStakeAmount: number;
    currentStakeAmount: number;
    balance: number;
}

function validateStake(validateStakeData: ValidateStakeProps) {
    const {
        newStakeValue,
        totalStakeAmount,
        currentStakeAmount,
        balance
    } = validateStakeData;

    const totalStakeWithoutCurrent: number = totalStakeAmount - currentStakeAmount;
    const newTotalStake: number = totalStakeWithoutCurrent + newStakeValue;

    if (newStakeValue < 1 || newStakeValue > 1000) {
        return "Stake must be between 1 and 1000";
    }

    if (newTotalStake > balance) {
        return `Total stake exceeds your balance by €${(newTotalStake - balance).toFixed(2)}`;
    }

    return null;
}

export { validateStake }