import type { PendingBetInfo } from "./interfaces";

type ISOString = string;

type GroupName = "American Football" |
    "Soccer" |
    "Mixed Martial Arts" |
    "Boxing" |
    "Baseball" |
    "Basketball" |
    "Ice Hockey" |
    "Rugby League" |
    "Aussie Rules" |
    "Cricket" |
    "Lacrosse";

type MatchType = 'Winner' | '1x2';

type SportGroupMatchCountStatistic = {
    [key in GroupName]: number
}

type BetStatus = "open" | "won" | "lost";

type BetToSubmit = Omit<PendingBetInfo, "betId"> & {
    createdAt: ISOString;
    status: BetStatus;
};

export type {
    ISOString,
    GroupName,
    MatchType,
    SportGroupMatchCountStatistic,
    BetToSubmit,
    BetStatus
}