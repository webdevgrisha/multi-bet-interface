import type { GroupName, ISOString } from '../src/types/types'

interface OutcomeInfo {
    name: string;
    price: number;
}

interface MarketInfo {
    key: string;
    last_update: ISOString;
    outcomes: OutcomeInfo[];
}

interface BookmakerInfo {
    key: string;
    title: string;
    last_update: ISOString;
    markets: MarketInfo[];
}

interface MatchInfo {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: ISOString;
    home_team: string;
    away_team: string;
    bookmakers: BookmakerInfo[];
}

interface SportInfo {
    key: string,
    group: GroupName;
    title: string;
    description: string;
    active: boolean;
    has_outrights: boolean;
    matches: MatchInfo;
}


export type {
    SportInfo,
    OutcomeInfo,
    MarketInfo,
    BookmakerInfo,
    MatchInfo
}