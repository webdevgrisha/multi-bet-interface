import React from "react";
import useSWR from "swr";
import type { SportGroup } from "../../types/interfaces";
import { fetcher } from "../../utils/fetcher";
import { calculateSportMatchStatistic } from "./helperFunctions";
import { BASE_URL } from "../../config/constants";

function useSportsMatchesStatistic() {
  const { data, error, isLoading } = useSWR<SportGroup[]>(
    `${BASE_URL}/games/`,
    fetcher
  );

  const statisticBySportGroup = React.useMemo(() => {
    if (!data || !Array.isArray(data)) return null;

    return calculateSportMatchStatistic(data);
  }, [data]);

  return { statisticBySportGroup, error, isLoading };
}

export { useSportsMatchesStatistic };
