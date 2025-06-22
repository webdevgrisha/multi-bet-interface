import styles from './BetCardError.module.css';
import { motion, AnimatePresence } from "framer-motion";

interface BetCardErrorProps {
  error: string | null;
}

function BetCardError({ error }: BetCardErrorProps) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          style={{ width: "100%" }}
        >
          <div className={styles.error}>
            <span>{error}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { BetCardError };
