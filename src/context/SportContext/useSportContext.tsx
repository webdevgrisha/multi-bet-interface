import React from "react";
import { SportContext } from "./SportContext";

function useSportContext() {
  const context = React.useContext(SportContext);

  if (!context) {
    throw new Error("useSportContext must be used within SportProvider");
  }

  return context;
}

export { useSportContext };
