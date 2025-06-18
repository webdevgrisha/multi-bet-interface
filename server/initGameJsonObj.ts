import { writeFile } from 'fs/promises';
import { delay } from '../src/utils/delay.ts';
import type { Outcome, Match, Sport, SportGroup } from '../src/types/interfaces.ts';
import type { MatchInfo, SportInfo } from './interfaces.ts'
import type { GroupName } from '../src/types/types.ts';

const BASE_URL = 'https://api.the-odds-api.com/v4/sports'
const API_KEY = 'c6ed9bb0dad96b34a0298cca2e2e630d';
const REGION = 'us';
const MARKETS = 'h2h';

async function getAllSportGroup(): Promise<SportGroup[]> {
    const url = new URL(`${BASE_URL}`);
    url.searchParams.set('all', "true");
    url.searchParams.set('apiKey', API_KEY);

    const response = await fetch(url);
    const json = await response.json() as SportInfo[];

    const groupsBySportName = {} as Record<GroupName, Sport[]>;

    json.filter((sportInfo) => sportInfo.has_outrights === false && sportInfo.active)
        .forEach((sportInfo) => {
            const groupName = sportInfo.group;

            const sportObj: Sport = {
                key: sportInfo.key,
                name: sportInfo.title,
                description: sportInfo.description,
                matches: [],
            }

            if (groupName in groupsBySportName) {
                groupsBySportName[groupName].push(sportObj);

                return;
            }

            groupsBySportName[groupName] = [sportObj];
        });

    const sportGroupArr: SportGroup[] = Object.entries(groupsBySportName).map(([groupName, sports]) => {
        return {
            groupName: groupName as GroupName,
            sports
        }
    });

    return sportGroupArr;
}

async function initMatches(sportKey: string): Promise<Match[]> {
    const url = new URL(`${BASE_URL}/upcoming/odds/`);

    url.searchParams.set('regions', REGION);
    url.searchParams.set('markets', MARKETS);
    url.searchParams.set('sport', sportKey);
    url.searchParams.set('apiKey', API_KEY);

    const response = await fetch(url);

    if (!response.ok) {
        const errorText = await response.text();

        console.error(`API error for sport ${sportKey}: ${response.status} ${response.statusText}`);
        console.error('Server response:', errorText);

        return [];
    }

    const json = (await response.json() || []) as MatchInfo[];

    const sportMatches: Match[] = json.filter(matchInfo => {
        return matchInfo.bookmakers.length !== 0;
    }).map((matchInfo) => {
        const outcomes: Outcome[] = matchInfo.bookmakers[0]?.markets[0]?.outcomes || [];

        return {
            id: matchInfo.id,
            commenceTime: matchInfo.commence_time,
            homeTeam: matchInfo.home_team,
            awayTeam: matchInfo.away_team,
            outcomes: outcomes
        }
    });

    return sportMatches;
}

async function initGameJsonObj() {
    const sportGroups: SportGroup[] = await getAllSportGroup();

    for (const sportGroup of sportGroups) {
        for (const sport of sportGroup.sports) {
            await delay(1000);
            sport.matches = await initMatches(sport.key);
        }
    }

    await writeFile('games.json', JSON.stringify(sportGroups, null, 2));
}

initGameJsonObj()
