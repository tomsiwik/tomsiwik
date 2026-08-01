// Fluid Functionalism motion tiers:
// https://www.fluidfunctionalism.com/r/springs.json
export const spring = {
  fast: {
    type: 'spring' as const,
    duration: 0.08,
    bounce: 0,
    exit: { duration: 0.06 },
  },
  moderate: {
    type: 'spring' as const,
    duration: 0.16,
    bounce: 0,
    exit: { duration: 0.12 },
  },
  slow: {
    type: 'spring' as const,
    duration: 0.24,
    bounce: 0.12,
    exit: { duration: 0.16 },
  },
} as const;

export const fadeVariants = {
  hidden: { opacity: 0, transition: spring.fast.exit },
  show: { opacity: 1, transition: spring.fast },
};
