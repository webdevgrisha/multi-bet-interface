import React from "react";
import { useSportGroupMatches } from "../../hooks";

const SportContext = React.createContext<ReturnType<
  typeof useSportGroupMatches
> | null>(null);

export { SportContext };
