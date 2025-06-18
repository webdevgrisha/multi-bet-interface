import React from "react";
import type {
  Match,
  PendingBetInfo,
  PendingBets,
  PendingBetSearchData,
  PendingBetsErrors,
  PendingBetUpdateData,
} from "../../types/interfaces";
import {
  addPendingBetHelper,
  calculatePendingBetsCount,
  calculatePendingBetsTotalEstPayoutAmount,
  calculatePendingBetsTotalStakeAmount,
  getPendingBetErrorByBetIdHelper,
  getPendingBetsFromStorage,
  hasAnyPendingBetErrorHelper,
  isMatchHasPendingBetsHelper,
  isPendingBetHelper,
  removePendingBetHelper,
  submitPendingBetToServer,
  updatePendingBetHelper,
  updatePendingBetsStorage,
} from "./helperFunctions";

function usePendingBets() {
  const [pendingBets, setPendingBets] = React.useState<PendingBets>(
    getPendingBetsFromStorage
  );

  const [pendingBetsErrors, setPendingBetsErrors] =
    React.useState<PendingBetsErrors>({});

  const [submitPendingBetsError, setSubmitPendingBetsError] = React.useState<
    string | null
  >(null);

  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const [submitPendingBetsStatus, setSubmitPendingBetsStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const pendingBetsCount: number = React.useMemo(() => {
    return calculatePendingBetsCount(pendingBets);
  }, [pendingBets]);

  const totalStakeAmount: string = React.useMemo(() => {
    return calculatePendingBetsTotalStakeAmount(pendingBets);
  }, [pendingBets]);

  const totalEstPayoutAmount: string = React.useMemo(() => {
    return calculatePendingBetsTotalEstPayoutAmount(pendingBets);
  }, [pendingBets]);

  const hasAnyPendingBetError = React.useMemo((): boolean => {
    return hasAnyPendingBetErrorHelper(pendingBetsErrors);
  }, [pendingBetsErrors]);

  const addPendingBet = React.useCallback((pendingBetInfo: PendingBetInfo) => {
    const updatedPendingBetsObj = addPendingBetHelper(pendingBetInfo);

    updatePendingBetsStorage(updatedPendingBetsObj);
    setPendingBets(updatedPendingBetsObj);

    setSubmitPendingBetsStatus("idle");
  }, []);

  const updatePendingBet = React.useCallback(
    (
      pendingBetSearchData: PendingBetSearchData,
      updatePendingBetData: PendingBetUpdateData
    ) => {
      const updatedPendingBetsObj = updatePendingBetHelper(
        pendingBetSearchData,
        updatePendingBetData
      );

      updatePendingBetsStorage(updatedPendingBetsObj);
      setPendingBets(updatedPendingBetsObj);
    },
    []
  );

  const removePendingBet = React.useCallback(
    (pendingBetSearchData: PendingBetSearchData) => {
      const updatedPendingBetsObj =
        removePendingBetHelper(pendingBetSearchData);

      updatePendingBetsStorage(updatedPendingBetsObj);
      setPendingBets(updatedPendingBetsObj);
    },
    []
  );

  const clearAllPendingBets = React.useCallback(() => {
    updatePendingBetsStorage({});
    setPendingBets({});
  }, []);

  const isMatchHasPendingBets = React.useCallback(
    (matchId: Match["id"]) => {
      return isMatchHasPendingBetsHelper(matchId, pendingBets);
    },
    [pendingBets]
  );

  const isPendingBet = React.useCallback(
    (pendingBetSearchData: PendingBetSearchData): boolean => {
      return isPendingBetHelper({ ...pendingBetSearchData, pendingBets });
    },
    [pendingBets]
  );

  const setPendingBetError = React.useCallback(
    (betId: PendingBetInfo["betId"], errorText: string | null): void => {
      setPendingBetsErrors((prevPendingBetsErrors) => {
        return { ...prevPendingBetsErrors, [betId]: errorText };
      });
    },
    []
  );

  const getPendingBetErrorByBetId = React.useCallback(
    (betId: PendingBetInfo["betId"]): string | null => {
      return getPendingBetErrorByBetIdHelper(betId, pendingBetsErrors);
    },
    [pendingBetsErrors]
  );

  const handleTermsAcceptanceChange = React.useCallback(
    (accepted: boolean) => {
      console.log(" submitPendingBetsError: ", submitPendingBetsError);
      if (
        accepted &&
        submitPendingBetsError === "You must accept the Terms & Conditions"
      ) {
        console.log(" submitPendingBetsError: ", submitPendingBetsError);
        setSubmitPendingBetsError(null);
      }

      setTermsAccepted(accepted);
    },
    [submitPendingBetsError]
  );

  const submitPendingBets = React.useCallback(
    async (isTermsAccepted: boolean): Promise<void> => {
      setSubmitPendingBetsStatus("loading");

      if (!isTermsAccepted) {
        setSubmitPendingBetsError("You must accept the Terms & Conditions");
        setSubmitPendingBetsStatus("error");
        return;
      }

      if (pendingBetsCount === 0) {
        setSubmitPendingBetsError("Your bet slip is empty");
        setSubmitPendingBetsStatus("error");
        return;
      }

      if (hasAnyPendingBetError) {
        setSubmitPendingBetsError("Some bets have validation errors");
        setSubmitPendingBetsStatus("error");
        return;
      }

      try {
        await submitPendingBetToServer(pendingBets);
        setSubmitPendingBetsError(null);
        setSubmitPendingBetsStatus("success");
        clearAllPendingBets();

        console.log("Successfully submit!");
      } catch {
        setSubmitPendingBetsError(
          "Something went wrong while submitting your bets."
        );
        setSubmitPendingBetsStatus("error");
      }
    },
    [pendingBets, pendingBetsCount, hasAnyPendingBetError, clearAllPendingBets]
  );

  return {
    pendingBets,
    pendingBetsErrors,
    pendingBetsCount,
    totalStakeAmount,
    totalEstPayoutAmount,
    hasAnyPendingBetError,
    termsAccepted,
    submitPendingBetsError,
    submitPendingBetsStatus,
    addPendingBet,
    updatePendingBet,
    removePendingBet,
    clearAllPendingBets,
    isMatchHasPendingBets,
    isPendingBet,
    setPendingBetError,
    getPendingBetErrorByBetId,
    handleTermsAcceptanceChange,
    submitPendingBets,
  };
}

export { usePendingBets };
