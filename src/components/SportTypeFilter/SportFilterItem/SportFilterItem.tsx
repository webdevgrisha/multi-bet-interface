import styles from "./SportFilterItem.module.css";
import className from "classnames";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import type { GroupName } from "../../../types/types";

interface SportFilterItemProps {
  groupName: GroupName;
  isSelected: boolean;
  onSelected: (groupName: GroupName) => void;
  children: React.ReactNode;
  matchCount?: number;
}

function SportFilterItem({
  groupName,
  isSelected,
  onSelected,
  matchCount,
  children,
}: SportFilterItemProps) {
  const displayName =
    groupName.length > 7 ? groupName.slice(0, 5) + "..." : groupName;

  const sportItemClassName = className({
    [styles.sportListItem]: true,
    [styles["sportListItem--selected"]]: isSelected,
  });

  const matchCountClassNames = className({
    [styles.matchCount]: true,
    [styles["matchCount--selected"]]: isSelected,
  });

  return (
    <li>
      <Tippy content={groupName} placement="bottom">
        <button
          className={sportItemClassName}
          onClick={() => {
            onSelected(groupName);
          }}
        >
          {isSelected && <span className={styles.selectedDecorator}></span>}
          {matchCount !== undefined && (
            <span className={matchCountClassNames}>{matchCount}</span>
          )}
          <div className={styles.iconWrapper}>{children}</div>
          <span>{displayName}</span>
        </button>
      </Tippy>
    </li>
  );
}

export { SportFilterItem };
