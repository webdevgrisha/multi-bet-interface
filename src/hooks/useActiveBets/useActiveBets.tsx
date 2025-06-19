import React from "react";
import {
  calculateActiveBetsCount,
  calculateActiveBetsTotalEstPayoutAmount,
  calculateActiveBetsTotalStakeAmount,
  clearAllActiveBetsHelper,
  getAllActiveBetsHelper,
} from "./helperFunctions";
import type { ActiveBetInfo } from "../../types/interfaces";

function useActiveBets() {
  const [activeBets, setActiveBets] = React.useState<ActiveBetInfo[]>([]);

  React.useEffect(() => {
    const fetchActiveBets = async () => {
      const data = await getAllActiveBetsHelper();
      setActiveBets(data);
    };

    fetchActiveBets();
  }, []);

  const activeBetsCount: number = React.useMemo(() => {
    return calculateActiveBetsCount(activeBets);
  }, [activeBets]);

  const totalStakeAmount: string = React.useMemo(() => {
    return calculateActiveBetsTotalStakeAmount(activeBets);
  }, [activeBets]);

  const totalEstPayoutAmount: string = React.useMemo(() => {
    return calculateActiveBetsTotalEstPayoutAmount(activeBets);
  }, [activeBets]);

  const updateActiveBets = React.useCallback(
    (newBets: ActiveBetInfo[]) => {
      const nextBetsArr = [...activeBets, ...newBets];

      setActiveBets(nextBetsArr);
    },
    [activeBets]
  );

  const clearAllActiveBets = React.useCallback(async () => {
    await clearAllActiveBetsHelper(activeBets);
    setActiveBets([]);
  }, [activeBets]);

  return {
    activeBets,
    activeBetsCount,
    totalStakeAmount,
    totalEstPayoutAmount,
    updateActiveBets,
    clearAllActiveBets,
  };
}

export { useActiveBets };
