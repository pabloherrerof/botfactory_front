export const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      rotate: 360,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 230,
        damping: 40,
        delayChildren: 0.4,
        staggerChildren: 0.2,
        delay: 1,
      },
    },
    exit: { opacity: 0, scale: 0, transition: { duration: 0.5 } },
  };
  
  export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 },
    }, 
  };

