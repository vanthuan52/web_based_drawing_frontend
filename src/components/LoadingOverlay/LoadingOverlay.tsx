import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import './LoadingOverlay.scss';

const LoadingOverlay = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Fake loading 2s
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-overlay"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0, transition: {duration: 0.5}}}>
          <div className="loading-container">
            <motion.div
              className="spinner"
              initial={{scale: 0.8}}
              animate={{scale: 1}}
              transition={{duration: 0.5, yoyo: Infinity}}
            />
            <motion.span
              className="loading-text"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1, delay: 0.5}}>
              Loading...
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
