import { sportIcons } from "../../components/SportTypeFilter/sportIcons";
import { BASE_URL } from "../../config/constants";
import type { Sport } from "../../types/interfaces";
import type { GroupName } from "../../types/types";


function isGroupName(value: string): value is GroupName {
    return value in sportIcons;
};

function initSelectedSport(): GroupName {
    const rawData = localStorage.getItem("selectedSport") || "";

    const sportName: GroupName = isGroupName(rawData)
        ? rawData
        : (Object.entries(sportIcons)[0][0] as GroupName);

    return sportName;
};

function showOnlyVisibleMatches(
    visibleMatchCount: number,
    sports: Sport[] | undefined
) {
    if (sports === undefined) return;

    const sportsArrCopy: Sport[] = JSON.parse(JSON.stringify(sports));

    let currCopyCount = visibleMatchCount;

    for (let i = 0; i < sports.length; i++) {
        if (currCopyCount <= 0) {
            sportsArrCopy[i].matches = [];
            continue;
        }

        const matches = sportsArrCopy[i].matches;

        const copyCount =
            matches.length >= currCopyCount ? currCopyCount : matches.length;

        currCopyCount -= copyCount;

        const copyMatches = matches.slice(0, copyCount);

        sportsArrCopy[i].matches = copyMatches;
    }

    return sportsArrCopy;
};

function saveInLocalStorage(sportName: GroupName): void {
    localStorage.setItem("selectedSport", sportName);
}

function getUrlString(selectedSport: GroupName): string {
    const url = new URL(`${BASE_URL}/games/`);
    url.searchParams.set("groupName", selectedSport);

    return url.toString();
}

function hasMoreMatchesHelper(visibleMatchCount: number, sports: Sport[] | undefined): boolean {
    const totalMatch =
        sports?.reduce(
            (sum, currSport) => sum + currSport.matches.length,
            0
        ) ?? 0;

    return visibleMatchCount < totalMatch;
}

export {
    initSelectedSport,
    showOnlyVisibleMatches,
    saveInLocalStorage,
    getUrlString,
    hasMoreMatchesHelper,
}