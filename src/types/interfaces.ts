import type { BetStatus, GroupName, ISOString, MatchType } from "./types";

interface Outcome {
    name: string;
    price: number;
}

interface Match {
    id: string;
    commenceTime: ISOString,
    homeTeam: string,
    awayTeam: string,
    outcomes: Outcome[];
}

interface MatchAdditionalInfo {
    groupName: GroupName;
    sportName: Sport["name"];
    sportDescription: Sport["description"];
    matchType: MatchType,
}

interface MatchFullInfo {
    match: Match,
    additionalInfo: MatchAdditionalInfo;
};

interface Sport {
    key: string;
    name: string;
    description: string;
    matches: Match[];
}

interface SportGroup {
    groupName: GroupName;
    sports: Sport[];
}

interface PendingBetInfo extends MatchAdditionalInfo {
    betId: string;
    matchId: Match["id"];
    commenceTime: Match["commenceTime"];
    homeTeam: Match["homeTeam"];
    awayTeam: Match["awayTeam"];
    betTeamName: Outcome["name"];
    price: Outcome["price"];
    stakeAmount: number;
    estPayout: number;
}

interface PendingBetSearchData {
    matchId: PendingBetInfo["matchId"];
    betId: PendingBetInfo["betId"];
}

interface PendingBetUpdateData {
    currentStakeAmount: number;
    stakeAmount: number;
    estPayout: number;
}

interface PendingBets {
    [key: string]: PendingBetInfo[]
}

interface PendingBetsErrors {
    [key: PendingBetInfo["betId"]]: string | null;
}

interface ActiveBetInfo {
    id: string;
    matchId: Match["id"];
    groupName: GroupName;
    betTeamName: Outcome["name"];
    price: number;
    stakeAmount: number;
    estPayout: number;
    commenceTime: Match["commenceTime"];
    homeTeam: Match["homeTeam"];
    awayTeam: Match["awayTeam"];
    matchType: MatchType,
    createdAt: ISOString;
    status: BetStatus;
}

export type {
    Outcome,
    Match,
    MatchFullInfo,
    MatchAdditionalInfo,
    Sport,
    SportGroup,
    PendingBetInfo,
    PendingBetSearchData,
    PendingBetUpdateData,
    PendingBets,
    PendingBetsErrors,
    ActiveBetInfo,
}