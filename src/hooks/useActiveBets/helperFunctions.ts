import { BASE_URL } from "../../config/constants";
import type { ActiveBetInfo } from "../../types/interfaces";
import { deleteData } from "../../utils/deleteData";
import { fetcher } from "../../utils/fetcher";


async function getAllActiveBetsHelper(): Promise<ActiveBetInfo[]> {
    const url = `${BASE_URL}/bets`;

    const data = await fetcher<ActiveBetInfo[]>(url);

    return data;
};

function calculateActiveBetsCount(activeBets: ActiveBetInfo[]): number {
    return activeBets.length;
}

function calculateActiveBetsTotalStakeAmount(activeBets: ActiveBetInfo[]): string {
    const totalCount: number = activeBets.reduce((sum, activeBetInfo) => sum += activeBetInfo.stakeAmount
        , 0);

    return totalCount.toFixed(2);
}

function calculateActiveBetsTotalEstPayoutAmount(activeBets: ActiveBetInfo[]): string {
    const totalCount: number = activeBets.reduce((sum, activeBetInfo) => sum += activeBetInfo.estPayout
        , 0);

    return totalCount.toFixed(2);
}

async function clearAllActiveBetsHelper(activeBets: ActiveBetInfo[]): Promise<void> {
    const url = `${BASE_URL}/bets/`;

    const deleteActiveBetsResponse = activeBets.map(({ id }) => deleteData(url + id));

    await Promise.all(deleteActiveBetsResponse);
}

export {
    getAllActiveBetsHelper,
    calculateActiveBetsCount,
    calculateActiveBetsTotalStakeAmount,
    calculateActiveBetsTotalEstPayoutAmount,
    clearAllActiveBetsHelper
}