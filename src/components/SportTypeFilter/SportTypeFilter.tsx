import styles from "./SportTypeFilter.module.css";
import { sportIcons } from "../../config/sportIcons";
import { useSportsMatchesStatistic } from "../../hooks";
import type { GroupName } from "../../types/types";
import { SportFilterItem } from "./SportFilterItem/SportFilterItem";
import { useSportContext } from "../../contexts/SportContext/useSportContext";

function SportTypeFilter() {
  const { statisticBySportGroup } = useSportsMatchesStatistic();
  const { selectedSport, handleSelectSport } = useSportContext();

  return (
    <div className={styles.sportMenuContainer}>
      <ul className={styles.sportMenuList}>
        {Object.entries(sportIcons).map(([sportGroupName, IconComponent]) => {
          const groupName = sportGroupName as GroupName;

          const isSelected = groupName === selectedSport;
          const matchCount: number | undefined =
            statisticBySportGroup?.[groupName];

          return (
            <SportFilterItem
              key={groupName}
              groupName={groupName}
              isSelected={isSelected}
              onSelected={handleSelectSport}
              matchCount={matchCount}
            >
              <IconComponent />
            </SportFilterItem>
          );
        })}
      </ul>
    </div>
  );
}

export { SportTypeFilter };
