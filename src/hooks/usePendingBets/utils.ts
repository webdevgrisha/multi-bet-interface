import type { PendingBets, PendingBetSearchData } from "../../types/interfaces";

interface FindBetIndexProps {
    currentPendingBets: PendingBets;
    pendingBetSearchData: PendingBetSearchData;
}

function findBetIndex({ currentPendingBets, pendingBetSearchData }: FindBetIndexProps): number {
    const { matchId, betTeamName } = pendingBetSearchData;

    const pendingBetIndex = currentPendingBets[matchId].findIndex(
        (betInfo) => betInfo.betTeamName === betTeamName
    );

    return pendingBetIndex;
}

export {
    findBetIndex
}