import type { PendingBets, PendingBetSearchData } from "../../types/interfaces";

interface FindBetIndexProps {
    currentPendingBets: PendingBets;
    pendingBetSearchData: PendingBetSearchData;
}

function findBetIndex({ currentPendingBets, pendingBetSearchData }: FindBetIndexProps): number {
    const { matchId, betId } = pendingBetSearchData;

    const pendingBetIndex = currentPendingBets[matchId].findIndex(
        (betInfo) => betInfo.betId === betId
    );

    return pendingBetIndex;
}

interface ValidateStakeProps {
    newStakeValue: number;
    totalStakeAmount: number;
    currentStakeAmount: number;
    balance: number;
}

function validateStakeValue(validateStakeData: ValidateStakeProps) {
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

export {
    findBetIndex,
    validateStakeValue
}