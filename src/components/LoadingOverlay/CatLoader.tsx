import React, {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import './CatLoader.scss';

const CatLoader = () => {
  return (
    <AnimatePresence>
      <div className="cat-container">
        <p className="loading-text">Hellu</p>
        <div className="cat">
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
          <div className="cat__segment"></div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CatLoader;
