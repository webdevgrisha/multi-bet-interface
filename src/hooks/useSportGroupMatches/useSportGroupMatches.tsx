import React from "react";
import useSWR from "swr";
import type { Sport, SportGroup } from "../../types/interfaces";
import type { GroupName } from "../../types/types";
import { fetcher } from "../../utils/fetcher";
import {
  getUrlString,
  hasMoreMatchesHelper,
  initSelectedSport,
  saveInLocalStorage,
  showOnlyVisibleMatches,
} from "./helperFunctions";

function useSportGroupMatches() {
  const [selectedSport, setSelectedSport] =
    React.useState<GroupName>(initSelectedSport);
  const [visibleMatchCount, setVisibleMatchCount] = React.useState<number>(15);

  const url = React.useMemo(() => {
    return getUrlString(selectedSport);
  }, [selectedSport]);

  const { data, error, isLoading } = useSWR<SportGroup[]>(url, fetcher);

  const handleSelectSport = React.useCallback((sportName: GroupName) => {
    saveInLocalStorage(sportName);

    setSelectedSport(sportName);
    setVisibleMatchCount(10);
  }, []);

  const loadMore = React.useCallback(() => {
    setVisibleMatchCount((prevValue) => prevValue + 10);
  }, []);

  const hasMore = React.useMemo(() => {
    return hasMoreMatchesHelper(visibleMatchCount, data?.[0].sports);
  }, [data, visibleMatchCount]);

  const processedSportsArr: Sport[] | undefined = React.useMemo(() => {
    return showOnlyVisibleMatches(visibleMatchCount, data?.[0].sports);
  }, [visibleMatchCount, data]);

  let sportsData: SportGroup | undefined = data?.[0];

  if (sportsData !== undefined) {
    sportsData = { ...sportsData, sports: processedSportsArr! };
  }

  return {
    sportsData,
    error,
    isLoading,
    selectedSport,
    handleSelectSport,
    loadMore,
    hasMore,
  };
}

export { useSportGroupMatches };
