import { AnimatePresence, motion } from "framer-motion";
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window!=="undefined" ? location.pathname : "ssr"}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
