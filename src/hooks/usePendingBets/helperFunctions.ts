import { BASE_URL } from "../../config/constants";
import type { ActiveBetInfo, Match, Outcome, PendingBetInfo, PendingBets, PendingBetSearchData, PendingBetsErrors, PendingBetUpdateData } from "../../types/interfaces";
import type { BetToSubmit } from "../../types/types";
import { postData } from "../../utils/postData";
import { findBetIndex } from "./utils";

function getPendingBetsFromStorage(): PendingBets {
    const currentPendingBets: PendingBets = JSON.parse(
        localStorage.getItem("pendingBets") || "{}"
    );

    return currentPendingBets;
};

function calculatePendingBetsCount(pendingBets: PendingBets): number {
    const totalCount: number = Object.values(pendingBets).reduce((sum, matchBetsArr) => {
        return sum += matchBetsArr.length;
    }, 0);

    return totalCount;
}

function calculatePendingBetsTotalStakeAmount(pendingBets: PendingBets): string {
    const totalCount: number = Object.values(pendingBets).reduce((sum, matchBetsArr) => {
        return sum += matchBetsArr.reduce((sumForMatchBets, betInfo) => sumForMatchBets + betInfo.stakeAmount, 0);
    }, 0);

    return totalCount.toFixed(2);
}

function calculatePendingBetsTotalEstPayoutAmount(pendingBets: PendingBets): string {
    const totalCount: number = Object.values(pendingBets).reduce((sum, matchBetsArr) => {
        return sum += matchBetsArr.reduce((sumForMatchBets, betInfo) => sumForMatchBets + betInfo.estPayout, 0);
    }, 0);

    return totalCount.toFixed(2);
}

function updatePendingBetsStorage(newPendingBets: PendingBets): void {
    localStorage.setItem("pendingBets", JSON.stringify(newPendingBets));
};

function addPendingBetHelper(pendingBetInfo: PendingBetInfo): PendingBets {
    const currentPendingBets = getPendingBetsFromStorage();

    const { matchId } = pendingBetInfo;

    if (currentPendingBets[matchId]) {
        currentPendingBets[matchId].push(pendingBetInfo);
    } else {
        currentPendingBets[matchId] = [pendingBetInfo];
    }

    return currentPendingBets;
}

function updatePendingBetHelper(pendingBetSearchData: PendingBetSearchData, pendingBetUpdateInfo: PendingBetUpdateData): PendingBets {
    const currentPendingBets = getPendingBetsFromStorage();

    const { matchId } = pendingBetSearchData;

    const pendingBetIndex = findBetIndex({ currentPendingBets, pendingBetSearchData })

    if (pendingBetIndex !== -1) {
        const pendingBetInfo = currentPendingBets[matchId][pendingBetIndex];

        const updatedPendingBetInfo = { ...pendingBetInfo, ...pendingBetUpdateInfo };

        currentPendingBets[matchId][pendingBetIndex] = updatedPendingBetInfo;
    }

    return currentPendingBets
}

function removePendingBetHelper(pendingBetSearchData: PendingBetSearchData): PendingBets {
    const currentPendingBets = getPendingBetsFromStorage();

    const { matchId } = pendingBetSearchData;

    const pendingBetIndex = findBetIndex({ currentPendingBets, pendingBetSearchData })

    if (pendingBetIndex !== -1) {
        if (currentPendingBets[matchId].length === 1) {
            delete currentPendingBets[matchId];
        } else {
            currentPendingBets[matchId].splice(pendingBetIndex, 1);
        }
    }

    return currentPendingBets;
}

interface isPendingBetHelperProps {
    pendingBets: PendingBets;
    matchId: Match["id"];
    betTeamName: Outcome["name"];
}

function isPendingBetHelper(propsObj: isPendingBetHelperProps): boolean {
    const { pendingBets, matchId, betTeamName } = propsObj;

    if (!(matchId in pendingBets)) return false;

    const betsInfoArr: PendingBetInfo[] = pendingBets[matchId];

    const isBetExist: boolean =
        betsInfoArr.find((betInfo) => betInfo.betTeamName === betTeamName) !==
        undefined;

    return isBetExist;
}

function isMatchHasPendingBetsHelper(matchId: Match["id"], pendingBets: PendingBets): boolean {
    return matchId in pendingBets
}

function hasAnyPendingBetErrorHelper(pendingBetsErrors: PendingBetsErrors): boolean {
    return Object.values(pendingBetsErrors).some((pendingBetErrorText) => pendingBetErrorText !== null);
}

function getPendingBetErrorByBetIdHelper(betId: PendingBetInfo["betId"], pendingBetsErrors: PendingBetsErrors): string | null {
    return pendingBetsErrors[betId] || null;
}


async function submitPendingBetToServer(pendingBets: PendingBets) {
    const url: string = `${BASE_URL}/bets`;

    const betToSubmitArr: BetToSubmit[] = Object.values(pendingBets).flatMap((pendingBetsInfoArr) => {
        return pendingBetsInfoArr.map((pendingBetsInfo) => {
            const cleanBet: BetToSubmit = {
                matchId: pendingBetsInfo.matchId,
                matchType: pendingBetsInfo.matchType,
                price: pendingBetsInfo.price,
                stakeAmount: pendingBetsInfo.stakeAmount,
                estPayout: pendingBetsInfo.estPayout,
                homeTeam: pendingBetsInfo.homeTeam,
                awayTeam: pendingBetsInfo.awayTeam,
                betTeamName: pendingBetsInfo.betTeamName,
                groupName: pendingBetsInfo.groupName,
                sportName: pendingBetsInfo.sportName,
                sportDescription: pendingBetsInfo.sportDescription,
                createdAt: new Date().toISOString(),
                status: "open",
            };

            return cleanBet;
        });
    })

    const promiseArr = betToSubmitArr.map((betToSubmit) => {
        return postData<BetToSubmit, ActiveBetInfo>(url, betToSubmit)
    });

    const activeBetArr: ActiveBetInfo[] = await Promise.all(promiseArr);

    return activeBetArr;
}


export {
    getPendingBetsFromStorage,
    calculatePendingBetsCount,
    calculatePendingBetsTotalStakeAmount,
    calculatePendingBetsTotalEstPayoutAmount,
    updatePendingBetsStorage,
    addPendingBetHelper,
    updatePendingBetHelper,
    removePendingBetHelper,
    isPendingBetHelper,
    isMatchHasPendingBetsHelper,
    hasAnyPendingBetErrorHelper,
    getPendingBetErrorByBetIdHelper,
    submitPendingBetToServer
}