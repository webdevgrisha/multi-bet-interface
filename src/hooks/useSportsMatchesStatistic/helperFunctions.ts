import type { SportGroup } from "../../types/interfaces";
import type { SportGroupMatchCountStatistic } from "../../types/types";

function calculateSportMatchStatistic(sportGroup: SportGroup[]): SportGroupMatchCountStatistic {
    const calculationResult = sportGroup.reduce((statisticObj, currSportObj) => {
        const { groupName, sports } = currSportObj;

        const matchesCount = sports.reduce((totalCount, currSport) => {
            totalCount += currSport.matches.length;

            return totalCount;
        }, 0);

        statisticObj[groupName] = matchesCount;

        return statisticObj;
    }, {} as SportGroupMatchCountStatistic);

    return calculationResult;
}

export { calculateSportMatchStatistic }