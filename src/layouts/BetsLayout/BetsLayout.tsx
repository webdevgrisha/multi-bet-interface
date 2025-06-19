import { Matches } from "../../components/Matches/Matches";
import { SportTypeFilter } from "../../components/SportTypeFilter/SportTypeFilter";

function BetsLayout() {
  return (
    <>
      <SportTypeFilter />
      <Matches />
    </>
  );
}

export { BetsLayout };
