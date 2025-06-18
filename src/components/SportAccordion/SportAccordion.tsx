import React from "react";
import styles from "./SportAccordion.module.css";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleArrowBtn } from "../ToggleArrowBtn/ToggleArrowBtn";

interface SportAccordionProps {
  sportName: string;
  description: string;
  matchCount: number;
  children: React.ReactNode;
}

function SportAccordion({
  sportName,
  description,
  matchCount,
  children,
}: SportAccordionProps) {
  const [isOpen, setOpen] = React.useState<boolean>(true);

  const toggleOpenStateFn = React.useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const matchCountClass = classNames({
    [styles.matchCount]: true,
    [styles["matchCount--visible"]]: !isOpen,
  });

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggleOpenStateFn}>
        <h3 className={styles.title}>
          {sportName} / {description}
        </h3>

        <span className={matchCountClass}>{matchCount}</span>

        {/* <div className={styles.toggleBtnWrapper}> */}
        <ToggleArrowBtn isOpen={isOpen} toggleCallback={toggleOpenStateFn} />
        {/* </div> */}

        {/* <button className={toggleBtnClass}>
          <SVG_Arrow />
        </button> */}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.contentWrapper}
          >
            <div className={styles.contentInner}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { SportAccordion };
